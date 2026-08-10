import { SectionHeading } from "@/components/content";
import { Container, Page, Section } from "@/components/layout";
import { siteConfig } from "@/config/site";
import {
  termsAndConditionsMeta,
  termsAndConditionsSections,
} from "@/content/terms-and-conditions";

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
 * Terms & Conditions — Document 04 §11.
 * Plain structured legal reading layout; no CTAs or related content.
 */
export function TermsAndConditionsView() {
  return (
    <Page aria-label={`Terms & Conditions — ${siteConfig.name}`}>
      <Section tone="muted" spacing="compact" aria-labelledby="terms-title">
        <Container width="narrow">
          <SectionHeading as="h1" title={<span id="terms-title">{termsAndConditionsMeta.title}</span>} />
          <p className="text-caption text-muted mt-3">
            Last updated: {formatLastUpdated(termsAndConditionsMeta.lastUpdatedDate)}
          </p>
        </Container>
      </Section>

      <Section tone="default">
        <Container width="narrow" className="flex flex-col gap-10">
          <p className="text-body-lg text-copy">{termsAndConditionsMeta.intro}</p>

          <div className="flex flex-col gap-8">
            {termsAndConditionsSections.map((section) => (
              <article key={section.number} aria-labelledby={`terms-section-${section.number}`}>
                <h2
                  id={`terms-section-${section.number}`}
                  className="text-h4 text-foreground font-semibold"
                >
                  {section.number}. {section.title}
                </h2>
                <ul className="text-body text-copy mt-3 list-disc space-y-2 pl-5">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </Page>
  );
}
