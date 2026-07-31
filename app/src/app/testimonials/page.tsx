import { TestimonialCard } from "@/components/cards";
import { SectionHeading } from "@/components/content";
import { CallButton, CTA_LABELS, PrimaryCTA, WhatsAppButton } from "@/components/cta";
import { EmptyState } from "@/components/feedback";
import { Container, Grid, Page, Section } from "@/components/layout";
import { VideoCard } from "@/components/media";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { getTestimonialsPageData } from "@/services/testimonials-page";

export const metadata = buildPageMetadata({
  path: "/testimonials",
  title: "Testimonials",
  description: `Real traveller experiences with ${siteConfig.name} — reviews from people who travelled with us.`,
});

/**
 * Testimonials — Document 03 §9 `/testimonials`, Document 04 §8.
 * No breadcrumbs; no fabricated reviews.
 */
export default async function TestimonialsPage() {
  const data = await getTestimonialsPageData();
  const hasAny = data.featured.length > 0 || data.rest.length > 0 || data.withVideo.length > 0;

  return (
    <Page aria-label={`${siteConfig.name} Testimonials`}>
      <Section tone="muted" spacing="compact" aria-labelledby="testimonials-hero-heading">
        <Container>
          <SectionHeading
            as="h1"
            title={<span id="testimonials-hero-heading">{data.copy.title}</span>}
            description={data.copy.description}
          />
        </Container>
      </Section>

      {!hasAny ? (
        <Section tone="default">
          <Container>
            <EmptyState
              title={data.copy.emptyTitle}
              description={data.copy.emptyDescription}
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <WhatsAppButton
                    message={`Hi ${siteConfig.name}, I’d love to hear from recent travellers.`}
                  />
                  <PrimaryCTA href="/domestic">View Domestic Tours</PrimaryCTA>
                </div>
              }
            />
          </Container>
        </Section>
      ) : (
        <>
          {data.featured.length > 0 ? (
            <Section tone="default" aria-labelledby="featured-reviews-heading">
              <Container className="gap-section-gap flex flex-col">
                <SectionHeading
                  title={<span id="featured-reviews-heading">{data.copy.featuredHeading}</span>}
                />
                <Grid columns={2}>
                  {data.featured.map((item) => (
                    <TestimonialCard
                      key={item.id}
                      variant="featured"
                      reviewerName={item.travellerName}
                      city={item.travellerCity}
                      quote={item.quoteText}
                      packageLabel={item.packageLabel}
                      photoSrc={item.photo?.uri}
                      photoAlt={item.photo ? item.travellerName : undefined}
                    />
                  ))}
                </Grid>
              </Container>
            </Section>
          ) : null}

          {data.rest.length > 0 ? (
            <Section
              tone={data.featured.length > 0 ? "muted" : "default"}
              aria-labelledby="all-reviews-heading"
            >
              <Container className="gap-section-gap flex flex-col">
                <SectionHeading
                  title={<span id="all-reviews-heading">{data.copy.allHeading}</span>}
                />
                <Grid columns={3}>
                  {data.rest.map((item) => (
                    <TestimonialCard
                      key={item.id}
                      variant="compact"
                      reviewerName={item.travellerName}
                      city={item.travellerCity}
                      quote={item.quoteText}
                      packageLabel={item.packageLabel}
                      photoSrc={item.photo?.uri}
                      photoAlt={item.photo ? item.travellerName : undefined}
                    />
                  ))}
                </Grid>
              </Container>
            </Section>
          ) : null}

          {data.withVideo.length > 0 ? (
            <Section tone="tint" aria-labelledby="video-testimonials-heading">
              <Container className="gap-section-gap flex flex-col">
                <SectionHeading
                  title={<span id="video-testimonials-heading">{data.copy.videosHeading}</span>}
                />
                <Grid columns={2}>
                  {data.withVideo.map((item) => (
                    <VideoCard
                      key={item.id}
                      thumbnailSrc={item.photo?.uri ?? item.video!.uri}
                      thumbnailAlt={`${item.travellerName}, ${item.travellerCity}`}
                      videoSrc={item.video!.uri}
                      title={`${item.travellerName} · ${item.travellerCity}`}
                    />
                  ))}
                </Grid>
              </Container>
            </Section>
          ) : null}
        </>
      )}

      <Section tone="royal" aria-labelledby="testimonials-cta-heading">
        <Container className="flex flex-col items-start gap-6 md:items-center md:text-center">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
            <h2 id="testimonials-cta-heading" className="text-h2 text-on-dark font-bold">
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
