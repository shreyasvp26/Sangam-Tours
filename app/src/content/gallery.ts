/**
 * Gallery page copy — Document 04 §7 / 03 §9 `/gallery`.
 */

export const galleryPageCopy = {
  title: "Gallery",
  description:
    "Real moments from Sangam Tours departures — destination photography from trips we actually run.",
  imagesHeading: "Photos",
  videosHeading: "Videos",
  emptyTitle: "Trip photos will show here",
  emptyDescription:
    "Gallery images are published from real departures only — never stock photography. Browse tours meanwhile, or WhatsApp us about upcoming dates.",
  ctaHeading: "Seen a destination you like?",
  ctaDescription: "Tell us where you want to go — we’ll help you find the right departure.",
} as const;

/**
 * Show destination/package filters only when the library is large enough
 * to warrant them (Document 04 §7 — omit when browseable without filters).
 */
export const GALLERY_FILTER_MIN_ITEMS = 9;
