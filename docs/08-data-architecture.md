# Sangam Tours — Data Architecture Document

**Internal Reference Document | Version 1.0**
**Prepared for:** Backend Developers, Database Architects, CMS Architects, AI Coding Agents (Cursor), and future team members
**Companion to:** 01-brand-strategy.md, 02-user-personas.md, 03-information-architecture.md, 04-wireframes.md, 05-design-system.md, 06-component-library.md, 07-experience-guidelines.md
**Purpose:** This document answers one question only: **what data does the website contain, and how is it organised?** It does not repeat brand voice, personas, site structure, page layouts, visual styling, or component behaviour — those live in the companion documents. This document defines the logical content models, their relationships, lifecycle, validation, and governance that the entire site is built on.

---

## 1. Purpose

Every previous document in this set answered a different question. 01-brand-strategy.md defined *why* the site should feel a certain way. 02-user-personas.md defined *who* uses it. 03-information-architecture.md defined *how the site is organised* — its pages and navigation. 04-wireframes.md defined *what each page contains, in what order*. 05-design-system.md defined *how everything looks*. 06-component-library.md defined *what reusable interface pieces exist and how they behave*. 07-experience-guidelines.md defined *how the experience should feel across interactions, states, and edge cases*.

None of those documents define what the underlying **data** actually is. A Package Card (06) renders a package; a Package Detail page (04) lays out a package's sections in order; but nothing so far has defined what a "package" *is* as a piece of structured content — its fields, its required and optional data, its relationships to other content, or what happens to it over time. That is the gap this document closes.

**Data Architecture** is the discipline of defining the logical content models that a system stores and manages: what entities exist, what fields each one holds, how entities relate to one another, who owns them, and how they move through a lifecycle from creation to retirement. It is the content-level foundation beneath everything visual or structural that the earlier documents describe.

This document is deliberately distinguished from three adjacent disciplines it is often confused with:

- **Information Architecture** defines the *navigable structure* of the website — pages, routes, and menus. Data Architecture defines the *content* that populates those pages. IA tells you a Package Detail page exists at `/packages/{slug}`; this document tells you what a "Package" actually contains.
- **Component Library** defines the *reusable interface pieces* that render content — a Package Card, a Testimonial Card. This document defines the *data those components consume*. The Component Library assumes a Package object exists with a name, a price, and an image; this document is where that assumption is made explicit and complete.
- **API Contract** (a future document) will define *how software reads and writes this data* — request formats, response shapes, endpoints, and authentication. This document defines the data itself, independent of how it is transmitted, stored, or queried. It is intentionally silent on databases, tables, APIs, and code, so that it remains valid regardless of which technology stack ultimately implements it.

In short: this document is the shared vocabulary. Every future technical document — the API Contract, the database schema, the Admin Panel specification — must trace back to a content model defined here rather than inventing new fields or entities independently.

---

## 2. Data Architecture Principles

1. **Single Source of Truth** — Every fact about the business (prices, dates, contact details, policies) exists in exactly one place in the data model and is referenced everywhere it is displayed, never re-entered or duplicated per page.
2. **Content-First** — Data models are shaped by what the content actually is (a package, a testimonial, a FAQ), not by how a particular page happens to lay it out. Layout changes should never require a data model change.
3. **Reusable Content** — A single piece of content (a gallery image, a testimonial, a FAQ entry) can be referenced from multiple places — a package page, the homepage, the Gallery page — without being copied or re-created.
4. **Stable Identifiers** — Every entity has a permanent, unique identifier that does not change even if its name, slug, or category changes. Relationships and URLs depend on this identifier, never on a mutable field like a name.
5. **Immutable Slugs** — Once a package or page's URL-facing slug is published, it does not change, even if the internal name is edited later. Changing a slug breaks external links, particularly paid ad landing pages, which this business depends on.
6. **Relationships Over Duplication** — Where content connects (a Package to its Gallery Items, a Testimonial to the Package it references), the data model stores a relationship, never a duplicated copy of the related content.
7. **Normalize Where Practical, Simplify Where Sensible** — Shared, reused data (destinations, categories, contact offices) is broken out into its own entity. Small, rarely reused data (a single package's quick facts) stays embedded within its parent rather than being over-fragmented into unnecessary separate entities.
8. **Media Separated from Content** — Images and videos are managed as their own entity, referenced by content, rather than being embedded as untracked attachments inside a package or testimonial record.
9. **Validation by Default** — Every entity defines what "complete" and "valid" mean for it, so that incomplete content cannot be accidentally published to a live, ad-funded page.
10. **Technology Independent** — This model describes logical entities and relationships only. It intentionally does not assume any particular database, CMS platform, or storage technology, so it remains valid regardless of what implements it.
11. **Future Extensibility Without Redesign** — The model anticipates known future needs (multiple languages, multiple currencies, more offices, more categories) so that adding them later is additive, not a structural rework.
12. **No Derived or Duplicated Values** — Values that can be computed from other data (a package's "is upcoming" status from its departure dates) are derived at read time, never stored as a separately maintained duplicate field that can drift out of sync.
13. **Every Field Has an Owner** — Each field belongs to exactly one entity. No field is duplicated across two entities "for convenience" — it is referenced instead.
14. **Content Precedes Presentation** — This document defines what exists and how it relates. It does not define column widths, colours, or card layouts — those remain the responsibility of 05 and 06.
15. **Safe by Default** — The model is designed so that deleting or editing one piece of content cannot silently corrupt or orphan another; every relationship has a defined behaviour for what happens on deletion (see §6 and §8).

---

## 3. Field Conventions

Unless explicitly stated otherwise, every entity defined in this document follows these defaults. Individual entity definitions in §4 only call out exceptions to these conventions, not restate them.

- Every entity has a unique, immutable identifier.
- Required fields must exist before content can be published.
- Optional fields may remain empty without blocking publication.
- Relationships reference stable identifiers, never names or positions.
- Lists (Highlights, Itinerary, Included/Excluded, etc.) preserve display order.
- Slugs are unique and immutable after publication.
- Dates use a consistent format across all models.

---

## 4. Core Content Models

Each model below defines its purpose, fields, relationships, validation expectations, and lifecycle. Fields marked **Required** must be present before content can be published; fields marked **Optional** may remain empty without blocking publication.

### 4.1 Category

**Purpose:** Classifies every Package as either Domestic or International, the top-level split defined in 03-information-architecture.md §3.
**Fields:**
- Name — Required (e.g. "Domestic Tours," "International Tours")
- Slug — Required, immutable
- Description — Optional (used only if a category landing intro is ever needed)
**Relationships:** One Category has many Packages.
**Validation:** Exactly two categories exist at launch (Domestic, International); the model supports more without restructuring, per §10.
**Lifecycle:** Rarely changes after launch; edits are administrative, not routine content updates.

### 4.2 Package

**Purpose:** The central entity of the entire site — a fixed-departure tour offering. Every other content model on a Package Detail page (04-wireframes.md §5) either belongs to, or is referenced by, a Package.
**Fields:**
- Name — Required
- Slug — Required (see Field Conventions; naming per 03-information-architecture.md §9)
- Category — Required (reference to §4.1)
- Destination Summary — Required (short one-line description shown in the Hero)
- Destinations Covered — Required, list (references §4.3 or plain text tags)
- Price Amount — Required
- Price Qualifiers — Optional (e.g. "+ Airfare," "+ GST," matching source pricing exactly)
- Quick Facts: Duration, Group Type Suitability, Departure City — Required
- Overview — Required (short descriptive paragraph)
- Highlights — Required, list of four to six short statements
- Itinerary — Required, ordered list of day entries, each with a day number, title, and description
- Included List — Required
- Excluded List — Required
- Gallery Items — Optional, references to §4.5
- Testimonials — Optional, references to §4.6 (falls back to general testimonials if none are package-specific, per 04-wireframes.md §5.11)
- FAQs — Optional, references to §4.7 (falls back to general FAQ if none are package-specific)
- Departures — Required, at least one reference to §4.4
- Related Packages — Optional, curated references to other Packages, or system-derived by shared Category if left empty
- Hero Media — Required, reference to §4.5
- SEO Metadata — Required, reference to §4.15
- Status — Required (see §6)
**Relationships:** Belongs to one Category; has many Departures, Gallery Items, Testimonials, FAQs; references other Packages as Related Packages.
**Validation:** A Package cannot be published without Name, Slug, Category, Price, at least one Quick Fact set, Included/Excluded lists, at least one Departure, and Hero Media — these are the fields the wireframe treats as Critical priority (04-wireframes.md §5.3, §5.4, §5.9).
**Lifecycle:** Draft while being entered in the Admin Panel → Published once all required fields are validated → Updated freely (price, dates) without changing the slug → Archived once all its Departures are in the past and no new ones are scheduled → never hard-deleted while any Enquiry (§4.18) references it (see §6).

### 4.3 Destination

**Purpose:** A lightweight, reusable tag representing a real place (e.g. "Leh," "Ratnagiri," "Bali") referenced by Packages and Gallery Items, enabling the Gallery page's optional destination filter (04-wireframes.md §7).
**Fields:**
- Name — Required
- Slug — Optional (only needed if destinations ever get their own filterable URL)
**Relationships:** Referenced by many Packages and many Gallery Items.
**Validation:** No two Destination records represent the same place under different names (e.g. "Leh" and "Leh Ladakh" must resolve to one record) — see §8.
**Lifecycle:** Created as needed when new packages are added; never deleted while referenced by a published Package.

### 4.4 Departure (Tour Date)

**Purpose:** A specific bookable date range for a Package, supporting the Tour Dates section of the Package Detail page (04-wireframes.md §5.5).
**Fields:**
- Start Date — Required
- End Date — Required
- Package — Required (reference to §4.2)
- Status — Required (Upcoming, Closed, Completed)
**Relationships:** Belongs to one Package. A Package has many Departures.
**Validation:** End Date must fall after Start Date; a Package must have at least one Departure to be published.
**Lifecycle:** Created when a new tour date is announced → moves from Upcoming to Completed automatically once its End Date passes → retained historically rather than deleted, since past Departures inform which testimonials and gallery content relate to which trip.

### 4.5 Gallery Item

**Purpose:** A single managed media asset (image or short video) used across the Gallery page, Package Detail galleries, and homepage Gallery Preview (04-wireframes.md §3.8, §5.10, §7).
**Fields:**
- Media Type — Required (Image, Video)
- Media File — Required
- Alt Text — Required (accessibility requirement, per 06-component-library.md §3 Principle 3)
- Caption — Optional
- Associated Package — Optional (reference to §4.2)
- Associated Destination — Optional (reference to §4.3)
- Featured Flag — Optional (marks it for use in the homepage Gallery Preview)
- Display Order — Optional
**Relationships:** May belong to one Package and/or one Destination; referenced from many display contexts without duplication.
**Validation:** Alt Text is mandatory on every item, regardless of context, per accessibility requirements shared across 05 and 06. No Gallery Item exists without an associated Media File.
**Lifecycle:** Uploaded → tagged to a Package/Destination → published to the relevant gallery views → archived (hidden from public views but retained) rather than deleted, in case it is still referenced by historical content.

### 4.6 Testimonial

**Purpose:** A real customer review used for social proof on the homepage, the dedicated Testimonials page, and relevant Package Detail pages (04-wireframes.md §3.7, §5.11, §8).
**Fields:**
- Traveller Name — Required
- Traveller City — Required
- Package Travelled — Optional (reference to §4.2; omitted only if the review is general rather than package-specific)
- Quote Text — Required
- Photo — Optional
- Video — Optional
- Featured Flag — Optional (marks it for the Featured Reviews section)
- Display Order — Optional
- Status — Required (see §6)
**Relationships:** May reference one Package. Referenced by the homepage, the Testimonials page, and any relevant Package Detail page simultaneously.
**Validation:** Never fabricated or invented — only real, supplied reviews are entered, per 06-component-library.md §11, rule 14. A minimum of 8–10 records exist at launch, per the source requirements.
**Lifecycle:** Submitted/collected → entered in Draft → reviewed for accuracy → Published → may be unpublished (not deleted) if a customer requests removal.

### 4.7 FAQ

**Purpose:** A single question-and-answer pair used on the dedicated FAQ page and, where relevant, on individual Package Detail pages (04-wireframes.md §5.12, §9).
**Fields:**
- Question — Required
- Answer — Required
- FAQ Category — Required (Booking, Pricing, Travel, Policies, per 04-wireframes.md §9)
- Associated Package — Optional (reference to §4.2; present only for package-specific FAQs)
- Display Order — Optional
**Relationships:** May belong to one Package; otherwise appears only on the general FAQ page.
**Validation:** Every FAQ has exactly one FAQ Category; package-specific FAQs are additive to, not a replacement for, general FAQs shown on a Package Detail page.
**Lifecycle:** Added as new customer questions recur → edited as policies change → archived if no longer relevant, rather than deleted, to preserve a historical record of what was communicated to customers.

### 4.8 Tour Manager

**Purpose:** An optional profile representing one of the trained staff who accompany every departure, reinforcing the "dedicated Tour Manager" trust signal on the About page (04-wireframes.md §6).
**Fields:**
- Name — Required
- Photo — Optional
- Short Bio — Optional
- Display Order — Optional
**Relationships:** None required; may optionally be associated with specific Packages or Categories in the future if the business wants to highlight specialisation (e.g. a Tour Manager known for international departures).
**Validation:** This model is optional in aggregate — if no profiles are supplied, the About page instead shows a single generic statement that every departure includes a dedicated Tour Manager (04-wireframes.md §6).
**Lifecycle:** Added as staff join; archived rather than deleted if a staff member leaves, to avoid breaking any historical reference.

### 4.9 Company Information

**Purpose:** The single, canonical record of static facts about Sangam Tours as a business — the data behind the About page's Company Story, Mission, Timeline, and Achievements sections (04-wireframes.md §6).
**Fields:**
- Registered Business Name — Required
- Founding Year — Required
- About Us Text — Required
- Mission Statement — Required
- Vision Statement — Required
- Core Values — Required, list (name and short explanation per value, matching 01-brand-strategy.md §5)
- Timeline Milestones — Optional, ordered list (year, short description)
- Achievements — Optional (years in operation, travellers served, destinations covered — factual figures only, never invented, per 06-component-library.md §11, rule 14)
**Relationships:** Referenced by the About page and, for the founding year and "Since 1979" mark specifically, by the Header, Hero, and Footer globally (01-brand-strategy.md §5, §13).
**Validation:** There is exactly one Company Information record; it is never duplicated per page.
**Lifecycle:** Set once at launch; edited only when a genuine business fact changes (e.g. a milestone year is reached).

### 4.10 Contact Information

**Purpose:** The canonical record of each physical office and the business's shared contact channels, referenced by the Header, Footer, and Contact page (04-wireframes.md §10).
**Fields:**
- Office Name — Required (e.g. "Nagpur Office," "Akola Office")
- Address — Required, or an explicit "pending confirmation" placeholder state (04-wireframes.md §10; never fabricated, per 06-component-library.md §11, rule 14)
- Phone Numbers — Required, list
- Email — Required
- Business Hours — Required
- Google Maps Reference — Optional (added once available, per the same placeholder rule)
**Relationships:** Referenced by the Footer's "Reach Us" column, the Contact page, and the Header/Sticky CTA Bar's phone and WhatsApp access points.
**Validation:** The Akola office record must exist with a placeholder status rather than being omitted, so the Contact page's fixed layout (04-wireframes.md §10) always has a defined state to render.
**Lifecycle:** Created once per office; updated as business hours or contact numbers change; a new office record is added, never merged into an existing one, when the business expands to a new city (§10).

### 4.11 Hero Banner

**Purpose:** The primary visual and message block shown at the top of the Homepage and, in a simplified package-specific form, at the top of each Package Detail page (04-wireframes.md §3.2, §5.2).
**Fields:**
- Associated Page/Package — Required (which page or Package this banner belongs to)
- Heading — Required
- Subheading — Optional
- Media (Image/Video) — Required, reference to §4.5
- Active Flag — Required
- Display Order — Optional (only relevant if the homepage ever rotates multiple hero banners)
**Relationships:** Belongs to exactly one page or Package.
**Validation:** Exactly one Active Hero Banner exists per page/Package at any time.
**Lifecycle:** Draft → Published (Active) → replaced by a new banner as campaigns or seasons change, with the prior banner archived rather than deleted for historical reference.

### 4.12 Homepage Section

**Purpose:** Represents each modular block of the homepage — Featured Packages, Why Sangam Tours, Testimonials Highlight, Gallery Preview, FAQ Snippet, Final CTA Band (04-wireframes.md §3) — as independently manageable content rather than a hardcoded page.
**Fields:**
- Section Type — Required (one of the fixed set defined in 04-wireframes.md §3)
- Content References — Required, list (which Packages, Testimonials, or FAQs are featured in this section)
- Display Order — Required (fixed at launch per 03-information-architecture.md §13, rule 1: no new top-level sections are invented)
- Active Flag — Required
**Relationships:** References Packages, Testimonials, and/or FAQs depending on section type.
**Validation:** The set of Section Types is fixed; this model manages *which content* fills each section, never *whether new section types exist* — that remains a structural decision governed by 03-information-architecture.md, not a CMS-editable one.
**Lifecycle:** Content references are updated regularly (e.g. swapping which packages are "Featured"); the section types themselves are effectively static configuration, not routine content.

### 4.13 Navigation Item

**Purpose:** Represents each entry in the Header, Mobile Navigation Drawer, and their fixed ordering (03-information-architecture.md §4.1–§4.2).
**Fields:**
- Label — Required, fixed text (Home, Domestic Tours, International Tours, Gallery, About, Contact, plus Testimonials and FAQ in the mobile drawer)
- Target Route — Required
- Placement — Required (Header, Drawer-only)
- Display Order — Required, fixed
**Relationships:** None; this is structural configuration, not content that references other entities.
**Validation:** This model is intentionally near-static. Per 03-information-architecture.md §13, rules 1–2 and 12, the navigation set, order, and six-item header maximum are not meant to be freely edited through routine content management — this model exists so the fixed structure has a defined data representation, not to make navigation an open CMS feature.
**Lifecycle:** Set at launch; changed only through an explicit structural update, never a routine content edit.

### 4.14 Footer Section

**Purpose:** Represents the four fixed footer columns — Explore, Company, Legal, Reach Us — and their contents (03-information-architecture.md §4.3).
**Fields:**
- Column Name — Required, fixed (one of the four defined columns)
- Links — Required, list (each referencing a Navigation Item, Legal Document, or Contact Information field)
**Relationships:** References Navigation Items, Legal Documents, and Contact Information.
**Validation:** Exactly four columns exist; no new column is added without an explicit structural update (03-information-architecture.md §13, rule 17).
**Lifecycle:** Effectively static; individual links update automatically as their underlying referenced content (e.g. Contact Information) changes, without editing the Footer Section itself.

### 4.15 SEO Metadata

**Purpose:** The search-engine-facing data associated with every public page and Package.
**Fields:**
- Associated Page/Package — Required
- Meta Title — Required
- Meta Description — Required
- Canonical URL — Required
- Social Share Image — Optional
- Indexing Flag — Required (Index, No-Index — the Admin Dashboard route is always No-Index, per 03-information-architecture.md §9)
**Relationships:** Belongs to exactly one page or Package.
**Validation:** A Package cannot be published without complete SEO Metadata, since ad-driven traffic depends on accurate landing page metadata.
**Lifecycle:** Created alongside its parent Package/page; updated whenever the parent's name, pricing, or positioning changes materially.

### 4.16 Legal Document

**Purpose:** Represents each of the three fixed legal pages — Terms & Conditions, Privacy Policy, Cancellation & Refund Policy (03-information-architecture.md §3.3).
**Fields:**
- Document Type — Required (fixed set of three)
- Title — Required
- Body Content — Required
- Last Updated Date — Required
**Relationships:** Referenced directly from the Footer's Legal column and from every Package Detail page's Enquiry/CTA section (03-information-architecture.md §11, rule 2).
**Validation:** Exactly three Legal Document records exist; no additional legal page types are introduced without an explicit requirement update (03-information-architecture.md §13, rule 20).
**Lifecycle:** Rarely edited; each edit updates Last Updated Date so the change is auditable.

### 4.17 Social Link

**Purpose:** Represents the business's external social channels (Instagram, Facebook), the primary traffic sources per the source requirements, typically surfaced in the Footer.
**Fields:**
- Platform Name — Required
- URL — Required
- Display Order — Optional
- Active Flag — Required
**Relationships:** Referenced by the Footer.
**Validation:** URL must resolve to a real, active account; inactive links are deactivated rather than left broken.
**Lifecycle:** Added or deactivated as the business's active social presence changes.

### 4.18 Enquiry

**Purpose:** A single lead captured through the Enquiry Form — the site's core business outcome (source requirements §7, "Lead Generation"). This is transactional data generated by visitors rather than editorial content managed by staff, but it is data the website contains and must be modelled with equal rigour.
**Fields:**
- Name — Required
- Mobile Number — Required
- Email — Required
- City — Required
- Package Interested In — Required (reference to §4.2)
- Number of Travellers — Required
- Preferred Travel Date — Required
- Message — Optional
- Submitted Timestamp — Required, system-recorded
- Status — Required (New, Contacted, Converted, Closed)
**Relationships:** References exactly one Package.
**Validation:** All eight visitor-supplied fields defined in the source requirements and 06-component-library.md §11, rule 11 are mandatory before submission is accepted; no additional fields are ever added to this form (06-component-library.md §11, rule 11).
**Lifecycle:** Created on submission with an immutable timestamp → moves through New → Contacted → Converted/Closed as staff follow up → retained indefinitely for business record-keeping; never deleted, and never blocks deletion of anything it references (see §6).

---

## 5. Relationships

The site's content is small in entity count but densely interconnected. The key relationships are:

- **Category → Package.** One Category (Domestic or International) has many Packages. A Package belongs to exactly one Category.
- **Package → Departure.** One Package has many Departures (tour dates). A Departure belongs to exactly one Package.
- **Package → Gallery Item.** One Package may have many associated Gallery Items; a Gallery Item may also stand alone (associated with a Destination instead) or be reused across the general Gallery page without belonging to any single Package.
- **Package → Testimonial.** A Testimonial optionally references the Package it was written about. A Package Detail page shows Testimonials tied to it first, falling back to general Testimonials if none exist (04-wireframes.md §5.11).
- **Package → FAQ.** Identical pattern to Testimonials: FAQs may optionally reference a Package; a Package Detail page shows its own FAQs first, then falls back to general FAQ content.
- **Package → Related Packages.** A Package may curate specific Related Packages, or the system derives them automatically from shared Category if none are curated — ensuring the "no dead ends" rule (04-wireframes.md §2, principle 10) always has content to show.
- **Package → Enquiry.** An Enquiry always references exactly one Package. A Package cannot be hard-deleted while Enquiries reference it (§6).
- **Destination → Package, Destination → Gallery Item.** Destinations are shared tags; many Packages and many Gallery Items may reference the same Destination (e.g. "Ratnagiri" appears in both the Konkan Monsoon package and unrelated gallery photos).
- **Homepage Section → Package/Testimonial/FAQ.** Homepage Sections reference specific pieces of content (e.g. which Packages are "Featured") without owning or duplicating them.
- **Footer Section → Navigation Item / Legal Document / Contact Information.** The Footer's four columns reference, rather than restate, content owned elsewhere.
- **Contact Information → Enquiry (implicit).** Enquiries are followed up using the phone/email defined in Contact Information, but this is an operational connection, not a stored data relationship.

No relationship in this model permits silent duplication: wherever two pages show "the same" testimonial, gallery image, or FAQ, they are referencing one underlying record, not two independent copies.

---

## 6. Content Lifecycle

Every content entity in this model moves through some or all of the following states, though not every entity uses every state (a Legal Document, for instance, has no "Archived" state — it is always current).

1. **Draft** — Content exists in the Admin Panel but is not visible on the public site. Used while a new Package, Testimonial, or FAQ is being entered and is incomplete.
2. **Review** — An optional intermediate state, relevant primarily as the team grows beyond a single administrator (see §9). Not a hard requirement at launch, but the model supports it so a future multi-editor workflow does not require restructuring.
3. **Published** — Content is complete, has passed validation (§8), and is live on the public site.
4. **Updated** — Published content remains Published while its fields (price, dates, testimonial text) are edited; an update never resets a Package's slug or identifier, per §2, principle 5.
5. **Archived** — Content is no longer shown on public pages but is retained in the system rather than deleted — used for Packages with no upcoming Departures, past Hero Banners, or deactivated Gallery Items.
6. **Deleted** — Reserved for content that was created in error and never published, or that has no outstanding relationships (§8, "Safe Deletion"). Published content with live relationships (an Enquiry referencing a Package, a Testimonial referencing a Package) is Archived, never Deleted, to preserve referential integrity and business record-keeping.

**Ownership philosophy:** At launch, the business operates as a single content owner (the Admin, per §9) responsible for every entity's lifecycle. The model does not assume a large editorial team or a formal multi-stage approval chain — it assumes one or a small number of trusted staff moving content directly from Draft to Published through the Admin Panel. The Review state exists in the model precisely so that adding a second content owner later does not require a data model change, only a workflow change.

---

## 7. Media Architecture

Media (images and video) is the single most persuasion-critical data type on this site, per 01-brand-strategy.md §15, principle 3 ("Large, Real Destination Imagery"). It is modelled and governed as follows:

- **Images and videos are a distinct entity (§4.5), not embedded attachments.** A photo is uploaded once, tagged with metadata, and referenced from every context that needs it — a Package gallery, the general Gallery page, and the homepage Gallery Preview — without being duplicated per context.
- **Hero media is a first-class, required field**, not an incidental image — every Package and the Homepage require a defined Hero Media reference before publication, since the Hero is the first, most emotionally important visual on any landing page (04-wireframes.md §3.2, §5.2).
- **Gallery media** is tagged to a Package and/or Destination where applicable, enabling the internal linking between the Gallery page and relevant Package pages required by 03-information-architecture.md §11, rule 4.
- **Icons** (phone, WhatsApp, hamburger, navigation glyphs) are treated as fixed design assets governed by 05-design-system.md, not as CMS-managed content — they do not have entries in this content model because they never vary per package or change through the Admin Panel.
- **SEO assets** (Open Graph share images) are a field on the SEO Metadata entity (§4.15), sourced from existing Hero or Gallery media rather than requiring separately produced assets wherever practical.
- **Alt text is mandatory, not optional**, on every Gallery Item and Hero Media reference — this is a hard validation rule (§8), not a best-practice suggestion, given the accessibility commitments in 05-design-system.md and 06-component-library.md.
- **Media ownership:** the business currently holds original photography and video in Google Drive per the source requirements. This document defines the *logical* media entity that the eventual media library implementation must expose — it does not prescribe storage technology, but it does require that every Gallery Item and Hero Media reference resolve to exactly one managed file, not a loose folder reference.
- **Reuse philosophy:** the same photograph of, for example, Pangong Lake may serve as a Package's Hero Media, appear in that Package's Gallery, and also appear in the general Gallery page and homepage Gallery Preview — all as one underlying Gallery Item referenced three times, never as three uploaded copies.

---

## 8. Content Validation

Validation exists to prevent incomplete or inconsistent content from reaching an ad-funded, conversion-critical live site. The following rules apply across the model:

- **Required fields block publishing, not saving.** An Admin can save a Package as Draft with missing fields; the system prevents only the transition to Published while required fields (§4.2) are incomplete.
- **Slugs are unique and immutable**, per Field Conventions and 03-information-architecture.md §9 — no two Packages may share a slug, and a published slug never changes.
- **Duplicate prevention applies to Destinations, Categories, and Legal Document types.** The system does not allow two Destination records for the same real place, two Categories beyond the fixed Domestic/International set without an explicit structural update, or a fourth Legal Document type.
- **Image requirements are enforced at upload**, not after: every Gallery Item and Hero Media reference must include Alt Text before it can be attached to any Package or page.
- **Content completeness is checked holistically before publishing**, not field-by-field in isolation — a Package with a price and images but no Included/Excluded list is treated as incomplete overall, since the wireframe treats that section as Critical priority (04-wireframes.md §5.9).
- **Relationship validation** prevents an Admin from publishing a Package with zero Departures, or a Testimonial/FAQ referencing a Package that does not exist.
- **Safe deletion** is enforced structurally: a Package, Testimonial, Gallery Item, or Destination cannot be hard-deleted while any Enquiry, Package, or other published entity still references it. The system requires the content to be Archived, or its dependent references reassigned, before deletion is possible.
- **Publishing validation is the final gate**, combining every rule above into a single check performed at the moment content moves from Draft to Published — not distributed loosely across individual field-level checks alone.

---

## 9. Content Governance

Governance in this model is intentionally lightweight, reflecting the business's current size, while still defining clear ownership so future growth does not require re-architecture.

- **Admin (Business Owner/Senior Staff):** Full ownership of every content model — Packages, Departures, pricing, Testimonials, Gallery, FAQs, Company Information, Contact Information, Legal Documents, and Enquiry follow-up status. At launch, this is the single primary content owner.
- **Marketing/Content Updater (future role):** A narrower role focused on Testimonials, Gallery, Homepage Sections, and Hero Banners — the persuasion-facing content that changes most frequently as campaigns evolve — without access to pricing or legal content.
- **Operations (future role):** A role focused on Departures (tour dates), pricing updates, and Enquiry status management — the operational data that changes as tours are scheduled and leads are followed up.
- **Future Editors:** As the team grows, additional roles can be introduced by narrowing access to specific content models defined in §4, without altering the models themselves — the Review lifecycle state (§6) exists to support this.
- **Review responsibilities:** At current scale, the Admin reviews and publishes their own content directly. The model supports, but does not require, a second reviewer approving another editor's Draft content before it reaches Published.
- **Consistency rules:** Regardless of who edits content, every content model's required fields (§4), validation rules (§8), and fixed structural elements (Navigation Items §4.13, Footer Sections §4.14, Legal Document types §4.16) remain governed by the structural rules already established in 03-information-architecture.md and 06-component-library.md — content governance controls *what content says*, not *what structural elements exist*.

---

## 10. Scalability Principles

This model is designed so that the following growth scenarios are purely additive — new records within existing models — and never require a structural redesign:

- **More Packages:** Each new Package is simply a new record in §4.2, automatically appearing in its Category's listing and eligible for Related Packages logic, per 06-component-library.md §11, rule 17.
- **More Destinations:** New Destination records (§4.3) are created as new packages introduce new places, with no upper limit on how many a Package or Gallery Item can reference.
- **More Testimonials:** Testimonial (§4.6) is an open-ended list; nothing in the model caps how many can exist or reference a given Package.
- **More Galleries:** Gallery Item (§4.5) scales the same way — new media is added continuously without restructuring the Gallery page or Package galleries that reference it.
- **More Offices:** Contact Information (§4.10) already supports multiple office records (Nagpur, Akola) as independent entries; a third city is simply a third record, and the Footer/Contact page render however many active records exist.
- **Multiple Languages (future):** Text-bearing fields (Package Overview, Highlights, FAQ Answers, Company Information text) are modelled so that each can hold locale-keyed variants in the future — an additive change to a field's storage, not a new entity or relationship.
- **Multiple Currencies (future):** Package Price Amount is modelled with an implicit currency context (INR today); introducing a currency field alongside the amount is additive and does not affect any relationship in this model.
- **Additional Tour Categories:** Category (§4.1) is a data-driven list, not a hardcoded pair — a third category can be added as a new record without changing how Packages reference Category.
- **General principle:** because every relationship in this model points to a stable identifier (§2, principle 4) rather than a name or position, none of the above changes require touching existing Packages, Testimonials, or Gallery Items — they only add new records alongside what already exists.

---

## 11. AI Data Rules

These rules apply to any AI coding agent (including Cursor) implementing a database schema, CMS structure, or API built on this data model.

1. Never duplicate an entity that already exists — extend or reference it instead of creating a parallel version.
2. Never hardcode content values (prices, dates, testimonial text, FAQ answers) directly into templates or components — every value must come from the content models defined here.
3. Reuse relationships exactly as defined in §5 — do not invent shortcut relationships that bypass an existing one (e.g. do not let a Gallery Item reference a Category directly when the model routes it through Package or Destination).
4. Never store a derived or computable value as an independently maintained field — e.g. do not store "is upcoming" on a Package when it can be derived from its Departures (§2, principle 12).
5. Always validate content completeness before allowing a Published state transition, per §8.
6. Keep every Package slug immutable once published — never regenerate or overwrite it, even if the Package name changes (§2, principle 5).
7. Preserve every entity's stable identifier across edits — never re-key an entity when only its name, slug, or category changes.
8. Keep media (§4.5) as its own entity, separate from the content that references it — never embed binary or file data directly inside a Package, Testimonial, or Hero Banner record.
9. Prefer references over duplication in every case — if the same testimonial, image, or FAQ is needed in two places, create one relationship path used twice, not two records.
10. Never fabricate content of any kind (testimonials, gallery captions, pricing, statistics) — every value must trace back to real, supplied source data, per 06-component-library.md §11, rule 14.
11. Do not add fields to the Enquiry model (§4.18) beyond the eight defined — this list is fixed by the source requirements and 06-component-library.md §11, rule 11.
12. Do not introduce new top-level content models beyond §4 without an explicit updated requirement — if new content genuinely does not fit an existing model, flag it rather than improvising a schema.
13. Never hard-delete a Package, Testimonial, Gallery Item, or Destination that is still referenced by a Published entity or an Enquiry — archive it instead, per §6 and §8.
14. Treat Navigation Items (§4.13) and Footer Sections (§4.14) as structural configuration, not open CMS content — do not expose them as freely editable in ways that could break the fixed navigation rules in 03-information-architecture.md §13.
15. Enforce Alt Text as a mandatory field on every media reference — never allow a Gallery Item or Hero Media record to save without it.
16. Enforce exactly one Category per Package, exactly one Active Hero Banner per page/Package, and exactly one Company Information record globally — do not allow these singular relationships to become one-to-many by implementation shortcut.
17. Timestamp every Enquiry immutably at submission — never allow this value to be edited after creation.
18. Keep this data model technology-agnostic in any implementation discussion — defer database engine, ORM, or API shape decisions to the API Contract and later technical documents, not to this one.
19. When a new Package is added, ensure it automatically appears in the correct Category listing and becomes eligible for Related Packages logic — do not require manual linking per record, per 03-information-architecture.md §13, rule 16.
20. Where this document and a later technical document appear to conflict on structure or fields, flag the conflict rather than silently resolving it in either direction, per 03-information-architecture.md §13, rule 19.

---

## 12. Key Takeaways

**Data philosophy:** Every fact about Sangam Tours — a price, a testimonial, a contact number — exists once, as a defined field on one of the content models in §4, and is referenced wherever it appears rather than duplicated. Nothing on the site is "just text on a page"; it is structured content with an owner, a lifecycle, and defined validation.

**Content organisation:** The model centres on a single dominant entity — the Package — surrounded by supporting content (Testimonials, FAQs, Gallery Items, Destinations, Departures) that either belongs to a Package or stands independently and is referenced by it. Structural elements (Navigation, Footer, Legal Documents, Category) are deliberately modelled as fixed configuration rather than open content, matching the architectural discipline already established in 03-information-architecture.md.

**Relationships:** Nothing in this model duplicates content across contexts. A testimonial shown on three pages, a photo used in two galleries, and a FAQ answered on both the general FAQ page and a Package page are each one record, referenced multiple times — never copied.

**Governance:** At launch, a single Admin owns the full content lifecycle through the Admin Panel described in the source requirements. The model is deliberately built to support additional editorial roles later (Marketing, Operations) by narrowing access to existing models, not by redesigning them.

**Scalability:** More packages, more destinations, more testimonials, more galleries, more offices, and — in the future — more languages, currencies, and categories are all additive changes: new records referencing existing, stable identifiers. Nothing in this model requires structural rework as Sangam Tours' catalogue and reach grow.

This document is the content-level foundation for www.sangamtours.com. The API Contract and all subsequent implementation work should treat every entity, field, and relationship defined above as the authoritative source of what data the website manages.