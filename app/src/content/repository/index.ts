import { buildSeedRepository } from "@/content/repository/seed";
import type { ContentRepository } from "@/content/repository/types";
import { validateContentRepository } from "@/content/repository/validate";

export type { ContentRepository } from "@/content/repository/types";

let cached: ContentRepository | null = null;

/**
 * Validated local content repository (Document 08).
 * Page services must not import this — use getPublicCatalog() instead.
 */
export function getContentRepository(): ContentRepository {
  if (cached) {
    return cached;
  }
  cached = validateContentRepository(buildSeedRepository());
  return cached;
}

/** Test/dev helper — clears the memoised repository. */
export function resetContentRepositoryCache(): void {
  cached = null;
}
