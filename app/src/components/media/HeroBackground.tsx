"use client";

import { HeroSlideshow, type HeroSlideshowItem } from "@/components/media/HeroSlideshow";

type HeroBackgroundProps = {
  slides: readonly HeroSlideshowItem[];
};

/**
 * Homepage hero photography layer + contrast scrim.
 * Client island so the server page does not pull slideshow hooks through the media barrel.
 */
export function HeroBackground({ slides }: HeroBackgroundProps) {
  if (slides.length === 0) {
    return null;
  }

  return (
    <>
      <HeroSlideshow items={slides} />
      {/*
        Scrim keeps headline contrast on any photo: near-even on mobile where
        the copy spans full width, weighted left on desktop where it does not.
      */}
      <div
        className="from-navy/75 via-navy/65 to-navy/45 bg-navy/30 md:from-navy/85 md:via-navy/55 absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r md:to-transparent"
        aria-hidden="true"
      />
    </>
  );
}
