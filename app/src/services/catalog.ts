import { apiFail, type ApiResult } from "@/api/result";
import type { EnquiryAdminApi, PublicCatalogApi } from "@/api/resources";

const NOT_IMPLEMENTED =
  "Data source is not configured yet. CMS / backend integration is out of scope for Milestone 3.";

function notImplemented<T>(): Promise<ApiResult<T>> {
  return Promise.resolve(apiFail("unexpected_failure", NOT_IMPLEMENTED));
}

function makeStub<T extends object>(keys: readonly (keyof T)[]): T {
  const out = {} as T;
  for (const key of keys) {
    Object.assign(out, {
      [key]: () => notImplemented(),
    });
  }
  return out;
}

/**
 * Unconfigured public catalog — Document 09 ports with no backing store.
 * Safe default until a CMS or HTTP adapter is injected.
 */
export function createUnconfiguredCatalogApi(): PublicCatalogApi {
  return {
    packages: makeStub(["listPublished", "getBySlug"]),
    categories: makeStub(["list", "getBySlug"]),
    destinations: makeStub(["list"]),
    departures: makeStub(["listForPackage"]),
    gallery: makeStub(["list", "getById"]),
    testimonials: makeStub(["listPublished"]),
    faqs: makeStub(["list"]),
    tourManagers: makeStub(["listActive"]),
    company: makeStub(["get"]),
    contact: makeStub(["listOffices"]),
    homepage: makeStub(["get"]),
    navigation: makeStub(["listActive"]),
    legal: makeStub(["list", "getByType"]),
    socialLinks: makeStub(["listActive"]),
    enquiries: makeStub(["submit"]),
  };
}

export function createUnconfiguredEnquiryAdminApi(): EnquiryAdminApi {
  return makeStub(["list", "getById", "updateStatus"]);
}

export type CatalogServices = {
  public: PublicCatalogApi;
  enquiryAdmin: EnquiryAdminApi;
};

/**
 * Compose catalog services. Pass partial overrides to swap in real adapters
 * without changing call sites (Document 09 technology-agnostic boundary).
 */
export function createCatalogServices(overrides?: {
  public?: Partial<PublicCatalogApi>;
  enquiryAdmin?: Partial<EnquiryAdminApi>;
}): CatalogServices {
  const basePublic = createUnconfiguredCatalogApi();
  const baseAdmin = createUnconfiguredEnquiryAdminApi();

  return {
    public: {
      packages: { ...basePublic.packages, ...overrides?.public?.packages },
      categories: { ...basePublic.categories, ...overrides?.public?.categories },
      destinations: {
        ...basePublic.destinations,
        ...overrides?.public?.destinations,
      },
      departures: { ...basePublic.departures, ...overrides?.public?.departures },
      gallery: { ...basePublic.gallery, ...overrides?.public?.gallery },
      testimonials: {
        ...basePublic.testimonials,
        ...overrides?.public?.testimonials,
      },
      faqs: { ...basePublic.faqs, ...overrides?.public?.faqs },
      tourManagers: {
        ...basePublic.tourManagers,
        ...overrides?.public?.tourManagers,
      },
      company: { ...basePublic.company, ...overrides?.public?.company },
      contact: { ...basePublic.contact, ...overrides?.public?.contact },
      homepage: { ...basePublic.homepage, ...overrides?.public?.homepage },
      navigation: { ...basePublic.navigation, ...overrides?.public?.navigation },
      legal: { ...basePublic.legal, ...overrides?.public?.legal },
      socialLinks: {
        ...basePublic.socialLinks,
        ...overrides?.public?.socialLinks,
      },
      enquiries: { ...basePublic.enquiries, ...overrides?.public?.enquiries },
    },
    enquiryAdmin: {
      ...baseAdmin,
      ...overrides?.enquiryAdmin,
    },
  };
}
