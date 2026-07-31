# Sangam Tours — Design System

**Internal Reference Document | Version 1.0**
**Prepared for:** UI/UX Designers, Frontend Developers, AI Coding Agents (Cursor), and future team members
**Companion to:** 01-brand-strategy.md, 02-user-personas.md, 03-information-architecture.md, 04-wireframes.md
**Purpose:** This document answers one question only: **what visual language should every page follow?** It does not repeat brand story, personas, site structure, or page content — those live in the companion documents. This is the last document before component-level work begins.

---

## 1. Purpose

A Design System is the shared visual vocabulary that makes a multi-page website look and feel like it was built by one disciplined hand rather than assembled page by page. It fixes color, type, spacing, imagery, iconography, shape, and motion as decisions made once and applied everywhere.

It differs from the documents around it:

**Brand Strategy (01)** defines *why* the site should feel a certain way — archetype, promise, tone of voice. It is the reasoning layer.

**Wireframes (04)** define *what* appears on each page and *in what order* — sections, priority, content. It is the structural layer.

**This Design System (05)** defines *how everything looks* — the visual layer that skins every wireframe consistently.

**Component Library (06, next)** applies these decisions to specific reusable pieces — buttons, cards, forms. This document sets the rules those components must obey; it does not name components itself.

---

## 2. Design Principles

1. **Trust Over Decoration.** Every visual choice builds credibility first, visual interest second.
2. **Clarity Before Creativity.** Familiar, well-worn patterns beat novel ones.
3. **Mobile-First.** Type size, spacing, and touch targets are decided for mobile first, then scaled up.
4. **Consistency Over Novelty.** One color system, one type scale, one spacing scale, applied everywhere.
5. **Accessibility by Default.** Legibility, contrast, and touch-target size are minimums, not aspirations — especially given the senior citizen audience.
6. **Progressive Disclosure.** Detail unfolds through structure (accordions, sections), not by crowding one screen.
7. **Familiar Interactions.** No invented interaction metaphors.
8. **Minimal Cognitive Load.** Every added visual element must earn its place.
9. **Real Photography Over Stock Imagery.** Genuine photography carries the brand's credibility.
10. **Purposeful Whitespace.** Space groups related content, separates unrelated content, and signals a calm, well-run operator.
11. **Evidence Over Adjectives.** Trust is built by showing proof prominently, not by styling claims to look emphatic.
12. **One Visual Idea Per Screen.** Competing focal points dilute attention and conversions.
13. **Restraint in Motion and Ornament.** Used to clarify, never to entertain.
14. **Predictable Repetition.** A pattern designed once repeats identically everywhere it recurs.
15. **Design for the Least Confident User.** Where a choice could go simpler or more elaborate, default to simpler.

---

## 3. Brand Personality in UI

The interface should read as the digital equivalent of a well-run, established family travel office — not a startup, not a discount marketplace, not a luxury concierge.

The site should feel:

- **Professional** — deliberately built and cared for, never improvised.
- **Warm** — friendly and human, never transactional.
- **Trustworthy** — credibility is visible before it is claimed.
- **Calm** — nothing competes for attention unnecessarily.
- **Premium, Not Exclusive** — well-made and comfortable, without implying high-end pricing.
- **Welcoming** — approachable to a first-time visitor of any age.
- **Reliable** — consistent behavior across every page.

The interface should avoid feeling:

- **Flashy** — no element exists purely to impress.
- **Corporate-Cold** — avoid a sterile, faceless B2B look; this is a family-run, community-known business.
- **Overly Playful** — avoid bright, cartoonish, gamified treatments; the audience skews toward families and seniors seeking reassurance, not novelty.

Per 01-brand-strategy.md §5, the interface should lean **70% Trust, 30% Adventure** — a steady, reassuring baseline visual language, with imagery and select accent moments carrying the sense of discovery.

---

## 4. Color System

The palette is fixed by the existing brand identity and must not be altered or supplemented.

### 4.1 Brand Colors

| Color | Hex | Role |
|---|---|---|
| **Primary Navy Blue** | `#09235C` | Primary headings, header/footer, primary text on light backgrounds, strong trust-forward moments. |
| **Secondary Royal Blue** | `#2E3190` | Secondary emphasis — section backgrounds, secondary headings, hover/active states of navy elements. |
| **Accent Green** | `#91C44D` | The single accent color: primary CTAs, active/selected states, "included"/confirmation indicators. Never used decoratively — only where it means "go," "yes," or "act here." |
| **White** | `#FFFFFF` | The dominant background color, signaling openness and the "breathable" spacing the brand calls for. |

### 4.2 Neutral Scale

A supporting cool-grey scale (faint blue undertone, to harmonize with the brand blues) handles text, borders, and surfaces that are neither brand color nor pure white:

| Step | Role |
|---|---|
| Neutral 100 (lightest) | Subtle section/card backgrounds distinct from white |
| Neutral 200 | Borders, dividers, input outlines |
| Neutral 300 | Disabled states, placeholder text |
| Neutral 500 | Secondary/supporting body text |
| Neutral 700 | Primary body text where full Navy is too heavy for long paragraphs |
| Neutral 900 (darkest) | Rare near-black use only where Navy itself is too saturated |

### 4.3 Functional Colors

Kept visually distinct from the Accent Green so "included" and "act now" are never confused.

| Function | Hex | Guidance |
|---|---|---|
| **Success** | `#2E7D32` | Distinct from but harmonious with Accent Green — confirmations, positive states. |
| **Warning** | `#F59E0B` | Used sparingly (e.g., "Akola office pending confirmation"); never to manufacture urgency. |
| **Error** | `#D32F2F` | Genuine form/system errors only, kept calm rather than alarming. |
| **Information** | `#0284C7` | Distinct from both brand blues — informational notices (e.g., "prices may vary due to airfare"). |

These values are fixed defaults, not suggestions — they remove the ambiguity of leaving "a muted amber" or "a harmonious green" open to individual interpretation. Any future adjustment to a functional color must be made here, in this document, not improvised at the component or code level.

### 4.4 Background, Surface & Text

- **Primary Background:** White, the default canvas for nearly every page.
- **Section Background:** Neutral 100 or a light Royal Blue tint — separates alternating sections without adding a new color.
- **Surfaces (Cards/Panels):** White or Neutral 100, always with a visible boundary (border or shadow, §9).
- **Primary Text:** Navy or Neutral 900 for headings; Neutral 700 for body — never pure black.
- **Secondary Text:** Neutral 500 for captions and metadata.
- **Text on Dark Backgrounds:** White or a very light neutral, used only on intentional Navy/Royal Blue sections.

### 4.5 Usage Rules

- Accent Green signals action or inclusion — never decoration.
- Never use color alone to convey meaning; always pair with a label or icon (02-user-personas.md §12).
- Navy and Royal Blue may both serve structural roles but should not compete as dominant colors within one section.
- No color outside this system may be introduced without updating this document.

---

## 5. Typography System

### 5.1 Typefaces

| Use | Typeface | Rationale |
|---|---|---|
| **Logo / Wordmark** | Bebas Neue | Reserved exclusively for the logo, per existing brand identity. |
| **All Website Text** | Poppins | The single website typeface across every heading, body, and UI text — geometric, rounded, modern, and legible for the senior citizen segment. |

Only one website typeface is used; a second "accent" typeface is deliberately avoided to keep cognitive load low.

### 5.2 Heading Scale

| Level | Role |
|---|---|
| **Display / H1** | Page-defining moments only — homepage hero, package page title. Once per page. |
| **H2** | Major section headings ("Why Sangam Tours," "Featured Packages"). |
| **H3** | Sub-section headings (FAQ questions, testimonial group labels). |
| **H4** | Card titles and small structural labels (package card destination name). |

Each level must be visually distinct enough that hierarchy is legible at a skim.

### 5.3 Body Scale

- **Body Large** — intro paragraphs, hero subheadlines.
- **Body Default** — standard paragraph/list text; must stay comfortably readable on a mid-range phone without zooming.
- **Body Small / Caption** — metadata, fine print, legal text; small but never below accessible legibility.

### 5.4 Font Weights

Limit to three, used consistently by role: **Regular** (body), **Medium/SemiBold** (subheadings, UI labels), **Bold** (primary headings, rare strong emphasis like a price figure).

### 5.5 Line Height & Letter Spacing

- **Headings:** Slightly tighter line height; near-default letter spacing — avoid wide, trendy tracking.
- **Body Text:** Generous line height for comfortable long-form reading, particularly for older readers and small screens.
- **All-Caps:** Short labels only (e.g., "SINCE 1979," a button label) — never full paragraphs.

### 5.6 Text Hierarchy

Hierarchy is established through a consistent combination of size, weight, and color — never size alone.

### 5.7 Reading Width

Body copy (itinerary descriptions, About Us, legal pages) is constrained to a comfortable reading width rather than stretching edge-to-edge on wide screens.

---

## 6. Spacing & Layout System

The entire layout follows an 8-point spacing system: all spacing values should be multiples of 8 wherever practical (8, 16, 24, 32, 40, 48, 64, 80...). This gives designers, developers, and Cursor a shared, predictable rhythm without dictating implementation.

**Grid Philosophy:** One consistent grid across all pages — single column on mobile, expanding to a defined multi-column grid on tablet/desktop, per 04-wireframes.md §12. Package Grid, Gallery Grid, and Testimonial Grid share the same underlying logic.

**Whitespace Philosophy:** Generous and deliberate, per 01-brand-strategy.md §15. Cramped spacing reads as discount or high-pressure; generous spacing reads as calm and professional.

**Container Widths:** Mobile content spans full width with consistent edge padding. Tablet/desktop content is constrained to a comfortable maximum width, centered on the page.

**Section Spacing:** Largest spacing value sits between major sections, so each reads as a distinct "chapter." A smaller, consistent value relates a heading to its content within a section.

**Internal Spacing:** Cards and panels use identical internal padding across every instance of that component type.

**Visual Rhythm:** A predictable, repeating rhythm of tighter (within-section) and looser (between-section) spacing as the visitor scrolls — never erratic.

**Layout Density:** Moderate-to-spacious throughout, even in information-heavy sections like Included/Not Included — never dense or table-like, per 01-brand-strategy.md §15.

---

## 7. Imagery Guidelines

**Destination Photography:** Real, high-resolution photography of the actual destinations in Sangam Tours' packages — never generic stock imagery of a similar-looking place. Bright, clear, well-composed, and consistent in color treatment across the site.

**People Photography:** Reflects the brand's actual mixed-age, mixed-configuration audience — families, seniors, couples, friend groups, corporate groups (01-brand-strategy.md §5; 02-user-personas.md §13). Avoid a single traveller archetype dominating, overly staged stock-style shots, and AI-generated or AI-looking faces.

**Tour Images:** Prefer genuine photography from actual past departures over substitutes. Images should reinforce on-ground care — Tour Manager presence, comfortable transport, group cohesion — not just scenery.

**Consistent Treatment:** Similar brightness, warmth, and contrast across all photography, regardless of source, so the site feels cohesive rather than patchwork.

**Icons vs. Illustrations:** Real photography for anything destination- or people-related. Icons are for functional/wayfinding/inclusion purposes only. Illustrations are used sparingly, if at all, and never substitute for real imagery.

**Avoid:** Stock-looking photography, AI-generated or AI-looking faces, low-resolution or heavily compressed media, and imagery skewed toward a single demographic.

---

## 8. Iconography

**Icon Style:** One consistent icon family site-wide, simple and legible at small sizes.

**Stroke vs. Filled:** Choose one as the default; use the other only for a clearly defined purpose (e.g., filled reserved exclusively for active/selected states). Never mixed interchangeably for the same icon.

**Corner Radius & Weight:** Echoes the shape language in §9 — consistent stroke weight and rounding across every icon.

**Consistency Rules:** The same icon always means the same thing everywhere; sizing follows a small fixed set of sizes; icons are never left ambiguous without an accompanying label, particularly for the less digitally confident segment.

**Usage:** Reserved for utility (phone, WhatsApp, email, location), navigation/wayfinding, inclusion/exclusion indicators (always paired with the word "Included"/"Not Included"), and trust/feature markers. Never used decoratively.

---

## 9. Elevation & Shape

**Border Radius:** One consistent radius system across all surfaces — cards, buttons, form fields, images. Moderately rounded, leaning soft and approachable while staying professional rather than casual. No more than two radius values: one for larger surfaces, one for smaller elements.

**Cards:** Identical shape, radius, and elevation treatment across every instance and page (04-wireframes.md §14, rule 12).

**Shadows:** Subtle — just enough to lift a card from its background, never heavy or dramatic.

**Surface Hierarchy:** A clear, limited hierarchy — page background, section background, card/panel surface, and (rarely) an elevated surface like a modal — distinguished through subtle background or shadow shifts, never strong color breaks.

**Dividers:** Thin, light-neutral lines, used sparingly, only where spacing alone cannot achieve a needed break.

**Rounded vs. Sharp:** The system leans rounded throughout, consistent with the brand's warm personality; sharp, unrounded edges do not appear.

---

## 10. Motion Principles

Motion is minimal and strictly purposeful (01-brand-strategy.md §17, rule 5). This section is philosophy only; specifics belong to later documents.

- **Motion Supports Understanding** — only ever clarifies a state change, never exists for flair.
- **Never Distract From Conversion** — no animation may delay or obscure price, inclusions, or the three core CTAs.
- **Fast but Smooth** — quick and responsive, never perceptible as lag.
- **Reduce Unnecessary Movement** — default to none; add only where an interaction genuinely benefits (an accordion, a loading state).
- **Respect Reduced-Motion Preferences** — visitors with a system-level preference receive minimized or removed animation.
- **No Motion as a Trust Signal** — never used to imply urgency or scarcity, per the brand's rejection of manipulative tactics.

---

## 11. Accessibility

Treated as a first-class requirement, not a final-pass checklist item (01-brand-strategy.md §17, rule 8; 02-user-personas.md §12).

- **Color Contrast:** All text-to-background combinations must remain comfortably readable; never place body text directly on Accent Green without verifying contrast.
- **Touch Targets:** Every interactive element sized for accurate one-thumb tapping, accounting for reduced dexterity in the older segment.
- **Font Readability:** Body text legible at default zoom on a mid-range phone, no pinch-zoom required.
- **Keyboard Navigation:** Every interactive element reachable and operable by keyboard alone, in logical order.
- **Screen Readers:** All meaningful content, including informational icons, has a text alternative.
- **Focus Visibility:** Keyboard focus states always clearly visible, using the brand palette consistently.
- **Error Communication:** Form errors communicated through both color and plain text, positioned near the relevant field.
- **WCAG Philosophy:** WCAG 2.1 AA treated as a practical floor for a "professionally managed" operator serving a broad-age audience, not a ceiling.

---

## 12. AI Design Rules

1. Never invent colors outside the four brand colors and the neutral/functional scales in §4.
2. Never use Bebas Neue anywhere except the logo/wordmark; all website text is Poppins.
3. Maintain the defined type scale exactly — no ad hoc font sizes.
4. Use no more than three font weights across the entire site.
5. Keep spacing values consistent with the defined scale — no arbitrary one-off spacing.
6. Use one border-radius system across all cards, buttons, and surfaces.
7. Reserve Accent Green exclusively for primary actions and positive/inclusion indicators.
8. Never rely on color alone to communicate meaning — always pair with text or an icon.
9. Prefer real destination and traveller photography over stock imagery or illustration wherever it exists.
10. Never use AI-generated or AI-looking faces anywhere on the site.
11. Use one consistent icon style — never mix icon families or treatments.
12. Maintain identical card styling for every instance of the same component type across every page.
13. Keep shadows subtle; never introduce heavy, dramatic elevation.
14. Default to no motion; add animation only where it clarifies a state change.
15. Never use motion, color, or copy styling to manufacture urgency or scarcity.
16. Respect the fixed section spacing rhythm defined in §6.
17. Treat §11's accessibility requirements as mandatory minimums on every page.
18. Never let decorative elements delay or obscure price, inclusions, or the three core CTAs.
19. Constrain body text to a comfortable reading width; never stretch paragraphs full-width on large screens.
20. Apply this design system identically across every page type — no "special" treatment for any one page without an explicit updated requirement.

---

## 13. Key Takeaways

**Visual philosophy:** A calm, warm, professional interface built from a restrained brand palette, one clear typeface, generous whitespace, and real photography — never decoration for its own sake.

**Consistency philosophy:** One color system, one type scale, one spacing scale, one shape language, one icon style, applied without exception across every page and component.

**Accessibility philosophy:** Legibility, contrast, and comfortable touch targets are baseline requirements everywhere, designed around the least digitally confident visitor — never an afterthought.

**Maintainability philosophy:** Every decision above is deliberately limited and explicit, so the resulting component library (06-component-library.md) has a small, unambiguous set of rules to build from, and no future contributor needs to guess.

---

**This document is the visual language foundation for www.sangamtours.com. All subsequent design and development work — beginning with 06-component-library.md — should treat the decisions above as fixed unless formally revised.**