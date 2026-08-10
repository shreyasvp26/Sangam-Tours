import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ClipboardList, MessageCircle, Users, UtensilsCrossed } from "lucide-react";

import { ValueCard, TestimonialCard } from "@/components/cards";
import { FeaturedPackagesMarquee } from "@/components/cards/FeaturedPackagesMarquee";
import { Accordion, Badge, SectionHeading, StatisticsBlock } from "@/components/content";
import { CallButton, CTA_LABELS, PrimaryCTA, SecondaryCTA, WhatsAppButton } from "@/components/cta";
import { EmptyState } from "@/components/feedback";
import { Container, Grid, Page, Section } from "@/components/layout";
import { GalleryGrid } from "@/components/media/GalleryGrid";
import { HeroBackground } from "@/components/media/HeroBackground";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { buildPageMetadata } from "@/lib/seo";
import { getHomePageData } from "@/services/home-page";

export const metadata = buildPageMetadata({
  path: "/",
  title: `${siteConfig.name} | Group Tours Since ${siteConfig.foundingYear}`,
  description:
    "Well-planned group travel for Maharashtra’s families — dedicated Tour Manager on every trip, transparent pricing, and care since 1979.",
  absoluteTitle: true,
});

const valueIcons = {
  "on-ground-care": Users,
  "transparent-pricing": ClipboardList,
  "comfort-details": UtensilsCrossed,
  reliability: CalendarCheck,
  "direct-access": MessageCircle,
} as const;

/**
 * Homepage — Document 04 §3 / Document 03 §6.
 * Composed from library components + data layer; Header/Footer from root layout.
 */
export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <Page aria-label="Homepage">
      {/* 3.2 Hero */}
      <Section tone="navy" spacing="none" className="relative overflow-hidden">
        {data.heroSlides.length > 0 ? (
          <HeroBackground slides={data.heroSlides} />
        ) : (
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(46_49_144_/_0.55),transparent_55%),linear-gradient(160deg,var(--sangam-navy),var(--sangam-royal))]"
            aria-hidden="true"
          />
        )}
        <Container className="relative flex min-h-[78svh] flex-col justify-center gap-6 py-16 md:min-h-[72svh] md:py-24">
          <Badge className="bg-accent/20 text-on-dark border-accent/40 w-fit border">
            {data.hero.badge}
          </Badge>
          <h1 className="text-display text-on-dark max-w-3xl font-bold tracking-tight">
            {data.hero.heading}
          </h1>
          <p className="text-body-lg text-on-dark/85 max-w-2xl">{data.hero.subheading}</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <WhatsAppButton
              message={`Hi ${siteConfig.name}, I’d like to know more about your group tours.`}
            />
          </div>
        </Container>
      </Section>

      {/* 3.3 Trust Strip */}
      <Section tone="muted" spacing="compact" aria-label="Trust signals">
        <Container>
          <StatisticsBlock items={[...data.trust.items]} />
        </Container>
      </Section>

      {/* 3.4 Featured Packages */}
      <Section tone="default" aria-labelledby="featured-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="featured-heading">{data.sectionCopy.featured.title}</span>}
            description={data.sectionCopy.featured.description}
          />
          {data.featuredPackages.length > 0 ? (
            <FeaturedPackagesMarquee packages={data.featuredPackages} />
          ) : (
            <EmptyState
              title="No featured packages published yet"
              description="WhatsApp us to ask about upcoming domestic and international dates."
              action={
                <WhatsAppButton
                  message={`Hi ${siteConfig.name}, which tours are departing soon?`}
                />
              }
            />
          )}
        </Container>
      </Section>

      {/* 3.5 Domestic / International Split */}
      <Section tone="tint" aria-labelledby="split-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="split-heading">{data.sectionCopy.split.title}</span>}
            description={data.sectionCopy.split.description}
          />
          <Grid columns={2} className="gap-6">
            {data.splitPanels.map((panel) => (
              <Link
                key={panel.href}
                href={panel.href}
                className={cn(
                  "text-on-dark ease-standard group relative flex min-h-48 flex-col justify-end gap-4 overflow-hidden rounded-lg p-6 transition-transform duration-[var(--sangam-duration-fast)] hover:-translate-y-0.5 focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none md:min-h-56 md:p-8",
                  panel.href === "/domestic" ? "bg-navy" : "bg-royal",
                )}
              >
                {panel.imageSrc ? (
                  <>
                    <Image
                      src={panel.imageSrc}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="bg-navy/65 absolute inset-0" aria-hidden="true" />
                  </>
                ) : null}
                <span className="text-h3 relative font-bold">{panel.label}</span>
                <span className={cn("relative", secondaryLinkClass)}>{panel.ctaLabel}</span>
              </Link>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 3.6 Why Sangam Tours */}
      <Section tone="default" aria-labelledby="why-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="why-heading">{data.sectionCopy.why.title}</span>}
            description={data.sectionCopy.why.description}
          />
          <Grid columns={3}>
            {data.values.map((value) => {
              const Icon = valueIcons[value.id];
              return (
                <ValueCard
                  key={value.id}
                  icon={<Icon className="size-5" strokeWidth={1.75} />}
                  label={value.label}
                  explanation={value.explanation}
                />
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* 3.7 Testimonials Highlight */}
      <Section tone="muted" aria-labelledby="testimonials-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="testimonials-heading">{data.sectionCopy.testimonials.title}</span>}
            description={data.sectionCopy.testimonials.description}
          />
          {data.testimonials.length > 0 ? (
            <Grid columns={3}>
              {data.testimonials.map((item) => (
                <TestimonialCard
                  key={item.id}
                  reviewerName={item.travellerName}
                  city={item.travellerCity}
                  quote={item.quoteText}
                  photoSrc={item.photo?.uri}
                  variant="compact"
                />
              ))}
            </Grid>
          ) : (
            <EmptyState
              title="Traveller reviews will show here"
              description="Only real, supplied testimonials appear on this site. WhatsApp us if you’d like to hear about recent trips."
              action={
                <WhatsAppButton
                  message={`Hi ${siteConfig.name}, I’d love to hear from recent travellers.`}
                />
              }
            />
          )}
          <div>
            <SecondaryCTA href="/testimonials">View All Testimonials</SecondaryCTA>
          </div>
        </Container>
      </Section>

      {/* 3.8 Gallery Preview */}
      <Section tone="default" aria-labelledby="gallery-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="gallery-heading">{data.sectionCopy.gallery.title}</span>}
            description={data.sectionCopy.gallery.description}
          />
          {data.galleryItems.length > 0 ? (
            <GalleryGrid
              items={data.galleryItems.map((item) => ({
                id: item.id,
                src: item.mediaFile.uri,
                alt: item.altText,
                variant: item.mediaType === "video" ? "video" : "image",
                videoSrc: item.mediaType === "video" ? item.mediaFile.uri : undefined,
              }))}
              columns={3}
            />
          ) : (
            <EmptyState
              title="Trip photos will show here"
              description="Gallery images are published from real departures only — never stock photography."
              action={<SecondaryCTA href="/domestic">View Domestic Tours</SecondaryCTA>}
            />
          )}
          <div>
            <SecondaryCTA href="/gallery">View Gallery</SecondaryCTA>
          </div>
        </Container>
      </Section>

      {/* 3.9 FAQ Snippet */}
      <Section tone="tint" aria-labelledby="faq-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="faq-heading">{data.sectionCopy.faq.title}</span>}
            description={data.sectionCopy.faq.description}
          />
          {data.faqs.length > 0 ? (
            <Accordion
              items={data.faqs.map((faq) => ({
                id: faq.id,
                title: faq.question,
                content: <p>{faq.answer}</p>,
              }))}
            />
          ) : (
            <EmptyState
              title="Answers will show here"
              description="For booking, pricing, or travel questions today, WhatsApp or call us — we’re happy to help."
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <WhatsAppButton />
                  <CallButton />
                </div>
              }
            />
          )}
          <div>
            <SecondaryCTA href="/faq">View All FAQs</SecondaryCTA>
          </div>
        </Container>
      </Section>

      {/* 3.10 Final CTA Band — royal so it steps down into navy footer */}
      <Section tone="royal" aria-labelledby="final-cta-heading">
        <Container className="flex flex-col items-start gap-6 md:items-center md:text-center">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
            <h2 id="final-cta-heading" className="text-h2 text-on-dark font-bold">
              {data.finalCta.heading}
            </h2>
            <p className="text-body-lg text-on-dark/80">{data.finalCta.description}</p>
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

const secondaryLinkClass =
  "text-body text-accent inline-flex min-h-touch items-center font-medium underline-offset-4 group-hover:underline";
