/**
 * Public catalog factory — Content Infrastructure (Document 09 boundary).
 * Page services depend only on PublicCatalogApi via getPublicCatalog().
 */

import { cache } from "react";

import { createLocalPublicCatalogApi } from "@/adapters/catalog/local";
import type { PublicCatalogApi } from "@/api/resources";
import { getAppEnv, type AppEnv } from "@/config/env";
import { getContentRepository } from "@/content/repository";
import { createEmptyPublicCatalogApi } from "@/services/empty-catalog";

export type ContentSource = AppEnv["contentSource"];

/**
 * Resolve content source from validated env.
 * Default `local` — typed repository + local read adapter.
 * `empty` — empty successful collections (EmptyState regression; blocked in production).
 */
export function getContentSource(): ContentSource {
  return getAppEnv().contentSource;
}

function createCatalogForSource(source: ContentSource): PublicCatalogApi {
  if (source === "empty") {
    return createEmptyPublicCatalogApi();
  }
  return createLocalPublicCatalogApi(getContentRepository());
}

/**
 * Request-memoised public catalog.
 * Swap adapters only here — page services stay on PublicCatalogApi.
 */
export const getPublicCatalog = cache((): PublicCatalogApi => {
  return createCatalogForSource(getContentSource());
});
