import { ContactEnquiry } from "@/app/_contact/ContactEnquiry";
import { ContactCard } from "@/components/cards";
import { Badge, SectionHeading } from "@/components/content";
import { CallButton, WhatsAppButton } from "@/components/cta";
import { EmptyState } from "@/components/feedback";
import { Container, Grid, Page, Section } from "@/components/layout";
import { JsonLdScript } from "@/components/seo";
import { siteConfig } from "@/config/site";
import { buildPageMetadata, localBusinessJsonLd } from "@/lib/seo";
import { getContactPageData } from "@/services/contact-page";

export const metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact",
  description: `Call, WhatsApp, or email ${siteConfig.name} — Nagpur office details and enquiry form.`,
});

/**
 * Contact — Document 03 §9 `/contact`, Document 04 §10.
 * Call Now is the page lead CTA; no breadcrumbs.
 */
export default async function ContactPage() {
  const data = await getContactPageData();

  return (
    <Page aria-label={`${siteConfig.name} Contact`}>
      <JsonLdScript data={localBusinessJsonLd()} />
      <Section tone="muted" spacing="compact" aria-labelledby="contact-hero-heading">
        <Container>
          <SectionHeading
            as="h1"
            title={<span id="contact-hero-heading">{data.copy.title}</span>}
            description={data.copy.reassurance}
          />
        </Container>
      </Section>

      <Section tone="default" aria-labelledby="contact-channels-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="contact-channels-heading">{data.copy.channelsHeading}</span>}
          />
          <Grid columns={3}>
            {data.channels.map((item) => (
              <ContactCard
                key={item.channel}
                channel={item.channel}
                detail={item.detail}
                href={item.href}
              />
            ))}
          </Grid>
        </Container>
      </Section>

      <Section tone="tint" aria-labelledby="contact-offices-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="contact-offices-heading">{data.copy.officesHeading}</span>}
          />
          <Grid columns={2}>
            {data.offices.map((office) => (
              <article key={office.id} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-h3 text-foreground font-semibold">{office.officeName}</h3>
                  {office.addressStatus === "pending" ? <Badge>Pending confirmation</Badge> : null}
                </div>
                <div className="text-body text-copy space-y-1">
                  {office.addressStatus === "pending" ? (
                    <p>{data.copy.pendingAddressLabel}</p>
                  ) : (
                    office.addressLines.map((line) => <p key={line}>{line}</p>)
                  )}
                </div>
              </article>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section tone="default" aria-labelledby="contact-map-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading title={<span id="contact-map-heading">{data.copy.mapHeading}</span>} />
          {data.offices.some(
            (office) => office.addressStatus === "confirmed" && office.googleMapsUrl,
          ) ? (
            <Grid columns={2}>
              {data.offices
                .filter((office) => office.addressStatus === "confirmed" && office.googleMapsUrl)
                .map((office) => (
                  <div key={office.id} className="flex flex-col gap-3">
                    <h3 className="text-h4 text-foreground font-semibold">{office.officeName}</h3>
                    <div className="overflow-hidden rounded-lg border border-neutral-200">
                      <iframe
                        title={`${siteConfig.name} ${office.officeName} map`}
                        src={office.googleMapsUrl}
                        className="aspect-[16/10] w-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ))}
            </Grid>
          ) : (
            <EmptyState
              title={data.copy.mapPendingTitle}
              description={data.copy.mapPendingDescription}
            />
          )}
        </Container>
      </Section>

      <Section tone="muted" aria-labelledby="contact-form-heading">
        <Container className="gap-section-gap flex flex-col">
          <SectionHeading
            title={<span id="contact-form-heading">{data.copy.formHeading}</span>}
            description={data.copy.formDescription}
          />
          {data.packageOptions.length > 0 ? (
            <div className="w-full max-w-xl">
              <ContactEnquiry packageOptions={data.packageOptions} />
            </div>
          ) : (
            <EmptyState
              title={data.copy.formEmptyTitle}
              description={data.copy.formEmptyDescription}
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <CallButton />
                  <WhatsAppButton />
                </div>
              }
            />
          )}
        </Container>
      </Section>

      <Section tone="royal" aria-labelledby="contact-cta-heading">
        <Container className="flex flex-col items-start gap-6 md:items-center md:text-center">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
            <h2 id="contact-cta-heading" className="text-h2 text-on-dark font-bold">
              {data.copy.ctaHeading}
            </h2>
            <p className="text-body-lg text-on-dark/80">{data.copy.ctaDescription}</p>
          </div>
          <CallButton className="sm:min-w-[10rem]" />
        </Container>
      </Section>
    </Page>
  );
}
