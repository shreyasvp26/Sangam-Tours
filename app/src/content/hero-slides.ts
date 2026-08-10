/**
 * Homepage hero slideshow — photographs from real Sangam Tours departures.
 * Used only when the catalogue supplies no homepage hero media (Document 08 §11:
 * real photography only, never stock).
 */
export type HeroSlide = {
  src: string;
  alt: string;
};

export const homeHeroSlides: readonly HeroSlide[] = [
  {
    src: "/hero/bhutan-monastery-group.jpg",
    alt: "A Sangam Tours group outside a monastery in the hills of Bhutan",
  },
  {
    src: "/hero/dubai-marina-night-group.jpg",
    alt: "A Sangam Tours group at Dubai Marina with the skyline lit up at night",
  },
  {
    src: "/hero/pattaya-beach-group.jpg",
    alt: "A Sangam Tours group standing in the shallow sea at a beach in Thailand",
  },
  {
    src: "/hero/dubai-desert-safari-group.jpg",
    alt: "A Sangam Tours group on the sand dunes during a Dubai desert safari",
  },
  {
    src: "/hero/bangkok-temple-group.jpg",
    alt: "A Sangam Tours group in front of a temple in Bangkok",
  },
  {
    src: "/hero/group-celebration.jpg",
    alt: "Sangam Tours travellers cheering together on a sightseeing stop",
  },
] as const;
