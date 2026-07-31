import { GalleryPageView } from "@/app/_gallery/GalleryPageView";
import { SectionHeading } from "@/components/content";
import { CallButton, CTA_LABELS, PrimaryCTA, WhatsAppButton } from "@/components/cta";
import { Container, Page, Section } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { getGalleryPageData } from "@/services/gallery-page";

export const metadata = buildPageMetadata({
  path: "/gallery",
  title: "Gallery",
  description: `Real destination photography from ${siteConfig.name} group tours — moments from trips we actually run.`,
});

/**
 * Gallery — Document 03 §9 `/gallery`, Document 04 §7.
 * No breadcrumbs (Document 03 §4.7).
 */
export default async function GalleryPage() {
  const data = await getGalleryPageData();

  return (
    <Page aria-label={`${siteConfig.name} Gallery`}>
      <Section tone="muted" spacing="compact" aria-labelledby="gallery-hero-heading">
        <Container>
          <SectionHeading
            as="h1"
            title={<span id="gallery-hero-heading">{data.copy.title}</span>}
            description={data.copy.description}
          />
        </Container>
      </Section>

      <GalleryPageView data={data} />

      <Section tone="royal" aria-labelledby="gallery-cta-heading">
        <Container className="flex flex-col items-start gap-6 md:items-center md:text-center">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
            <h2 id="gallery-cta-heading" className="text-h2 text-on-dark font-bold">
              {data.copy.ctaHeading}
            </h2>
            <p className="text-body-lg text-on-dark/80">{data.copy.ctaDescription}</p>
          </div>
          <div
            className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
            role="group"
            aria-label="Contact options"
          >
            <PrimaryCTA href="/contact" className="sm:min-w-[10rem]">
              {CTA_LABELS.bookNow}
            </PrimaryCTA>
            <WhatsAppButton className="sm:min-w-[10rem]" />
            <CallButton className="sm:min-w-[10rem]" />
          </div>
        </Container>
      </Section>
    </Page>
  );
}
