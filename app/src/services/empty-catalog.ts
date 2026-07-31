import { apiFail, apiOk, type ApiResult } from "@/api/result";
import { toPaginated } from "@/api/pagination";
import type { EnquiryAdminApi, PublicCatalogApi } from "@/api/resources";
import type { Paginated } from "@/api/pagination";

/**
 * Empty public catalog — successful empty collections (Document 09 § empty responses).
 * Used when CONTENT_SOURCE=empty for EmptyState regression; not a persistence layer.
 */
export function createEmptyPublicCatalogApi(): PublicCatalogApi {
  const emptyPage = <T>(): Promise<ApiResult<Paginated<T>>> =>
    Promise.resolve(apiOk(toPaginated<T>([])));

  return {
    packages: {
      listPublished: () => emptyPage(),
      getBySlug: async () => apiFail("missing_data", "That package could not be found."),
    },
    categories: {
      list: async () => apiOk([]),
      getBySlug: async () => apiFail("missing_data", "That category could not be found."),
    },
    destinations: {
      list: async () => apiOk([]),
    },
    departures: {
      listForPackage: async () => apiOk([]),
    },
    gallery: {
      list: () => emptyPage(),
      getById: async () => apiFail("missing_data", "That gallery item could not be found."),
    },
    testimonials: {
      listPublished: () => emptyPage(),
    },
    faqs: {
      list: async () => apiOk([]),
    },
    tourManagers: {
      listActive: async () => apiOk([]),
    },
    company: {
      get: async () => apiFail("missing_data", "Company information is not available yet."),
    },
    contact: {
      listOffices: async () => apiOk([]),
    },
    homepage: {
      get: async () =>
        apiOk({
          hero: null,
          heroMedia: null,
          sections: [],
        }),
    },
    navigation: {
      listActive: async () => apiOk([]),
    },
    legal: {
      list: async () => apiOk([]),
      getByType: async () => apiFail("missing_data", "That legal document could not be found."),
    },
    socialLinks: {
      listActive: async () => apiOk([]),
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

export function createEmptyEnquiryAdminApi(): EnquiryAdminApi {
  return {
    list: async () => apiOk(toPaginated([])),
    getById: async () => apiFail("missing_data", "Enquiry not found."),
    updateStatus: async () =>
      apiFail("unexpected_failure", "Enquiry updates are not connected yet."),
  };
}
