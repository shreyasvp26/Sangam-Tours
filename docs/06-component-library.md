# Sangam Tours — Component Library

**Internal Reference Document | Version 1.0**
**Prepared for:** UI/UX Designers, Frontend Developers, AI Coding Agents (Cursor), and future team members
**Companion to:** 01-brand-strategy.md, 02-user-personas.md, 03-information-architecture.md, 05-design-system.md
**Purpose:** This document answers one question only: **what reusable UI components exist, and how should each behave?** It does not repeat brand voice, personas, site structure, page layouts, or visual styling — those live in the companion documents. This document names the reusable building blocks that the wireframes (04) are assembled from, and defines the behavioural rules the design system (05) must be applied through.

---

## 1. Purpose

A **Component Library** is the finite set of reusable interface pieces — buttons, cards, forms, navigation elements, feedback states — that every page on www.sangamtours.com is assembled from. It is the bridge between design intention and build reality: once a component is defined here, it is built once and reused everywhere it appears, rather than recreated per page.

This document differs from the two documents closest to it:

**Wireframes (04)** define *what appears on each page and in what order* — the Package Detail page, for example, is a fixed sequence of sections. This document does not repeat that sequence; it defines what each recurring block *inside* that sequence actually is, so that "Package Card" or "Enquiry Form" means one specific, consistently behaving thing everywhere it is referenced.

**Design System (05)** defines *how everything looks* — colour, type, spacing, shape, motion. This document does not redefine any of that. It defines *what each component contains, how it varies, and how it behaves* — purpose, content, states, and usage rules — while assuming the visual treatment from 05 is applied uniformly underneath.

In short: Wireframes says where a Package Card sits on a page. Design System says what colour, radius, and shadow a card has. This document says what a Package Card is, what it must contain, and the rules for using it correctly.

---

## 2. Component Inventory

A quick-reference index of every component defined in this document, grouped by category. Each component is documented in full, once, in its corresponding section below.

| Category | Components |
|---|---|
| Navigation | Header, Navigation Menu, Mobile Navigation Drawer, Breadcrumb, Footer, Sticky Mobile CTA Bar |
| CTA | Primary CTA, Secondary CTA, Tertiary CTA, Call Button, WhatsApp Button, Send Enquiry Button, View Package Button |
| Cards | Package Card, Testimonial Card, Gallery Card, Value Card, Contact Card, Feature Card |
| Forms | Text Input, Phone Input, Email Input, Dropdown, Date Picker, Text Area, Checkbox, Submit Button, Enquiry Form |
| Content | Accordion, Section Heading, Badge, Tag, Divider, Quick Facts, Included List, Excluded List, Timeline, Statistics Block |
| Feedback | Loading Skeleton, Empty State, Success Message, Error Message, 404, 500 |
| Media | Hero Image, Gallery Grid, Image Lightbox, Video Card, Logo |

---

## 3. Component Principles

1. **Reusable** — Every component is built once and used identically everywhere it appears, never recreated per page or per package.
2. **Consistent** — The same component always looks, behaves, and communicates the same way, regardless of which page it appears on.
3. **Accessible** — Every component meets the accessibility minimums defined in 05-design-system.md §11 by default, not as an exception applied later.
4. **Predictable** — A returning visitor should never have to relearn how a component works from one page to the next.
5. **Composable** — Components combine to form sections and pages without needing custom, one-off variants.
6. **Minimal Variants** — Each component supports the smallest number of variants that genuinely serves the site's needs; variants are not created speculatively.
7. **Content-First** — A component's structure is dictated by the content it needs to carry, never the reverse.
8. **Single Responsibility** — Each component does one job. A Package Card surfaces a package; it does not also try to capture an enquiry.
9. **Responsive by Default** — Every component is designed to behave correctly at mobile, tablet, and desktop widths as a single definition, not as separate mobile and desktop versions.
10. **State-Driven** — Every interactive component has explicitly defined states (§10); no component is left with only a default appearance and an assumed hover.
11. **Trust-Forward** — Where a component can carry a trust signal (a Tour Manager mention, a "Since 1979" mark, a transparent price) without diluting its primary purpose, it should.
12. **Non-Manipulative** — No component may imply urgency or scarcity that isn't factually true, per 01-brand-strategy.md §11 (Design Principles) and §17 (AI Design Rules).
13. **Equal-Weight Where Required** — The three core CTAs (Book Now, WhatsApp Us, Call Now) carry equal visual and structural weight wherever they appear together; no component may treat one as more prominent than the others.
14. **Self-Contained** — A component should make sense and function correctly on its own, without depending on knowledge of the page around it.
15. **Named Once, Referenced Everywhere** — Every component in this document has exactly one name. That name is used consistently in wireframes, design files, and code; no component is referred to by two different names in two different places.

---

## 3. Navigation Components

### Header
**Purpose:** Persistent orientation and always-available contact access on every page.
**Content:** Logo, up to six primary navigation items, phone icon, WhatsApp icon, hamburger control on mobile.
**Variants:** Desktop (full navigation inline), Mobile (logo, phone icon, WhatsApp icon, hamburger only).
**States:** Default, Scrolled (compressed height, still fully visible — never hidden on scroll).
**Usage Rules:** Appears identically on every public page. Phone and WhatsApp icons remain visible at all times, never nested inside the hamburger menu. Never grows beyond six primary items.

### Navigation Menu
**Purpose:** The set of primary links contained within the Header, expressed inline on desktop and inside the Mobile Navigation Drawer on mobile.
**Content:** Home, Domestic Tours, International Tours, Gallery, About, Contact.
**Variants:** Inline (desktop/tablet), Drawer-embedded (mobile).
**States:** Default, Active (current page indicated), Focus (keyboard navigation).
**Usage Rules:** Labels are fixed and literal; no clever renaming of any item. Order is fixed and must not be rearranged per page.

### Mobile Navigation Drawer
**Purpose:** Houses the full navigation set on mobile, including two items intentionally excluded from the compact header: Testimonials and FAQ.
**Content:** All six primary items plus Testimonials and FAQ, each as a single tappable row.
**Variants:** None — one drawer pattern site-wide.
**States:** Closed, Open, Item Focus.
**Usage Rules:** Opens and closes via the Header's hamburger control only. Never nests a second level of menu within it.

### Breadcrumb
**Purpose:** Reinforces the path back to the correct listing page.
**Content:** Home / [Domestic Tours or International Tours] / [Package Name].
**Variants:** None.
**States:** Default, Link Hover/Focus (on the two non-current segments).
**Usage Rules:** Appears only on Package Detail pages. Never used on one-level-deep pages (Home, About, Gallery, Testimonials, Contact, FAQ), where it would add clutter without aiding orientation.

### Footer
**Purpose:** Navigation safety net, legal access, and complete contact details, present on every page.
**Content:** Four fixed columns — Explore, Company, Legal, Reach Us — per 03-information-architecture.md §4.3.
**Variants:** None.
**States:** Default, Link Hover/Focus.
**Usage Rules:** The four-column structure is fixed; no new column is added without an explicit requirement update. Identical on every page.

### Sticky Mobile CTA Bar
**Purpose:** Keeps conversion always reachable on Package Detail pages without requiring a scroll back up.
**Content:** Compact renderings of the three core CTAs — Book Now, WhatsApp Us, Call Now.
**Variants:** Mobile only; not shown on tablet or desktop.
**States:** Hidden (above the Hero), Visible (from the point the visitor scrolls past the Hero).
**Usage Rules:** Present on every Package Detail page. Must never overlap or obstruct the in-page Enquiry/CTA section when both are visible in the same viewport.

---

## 4. CTA Components

### Primary CTA
**Purpose:** The single visual treatment used for the site's highest-priority actions.
**States:** Default, Hover/Focus, Active, Disabled (e.g. while a form submits), Loading.
**Placement Rules:** Reserved for Book Now, and for the Domestic/International Split and Final CTA Band actions where a single primary action is called for.
**Usage Guidelines:** Never duplicated with conflicting copy on the same screen; one Primary CTA per section.

### Secondary CTA
**Purpose:** A visually distinct but equally legitimate action, used where a page needs a second-tier action alongside a Primary CTA (e.g. "View Package" beside "WhatsApp Us" on a listing card context, or navigational actions like "View Domestic Tours").
**States:** Default, Hover/Focus, Active, Disabled.
**Placement Rules:** Never used for Book Now, WhatsApp Us, or Call Now when those three appear together — that trio always uses the equal-weight CTA Cluster (below), not a Primary/Secondary hierarchy.
**Usage Guidelines:** Used for navigational actions ("View Gallery," "View All Testimonials," "View All FAQs") that move a visitor toward — but are not themselves — a conversion.

### Tertiary CTA
**Purpose:** The lowest-emphasis actionable link, used for supporting actions that should not compete visually with any CTA above it (e.g. "Clear Filters," "Read More").
**States:** Default, Hover/Focus, Active.
**Placement Rules:** Never used for any of the three core conversion actions.
**Usage Guidelines:** Reserved for low-stakes, reversible actions only.

### Call Button
**Purpose:** Initiates a direct phone call via the visitor's native dialer.
**States:** Default, Hover/Focus, Active.
**Placement Rules:** Appears in the Header (icon form), the CTA Cluster on Package Detail and other pages, the Contact Cards, and the Sticky Mobile CTA Bar.
**Usage Guidelines:** Label is fixed as "Call Now" wherever text-labelled; never rephrased.

### WhatsApp Button
**Purpose:** Opens a WhatsApp chat, ideally pre-filled with a reference to the relevant package.
**States:** Default, Hover/Focus, Active.
**Placement Rules:** Appears in the Header (icon form), the CTA Cluster, the Final CTA Band, the Contact Cards, and as the fallback CTA in Empty/No Results and Error states.
**Usage Guidelines:** Label is fixed as "WhatsApp Us" wherever text-labelled; never rephrased (e.g. never "Chat With Us").

### Send Enquiry Button
**Purpose:** Submits the Enquiry Form.
**States:** Default, Hover/Focus, Active, Disabled (until required fields are valid), Loading (during submission), Success, Error.
**Placement Rules:** Appears only within the Enquiry Form component.
**Usage Guidelines:** Never enabled until the form's required fields, per §6, are satisfied.

### View Package Button
**Purpose:** Moves a visitor from a Package Card to the full Package Detail page.
**States:** Default, Hover/Focus, Active.
**Placement Rules:** The single CTA carried by every Package Card on listing pages, the homepage Featured Packages section, and the Related Packages section.
**Usage Guidelines:** Never accompanied by Book Now, WhatsApp Us, or Call Now on the same card — those three are reserved for the Package Detail page itself.

---

## 5. Card Components

### Package Card
**Purpose:** Surfaces a single tour package as a scannable, comparable unit.
**Required Content:** Destination image, package name, duration, starting price, next departure date, one View Package Button.
**Optional Content:** A short destination tag (e.g. "Hill Station," "Pilgrimage") where filtering by type is active.
**Variants:** None — one layout regardless of category, domestic or international.
**Interaction:** Tapping/clicking anywhere on the card (not only the button) opens the Package Detail page.
**Usage Rules:** Used identically on the Homepage (Featured Packages), Domestic Tours listing, International Tours listing, and Related Packages. Never redesigned per instance or per package.

### Testimonial Card
**Purpose:** Presents a single piece of social proof.
**Required Content:** Reviewer name, city, short quote.
**Optional Content:** Package or destination travelled, persona indicator (family, senior, solo, couple), photo.
**Variants:** Compact (Homepage Testimonials Highlight, Package Detail Testimonials section), Featured (larger format on the Testimonials page).
**Interaction:** Static; not tappable unless linking to a full review on the Testimonials page.
**Usage Rules:** Content is never fabricated; only real testimonials supplied by the client are used, per 01-brand-strategy.md §17, rule 12.

### Gallery Card
**Purpose:** Represents a single image or short video within a grid, opening the Image Lightbox on interaction.
**Required Content:** One destination image or video thumbnail.
**Optional Content:** A destination or package tag, used to support internal linking back to the relevant Package Detail page.
**Variants:** Image, Video (visually indicated with a play affordance).
**Interaction:** Tapping opens the Image Lightbox at that item's position in the set.
**Usage Rules:** Used identically across the Homepage Gallery Preview, the full Gallery page grid, and any package-specific gallery section.

### Value Card
**Purpose:** Communicates a single brand differentiator as a scannable tile.
**Required Content:** Icon, short label, one-line explanation.
**Optional Content:** None — kept deliberately minimal.
**Variants:** None.
**Interaction:** Static, informational only.
**Usage Rules:** Used in the Homepage "Why Sangam Tours" section and the About page "Values" section. Content maps directly to the core values defined in 01-brand-strategy.md §5; never invents a new value not defined there.

### Contact Card
**Purpose:** Presents one direct contact channel as an immediately actionable, tappable block.
**Required Content:** Channel label (Call, WhatsApp, Email), the direct contact detail itself, visible without a further tap.
**Optional Content:** None.
**Variants:** Call, WhatsApp, Email — three instances of the same underlying card.
**Interaction:** Tapping initiates the relevant action (dialer, WhatsApp chat, email client).
**Usage Rules:** All three Contact Cards on the Contact page carry equal visual weight; none is emphasised over the others in this context, distinct from the CTA Cluster's page-specific lead CTA (§4).

### Feature Card
**Purpose:** A general-purpose card for presenting a single feature, achievement, or credential where Value Card's format is too minimal (e.g. Tour Manager profiles, achievement statistics).
**Required Content:** A primary figure or heading, a short supporting line.
**Optional Content:** An image or icon.
**Variants:** Statistic (large numeral + label, used in Achievements), Profile (photo + name + short bio, used for Tour Managers).
**Interaction:** Static, informational only.
**Usage Rules:** Reserved for the About page; not used elsewhere unless a future page introduces an equivalent need.

---

## 6. Form Components

**Validation Philosophy:** Validation is immediate, plain-language, and never punitive. Errors are communicated through both colour and text, positioned directly beside the relevant field, per 05-design-system.md §11. No field is validated in a way that requires the visitor to guess what went wrong.

### Text Input
**Purpose:** Captures short free-text values (Name, City).
**Required Fields Using This:** Name, City.
**Optional Fields Using This:** None.
**States:** Default, Focus, Filled, Error, Disabled.

### Phone Input
**Purpose:** Captures a mobile number with basic format validation.
**Required Fields Using This:** Mobile Number.
**States:** Default, Focus, Filled, Error, Disabled.

### Email Input
**Purpose:** Captures an email address with format validation.
**Required Fields Using This:** Email.
**States:** Default, Focus, Filled, Error, Disabled.

### Dropdown
**Purpose:** Captures a selection from a fixed set of options.
**Required Fields Using This:** Package Interested In, Number of Travellers.
**States:** Default, Open, Selected, Focus, Error, Disabled.

### Date Picker
**Purpose:** Captures a preferred travel date, ideally constrained to the package's actual available departure dates where the enquiry originates from a specific Package Detail page.
**Required Fields Using This:** Preferred Travel Date.
**States:** Default, Open, Selected, Focus, Error, Disabled.

### Text Area
**Purpose:** Captures a longer free-text message.
**Optional Fields Using This:** Message.
**States:** Default, Focus, Filled, Error, Disabled.

### Checkbox
**Purpose:** Reserved for any explicit consent or acknowledgment requirement (e.g. acknowledging the Terms & Conditions), should one be introduced.
**States:** Unchecked, Checked, Focus, Error, Disabled.
**Usage Rules:** Not part of the current eight-field Enquiry Form; included here only as a defined component should a future requirement introduce one — it must not be added to the form without an explicit updated requirement.

### Submit Button
**Purpose:** The generic submission control used by the Enquiry Form; visually realised as the Send Enquiry Button (§4).
**States:** Default, Disabled, Loading, Success, Error.

### Enquiry Form
**Purpose:** Captures a complete lead for follow-up, the site's highest-value conversion mechanism alongside WhatsApp Us and Call Now.
**Required Fields:** Name, Mobile Number, Email, City, Package Interested In, Number of Travellers, Preferred Travel Date.
**Optional Fields:** Message.
**Field Grouping:** Identity fields (Name, Mobile, Email, City) first, then trip fields (Package, Travellers, Date), then Message last — per 04-wireframes.md §10.
**Success State:** An immediate, visible on-screen confirmation appears in place of or above the form, stating the enquiry was received and that the team will follow up. Never a silent submission.
**Error State:** An inline message near the Submit Button stating the submission did not go through; form data is preserved, not cleared; a WhatsApp Us fallback is offered alongside the retry option.
**Loading State:** The Submit Button shows a Loading state and all fields become temporarily read-only, preventing duplicate submissions.
**Usage Rules:** Exactly these eight fields, always in this grouping, on every instance of the form (Package Detail pages, Contact page). Never fewer, never more.

---

## 7. Content Components

### Accordion
**Purpose:** Discloses detail (an itinerary day, an FAQ answer) without permanently consuming page space.
**States:** Collapsed (default), Expanded, Focus.
**Usage Rules:** Single-level disclosure only — an Accordion item never contains a nested Accordion, per 03-information-architecture.md §12 and 04-wireframes.md §14.

### Section Heading
**Purpose:** Labels a page section consistently.
**Content:** A short heading, occasionally paired with a one-line supporting subheading.
**Usage Rules:** Same visual and structural treatment wherever a new page section begins; not reformatted per page.

### Badge
**Purpose:** A small, fixed-purpose marker communicating a factual status (e.g. "Since 1979," "Confirmed Departure").
**States:** Default only — Badges are not interactive.
**Usage Rules:** Never used to manufacture urgency (e.g. "Only 2 Seats Left"), per 01-brand-strategy.md §15.

### Tag
**Purpose:** A small label used for categorisation (e.g. destination type on a Package Card or Gallery Card, or a filter chip on a listing page).
**States:** Default, Selected (when used as a filter), Focus.
**Usage Rules:** Distinct from Badge — a Tag categorises content; a Badge asserts a trust fact. The two are never visually interchangeable.

### Divider
**Purpose:** A thin visual break used only where spacing alone cannot achieve a needed separation.
**Usage Rules:** Used sparingly, per 05-design-system.md §9; never a substitute for correct spacing rhythm.

### Quick Facts
**Purpose:** A compact, scannable strip summarising a package's essentials.
**Content:** Duration, destinations covered, group type suitability, departure city.
**Usage Rules:** Always rendered as a structured strip or grid, never as prose. Appears immediately below Price on every Package Detail page.

### Included List
**Purpose:** Structured, scannable presentation of everything a package's price covers.
**Content:** One row per included item, each paired with a confirmation icon.
**Usage Rules:** Always paired with and placed immediately beside (desktop) or directly above (mobile) the Excluded List — the two are never separated by another section, per 04-wireframes.md §14.

### Excluded List
**Purpose:** Structured, scannable presentation of everything a package's price does not cover.
**Content:** One row per excluded item, each paired with an exclusion icon.
**Usage Rules:** Same pairing rule as Included List above. Colour alone is never used to distinguish the two lists — icon and label are always both present, per 05-design-system.md §12.

### Timeline
**Purpose:** Gives the "Since 1979" claim visual, chronological proof.
**Content:** Founding year through to the present, marked with key milestones where available.
**Variants:** Horizontal (desktop), Vertical (mobile).
**Usage Rules:** Used only on the About page.

### Statistics Block
**Purpose:** Presents factual achievement figures (years in operation, travellers served, destinations covered) as large, legible numerals with short labels.
**Usage Rules:** Figures are factual only, sourced from confirmed data; never estimated or invented figures.

---

## 8. Feedback Components

### Loading Skeleton
**Purpose:** Communicates that content is loading without a blank screen or an unexplained spinner.
**Content:** Structural placeholder blocks matching the eventual content's shape (e.g. an image-area block plus two text-line blocks for a Package Card).
**Usage Rules:** Used for Package Grid, Gallery, and Testimonials while data loads.

### Empty State
**Purpose:** Explains a genuinely empty result (e.g. a filter combination returning zero packages).
**Content:** A centred message and one clear action to resolve it (e.g. reset filters).
**Usage Rules:** Never a blank area with no explanation.

### Success Message
**Purpose:** Confirms a completed action, most commonly a form submission.
**Content:** A short, plain statement of what happened and what happens next.
**Usage Rules:** Appears immediately, in place of or above the triggering component — never as a separate page navigation.

### Error Message
**Purpose:** Communicates that something did not complete as expected.
**Content:** A short, calm explanation and a clear next step (retry, or a WhatsApp Us fallback).
**Usage Rules:** Tone remains reassuring, never alarming, consistent with the brand's non-manipulative positioning.

### 404
**Purpose:** Handles a request for a page that does not exist.
**Content:** Header and Footer remain present; a centred message; two recovery actions — return to Homepage, browse Domestic/International Tours.

### 500
**Purpose:** Handles a temporary system failure gracefully.
**Content:** Header and Footer remain present; a centred, calm message; a WhatsApp Us Button as a fallback contact method, since a technical failure is exactly when a visitor most needs a working alternative.

---

## 9. Media Components

### Hero Image
**Purpose:** The large, primary visual anchoring the Homepage Hero and each Package Detail page Hero.
**Content:** One strong, real destination image or short video.
**Usage Rules:** Real photography only, per 05-design-system.md §7; never generic stock imagery.

### Gallery Grid
**Purpose:** Presents a set of Gallery Cards in a uniform, scannable arrangement.
**Usage Rules:** Same grid rhythm used on the Homepage Gallery Preview, the full Gallery page, and any package-specific gallery section.

### Image Lightbox
**Purpose:** Presents a single image or video full-screen with navigation between adjacent items.
**States:** Closed, Open, Navigating (swipe/arrow between items).
**Usage Rules:** Always includes a visible close control; the underlying Gallery Grid remains scrolled to its prior position when closed.

### Video Card
**Purpose:** Represents a short destination or testimonial video clip within a grid.
**Content:** Thumbnail with a play affordance.
**Usage Rules:** Never autoplays; requires an explicit tap to begin playback, per 02-user-personas.md §12 (bandwidth consideration for slow connections).

### Logo
**Purpose:** Brand identification, present in the Header and Footer on every page.
**Variants:** Full colour lockup (Header, Footer), icon-only mark (favicon, compact mobile contexts).
**Usage Rules:** Never stretched, recoloured, or modified outside the variants defined in 01-brand-strategy.md.

---

## 10. Component States

Every interactive component in this library is defined, at minimum, against the following common states. Not every state applies to every component — a Badge, for example, has no Hover state — but where a state does apply, it must be explicitly designed rather than left to a default browser or framework behaviour.

- **Default** — The component's resting appearance.
- **Hover** — A visitor's cursor is positioned over the component (desktop/tablet with pointer input).
- **Focus** — The component has keyboard focus, always visibly indicated.
- **Active** — The component is being pressed or clicked at that instant.
- **Selected** — The component represents a chosen option (a filter Tag, a Dropdown value, a Tour Date chip).
- **Disabled** — The component is present but not currently actionable (e.g. Submit Button before required fields are valid).
- **Loading** — The component is processing an action and communicates this without freezing or appearing broken.
- **Success** — The component confirms a completed action.
- **Error** — The component communicates that something did not complete as expected.
- **Hidden** — The component is not currently rendered but exists in the system (e.g. Sticky Mobile CTA Bar above the Hero, Mobile Navigation Drawer when closed).

---

## 11. AI Component Rules

1. Do not invent new button variants beyond Primary CTA, Secondary CTA, Tertiary CTA, and the named CTA components in §4.
2. Never create a one-off card layout for a specific package, testimonial, or gallery image — reuse Package Card, Testimonial Card, or Gallery Card.
3. Never duplicate a component under a new name; if a need resembles an existing component, extend that component's variants rather than creating a parallel one.
4. Maintain accessibility as a default property of every component, not an added consideration late in build.
5. Give each component exactly one responsibility; do not combine a Package Card with form capture, or a CTA Cluster with informational content.
6. Do not mix interaction styles for the same component type — a Package Card is always tap/click-to-navigate, never sometimes a hover-reveal and sometimes not.
7. Keep components composable; a component should never require knowledge of the specific page it sits on to function correctly.
8. Keep component naming consistent with this document exactly — do not introduce synonyms (e.g. "Tour Card" for Package Card) in code, design files, or documentation.
9. Never render Book Now, WhatsApp Us, or Call Now with unequal visual weight when they appear together as the CTA Cluster.
10. Never rename the fixed CTA labels — "Book Now," "WhatsApp Us," "Call Now," "View Package" — with alternate copy.
11. Do not add fields to the Enquiry Form beyond the eight defined in §6.
12. Do not nest a second level inside any Accordion instance, anywhere on the site.
13. Always pair Included List and Excluded List directly adjacent to each other; never separate them with another component.
14. Never fabricate testimonial, gallery, or statistical content — use only supplied, confirmed data; use a placeholder state for anything pending (e.g. Akola office details).
15. Apply Loading Skeleton, Empty State, Error Message, 404, and 500 wherever a component depends on external or admin-managed data — never leave a component to fail silently or blank.
16. Do not introduce urgency- or scarcity-implying variants of any component (e.g. a countdown Badge, a "limited seats" Tag).
17. Reuse the identical Package Card across the Homepage, both listing pages, and Related Packages — never a page-specific variant.
18. Treat every component as mobile-first by default; verify correct behaviour at mobile width before considering tablet or desktop.
19. Do not create a new top-level component category beyond §3–§9 without an explicit updated requirement.
20. When a build decision isn't covered explicitly here, default to the simplest, most consistent option rather than introducing a new pattern.

---

## 12. Key Takeaways

**Consistency:** Every component in this library has exactly one name, one definition, and one set of behavioural rules — applied identically on every page it appears on, from the Homepage to the twelfth Package Detail page.

**Reusability:** The site's apparent complexity — twelve-plus packages, multiple listing views, repeated trust and conversion elements — is built from a small, fixed set of components (fewer than forty), combined differently per page rather than redesigned per page.

**Accessibility:** Every component carries the accessibility minimums defined in 05-design-system.md §11 as a built-in property, particularly given the senior citizen and lower-technical-literacy segments identified in 02-user-personas.md.

**Maintainability:** Because each component is documented once here, adding a new package, updating a testimonial, or extending the gallery through the Admin Dashboard requires no new component design — it simply populates components that already exist, look right, and behave correctly by default.

This document is the component-level foundation for www.sangamtours.com. All frontend implementation should treat the definitions above as fixed unless formally revised.