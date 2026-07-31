# Sangam Tours — Wireframes Document

**Internal Reference Document | Version 1.0**
**Prepared for:** UI/UX Designers, Frontend Developers, AI Coding Agents (Cursor), and Product Managers
**Companion to:** 01-brand-strategy.md, 02-user-personas.md, 03-information-architecture.md
**Purpose:** This document defines the layout blueprint of every public page on www.sangamtours.com. It does not repeat brand voice, personas, or site structure — those live in the companion documents. This document answers one question only: **what should every page contain?**

---

## 1. Purpose

01-brand-strategy.md defines *why* the site should feel a certain way. 02-user-personas.md defines *who* uses it and *what they need*. 03-information-architecture.md defines *how the site is organised* — the pages, the navigation, the URLs, and the fixed section order for each template.

This document takes the skeleton defined in Information Architecture and turns each entry into a concrete page layout: what appears in each section, in what order, at what approximate size, and with what priority. It is the last structural document before visual design begins.

A UI designer picking up this document should be able to move directly into high-fidelity mockups without needing to ask what a section contains, where it sits, or how important it is relative to the sections around it. Every wireframe here follows the fixed section order already established in 03-information-architecture.md §6, §7, and elsewhere — this document does not reorder or reinterpret that structure, it fills it in.

This is not a visual design system, not a component library, and not an implementation guide. Colour, typography, animation, React components, and APIs are all out of scope here and are addressed in later documents.

---

## 2. Wireframing Principles

1. **Mobile-first.** Every layout is designed at mobile width first, per the dominant ad-driven mobile traffic pattern established in 02-user-personas.md §2.
2. **Trust before conversion.** Trust signals (Since 1979, Tour Manager, testimonials) always appear before or alongside a CTA, never after it as an afterthought.
3. **One primary action per section.** Each section on a page has a single, unambiguous next step — never two competing asks in the same visual block.
4. **Simple scanning.** Information that is inherently listable (inclusions, quick facts, itinerary days) is laid out as structured lists, not paragraphs.
5. **Low cognitive load.** No section introduces more choices than the user needs to move forward.
6. **Consistent spacing rhythm.** Every section uses the same vertical rhythm and internal structure as equivalent sections elsewhere, so a returning visitor never has to relearn a page.
7. **Minimal scrolling where possible.** Above-the-fold content on ad-landing pages (Hero, Price) must justify the page within the first viewport.
8. **Reusable layouts.** A layout pattern designed once (e.g. a package card, a testimonial block) is reused everywhere it is needed, never redesigned per instance.
9. **Trust and price lead; detail follows.** This applies at section level exactly as it applies at page level in 03-information-architecture.md §12.
10. **No dead ends.** Every page ends with a path forward — a CTA, a related page, or both.
11. **Equal-weight CTAs.** Wherever Book Now, WhatsApp Us, and Call Now appear together, their layout treatment must be visually equal — no CTA is boxed, tinted, or sized differently from the other two.
12. **Content-first sections.** A section exists to serve one identified user need (from 02-user-personas.md); no section is decorative filler.
13. **Predictable page templates.** All package pages, and all pages of the same type generally, share one wireframe — never a one-off layout per instance.
14. **Accessible by default.** Layouts assume large touch targets, no reliance on hover-only interactions, and no essential content hidden behind gestures.
15. **Explicit over clever.** Where a layout choice could be ambiguous, the wireframe states it explicitly rather than leaving it to design interpretation.

---

## 3. Homepage Wireframe

```
------------------------------------------------
HEADER
Logo | Nav (Home, Domestic, International, Gallery,
About, Contact) | Phone icon | WhatsApp icon | Hamburger (mobile)
------------------------------------------------
HERO

  "Since 1979" badge

  Headline (core promise)

  Subheadline

  [ WhatsApp Us ]

------------------------------------------------
TRUST STRIP

  Years in operation | Tour Manager on every trip |
  Testimonial count / happy travellers

------------------------------------------------
FEATURED / UPCOMING PACKAGES

  [ Package Card ] [ Package Card ] [ Package Card ]
                 (horizontal scroll on mobile)

------------------------------------------------
DOMESTIC / INTERNATIONAL SPLIT

  [ View Domestic Tours ]   [ View International Tours ]

------------------------------------------------
WHY SANGAM TOURS

  Tour Manager | Transparent Pricing |
  Home-Style Meals | Since 1979

------------------------------------------------
TESTIMONIALS HIGHLIGHT

  [ Testimonial ] [ Testimonial ] [ Testimonial ]

  [ View All Testimonials ]

------------------------------------------------
GALLERY PREVIEW

  [ img ] [ img ] [ img ] [ img ]

  [ View Gallery ]

------------------------------------------------
FAQ SNIPPET

  Q1  Q2  Q3  Q4 (accordion, collapsed)

  [ View All FAQs ]

------------------------------------------------
FINAL CTA BAND

  [ Enquire Now ]  [ WhatsApp Us ]  [ Call Now ]

------------------------------------------------
FOOTER
Explore | Company | Legal | Reach Us
------------------------------------------------
```

### 3.1 Header
**Purpose:** Persistent orientation and always-available contact access.
**Content:** Logo, six primary nav items (per 03-information-architecture.md §4.1), phone icon, WhatsApp icon, hamburger menu on mobile.
**Primary CTA:** None (utility section) — phone/WhatsApp icons act as passive, always-available contact points.
**Approximate height:** Small.
**Priority:** Critical.

### 3.2 Hero
**Purpose:** Immediate orientation and emotional hook for an interrupted, ad-driven visitor.
**Content:** "Since 1979" badge, a headline stating the core brand promise, a one-line subheadline, one strong destination image or short looping visual.
**Primary CTA:** WhatsApp Us.
**Approximate height:** Large (fills most of the first mobile viewport, but never all of it — a hint of the Trust Strip should be visible to encourage scrolling).
**Priority:** Critical.

### 3.3 Trust Strip
**Purpose:** Reinforce credibility in the very next viewport, before any product detail.
**Content:** Three to four short trust stats laid out horizontally — years in operation, Tour Manager presence, testimonial or traveller count.
**Primary CTA:** None (informational).
**Approximate height:** Small.
**Priority:** Critical.

### 3.4 Featured / Upcoming Packages
**Purpose:** Surface the soonest-departing, highest-priority packages to a visitor who has not yet chosen a category.
**Content:** Three to four package cards (image, name, price, next departure date), horizontally scrollable on mobile.
**Primary CTA:** View Package (per card).
**Approximate height:** Medium.
**Priority:** High.

### 3.5 Domestic / International Split
**Purpose:** Route visitors into the correct catalogue quickly, per 03-information-architecture.md §6.
**Content:** Two large tappable panels, one per category, each with a representative image and short label.
**Primary CTA:** View Domestic Tours / View International Tours.
**Approximate height:** Medium.
**Priority:** High.

### 3.6 Why Sangam Tours
**Purpose:** Summarise core brand values as scannable highlights, not paragraphs.
**Content:** Four to five short value tiles (icon + short label + one-line explanation): Tour Manager, Transparent Pricing, Home-Style Meals, Since 1979.
**Primary CTA:** None (informational).
**Approximate height:** Medium.
**Priority:** High.

### 3.7 Testimonials Highlight
**Purpose:** Social proof before the visitor is asked to commit.
**Content:** Three to four rotating testimonials representing different personas (family, senior, solo, couple), each with name, city, and a short quote.
**Primary CTA:** View All Testimonials.
**Approximate height:** Medium.
**Priority:** High.

### 3.8 Gallery Preview
**Purpose:** Visual proof of real trips, appealing especially to visually-driven browsers.
**Content:** A curated grid of four to six real destination images.
**Primary CTA:** View Gallery.
**Approximate height:** Medium.
**Priority:** Medium.

### 3.9 FAQ Snippet
**Purpose:** Pre-empt common objections without requiring navigation away from the homepage.
**Content:** Three to four top questions in a collapsed accordion.
**Primary CTA:** View All FAQs.
**Approximate height:** Small to Medium.
**Priority:** Medium.

### 3.10 Final CTA Band
**Purpose:** Last conversion opportunity before the footer.
**Content:** A short, direct invitation line followed by all three CTAs at equal visual weight.
**Primary CTA:** Book Now, WhatsApp Us, Call Now (all three).
**Approximate height:** Small.
**Priority:** Critical.

### 3.11 Footer
**Purpose:** Navigation safety net, legal access, and full contact details.
**Content:** Four columns per 03-information-architecture.md §4.3 — Explore, Company, Legal, Reach Us.
**Primary CTA:** None.
**Approximate height:** Medium.
**Priority:** High.

---

## 4. Listing Page Wireframe (Domestic Tours / International Tours)

Applies identically to `/domestic` and `/international`, differing only in which packages populate the grid.

```
------------------------------------------------
HEADER (shared)
------------------------------------------------
LISTING HERO
  Page title + one-line context
------------------------------------------------
FILTERS
  [ Destination Type ] [ Departure Month ] [ Sort ]
------------------------------------------------
PACKAGE GRID
  [ Card ] [ Card ]
  [ Card ] [ Card ]
  [ Card ] [ Card ]
------------------------------------------------
PAGINATION / LOAD MORE
------------------------------------------------
FOOTER (shared)
------------------------------------------------
```

**Header:** Shared site header, unchanged from Homepage §3.1.

**Listing Hero:** A short title ("Domestic Tours" or "International Tours") with one supporting line of context. No large hero image is required here — this page is a working tool, not a landing moment. Small, Priority: Medium.

**Filters:** A single row of lightweight controls — destination type (hills, coast, pilgrimage), departure month, and a sort control (soonest departure, price). This is *in-page filtering*, not a second navigation layer, per 03-information-architecture.md §4.2. On mobile, filters collapse into a single "Filter" button that opens a bottom sheet. Small, Priority: High.

**Package Cards:** Each card carries: destination image, package name, duration, starting price, next departure date, and a single "View Package" action. Cards follow one reusable layout regardless of category. Large (dominant page content), Priority: Critical.

### Standerd Package Card 

--------------------------------
Image

Package Name

Duration

Starting Price

Next Departure

View Package
--------------------------------

**Pagination / Infinite Scroll decision:** Given a catalogue of 12+ packages (per 03-information-architecture.md §5), a single-page grid with no pagination is sufficient — infinite scroll or pagination controls are unnecessary complexity for this catalogue size. If the catalogue later grows meaningfully beyond ~20 packages per category, a simple "Load More" button (not infinite scroll) should be introduced, since infinite scroll can disorient lower-technical-literacy users identified in 02-user-personas.md §12.

**CTA placement:** Each card carries one CTA ("View Package") only. The three core conversion CTAs (Book Now, WhatsApp Us, Call Now) are deliberately withheld from listing pages, per 03-information-architecture.md §10 — conversion happens on the Package Detail page, not here.

**Empty state:** If a filter combination returns zero packages, show a centred message ("No tours match your filters right now") with a single action to clear filters. Never show a blank grid with no explanation.

**Loading state:** Package cards render as simple placeholder blocks (image area + two text lines) while data loads — no spinner-only state with no visual structure.

**No Results state:** Distinct from Empty state only in wording if the entire category has no active packages (e.g. off-season) — same layout, different message: "New departures are being added soon — WhatsApp us to ask about upcoming dates," paired with a WhatsApp Us CTA as the one exception where a conversion CTA does appear on a listing page, since it is now functioning as a fallback contact point rather than a duplicate of the Package Detail CTA cluster.

---

## 5. Package Detail Page Wireframe

This is the highest-priority template on the site. The section order below is fixed, per 03-information-architecture.md §7, and must not be reordered, skipped, or supplemented per package.

```
------------------------------------------------
HEADER (shared)
BREADCRUMB: Home / [Category] / [Package Name]
------------------------------------------------
HERO
  Package name
  Destination summary
  [ image / short video ]
------------------------------------------------
PRICE
  ₹XX,XXX per person  (+ Airfare / + GST as applicable)
------------------------------------------------
QUICK FACTS
  Duration | Destinations | Group Type | Departure City
------------------------------------------------
TOUR DATES
  [ Date 1 ]  [ Date 2 ]  [ Date 3 ]
------------------------------------------------
OVERVIEW
  Short scene-setting paragraph
------------------------------------------------
HIGHLIGHTS
  • Highlight 1
  • Highlight 2
  • Highlight 3
------------------------------------------------
ITINERARY
  Day 1  [ expand ]
  Day 2  [ expand ]
  Day 3  [ expand ]
------------------------------------------------
INCLUDED                  |  EXCLUDED
  ✓ Item                  |  ✕ Item
  ✓ Item                  |  ✕ Item
------------------------------------------------
GALLERY
  [ img ] [ img ] [ img ] [ img ]
------------------------------------------------
TESTIMONIALS
  [ Testimonial ] [ Testimonial ]
------------------------------------------------
FAQ
  Q1  Q2  Q3
------------------------------------------------
ENQUIRY / CTA
  [ Enquire Now ]  [ WhatsApp Us ]  [ Call Now ]
  Cancellation & Refund Policy | Terms & Conditions
------------------------------------------------
RELATED PACKAGES
  [ Card ] [ Card ] [ Card ]
------------------------------------------------
FOOTER (shared)
------------------------------------------------
STICKY MOBILE CTA BAR (persistent from post-Hero scroll)
  [ Enquire Now ] [ WhatsApp ] [ Call ]
------------------------------------------------
```

### 5.1 Breadcrumb
**Purpose:** Reinforce the path back to the correct listing, per 03-information-architecture.md §4.7.
**Content:** Home / [Domestic Tours or International Tours] / [Package Name].
**Expected user action:** Optional back-navigation.
**Priority:** Medium. **Recommended size:** Small.

### 5.2 Hero
**Purpose:** Confirm the visitor has landed on the right package and create an immediate emotional hook.
**Content:** Package name, one-line destination summary, one strong image or short video of the actual destination.
**Expected user action:** Continue scrolling.
**Priority:** Critical. **Recommended size:** Large.

### 5.3 Price
**Purpose:** Answer the visitor's first and most urgent question with no scrolling required.
**Content:** Headline per-person price, with qualifiers exactly as stated in source data ("+ Airfare," "+ GST").
**Expected user action:** Continue scrolling with cost context established.
**Priority:** Critical. **Recommended size:** Small.

### 5.4 Quick Facts
**Purpose:** Give a fast structural summary before committing to reading further.
**Content:** Duration, destinations covered, group type suitability, departure city — laid out as a compact horizontal or grid strip, not prose.
**Expected user action:** Confirm basic fit (dates, location) before reading Overview.
**Priority:** Critical. **Recommended size:** Small.

### 5.5 Tour Dates
**Purpose:** Confirm real, bookable departure dates exist.
**Content:** A row of selectable date chips, supporting multiple future departures per package.
**Expected user action:** Select a preferred date (optionally pre-fills the Enquiry section).
**Priority:** High. **Recommended size:** Small.

### 5.6 Overview
**Purpose:** Scene-set the trip in a short, readable paragraph.
**Content:** Two to four sentences describing the experience, not the logistics.
**Expected user action:** Continue reading toward Highlights and Itinerary.
**Priority:** High. **Recommended size:** Small.

### 5.7 Highlights
**Purpose:** Give scanning visitors the standout moments without reading the full itinerary.
**Content:** Four to six bullet points, each a single standout experience.
**Expected user action:** Build interest before committing to the full day-by-day.
**Priority:** High. **Recommended size:** Small to Medium.

### 5.8 Itinerary
**Purpose:** Provide the day-by-day structure serious evaluators need.
**Content:** One row per day, each collapsed by default with a single-level expand (no nested accordions, per 03-information-architecture.md §12).
**Expected user action:** Expand days of interest; skip ahead if not needed.
**Priority:** High. **Recommended size:** Medium to Large (collapsed by default keeps this compact).

### 5.9 Included / Excluded
**Purpose:** Resolve the single most-cited pre-booking hesitation (02-user-personas.md §6).
**Content:** Two structured, scannable lists side by side on desktop, stacked on mobile — Included first, then Excluded, per 03-information-architecture.md §12.
**Expected user action:** Confirm total cost expectations before proceeding.
**Priority:** Critical. **Recommended size:** Medium.

### 5.10 Gallery
**Purpose:** Provide destination-specific visual proof.
**Content:** A grid of four to eight images specific to this package's actual destinations.
**Expected user action:** Build emotional commitment.
**Priority:** Medium. **Recommended size:** Medium.

### 5.11 Testimonials
**Purpose:** Provide social proof relevant to this specific package or destination type.
**Content:** Two to three testimonials, falling back to general testimonials if none are package-specific.
**Expected user action:** Resolve remaining hesitation before the Enquiry section.
**Priority:** Medium. **Recommended size:** Small to Medium.

### 5.12 FAQ
**Purpose:** Resolve package-specific objections without requiring a call.
**Content:** Three to five accordion questions, package- or destination-specific where applicable.
**Expected user action:** Self-resolve doubt before enquiring.
**Priority:** Medium. **Recommended size:** Small to Medium.

### 5.13 Enquiry / CTA Section
**Purpose:** The primary conversion point of the entire site.
**Content:** All three CTAs at equal visual weight, plus direct links to Cancellation & Refund Policy and Terms & Conditions immediately beside them, per 03-information-architecture.md §11.
**Expected user action:** Book Now, message on WhatsApp, or call.
**Priority:** Critical. **Recommended size:** Medium.

### 5.14 Related Packages
**Purpose:** Catch visitors who are not ready to convert on this specific package.
**Content:** Three to four cards from the same category (Domestic or International), same card layout as listing pages.
**Expected user action:** Continue browsing rather than leaving the site.
**Priority:** High. **Recommended size:** Medium.

### 5.15 Sticky Mobile CTA Bar
**Purpose:** Keep conversion always accessible without requiring the visitor to scroll back to the Enquiry section.
**Content:** Compact versions of all three CTAs, pinned to the bottom of the mobile viewport, active from the point the visitor scrolls past the Hero.
**Expected user action:** Convert at any point in the scroll journey.
**Priority:** Critical. **Recommended size:** Small (fixed, does not scroll with content).

---

## 6. About Page Wireframe

```
------------------------------------------------
HEADER (shared)
------------------------------------------------
HERO
  "Since 1979" + short mission statement
------------------------------------------------
COMPANY STORY
------------------------------------------------
TIMELINE
  1979 ── ── ── ── Today
------------------------------------------------
MISSION
------------------------------------------------
VALUES
  [ tile ] [ tile ] [ tile ] [ tile ]
------------------------------------------------
WHY CHOOSE US
------------------------------------------------
TOUR MANAGERS
  [ profile ] [ profile ]
------------------------------------------------
ACHIEVEMENTS
  47 years | XX,XXX travellers | XX destinations
------------------------------------------------
CTA
  [ Enquire Now ] [ WhatsApp Us ] [ Call Now ]
------------------------------------------------
FOOTER (shared)
------------------------------------------------
```

**Hero:** "Since 1979" mark and a one-line mission statement, no large product CTA here — this section's job is credibility, not conversion.

**Company Story:** The Nagpur origin narrative, told in short paragraphs, not a single dense block.

**Timeline:** A horizontal (desktop) or vertical (mobile) timeline marking founding year and key milestones, giving the "since 1979" claim visual proof rather than just text.

**Mission:** A short standalone statement, visually distinct from Company Story so it can be scanned independently.

**Values:** Four to six value tiles matching 01-brand-strategy.md §5, each a short label and one-line explanation — never long paragraphs.

**Why Choose Us:** A scannable recap of the core differentiators (Tour Manager, transparent pricing, since 1979) — intentionally similar in structure to the homepage's Why Sangam Tours section, since a visitor may land on either page first.

**Tour Managers:** Optional short profile cards if photography/bios are available; otherwise a single section reinforcing that every departure includes a dedicated, trained Tour Manager.

**Achievements:** A row of large numerals with short labels (years in operation, travellers served, destinations covered) — factual, not decorative.

**CTA:** All three CTAs, equal weight, closing the page.

---

## 7. Gallery Page Wireframe

```
------------------------------------------------
HEADER (shared)
------------------------------------------------
HERO
  Page title
------------------------------------------------
FILTER (optional, by destination/package)
------------------------------------------------
IMAGE GRID
  [ ] [ ] [ ]
  [ ] [ ] [ ]
  [ ] [ ] [ ]
------------------------------------------------
VIDEO SECTION (if applicable)
------------------------------------------------
CTA
  [ Enquire Now ] [ WhatsApp Us ] [ Call Now ]
------------------------------------------------
FOOTER (shared)
------------------------------------------------
```

**Hero:** Short title only, no large imagery here since the grid below is the content itself.

**Filter (optional):** A single-row filter by destination or package, only included if the image library is large enough to warrant it; omitted entirely if the gallery is small enough to browse directly.

**Image Grid:** A uniform masonry or fixed-ratio grid of real destination photography, tagged where possible to a specific package (supporting the internal linking rule in 03-information-architecture.md §11).

**Lightbox behaviour:** Tapping any image opens a full-screen lightbox with swipe/arrow navigation between images and a visible close control; the underlying grid remains scrolled to the same position when the lightbox is closed.

**Video section (if applicable):** A secondary block below the image grid for short destination or testimonial video clips, using the same grid rhythm as the image grid above it.

**CTA:** All three CTAs, closing the page — Gallery is a visually persuasive page and should not end without a conversion opportunity.

---

## 8. Testimonials Page Wireframe

```
------------------------------------------------
HEADER (shared)
------------------------------------------------
HERO
  Page title + short framing line
------------------------------------------------
FEATURED REVIEWS
  [ large card ] [ large card ]
------------------------------------------------
ALL REVIEWS
  [ card ] [ card ] [ card ]
  [ card ] [ card ] [ card ]
------------------------------------------------
VIDEO TESTIMONIALS (optional)
------------------------------------------------
CTA
  [Enquire Now ] [ WhatsApp Us ] [ Call Now ]
------------------------------------------------
FOOTER (shared)
------------------------------------------------
```

**Hero:** Page title with a short line framing the page as real traveller experiences, not marketing copy.

**Featured Reviews:** Two to three larger-format reviews, ideally representing distinct personas (family, senior, solo), each with name, city, and package travelled.

**All Reviews:** A denser grid of remaining testimonials, using the same card format as the Featured Reviews but smaller, so the page remains scannable rather than a long scroll of uniform text blocks.

**Video Testimonials (optional):** If video reviews exist, a distinct row below the text reviews, clearly separated so text and video content aren't visually merged.

**CTA:** All three CTAs, closing the page.

---

## 9. FAQ Page Wireframe

```
------------------------------------------------
HEADER (shared)
------------------------------------------------
HERO
  Page title
------------------------------------------------
SEARCH (if needed)
------------------------------------------------
FAQ CATEGORIES
  [ Booking ] [ Pricing ] [ Travel ] [ Policies ]
------------------------------------------------
ACCORDION LAYOUT
  Q1  [ + ]
  Q2  [ + ]
  Q3  [ + ]
------------------------------------------------
CTA
  [ WhatsApp Us ] [ Contact ]
------------------------------------------------
FOOTER (shared)
------------------------------------------------
```

**Hero:** Page title only.

**Search (if needed):** Given the site explicitly avoids a global search feature (03-information-architecture.md §4.6), an in-page FAQ search is optional and should only be included if the FAQ list grows large enough (roughly 20+ questions) to make scanning categories alone impractical; below that threshold, category grouping is sufficient.

**FAQ Categories:** A row of category filter chips (Booking, Pricing, Travel, Policies) that filter the accordion list below without navigating away from the page.

**Accordion Layout:** A single-level accordion list (no nested accordions, per 03-information-architecture.md §12), one question per row, collapsed by default.

**CTA:** WhatsApp Us as primary, with a secondary link to Contact for visitors whose question remains unanswered — matching the FAQ page's role in 03-information-architecture.md §5 and its onward link in §11.

---

## 10. Contact Page Wireframe

```
------------------------------------------------
HEADER (shared)
------------------------------------------------
HERO
  Page title + short reassurance line
------------------------------------------------
CONTACT CARDS
  [ Call ] [ WhatsApp ] [ Email ]
------------------------------------------------
OFFICE INFORMATION
  Nagpur Office              Akola Office
  [ address / hours ]        [ pending confirmation ]
------------------------------------------------
GOOGLE MAP
  [ embedded map ]
------------------------------------------------
ENQUIRY FORM
  Name, Mobile, Email, City, Package,
  Travellers, Date, Message
------------------------------------------------
BUSINESS HOURS
------------------------------------------------
CTA
  [ Call Now ]
------------------------------------------------
FOOTER (shared)
------------------------------------------------
```

**Hero:** Page title with a one-line reassurance ("We're just a call or message away").

**Contact Cards:** Three equal-weight tappable cards — Call, WhatsApp, Email — each with the direct contact detail visible, not hidden behind another tap.

**Office Information:** Nagpur office address and hours shown in full; the Akola office section is present in layout but must display a clear "address to be confirmed" placeholder rather than fabricated details, per 01-brand-strategy.md §7 and §17, rule 12, until the client confirms it.

**Google Maps:** A single embedded map for the confirmed Nagpur office; the Akola map pin is added once available, following the same placeholder rule above.

**Enquiry Form:** The same eight fields defined in 01-brand-strategy.md §17, rule 11 — Name, Mobile Number, Email, City, Package Interested In, Number of Travellers, Preferred Travel Date, Message — laid out in logical groups (identity fields, then trip fields, then message) rather than one long undifferentiated list.

**Business Hours:** A short, plainly stated block (days and times), placed near the Contact Cards and Office Information so seniors calling directly know when someone will answer.

**CTA:** Call Now as the lead CTA on this page specifically, per 03-information-architecture.md §5 and §10 — visitors reaching Contact directly are more likely to want to speak with someone rather than fill a form.

---

## 11. Legal Pages Wireframe (Terms & Conditions, Privacy Policy, Cancellation & Refund Policy)

Kept intentionally simple, per the brief. All three legal pages share one minimal layout:

```
------------------------------------------------
HEADER (shared)
------------------------------------------------
PAGE TITLE
  Last updated: [date]
------------------------------------------------
BODY CONTENT
  Structured headings and paragraphs
------------------------------------------------
FOOTER (shared)
------------------------------------------------
```

**Page Title:** The full policy name (never abbreviated, per 03-information-architecture.md §9) with a last-updated date beneath it, so visitors can judge currency at a glance.

**Body Content:** Plain structured text with clear subheadings, ordinary paragraph and list formatting — no imagery, no CTA blocks, no sidebar. These pages exist for transparency and are rarely browsed casually (03-information-architecture.md §5), so the layout stays out of the way of the content.

No CTA, breadcrumb, or related-content section is included on these three pages, keeping them distinctly simpler than every other public page.

---

## 12. Responsive Behaviour

**Desktop:** Multi-column layouts become available — Package Grid (§4) and Included/Excluded (§5.9) move from single-column to two-column side-by-side. The header shows the full navigation inline with no hamburger menu. Sticky mobile CTA bar (§5.15) is not shown on desktop, since the Enquiry section and header contact icons are already reachable without the same scroll distance.

**Tablet:** An intermediate state — Package Grid moves to two columns (rather than desktop's three), Included/Excluded may remain stacked or move to two columns depending on available width, and the header may begin collapsing secondary items into a simplified menu before reaching mobile's full hamburger pattern.

**Mobile:** Single-column throughout. All grids (Package Grid, Gallery, testimonial cards) collapse to one column or a horizontally scrollable row. The sticky mobile CTA bar becomes active on Package Detail pages. The header compresses to logo, phone icon, WhatsApp icon, and hamburger menu.

**General rule across breakpoints:** No layout decision available only at desktop width should be required to access core content or CTAs — every essential action (viewing price, inclusions, or reaching a CTA) must be fully available at mobile width without a desktop-only fallback.

---

## 13. Empty / Loading / Error States

**Loading:** Structural placeholders (grey blocks matching the eventual content's shape — image area, two text lines) rather than a blank screen or a single centred spinner with no context. Applies to Package Grid, Gallery, and Testimonials sections.

**No Packages:** Shown on a listing page when a filter combination returns nothing (§4). Centred message, one action to reset filters, no dead end.

**404 (Page Not Found):** Header and footer remain present for continued navigation. Centred message stating the page could not be found, with two recovery actions: return to Homepage and browse Domestic/International Tours.

**500 (Server Error):** Header and footer remain present. Centred message acknowledging a temporary issue, with a WhatsApp Us CTA as a fallback contact method — since a technical failure is exactly the moment a visitor most needs a working alternative to online booking.

**Form Success:** An immediate on-screen confirmation replacing or appearing above the form (not a separate page navigation), stating the enquiry was received and that the team will follow up — directly addressing the "no visible confirmation" pain point in 02-user-personas.md §6.

**Form Failure:** An inline message near the submit action stating the submission did not go through, with the form data preserved (not cleared) and a WhatsApp Us fallback offered alongside the retry option.

---

## 14. AI Wireframing Rules

1. Maintain consistent spacing rhythm across all sections of the same type across all pages.
2. Do not invent new sections beyond those defined in this document for each page type.
3. Preserve the fixed section order defined in §5 for every Package Detail page without exception.
4. Keep the homepage concise — no section may be duplicated or split into two.
5. Reuse the Package Card layout identically across the Homepage, Listing pages, and Related Packages.
6. Avoid unnecessary scrolling — collapse detail-heavy sections (Itinerary, FAQ) by default rather than expanding them and lengthening the page.
7. Trust signals appear before or alongside a CTA, never only after it.
8. One primary action per screen section — do not introduce a second competing CTA within a single section block.
9. Keep the Enquiry Form to exactly the eight fields defined in 01-brand-strategy.md §17, rule 11 — never add or remove fields.
10. Maintain mobile-first layouts as the default design state; desktop and tablet are expansions, not the starting point.
11. Never move Price below Itinerary or Overview on a Package Detail page — Price stays fixed at position 2, per §5.
12. Use one consistent page template per page type — no one-off layout for a specific package, testimonial, or FAQ entry.
13. Keep phone and WhatsApp contact methods visible in the header at all times, never nested inside the hamburger menu alone.
14. Do not overload the Hero section with more than a headline, subheadline, one visual, and one CTA.
15. Never place more than one accordion level of nesting anywhere on the site.
16. Keep Included and Excluded visually paired and adjacent — never separate them with another section in between.
17. Sticky mobile CTA bar must never obstruct or overlap the in-page Enquiry section CTAs — treat them as complementary, not duplicated in the same viewport.
18. Do not fabricate content for incomplete sections (e.g. Akola office address) — use a clearly labelled placeholder instead, per 01-brand-strategy.md §17, rule 12.
19. Legal pages (§11) must remain free of CTAs, imagery, and related-content sections — do not "enhance" them with elements from other page types.
20. Any new page type not defined in 03-information-architecture.md §3 must not be wireframed without an explicit updated requirement.

---

## 15. Key Takeaways

**Homepage philosophy:** A single, ordered scroll from emotional hook to trust to product to social proof to final conversion — every section earns the next scroll rather than assuming it.

**Package page philosophy:** The highest-priority template on the site, built around a fixed, non-negotiable section order that puts price and trust ahead of narrative detail, and never lets a visitor scroll far without a visible path to Book Now, WhatsApp Us, or Call Now.

**Layout philosophy:** Structured, scannable lists over paragraphs wherever content is inherently listable; single-level disclosure only; mobile as the default design state, not an adaptation.

**Consistency philosophy:** One template per page type, reused without exception — a returning visitor, or a visitor comparing two packages, should never have to relearn how a page works.

**Developer implementation notes:** This document defines layout and content presence only. Section order for Package Detail pages (§5) and Homepage (§3) is fixed per 03-information-architecture.md and must be preserved exactly in build. Visual styling, component structure, and API integration are addressed in subsequent documents and should treat this wireframe as their layout source of truth.