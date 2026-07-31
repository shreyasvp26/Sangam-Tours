import {
  CalendarCheck,
  ClipboardList,
  HeartHandshake,
  MapPin,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import { FeatureCard, ValueCard } from "@/components/cards";
import { Badge, SectionHeading, StatisticsBlock, Timeline } from "@/components/content";
import { CallButton, CTA_LABELS, PrimaryCTA, TertiaryCTA, WhatsAppButton } from "@/components/cta";
import { Container, Grid, Page, Section } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { getAboutPageData } from "@/services/about-page";

export const metadata = buildPageMetadata({
  path: "/about",
  title: "About Us",
  description: `Sangam Tours — Nagpur-based group travel since ${siteConfig.foundingYear}. Dedicated Tour Manager on every trip, transparent pricing, and care that families pass down.`,
});

const valueIcons = [
  CalendarCheck,
  ClipboardList,
  Users,
  UtensilsCrossed,
  HeartHandshake,
  MapPin,
] as const;

const whyIcons = {
  "tour-manager": Users,
  pricing: ClipboardList,
  since: CalendarCheck,
} as const;

/**
 * About Us — Document 03 §9 `/about`, Document 04 §6.
 * Credibility page; no breadcrumbs (Document 03 §4.7).
 */
export default async function AboutPage() {
  const data = await getAboutPageData();

  return (
    <Page aria-label={`About ${siteConfig.name}`}>
      {/* Hero */}
      <Section tone="navy" spacing="default" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgb(46_49_144_/_0.5),transparent_50%),linear-gradient(165deg,var(--sangam-navy),var(--sangam-royal))]"
          aria-hidden="true"
        />
        <Container className="relative flex flex-col gap-5 py-8 md:py-12">
          <Badge className="bg-accent/20 text-on-dark border-accent/40 w-fit border">
            {data.hero.badge}
          </Badge>
          <h1 className="text-display text-on-dark max-w-3xl font-bold tracking-tight">
            About {siteConfig.name}
          </h1>
          <p className="text-body-lg text-on-dark/85 max-w-2xl">{data.hero.missionLine}</p>
        </Container>
      </Section>

      {/* Company Story */}
      <Section tone="default" aria-labelledby="story-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading title={<span id="story-heading">Our story</span>} />
          <div className="flex max-w-prose flex-col gap-4">
            {data.storyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-body-lg text-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section tone="muted" aria-labelledby="timeline-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="timeline-heading">Since {siteConfig.foundingYear}</span>}
            description="A track record you can place on a timeline — not just a slogan."
          />
          <Timeline milestones={data.timeline} />
        </Container>
      </Section>

      {/* Mission — full-width container so left edge matches sibling sections; prose width on copy only */}
      <Section tone="tint" aria-labelledby="mission-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading title={<span id="mission-heading">Mission</span>} />
          <div className="flex max-w-prose flex-col gap-4">
            <p className="text-h4 text-foreground font-semibold">{data.mission}</p>
            <p className="text-body text-copy">
              <span className="text-foreground font-medium">Vision. </span>
              {data.vision}
            </p>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="default" aria-labelledby="values-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="values-heading">Values</span>}
            description="What we stand for on every departure."
          />
          <Grid columns={3}>
            {data.values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <ValueCard
                  key={value.name}
                  icon={<Icon className="size-5" strokeWidth={1.75} />}
                  label={value.name}
                  explanation={value.explanation}
                />
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section tone="muted" aria-labelledby="why-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="why-heading">Why choose us</span>}
            description="The same differentiators you see on our homepage — built into how we operate."
          />
          <Grid columns={3}>
            {data.whyChooseUs.map((item) => {
              const Icon = whyIcons[item.id];
              return (
                <ValueCard
                  key={item.id}
                  icon={<Icon className="size-5" strokeWidth={1.75} />}
                  label={item.label}
                  explanation={item.explanation}
                />
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* Tour Managers */}
      <Section tone="default" aria-labelledby="managers-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="managers-heading">Tour Managers</span>}
            description="On-ground care is a standing feature, not a package perk."
          />
          {data.tourManagers.length > 0 ? (
            <Grid columns={3}>
              {data.tourManagers.map((manager) => (
                <FeatureCard
                  key={manager.id}
                  variant="profile"
                  heading={manager.name}
                  support={manager.shortBio ?? data.tourManagerFallback}
                  imageSrc={manager.photo?.uri}
                  imageAlt={manager.photo ? manager.name : undefined}
                />
              ))}
            </Grid>
          ) : (
            <p className="text-body-lg text-copy max-w-prose">{data.tourManagerFallback}</p>
          )}
        </Container>
      </Section>

      {/* Achievements */}
      <Section tone="tint" aria-labelledby="achievements-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="achievements-heading">Achievements</span>}
            description="Facts we can stand behind — nothing estimated."
          />
          <StatisticsBlock items={data.achievements} />
        </Container>
      </Section>

      {/* CTA — royal so it steps down into navy footer */}
      <Section tone="royal" aria-labelledby="about-cta-heading">
        <Container className="flex flex-col items-start gap-6 md:items-center md:text-center">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
            <h2 id="about-cta-heading" className="text-h2 text-on-dark font-bold">
              {data.cta.heading}
            </h2>
            <p className="text-body-lg text-on-dark/80">{data.cta.description}</p>
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
          <div className="flex flex-wrap justify-center gap-3">
            <TertiaryCTA
              href="/domestic"
              className="text-accent hover:text-on-dark focus-visible:shadow-[var(--sangam-focus-ring-on-dark)]"
            >
              View Domestic Tours
            </TertiaryCTA>
            <TertiaryCTA
              href="/international"
              className="text-accent hover:text-on-dark focus-visible:shadow-[var(--sangam-focus-ring-on-dark)]"
            >
              View International Tours
            </TertiaryCTA>
          </div>
        </Container>
      </Section>
    </Page>
  );
}
