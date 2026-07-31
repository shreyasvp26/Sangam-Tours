import { SectionHeading } from "@/components/content";
import { EmptyState } from "@/components/feedback";
import { Container, Page, Section } from "@/components/layout";
import { siteConfig } from "@/config/site";
import type { LegalDocumentType } from "@/domain";
import { getLegalPageData } from "@/services/legal-page";

function formatLastUpdated(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Shared legal document layout — Document 04 §11.
 * Title + last updated + body; no CTAs, breadcrumbs, or related content when published.
 */
export async function LegalDocumentPage({ documentType }: { documentType: LegalDocumentType }) {
  const data = await getLegalPageData(documentType);

  return (
    <Page aria-label={`${data.title} — ${siteConfig.name}`}>
      <Section tone="muted" spacing="compact" aria-labelledby="legal-title">
        <Container width="narrow">
          <SectionHeading as="h1" title={<span id="legal-title">{data.title}</span>} />
          {data.document ? (
            <p className="text-caption text-muted mt-3">
              {data.copy.lastUpdatedPrefix} {formatLastUpdated(data.document.lastUpdatedDate)}
            </p>
          ) : null}
        </Container>
      </Section>

      <Section tone="default">
        <Container width="narrow">
          {data.document ? (
            <div className="text-body text-copy space-y-4 whitespace-pre-line">
              {data.document.bodyContent}
            </div>
          ) : (
            <EmptyState title={data.copy.emptyTitle} description={data.copy.emptyDescription} />
          )}
        </Container>
      </Section>
    </Page>
  );
}
