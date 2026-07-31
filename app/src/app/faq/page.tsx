import { FaqPageView } from "@/app/_faq/FaqPageView";
import { SectionHeading } from "@/components/content";
import { JsonLdScript } from "@/components/seo";
import { Container, Page, Section } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { buildPageMetadata, faqPageJsonLd } from "@/lib/seo";
import { getFaqPageData } from "@/services/faq-page";

export const metadata = buildPageMetadata({
  path: "/faq",
  title: "Frequently Asked Questions",
  description: `Common questions about booking, pricing, travel, and policies with ${siteConfig.name}.`,
});

/**
 * FAQ — Document 03 §9 `/faq`, Document 04 §9.
 * No breadcrumbs; Q&A from catalog only.
 */
export default async function FaqPage() {
  const data = await getFaqPageData();
  const faqSchema = faqPageJsonLd(
    data.items.map((item) => ({ question: item.question, answer: item.answer })),
  );

  return (
    <Page aria-label={`${siteConfig.name} Frequently Asked Questions`}>
      <JsonLdScript data={faqSchema} />
      <Section tone="muted" spacing="compact" aria-labelledby="faq-hero-heading">
        <Container>
          <SectionHeading as="h1" title={<span id="faq-hero-heading">{data.copy.title}</span>} />
        </Container>
      </Section>

      <FaqPageView data={data} />
    </Page>
  );
}
