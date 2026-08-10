/**
 * Local read-only content adapter — Document 09 PublicCatalogApi.
 * Reads from the typed repository; does not persist enquiries or mutate store.
 */

import { apiFail, apiOk, type ApiResult } from "@/api/result";
import { toPaginated, type PaginationInput } from "@/api/pagination";
import type {
  FaqListFilters,
  GalleryListFilters,
  PackageDetail,
  PackageListFilters,
  PublicCatalogApi,
  TestimonialListFilters,
} from "@/api/resources";
import type { ContentRepository } from "@/content/repository/types";
import type { GalleryItem, PackageSummary, TourPackage } from "@/domain";
import { getNextDepartureDate } from "@/lib/transforms/departure";

function isPublished(status: string): boolean {
  return status === "published";
}

function toPackageSummary(pkg: TourPackage, repo: ContentRepository): PackageSummary | null {
  const hero = repo.galleryItems.find((item) => item.id === pkg.heroMediaId);
  if (!hero || !isPublished(hero.status)) {
    return null;
  }

  const packageDepartures = repo.departures.filter((item) => item.packageId === pkg.id);

  return {
    id: pkg.id,
    name: pkg.name,
    slug: pkg.slug,
    categoryId: pkg.categoryId,
    duration: pkg.quickFacts.duration,
    priceAmount: pkg.priceAmount,
    priceCurrency: pkg.priceCurrency,
    priceQualifiers: pkg.priceQualifiers,
    nextDepartureDate: getNextDepartureDate(packageDepartures),
    heroMedia: {
      id: hero.id,
      mediaFile: hero.mediaFile,
      altText: hero.altText,
      mediaType: hero.mediaType,
    },
  };
}

function publishedPackages(repo: ContentRepository): TourPackage[] {
  return repo.packages.filter((pkg) => isPublished(pkg.status));
}

function publishedGallery(repo: ContentRepository): GalleryItem[] {
  return repo.galleryItems
    .filter((item) => isPublished(item.status))
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}

function sortPackages(items: PackageSummary[], sort: PackageListFilters["sort"]): PackageSummary[] {
  const copy = items.slice();
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.priceAmount - b.priceAmount);
    case "price-desc":
      return copy.sort((a, b) => b.priceAmount - a.priceAmount);
    case "nearest-departure":
      return copy.sort((a, b) => {
        const aDate = a.nextDepartureDate ?? "9999-12-31";
        const bDate = b.nextDepartureDate ?? "9999-12-31";
        return aDate.localeCompare(bDate);
      });
    case "recent":
    default:
      return copy;
  }
}

/**
 * Create a PublicCatalogApi backed by a typed content repository.
 * Enquiry submit remains non-persisting until a real backend is chosen.
 */
export function createLocalPublicCatalogApi(repo: ContentRepository): PublicCatalogApi {
  return {
    packages: {
      listPublished: async (filters?: PackageListFilters, pagination?: PaginationInput) => {
        let summaries = publishedPackages(repo)
          .map((pkg) => toPackageSummary(pkg, repo))
          .filter((item): item is PackageSummary => item !== null);

        if (filters?.categoryId) {
          summaries = summaries.filter((item) => item.categoryId === filters.categoryId);
        }
        if (filters?.destinationId) {
          const matchingIds = new Set(
            publishedPackages(repo)
              .filter((pkg) =>
                pkg.destinationsCovered.some((entry) => entry === filters.destinationId),
              )
              .map((pkg) => pkg.id),
          );
          summaries = summaries.filter((item) => matchingIds.has(item.id));
        }

        summaries = sortPackages(summaries, filters?.sort);
        return apiOk(toPaginated(summaries, pagination));
      },

      getBySlug: async (slug: string): Promise<ApiResult<PackageDetail>> => {
        const pkg = publishedPackages(repo).find((item) => item.slug === slug);
        if (!pkg) {
          return apiFail("missing_data", "That package could not be found.");
        }

        const category = repo.categories.find((item) => item.id === pkg.categoryId);
        if (!category) {
          return apiFail("missing_data", "That package’s category could not be found.");
        }

        const heroMedia = repo.galleryItems.find(
          (item) => item.id === pkg.heroMediaId && isPublished(item.status),
        );
        if (!heroMedia) {
          return apiFail("missing_data", "That package’s hero media could not be found.");
        }

        const departures = repo.departures.filter((item) => item.packageId === pkg.id);
        const galleryItems = publishedGallery(repo).filter(
          (item) => item.packageId === pkg.id || pkg.galleryItemIds.includes(item.id),
        );
        const testimonials = repo.testimonials.filter(
          (item) =>
            isPublished(item.status) &&
            (item.packageId === pkg.id || pkg.testimonialIds.includes(item.id)),
        );
        const faqs = repo.faqs.filter(
          (item) =>
            isPublished(item.status) && (item.packageId === pkg.id || pkg.faqIds.includes(item.id)),
        );

        const relatedPackages = (
          pkg.relatedPackageIds.length > 0
            ? publishedPackages(repo).filter((item) => pkg.relatedPackageIds.includes(item.id))
            : publishedPackages(repo).filter(
                (item) => item.categoryId === pkg.categoryId && item.id !== pkg.id,
              )
        )
          .map((item) => toPackageSummary(item, repo))
          .filter((item): item is PackageSummary => item !== null)
          .slice(0, 4);

        return apiOk({
          package: pkg,
          category,
          departures,
          heroMedia,
          galleryItems,
          testimonials,
          faqs,
          relatedPackages,
        });
      },
    },

    categories: {
      list: async () => apiOk(repo.categories.slice()),
      getBySlug: async (slug) => {
        const category = repo.categories.find((item) => item.slug === slug);
        if (!category) {
          return apiFail("missing_data", "That category could not be found.");
        }
        return apiOk(category);
      },
    },

    destinations: {
      list: async () => apiOk(repo.destinations.slice()),
    },

    departures: {
      listForPackage: async (packageId) =>
        apiOk(repo.departures.filter((item) => item.packageId === packageId)),
    },

    gallery: {
      list: async (filters?: GalleryListFilters, pagination?: PaginationInput) => {
        let items = publishedGallery(repo);
        if (filters?.destinationId) {
          items = items.filter((item) => item.destinationId === filters.destinationId);
        }
        if (filters?.packageId) {
          items = items.filter((item) => item.packageId === filters.packageId);
        }
        if (filters?.featured) {
          items = items.filter((item) => item.featured);
        }
        return apiOk(toPaginated(items, pagination));
      },
      getById: async (id) => {
        const item = publishedGallery(repo).find((entry) => entry.id === id);
        if (!item) {
          return apiFail("missing_data", "That gallery item could not be found.");
        }
        return apiOk(item);
      },
    },

    testimonials: {
      listPublished: async (filters?: TestimonialListFilters, pagination?: PaginationInput) => {
        let items = repo.testimonials
          .filter((item) => isPublished(item.status))
          .slice()
          .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
        if (filters?.packageId) {
          items = items.filter((item) => item.packageId === filters.packageId);
        }
        if (filters?.featured) {
          items = items.filter((item) => item.featured);
        }
        return apiOk(toPaginated(items, pagination));
      },
    },

    faqs: {
      list: async (filters?: FaqListFilters) => {
        let items = repo.faqs
          .filter((item) => isPublished(item.status))
          .slice()
          .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
        if (filters?.faqCategory) {
          items = items.filter((item) => item.faqCategory === filters.faqCategory);
        }
        if (filters?.packageId) {
          items = items.filter((item) => item.packageId === filters.packageId);
        }
        return apiOk(items);
      },
    },

    tourManagers: {
      listActive: async () =>
        apiOk(
          repo.tourManagers
            .filter((item) => isPublished(item.status))
            .slice()
            .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)),
        ),
    },

    company: {
      get: async () => {
        if (!repo.company) {
          return apiFail("missing_data", "Company information is not available yet.");
        }
        return apiOk(repo.company);
      },
    },

    contact: {
      listOffices: async () => apiOk(repo.offices.slice()),
    },

    homepage: {
      get: async () => {
        const activeHero =
          repo.heroBanners.find(
            (banner) =>
              banner.active &&
              banner.status === "published" &&
              banner.ownerKind === "page" &&
              banner.ownerId === "home",
          ) ?? null;
        const heroMedia = activeHero
          ? (publishedGallery(repo).find((item) => item.id === activeHero.mediaId) ?? null)
          : null;
        const sections = repo.homepageSections
          .filter((section) => section.active)
          .slice()
          .sort((a, b) => a.displayOrder - b.displayOrder);

        return apiOk({
          hero: activeHero,
          heroMedia,
          sections,
        });
      },
    },

    navigation: {
      listActive: async () =>
        apiOk(
          repo.navigationItems
            .filter((item) => item.active)
            .slice()
            .sort((a, b) => a.displayOrder - b.displayOrder),
        ),
    },

    legal: {
      list: async () => apiOk(repo.legalDocuments.slice()),
      getByType: async (documentType) => {
        const document = repo.legalDocuments.find((item) => item.documentType === documentType);
        if (!document) {
          return apiFail("missing_data", "That legal document could not be found.");
        }
        return apiOk(document);
      },
    },

    socialLinks: {
      listActive: async () =>
        apiOk(
          repo.socialLinks
            .filter((item) => item.active)
            .slice()
            .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)),
        ),
    },

    enquiries: {
      submit: async () =>
        apiFail(
          "unexpected_failure",
          "Enquiry submission is not connected yet. Please WhatsApp or call us.",
        ),
    },
  };
}
