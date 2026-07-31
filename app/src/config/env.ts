/**
 * Environment contract — Document 11 §3 (configuration separate from code).
 * Validates known vars; never embeds secrets in the client bundle beyond NEXT_PUBLIC_*.
 */

import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .union([z.string().url(), z.literal("")])
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      return value.replace(/\/$/, "");
    }),
  CONTENT_SOURCE: z.enum(["local", "empty"]),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export type AppEnv = {
  siteUrl?: string;
  contentSource: "local" | "empty";
  nodeEnv: "development" | "test" | "production";
};

let cached: AppEnv | null = null;

/**
 * Parse and cache env. Throws on invalid CONTENT_SOURCE.
 * Refuses CONTENT_SOURCE=empty in production (minimal production footprint — Doc 11 §2.13).
 */
export function getAppEnv(): AppEnv {
  if (cached) {
    return cached;
  }

  const parsed = publicEnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    CONTENT_SOURCE: process.env.CONTENT_SOURCE?.trim().toLowerCase() || "local",
    NODE_ENV: process.env.NODE_ENV || "development",
  });

  if (!parsed.success) {
    const detail = parsed.error.issues.map((issue) => issue.message).join("; ");
    throw new Error(`Invalid environment configuration: ${detail}`);
  }

  const contentSource = parsed.data.CONTENT_SOURCE;
  const nodeEnv = parsed.data.NODE_ENV;

  if (nodeEnv === "production" && contentSource === "empty") {
    throw new Error(
      'CONTENT_SOURCE=empty is not allowed in production. Use "local" (or a future CMS adapter).',
    );
  }

  cached = {
    siteUrl: parsed.data.NEXT_PUBLIC_SITE_URL,
    contentSource,
    nodeEnv,
  };

  return cached;
}

/** Test helper — clears memoised env between cases. */
export function resetAppEnvCache(): void {
  cached = null;
}
