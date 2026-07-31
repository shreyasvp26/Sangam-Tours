"use client";

import { useMemo, useState } from "react";

import { Accordion, Tag } from "@/components/content";
import { SecondaryCTA, TertiaryCTA, WhatsAppButton } from "@/components/cta";
import { EmptyState } from "@/components/feedback";
import { Container, Section } from "@/components/layout";
import { siteConfig } from "@/config/site";
import type { FaqCategory } from "@/domain";
import type { FaqPageData } from "@/services/faq-page";

type FaqPageViewProps = {
  data: FaqPageData;
};

/**
 * FAQ page body — Document 04 §9.
 * Category Tag filters + single-level Accordion; no nested disclosure.
 */
export function FaqPageView({ data }: FaqPageViewProps) {
  const [category, setCategory] = useState<FaqCategory | null>(null);

  const filtered = useMemo(() => {
    if (!category) return data.items;
    return data.items.filter((item) => item.faqCategory === category);
  }, [data.items, category]);

  const libraryEmpty = data.items.length === 0;
  const filterEmpty = !libraryEmpty && filtered.length === 0;
  const showFilters = data.categories.length > 1;

  return (
    <>
      {libraryEmpty ? (
        <Section tone="default">
          <Container>
            <EmptyState
              title={data.copy.emptyTitle}
              description={data.copy.emptyDescription}
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <WhatsAppButton
                    message={`Hi ${siteConfig.name}, I have a question that isn’t on the FAQ page yet.`}
                  />
                  <SecondaryCTA href="/contact">{data.copy.contactLabel}</SecondaryCTA>
                </div>
              }
            />
          </Container>
        </Section>
      ) : (
        <Section tone="default" aria-label="Frequently asked questions">
          <Container className="gap-section-gap flex flex-col">
            {showFilters ? (
              <div
                className="flex flex-col gap-3"
                role="group"
                aria-labelledby="faq-categories-heading"
              >
                <p
                  id="faq-categories-heading"
                  className="text-caption text-muted font-medium tracking-wide uppercase"
                >
                  {data.copy.categoriesLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.categories.map((option) => (
                    <Tag
                      key={option.id}
                      selected={category === option.id}
                      onClick={() => setCategory((prev) => (prev === option.id ? null : option.id))}
                    >
                      {option.label}
                    </Tag>
                  ))}
                </div>
              </div>
            ) : null}

            {filterEmpty ? (
              <EmptyState
                title={data.copy.filterEmptyTitle}
                description={data.copy.filterEmptyDescription}
                action={
                  <TertiaryCTA type="button" onClick={() => setCategory(null)}>
                    {data.copy.clearFilterLabel}
                  </TertiaryCTA>
                }
              />
            ) : (
              <Accordion
                items={filtered.map((item) => ({
                  id: item.id,
                  title: item.question,
                  content: <p className="text-copy whitespace-pre-line">{item.answer}</p>,
                }))}
              />
            )}
          </Container>
        </Section>
      )}

      <Section tone="royal" aria-labelledby="faq-cta-heading">
        <Container className="flex flex-col items-start gap-6 md:items-center md:text-center">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
            <h2 id="faq-cta-heading" className="text-h2 text-on-dark font-bold">
              {data.copy.ctaHeading}
            </h2>
            <p className="text-body-lg text-on-dark/80">{data.copy.ctaDescription}</p>
          </div>
          <div
            className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
            role="group"
            aria-label="Next steps"
          >
            <WhatsAppButton className="sm:min-w-[10rem]" />
            <SecondaryCTA
              href="/contact"
              className="border-on-dark text-on-dark hover:bg-on-dark hover:text-navy focus-visible:shadow-[var(--sangam-focus-ring-on-dark)] sm:min-w-[10rem]"
            >
              {data.copy.contactLabel}
            </SecondaryCTA>
          </div>
        </Container>
      </Section>
    </>
  );
}
