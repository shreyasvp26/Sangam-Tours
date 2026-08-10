import { LoadingSkeleton } from "@/components/feedback";
import { Container, Section } from "@/components/layout";

/**
 * Route-level loading UI — Document 04 §13 / Document 06 §8.
 * Uses a status region (not `<main id="main-content">`) so the skip-link
 * target stays unique while the page streams (Document 05 §11 / 12 §3.4).
 */
export default function Loading() {
  return (
    <div className="w-full flex-1" role="status" aria-busy="true" aria-label="Loading page content">
      <Section tone="default" stickers={false}>
        <Container>
          <LoadingSkeleton variant="package" count={6} label="Loading page content" />
        </Container>
      </Section>
    </div>
  );
}
