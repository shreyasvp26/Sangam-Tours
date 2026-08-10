"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { PackageCard, TestimonialCard } from "@/components/cards";
import {
  Accordion,
  ExcludedList,
  IncludedList,
  QuickFacts,
  SectionHeading,
  Tag,
} from "@/components/content";
import {
  CallButton,
  CTA_LABELS,
  PrimaryCTA,
  SecondaryCTA,
  TertiaryCTA,
  WhatsAppButton,
} from "@/components/cta";
import { EmptyState, LoadingSkeleton } from "@/components/feedback";
import { Container, Grid, Section } from "@/components/layout";
import { GalleryGrid, HeroImage } from "@/components/media";
import { Breadcrumb, StickyMobileCTABar } from "@/components/navigation";
import { siteConfig } from "@/config/site";
import { withDerivedDepartureStatus } from "@/lib/transforms/departure";
import {
  formatNextDepartureLabel,
} from "@/lib/transforms/listing-filters";
import { formatPriceDisplay } from "@/lib/transforms/price";
import { submitPackageEnquiry } from "@/services/enquiry-submit";
import type { PackageDetailPageData } from "@/services/package-detail-page";

const EnquiryForm = dynamic(
  () => import("@/components/forms/EnquiryForm").then((mod) => mod.EnquiryForm),
  {
    ssr: false,
    loading: () => (
      <LoadingSkeleton variant="block" label="Loading enquiry form" className="min-h-64" />
    ),
  },
);

type PackageDetailViewProps = {
  data: PackageDetailPageData;
};

function formatDepartureChip(startDate: string, endDate: string): string {
  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);
  const fmt = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

/**
 * Package Detail body — Document 04 §5 fixed section order.
 * Composes library primitives only.
 */
export function PackageDetailView({ data }: PackageDetailViewProps) {
  const { package: pkg, category, heroMedia } = data;

  const departures = useMemo(
    () =>
      data.departures
        .map((d) => withDerivedDepartureStatus(d))
        .filter((d) => d.status === "upcoming")
        .sort((a, b) => a.startDate.localeCompare(b.startDate)),
    [data.departures],
  );

  const [selectedDepartureId, setSelectedDepartureId] = useState<string | null>(
    () => departures[0]?.id ?? null,
  );

  const selectedDeparture = departures.find((d) => d.id === selectedDepartureId) ?? departures[0];

  const allowedDates = departures.map((d) => d.startDate);
  const preferredDate = selectedDeparture?.startDate ?? "";

  const whatsappMessage = `Hi ${siteConfig.name}, I’m interested in ${pkg.name}${
    preferredDate ? ` (preferred departure around ${preferredDate})` : ""
  }.`;

  const heroSrc = heroMedia.mediaFile.uri;
  const heroVideo = heroMedia.mediaType === "video" ? heroMedia.mediaFile.uri : undefined;
  const heroPoster =
    heroMedia.mediaType === "video"
      ? (heroMedia.posterFile?.uri ?? heroMedia.mediaFile.uri)
      : heroSrc;

  return (
    <>
      <Section tone="default" spacing="compact" aria-label="Breadcrumb">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: data.listingTitle, href: data.listingPath },
              { label: pkg.name },
            ]}
          />
        </Container>
      </Section>

      {/* 5.2 Hero */}
      <section id="package-hero" aria-labelledby="package-title">
        <HeroImage
          src={heroPoster}
          alt={heroMedia.altText}
          videoSrc={heroVideo}
          priority
          className="rounded-none md:aspect-[21/9]"
        />
        <Section tone="default" spacing="compact">
          <Container className="flex flex-col gap-3">
            <p className="text-caption text-muted font-medium tracking-wide uppercase">
              {category.name}
            </p>
            <h1 id="package-title" className="text-display text-foreground font-bold">
              {pkg.name}
            </h1>
            <p className="text-body-lg text-copy max-w-prose">{pkg.destinationSummary}</p>
          </Container>
        </Section>
      </section>

      {/* 5.3 Price */}
      <Section tone="muted" spacing="compact" aria-labelledby="price-heading">
        <Container>
          <h2 id="price-heading" className="sr-only">
            Price
          </h2>
          <p className="text-h2 text-foreground font-bold tracking-tight">
            {formatPriceDisplay(pkg.priceAmount, pkg.priceQualifiers)}
            <span className="text-body text-muted ml-2 font-normal">per person</span>
          </p>
        </Container>
      </Section>

      {/* 5.4 Quick Facts */}
      <Section tone="default" spacing="compact" aria-labelledby="facts-heading">
        <Container className="gap-section-gap flex flex-col">
          <h2 id="facts-heading" className="sr-only">
            Quick facts
          </h2>
          <QuickFacts
            duration={pkg.quickFacts.duration}
            destinationsCovered={data.destinationsCoveredLabel || pkg.destinationSummary}
            groupType={pkg.quickFacts.groupType}
            departureCity={pkg.quickFacts.departureCity}
          />
        </Container>
      </Section>

      {/* 5.5 Tour Dates */}
      <Section tone="tint" spacing="compact" aria-labelledby="dates-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="dates-heading">Tour dates</span>}
            description="Select a departure to pre-fill your enquiry."
          />
          {departures.length > 0 ? (
            <div className="flex flex-wrap gap-2" role="list">
              {departures.map((departure) => (
                <div key={departure.id} role="listitem">
                  <Tag
                    selected={selectedDeparture?.id === departure.id}
                    onClick={() => setSelectedDepartureId(departure.id)}
                  >
                    {formatDepartureChip(departure.startDate, departure.endDate)}
                  </Tag>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Departure dates will show here"
              description="WhatsApp us to ask about the next available dates for this tour."
              action={<WhatsAppButton message={whatsappMessage} />}
            />
          )}
        </Container>
      </Section>

      {/* 5.6 Overview */}
      <Section tone="default" aria-labelledby="overview-heading">
        <Container className="gap-section-gap flex max-w-prose flex-col">
          <SectionHeading title={<span id="overview-heading">Overview</span>} />
          <p className="text-body-lg text-copy">{pkg.overview}</p>
        </Container>
      </Section>

      {/* 5.7 Highlights */}
      <Section tone="muted" aria-labelledby="highlights-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading title={<span id="highlights-heading">Highlights</span>} />
          <ul className="text-body text-copy flex max-w-prose flex-col gap-3">
            {pkg.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="bg-accent mt-2 size-2 shrink-0 rounded-full" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5.8 Itinerary */}
      <Section tone="default" aria-labelledby="itinerary-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading title={<span id="itinerary-heading">Itinerary</span>} />
          <Accordion
            items={pkg.itinerary.map((day) => ({
              id: `day-${day.dayNumber}`,
              title: `Day ${day.dayNumber}: ${day.title}`,
              content: <p className="text-body text-copy">{day.description}</p>,
            }))}
          />
        </Container>
      </Section>

      {/* 5.9 Included / Excluded */}
      <Section tone="tint" aria-labelledby="inclusions-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="inclusions-heading">What’s included</span>}
            description="Clear lists — nothing buried in fine print."
          />
          <Grid columns={2}>
            <IncludedList items={pkg.includedList} />
            <ExcludedList items={pkg.excludedList} />
          </Grid>
        </Container>
      </Section>

      {/* 5.10 Gallery */}
      <Section tone="default" aria-labelledby="gallery-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading title={<span id="gallery-heading">Gallery</span>} />
          {data.galleryItems.length > 0 ? (
            <GalleryGrid
              items={data.galleryItems.map((item) => ({
                id: item.id,
                src:
                  item.mediaType === "video"
                    ? (item.posterFile?.uri ?? item.mediaFile.uri)
                    : item.mediaFile.uri,
                alt: item.altText,
                variant: item.mediaType === "video" ? "video" : "image",
                videoSrc: item.mediaType === "video" ? item.mediaFile.uri : undefined,
              }))}
              columns={3}
            />
          ) : (
            <EmptyState
              title="Trip photos will show here"
              description="Gallery images for this package are published from real departures only."
            />
          )}
        </Container>
      </Section>

      {/* 5.11 Testimonials */}
      <Section tone="muted" aria-labelledby="testimonials-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading title={<span id="testimonials-heading">Testimonials</span>} />
          {data.testimonials.length > 0 ? (
            <>
              <Grid columns={3}>
                {data.testimonials.map((item) => (
                  <TestimonialCard
                    key={item.id}
                    reviewerName={item.travellerName}
                    city={item.travellerCity}
                    quote={item.quoteText}
                    photoSrc={item.photo?.uri}
                    variant="compact"
                    href="/testimonials"
                  />
                ))}
              </Grid>
              <SecondaryCTA href="/testimonials">View All Testimonials</SecondaryCTA>
            </>
          ) : (
            <EmptyState
              title="Traveller reviews will show here"
              description="Only real, supplied testimonials appear on this site."
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <SecondaryCTA href="/testimonials">View All Testimonials</SecondaryCTA>
                  <WhatsAppButton message={whatsappMessage} />
                </div>
              }
            />
          )}
        </Container>
      </Section>

      {/* 5.12 FAQ */}
      <Section tone="default" aria-labelledby="faq-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading title={<span id="faq-heading">FAQ</span>} />
          {data.faqs.length > 0 ? (
            <Accordion
              items={data.faqs.map((faq) => ({
                id: faq.id,
                title: faq.question,
                content: <p className="text-body text-copy">{faq.answer}</p>,
              }))}
            />
          ) : (
            <EmptyState
              title="Answers will show here"
              description="For questions about this tour, WhatsApp or call us."
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <WhatsAppButton message={whatsappMessage} />
                  <CallButton />
                </div>
              }
            />
          )}
        </Container>
      </Section>

      {/* 5.13 Enquiry / CTA */}
      <Section
        id="enquiry-cta"
        tone="tint"
        aria-labelledby="enquiry-heading"
        className="scroll-mt-24"
      >
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="enquiry-heading">Enquire about this tour</span>}
            description="Book Now, WhatsApp, or call — same weight, your choice."
          />
          <div
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            role="group"
            aria-label="Contact options"
          >
            <PrimaryCTA href="#enquiry-form">{CTA_LABELS.bookNow}</PrimaryCTA>
            <WhatsAppButton message={whatsappMessage} />
            <CallButton />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <TertiaryCTA href="/cancellation-and-refund-policy">
              Cancellation & Refund Policy
            </TertiaryCTA>
            <TertiaryCTA href="/terms-and-conditions">Terms & Conditions</TertiaryCTA>
          </div>
          <div id="enquiry-form" className="max-w-xl scroll-mt-28">
            <EnquiryForm
              packageOptions={[{ value: pkg.id, label: pkg.name }]}
              defaultPackageId={pkg.id}
              defaultPreferredTravelDate={preferredDate}
              allowedDates={allowedDates}
              onSubmit={submitPackageEnquiry}
            />
          </div>
        </Container>
      </Section>

      {/* 5.14 Related Packages */}
      <Section tone="default" aria-labelledby="related-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="related-heading">Related packages</span>}
            description={`More ${data.listingTitle.toLowerCase()} you may like.`}
          />
          {data.relatedPackages.length > 0 ? (
            <Grid columns={3}>
              {data.relatedPackages.slice(0, 4).map((related) => (
                <PackageCard
                  key={related.id}
                  href={`/packages/${related.slug}`}
                  name={related.name}
                  duration={related.duration}
                  startingPrice={formatPriceDisplay(related.priceAmount, related.priceQualifiers)}
                  nextDeparture={
                    related.nextDepartureDate
                      ? formatNextDepartureLabel(related.nextDepartureDate)
                      : "Dates on request"
                  }
                  imageSrc={related.heroMedia.mediaFile.uri}
                  imageAlt={related.heroMedia.altText}
                  tag={related.tag}
                />
              ))}
            </Grid>
          ) : (
            <EmptyState
              title="Related tours will show here"
              description={`Browse all ${data.listingTitle.toLowerCase()} meanwhile.`}
              action={
                <PrimaryCTA href={data.listingPath}>
                  {data.listingKey === "domestic"
                    ? "View Domestic Tours"
                    : "View International Tours"}
                </PrimaryCTA>
              }
            />
          )}
        </Container>
      </Section>

      {/* 5.15 Sticky Mobile CTA Bar */}
      <StickyMobileCTABar
        bookHref="#enquiry-form"
        whatsappMessage={whatsappMessage}
        showAfterElementId="package-hero"
        hideWhenElementVisibleId="enquiry-cta"
      />
    </>
  );
}
