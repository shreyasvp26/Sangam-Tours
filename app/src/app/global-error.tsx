"use client";

import { useEffect } from "react";

import { ServerError } from "@/components/feedback";
import { fontLogo, fontSans } from "@/lib/fonts";
import { logger } from "@/lib/logger";

import "@/styles/globals.css";

/**
 * Root error boundary — Document 06 §8 / Document 11 §5.
 * Replaces the root layout when it fails; must provide its own html/body.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("app.global_error", {
      digest: error.digest,
      name: error.name,
    });
  }, [error]);

  return (
    <html lang="en" className={`${fontSans.variable} ${fontLogo.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <main id="main-content" className="flex flex-1 items-center justify-center" aria-label="Temporary error">
          <ServerError onRetry={reset} />
        </main>
      </body>
    </html>
  );
}
