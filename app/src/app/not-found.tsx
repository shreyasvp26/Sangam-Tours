import { NotFound } from "@/components/feedback";
import { Page } from "@/components/layout";

/**
 * Next.js App Router 404 — Document 06 §8.
 * Header and Footer remain via root layout; Page provides #main-content for skip link.
 */
export default function NotFoundPage() {
  return (
    <Page aria-label="Page not found">
      <NotFound />
    </Page>
  );
}
