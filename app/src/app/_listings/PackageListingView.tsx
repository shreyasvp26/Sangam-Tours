"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { PackageCard } from "@/components/cards";
import { SectionHeading, Tag } from "@/components/content";
import { TertiaryCTA, WhatsAppButton } from "@/components/cta";
import { Dropdown } from "@/components/forms/Dropdown";
import { EmptyState } from "@/components/feedback";
import { Container, Grid, Section } from "@/components/layout";
import { Z_INDEX } from "@/constants/z-index";
import {
  destinationTypeFilters,
  listingSortOptions,
  type ListingPageContent,
} from "@/content/listings";
import { useFocusTrap, useScrollLock } from "@/hooks";
import { cn } from "@/lib/cn";
import {
  applyListingFilters,
  collectDepartureMonths,
  createDefaultListingFilters,
  formatDepartureMonthLabel,
  formatNextDepartureLabel,
  listingFiltersActive,
  type ListingFilterState,
} from "@/lib/transforms/listing-filters";
import { formatPriceDisplay } from "@/lib/transforms/price";
import { siteConfig } from "@/config/site";
import type { PackageSummary } from "@/domain";

type PackageListingViewProps = {
  content: ListingPageContent;
  packages: PackageSummary[];
};

/**
 * Shared Domestic / International listing body — Document 04 §4.
 * Composes library primitives; both routes reuse this view.
 */
export function PackageListingView({ content, packages }: PackageListingViewProps) {
  const [filters, setFilters] = useState<ListingFilterState>(createDefaultListingFilters);
  const [sheetOpen, setSheetOpen] = useState(false);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const sheetRootRef = useRef<HTMLDivElement>(null);
  const destinationTypeHeadingId = useId();
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  useScrollLock(sheetOpen);
  useFocusTrap(sheetOpen, sheetRootRef, {
    initialFocusRef: sheetCloseRef,
    onEscape: closeSheet,
  });

  const months = useMemo(() => collectDepartureMonths(packages), [packages]);
  const filtered = useMemo(() => applyListingFilters(packages, filters), [packages, filters]);
  const filtersAreActive = listingFiltersActive(filters);
  const categoryEmpty = packages.length === 0;
  const filterEmpty = !categoryEmpty && filtered.length === 0;

  const clearFilters = () => {
    setFilters(createDefaultListingFilters());
    closeSheet();
  };

  const monthOptions = months.map((ym) => ({
    value: ym,
    label: formatDepartureMonthLabel(ym),
  }));

  const filterControls = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3" role="group" aria-labelledby={destinationTypeHeadingId}>
        <p
          id={destinationTypeHeadingId}
          className="text-caption text-muted font-medium tracking-wide uppercase"
        >
          Destination type
        </p>
        <div className="flex flex-wrap gap-2">
          {destinationTypeFilters.map((option) => (
            <Tag
              key={option.value}
              selected={filters.destinationType === option.value}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  destinationType: prev.destinationType === option.value ? null : option.value,
                }))
              }
            >
              {option.label}
            </Tag>
          ))}
        </div>
      </div>

      <Dropdown
        label="Departure month"
        options={monthOptions}
        placeholder="All months"
        value={filters.departureMonth ?? ""}
        onChange={(event) =>
          setFilters((prev) => ({
            ...prev,
            departureMonth: event.target.value ? event.target.value : null,
          }))
        }
      />

      <Dropdown
        label="Sort"
        options={[...listingSortOptions]}
        placeholder="Sort by"
        value={filters.sort}
        onChange={(event) =>
          setFilters((prev) => ({
            ...prev,
            sort: event.target.value as ListingFilterState["sort"],
          }))
        }
      />

      {filtersAreActive ? (
        <TertiaryCTA type="button" onClick={clearFilters}>
          Clear filters
        </TertiaryCTA>
      ) : null}
    </div>
  );

  return (
    <>
      <Section tone="muted" spacing="compact" aria-labelledby="listing-hero-heading">
        <Container>
          <SectionHeading
            as="h1"
            title={<span id="listing-hero-heading">{content.title}</span>}
            description={content.description}
          />
        </Container>
      </Section>

      <Section tone="default" aria-label={`${content.title} packages`}>
        <Container className="gap-section-gap flex flex-col">
          {!categoryEmpty ? (
            <>
              {/* Desktop / tablet filter row — Document 04 §4 */}
              <div className="hidden md:block">{filterControls}</div>

              {/* Mobile filter trigger → bottom sheet */}
              <div className="md:hidden">
                <button
                  ref={filterTriggerRef}
                  type="button"
                  className="border-navy text-navy hover:bg-navy hover:text-on-dark min-h-touch text-body ease-standard inline-flex items-center justify-center gap-2 rounded-sm border bg-transparent px-5 font-medium transition-colors duration-[var(--sangam-duration-fast)] focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none"
                  onClick={() => setSheetOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={sheetOpen}
                >
                  <SlidersHorizontal className="size-4" strokeWidth={1.75} aria-hidden />
                  Filter
                  {filtersAreActive ? (
                    <span className="bg-accent text-navy text-caption rounded-sm px-2 py-0.5 font-semibold">
                      On
                    </span>
                  ) : null}
                </button>
              </div>
            </>
          ) : null}

          {categoryEmpty ? (
            <EmptyState
              title="New departures are being added soon"
              description="WhatsApp us to ask about upcoming dates in this category."
              action={
                <WhatsAppButton
                  message={`Hi ${siteConfig.name}, which ${content.title.toLowerCase()} are departing soon?`}
                />
              }
            />
          ) : filterEmpty ? (
            <EmptyState
              title="No tours match your filters right now"
              description="Try clearing filters to see all packages in this category."
              action={
                <TertiaryCTA type="button" onClick={clearFilters}>
                  Clear filters
                </TertiaryCTA>
              }
            />
          ) : (
            <Grid columns={3}>
              {filtered.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  href={`/packages/${pkg.slug}`}
                  name={pkg.name}
                  duration={pkg.duration}
                  startingPrice={formatPriceDisplay(pkg.priceAmount, pkg.priceQualifiers)}
                  nextDeparture={
                    pkg.nextDepartureDate
                      ? formatNextDepartureLabel(pkg.nextDepartureDate)
                      : "Dates on request"
                  }
                  imageSrc={pkg.heroMedia.mediaFile.uri}
                  imageAlt={pkg.heroMedia.altText}
                  tag={pkg.tag}
                />
              ))}
            </Grid>
          )}
        </Container>
      </Section>

      {sheetOpen ? (
        <div
          ref={sheetRootRef}
          className="fixed inset-0 md:hidden"
          style={{ zIndex: Z_INDEX.overlay }}
          role="dialog"
          aria-modal="true"
          aria-label="Filter packages"
        >
          <button
            type="button"
            className="bg-navy/40 absolute inset-0"
            aria-label="Close filters"
            onClick={closeSheet}
          />
          <div
            className={cn(
              "bg-background shadow-card absolute inset-x-0 bottom-0 flex max-h-[85svh] flex-col rounded-t-lg",
            )}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
              <p className="text-h4 text-foreground font-semibold">Filter</p>
              <button
                ref={sheetCloseRef}
                type="button"
                className="size-touch text-foreground inline-flex items-center justify-center rounded-sm hover:bg-neutral-100 focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none"
                aria-label="Close"
                onClick={closeSheet}
              >
                <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </button>
            </div>
            <div className="overflow-y-auto px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              {filterControls}
              <button
                type="button"
                className="bg-accent text-navy min-h-touch text-body mt-6 inline-flex w-full items-center justify-center rounded-sm px-5 font-medium focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none"
                onClick={closeSheet}
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
