"use client";

import { useEffect } from "react";

import { ServerError } from "@/components/feedback";
import { Page } from "@/components/layout";
import { logger } from "@/lib/logger";

/**
 * Next.js App Router error boundary — Document 06 §8 (500).
 * Header and Footer remain via root layout; Page provides #main-content for skip link.
 * Cause is logged server-side only via digest (Document 09 §6) — never shown to visitors.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("app.route_error", {
      digest: error.digest,
      name: error.name,
    });
  }, [error]);

  return (
    <Page aria-label="Temporary error">
      <ServerError onRetry={reset} />
    </Page>
  );
}
