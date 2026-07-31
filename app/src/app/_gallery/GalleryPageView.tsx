"use client";

import { useMemo, useState } from "react";

import { Tag, SectionHeading } from "@/components/content";
import { TertiaryCTA, WhatsAppButton } from "@/components/cta";
import { EmptyState } from "@/components/feedback";
import { Container, Grid, Section } from "@/components/layout";
import { GalleryGrid, VideoCard } from "@/components/media";
import { siteConfig } from "@/config/site";
import type { GalleryPageData, GalleryPageItem } from "@/services/gallery-page";

type GalleryPageViewProps = {
  data: GalleryPageData;
};

function matchesFilters(
  item: GalleryPageItem,
  destinationId: string | null,
  packageId: string | null,
): boolean {
  if (destinationId && item.destinationId !== destinationId) return false;
  if (packageId && item.packageId !== packageId) return false;
  return true;
}

/**
 * Gallery page body — Document 04 §7.
 * Filters (optional), image grid + lightbox, video section, empty states.
 */
export function GalleryPageView({ data }: GalleryPageViewProps) {
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [packageId, setPackageId] = useState<string | null>(null);

  const filtered = useMemo(
    () => data.items.filter((item) => matchesFilters(item, destinationId, packageId)),
    [data.items, destinationId, packageId],
  );

  const images = filtered.filter((item) => item.mediaType === "image");
  const videos = filtered.filter((item) => item.mediaType === "video");
  const filtersActive = destinationId !== null || packageId !== null;
  const libraryEmpty = data.items.length === 0;
  const filterEmpty = !libraryEmpty && filtered.length === 0;

  const clearFilters = () => {
    setDestinationId(null);
    setPackageId(null);
  };

  return (
    <>
      {data.showFilters ? (
        <Section tone="default" spacing="compact" aria-label="Gallery filters">
          <Container className="flex flex-col gap-5">
            {data.destinations.length > 1 ? (
              <div
                className="flex flex-col gap-3"
                role="group"
                aria-labelledby="gallery-destination-filter-heading"
              >
                <p
                  id="gallery-destination-filter-heading"
                  className="text-caption text-muted font-medium tracking-wide uppercase"
                >
                  Destination
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.destinations.map((option) => (
                    <Tag
                      key={option.id}
                      selected={destinationId === option.id}
                      onClick={() =>
                        setDestinationId((prev) => (prev === option.id ? null : option.id))
                      }
                    >
                      {option.label}
                    </Tag>
                  ))}
                </div>
              </div>
            ) : null}

            {data.packages.length > 1 ? (
              <div
                className="flex flex-col gap-3"
                role="group"
                aria-labelledby="gallery-package-filter-heading"
              >
                <p
                  id="gallery-package-filter-heading"
                  className="text-caption text-muted font-medium tracking-wide uppercase"
                >
                  Package
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.packages.map((option) => (
                    <Tag
                      key={option.id}
                      selected={packageId === option.id}
                      onClick={() =>
                        setPackageId((prev) => (prev === option.id ? null : option.id))
                      }
                    >
                      {option.label}
                    </Tag>
                  ))}
                </div>
              </div>
            ) : null}

            {filtersActive ? (
              <TertiaryCTA type="button" onClick={clearFilters}>
                Clear filters
              </TertiaryCTA>
            ) : null}
          </Container>
        </Section>
      ) : null}

      <Section tone="default" aria-labelledby="gallery-photos-heading">
        <Container className="gap-section-gap flex flex-col">
          {!libraryEmpty && images.length > 0 ? (
            <>
              <SectionHeading
                title={<span id="gallery-photos-heading">{data.copy.imagesHeading}</span>}
              />
              <GalleryGrid
                columns={3}
                items={images.map((item) => ({
                  id: item.id,
                  src: item.src,
                  alt: item.alt,
                  variant: "image",
                  tag: item.packageName ?? item.destinationName,
                  tagHref: item.packageSlug ? `/packages/${item.packageSlug}` : undefined,
                }))}
              />
            </>
          ) : null}

          {libraryEmpty ? (
            <EmptyState
              title={data.copy.emptyTitle}
              description={data.copy.emptyDescription}
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <WhatsAppButton
                    message={`Hi ${siteConfig.name}, I’d like to see photos from recent trips.`}
                  />
                  <TertiaryCTA href="/domestic">View Domestic Tours</TertiaryCTA>
                </div>
              }
            />
          ) : null}

          {filterEmpty ? (
            <EmptyState
              title="No photos match your filters right now"
              description="Try clearing filters to see the full gallery."
              action={
                <TertiaryCTA type="button" onClick={clearFilters}>
                  Clear filters
                </TertiaryCTA>
              }
            />
          ) : null}
        </Container>
      </Section>

      {!libraryEmpty && !filterEmpty && videos.length > 0 ? (
        <Section tone="muted" aria-labelledby="gallery-videos-heading">
          <Container className="gap-section-gap flex flex-col">
            <SectionHeading
              title={<span id="gallery-videos-heading">{data.copy.videosHeading}</span>}
            />
            <Grid columns={2}>
              {videos.map((item) => (
                <VideoCard
                  key={item.id}
                  thumbnailSrc={item.src}
                  thumbnailAlt={item.alt}
                  videoSrc={item.videoSrc ?? item.src}
                  title={item.caption ?? item.packageName ?? item.destinationName}
                />
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
