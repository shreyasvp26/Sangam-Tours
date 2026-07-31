# Sangam Tours — Content & SEO Strategy

**Internal Reference Document | Version 1.0**
**Prepared for:** Copywriters, SEO Specialists, Content Editors, UX Writers, AI Coding Agents (Cursor), and future team members
**Companion to:** 01-brand-strategy.md, 02-user-personas.md, 03-information-architecture.md, 08-data-architecture.md
**Purpose:** This document defines what content the website publishes, how it should be written, and how it should be organised and optimised for discovery. It does not repeat brand voice, page structure, visual design, or data fields already defined in the companion documents above.

---

## 1. Purpose

Nine documents precede this one, and each answers a different question: 01-brand-strategy.md defines *why* the site sounds and feels a certain way, 03-information-architecture.md defines *how pages are organised*, and 08-data-architecture.md defines *what fields exist* to hold content. None answer the question this document exists to answer:

**What content do we publish, and how should it be written, organised, and optimised for discovery?**

A brand voice table tells a writer what tone to use. A data model tells a developer what an Overview field is called. Neither tells a writer what to actually say in that field, or what makes one Overview stronger than another. This document fills that gap.

SEO depends on this gap being filled correctly: search engines rank pages that genuinely answer what a searcher is looking for, not pages that merely follow a template. A Package page can have every field from 08-data-architecture.md §4.2 populated and still fail to rank or convert if the Overview is vague or the FAQ answers questions nobody asks. Content quality is the input; discovery and trust are the outputs.

This document differs from its predecessors in three specific ways:

- **Versus 01-brand-strategy.md:** Brand strategy defines tone, vocabulary, and voice at the sentence level. This document defines content at the page and section level — what each page type is *for*, what it must say, and how often it should be revisited.
- **Versus 03-information-architecture.md:** Information architecture defines where content lives and how it's linked. This document defines what fills that structure and why it's written the way it is.
- **Versus 08-data-architecture.md:** Data architecture defines the fields a Package or FAQ record holds. This document defines the editorial standard those fields must meet before publication.

Everything below assumes the structure, fields, and voice already defined in the prior documents. It does not redefine tone (§11 of 01-brand-strategy.md remains authoritative), page order (§7 of 04-wireframes.md remains authoritative), or content field names (§4 of 08-data-architecture.md remains authoritative).

---

## 2. Content Principles

These principles govern every piece of published content, regardless of page type. Where a principle conflicts with a writer's instinct to make copy more persuasive or more exciting, the principle wins — per the brand's trust-first positioning (01-brand-strategy.md §15, rule 11).

1. **Human-First Writing** — Content is written for a person deciding whether to trust this operator with their family's holiday, not for a search algorithm. If a sentence reads well to a search engine but awkwardly to a person, rewrite it.
2. **Accuracy Above All** — Every price, date, inclusion, and claim must match the underlying data record (08-data-architecture.md §4). Content never states something the data doesn't support.
3. **Trust Over Persuasion** — Content earns belief through specifics (dates, inclusions, named destinations) rather than adjectives. "Departs every second Friday" persuades more than "an unforgettable journey."
4. **Clarity Over Cleverness** — A reader deciding whether to book a family holiday should never have to re-read a sentence to understand it. Wordplay and cleverness are not the goal.
5. **Consistency Across Pages** — A reader comparing two package pages should recognise the same structure, tone, and level of detail on both. No package should read like it was written by a different person.
6. **Scannability** — Most visitors skim before they read. Every page must be understandable from headings and bullets alone, with full paragraphs rewarding closer reading rather than being required for basic comprehension.
7. **Evergreen by Default** — Content should remain accurate for as long as possible without editing. Avoid phrasing tied to a specific season, year, or current event unless the content type requires it (e.g. a specific Departure date).
8. **Accessible Language** — Matches the Grade 7–8 reading level set in 01-brand-strategy.md §11. This is a content principle as much as a voice one: short sentences, familiar words, no buried meaning.
9. **Authenticity** — Testimonials, achievements, and company history are never dramatized beyond what was actually provided. See §7 for the fabrication rules this principle enforces.
10. **No Fabricated Information** — If a fact is missing (a price, a date, an address), the content is flagged as incomplete rather than filled in with a plausible-sounding guess.
11. **One Idea Per Sentence** — Especially in itinerary and inclusion content, each sentence should carry a single, clear piece of information rather than several joined by commas.
12. **Show, Don't Just Claim** — Instead of asserting a package is "comfortable," state the specific detail that makes it so (home-style meals, oxygen provisioning, a Tour Manager on every departure).
13. **Write Once, Reuse Structurally** — Content that appears in multiple places (a testimonial, a Tour Manager description) is written once and referenced, never rewritten with slight variations across pages, to avoid inconsistency and duplicate content.
14. **Respect the Reader's Time** — Every page should let a visitor reach the information that matters (price, dates, inclusions) without wading through unnecessary preamble.
15. **Content Serves the Decision, Not the Word Count** — A page is complete when it answers what the reader needs to decide, not when it hits a target length. Padding content to seem thorough works against both readability and trust.

---

## 3. Content Strategy by Page Type

Each page type below is defined by its purpose, writing approach, and update frequency. Page order and layout are defined in 04-wireframes.md; this section defines only what the content must accomplish.

### 3.1 Homepage

| Aspect | Detail |
|---|---|
| Purpose | Establish legitimacy within seconds and route the visitor to a Package, matching the "since 1979" trust-first positioning of 01-brand-strategy.md §13. |
| Writing Approach | Short, confident statements rather than an introduction. Each section (Hero, Trust Strip, Featured Packages) should be independently scannable, so a visitor reading only the top of the page already understands who the company is. |
| Update Frequency | Featured Packages and seasonal Hero messaging updated regularly (weekly to monthly, tied to ad campaigns); Trust Strip content updated rarely, only when a business fact changes. |

### 3.2 Package Pages

| Aspect | Detail |
|---|---|
| Purpose | Convert a visitor by answering, in order, what this trip is, what it costs, what's included, and how to book — matching the field order defined in 08-data-architecture.md §4.2 and the content hierarchy rules of 03-information-architecture.md §12. |
| Writing Approach | Every package follows the identical structure and depth (Overview, Highlights, Itinerary, Included/Excluded) regardless of destination, so no package reads as more or less cared-for than another. See §4 for detailed writing standards. |
| Update Frequency | Price and Departure dates checked and updated at least monthly, or immediately upon any confirmed change; Overview, Highlights, and Itinerary revisited only when the actual trip content changes (a new stop added, a hotel changed). |

### 3.3 About Page

| Aspect | Detail |
|---|---|
| Purpose | Convert the "since 1979" claim from a headline mark into a credible story, supporting the Company Story already defined in 01-brand-strategy.md §2. |
| Writing Approach | Narrative rather than bulleted — this is the one page where a reader arrives wanting the fuller story, not a scan. Still kept concise; this is not the place for exhaustive company history. |
| Update Frequency | Rarely. Updated only when a genuine milestone is reached (an anniversary, a new office, a new achievement figure) — never rewritten for stylistic refresh alone. |

### 3.4 Gallery

| Aspect | Detail |
|---|---|
| Purpose | Provide visual proof of real trips, reinforcing the "During travel" and "After returning" emotional stages defined in 01-brand-strategy.md §10. |
| Writing Approach | Minimal text. Captions (08-data-architecture.md §4.5) are short, factual, and specific — naming the destination and, where relevant, the package — rather than descriptive or poetic. |
| Update Frequency | Added continuously as new trip photography becomes available; no fixed cycle. |

### 3.5 Testimonials

| Aspect | Detail |
|---|---|
| Purpose | Deliver the social validation identified as the "After returning" emotional driver in 01-brand-strategy.md §10, and the top trust trigger identified in 02-user-personas.md §10. |
| Writing Approach | Testimonial text itself is never written or edited for tone — only real, supplied quotes are used, per §7 of this document. Any surrounding page copy (section intros) stays minimal so the testimonials themselves remain the content. |
| Update Frequency | New testimonials added as they are collected; existing ones are never rewritten, only unpublished if a customer requests removal (08-data-architecture.md §4.6). |

### 3.6 FAQ

| Aspect | Detail |
|---|---|
| Purpose | Resolve the specific hesitations identified in 01-brand-strategy.md §9 (pricing changes, cancellation, suitability for children or elders) before they become a reason not to enquire. |
| Writing Approach | Each answer addresses the real underlying concern directly rather than deflecting to "contact us for details" wherever the answer is knowable. See §4.7 for structural standards. |
| Update Frequency | Reviewed quarterly and updated immediately whenever a genuinely new question recurs from customer enquiries, or when a policy referenced in an answer changes. |

### 3.7 Contact

| Aspect | Detail |
|---|---|
| Purpose | Get a hesitant or ready-to-book visitor to a real human as fast as possible, reflecting the Contact page's Call Now-first CTA hierarchy (03-information-architecture.md §10). |
| Writing Approach | Minimal copy. Office details, hours, and contact channels are presented as reference information, not sales content. |
| Update Frequency | Updated immediately whenever an address, phone number, or business hours change (08-data-architecture.md §4.10); otherwise static. |

### 3.8 Legal Pages

| Aspect | Detail |
|---|---|
| Purpose | Set honest expectations plainly, per the "Responsible Operations" value in 01-brand-strategy.md §5. |
| Writing Approach | Plain, direct legal English — not legalese for its own sake, but not softened to the point of ambiguity either. Structured with clear headings so a specific clause (e.g. cancellation timing) can be found quickly. |
| Update Frequency | Rarely, and only when policy actually changes. Every edit updates the Last Updated Date field (08-data-architecture.md §4.16), which itself functions as a trust signal. |

---

## 4. Writing Guidelines

These are practical, sentence- and section-level standards. Brand-level tone and vocabulary rules remain governed by 01-brand-strategy.md §11 — this section is about structure and mechanics, not voice.

### 4.1 Headings

- One clear H1 per page, matching the page's core subject (a package name, "About Us," "Frequently Asked Questions") — never a clever or ambiguous title.
- Section headings (Overview, Highlights, Included, Excluded) are literal and consistent across every Package page. Do not vary a heading's wording from one package to the next.
- Headings describe content, not marketing hooks — "5-Day Itinerary," not "Your Journey Begins."

### 4.2 Paragraphs

- Two to four sentences maximum in body paragraphs (Overview, About Us narrative). Longer blocks should be split or converted to a list.
- The first sentence of any paragraph should be able to stand alone and convey the paragraph's point, for visitors who only read openers while scanning.

### 4.3 Lists

- Used wherever content is inherently listable: Highlights, Included/Excluded, Quick Facts, FAQ categories — per the scanning-over-paragraphs rule in 03-information-architecture.md §12.
- Each list item starts with the most important word, not a filler lead-in ("Transport" not "We also provide transport").
- Lists stay parallel in structure — if one Included item is a noun phrase, all should be.

### 4.4 CTAs

- CTA copy is never invented per page. Only the three fixed labels defined in 01-brand-strategy.md §11 and 03-information-architecture.md §10 — "Book Now," "WhatsApp Us," "Call Now" — are used, exactly as written, everywhere they appear.
- Supporting CTA copy (the line above a button, if any) may vary slightly by page context but must never rename the button itself.

### 4.5 Package Descriptions

- The Destination Summary (08-data-architecture.md §4.2) is a single sentence, under 20 words, stating where the trip goes and its defining character (e.g. "A gentle coastal circuit through Konkan's monsoon coastline").
- The Overview (2–4 sentences) expands on the Destination Summary with the trip's pacing, group suitability, and what makes it distinct from similar packages — never a restatement of the Highlights list in paragraph form.
- Highlights (four to six items) are specific and concrete ("Sunrise visit to Pangong Lake," not "Beautiful scenery").

### 4.6 Itinerary Writing

- Each day entry has a short, specific title (a place name or key activity) and a description of two to three sentences.
- Itinerary descriptions state what happens, not how the traveller will feel about it — emotional framing belongs in the Overview and Highlights, not the day-by-day.
- Meals, transport type, and overnight stay are stated plainly where relevant, since these are common pre-booking concerns (01-brand-strategy.md §9).

### 4.7 FAQ Writing

- Questions are phrased the way a real customer would ask them ("What happens if I need to cancel?"), not rephrased into formal or marketing language.
- Answers lead with the direct answer in the first sentence, then add supporting detail — never bury the answer at the end of the paragraph.
- Where an answer references a policy (e.g. cancellation terms), it states the key fact directly and links to the full Legal Page rather than making the reader search the policy for the answer.

### 4.8 Testimonials

- Quote text is reproduced exactly as supplied — no editing for grammar, tone, or length beyond what the customer themselves provided, per §7, rule 3 of this document.
- Any editorial framing around a testimonial (a section heading, an intro line) stays factual: "What Our Travellers Say," not embellished commentary on the quotes themselves.

### 4.9 Image Captions

- State what is shown, factually: destination, and package name where relevant. Avoid poetic or interpretive captions that don't aid recognition.
- Every image caption pairs with the mandatory Alt Text field (08-data-architecture.md §4.5) — the two serve different purposes (caption is for the reader, alt text is for accessibility and search) and should not be treated as interchangeable.

---

## 5. SEO Principles

This section defines search discoverability philosophy only. It remains technology-independent — no implementation detail, tag syntax, or platform-specific configuration appears here.

1. **Descriptive Page Titles** — Every page and Package has a Meta Title (08-data-architecture.md §4.15) that states what the page is about in terms a searcher would actually type — the destination and trip type for packages, the specific page purpose for everything else. Titles are never generic ("Home" or "Tours") and never identical across two different pages.
2. **Meaningful Meta Descriptions** — Each Meta Description summarises the page's value in a way that would make a searcher want to click, grounded in real content on the page (price range, key inclusion, destination) rather than generic marketing language.
3. **Clean URLs** — URL structure is fully defined in 03-information-architecture.md §9 and inherited as-is here; this document adds no new URL rules. Clean, descriptive, lowercase, hyphenated URLs support both user trust and search discovery.
4. **Internal Linking Reinforces Discovery** — The internal linking rules in 03-information-architecture.md §11 (Related Packages, Testimonials linked from multiple entry points) also serve SEO: pages that are well-linked internally are easier for search engines to discover and understand as related content.
5. **Image Optimisation Principles** — Every image carries meaningful Alt Text (08-data-architecture.md §4.5) that describes what the image shows, supporting both accessibility and image search discovery. Alt Text is written for a person who cannot see the image, not stuffed with destination keywords it doesn't actually depict.
6. **Unique Content Per Package** — Every Package's Overview, Highlights, and Itinerary content is unique to that package. Even structurally similar packages (e.g. two pilgrimage circuits) must not share templated paragraphs beyond genuinely shared facts (like standing inclusions).
7. **Avoiding Duplicate Content** — Content that exists once (a Tour Manager description, a company milestone) is referenced from a single canonical source rather than copy-pasted with small variations across multiple pages, per Content Principle 13 in §2.
8. **Content Freshness** — Package pages with live pricing and dates are kept current (§3.2); stale prices or past-dated departures visible on a live page undermine both trust and search relevance for time-sensitive queries.
9. **Local SEO Principles** — Nagpur and Akola office details, service regions, and destination coverage should appear naturally within genuinely relevant content (the About page, Contact page, and Company Information per 08-data-architecture.md §4.9–§4.10) — not inserted artificially elsewhere for the sake of local relevance.
10. **Search Intent Alignment** — Content is written to match what someone is actually trying to find or decide at that page. A Package page answers "is this trip right for me and what does it cost," an FAQ answers a specific doubt, and neither should be diluted by content belonging to the other.

---

## 6. Content Governance

Governance principles here extend the ownership and lifecycle rules already defined in 08-data-architecture.md §6 (Content Lifecycle) and §9 (Content Governance), rather than repeating them.

- **Ownership:** Package pricing, dates, and inclusions are owned by whoever manages the Admin Panel entries described in 08-data-architecture.md §4.2; editorial quality is a separate review layer applied before publication.
- **Review:** New or edited content is checked against the Content Principles in §2 and the Writing Guidelines in §4 before moving from Draft to Published status (08-data-architecture.md §6).
- **Updates:** Time-sensitive content follows the update frequency defined per page type in §3; evergreen content is revisited only when the underlying facts change, not on a fixed schedule.
- **Accuracy:** Any fact not yet confirmed (an address, a figure, a claim) is flagged as pending rather than published with a placeholder guess, consistent with the flags already raised in 01-brand-strategy.md §7 and §13.
- **Version Control:** Legal Documents track a Last Updated Date (08-data-architecture.md §4.16); other content types rely on the Draft → Published → Archived lifecycle already defined in 08-data-architecture.md §6.
- **Archival Philosophy:** Content is archived, not deleted, when it becomes inactive — matching the archival-over-deletion approach set across every content model in 08-data-architecture.md §4, preserving history and avoiding broken references.

---

## 7. AI Content Rules

These rules apply to any AI system (including Cursor) generating, editing, or assisting with website content for this project.

1. Never fabricate information — pricing, dates, inclusions, addresses, or any factual detail not present in the source data.
2. Never invent testimonials, or edit the wording of a real testimonial beyond what the customer supplied.
3. Never exaggerate or round pricing in a way that doesn't match the Price Amount and Price Qualifiers fields (08-data-architecture.md §4.2).
4. Preserve the brand voice defined in 01-brand-strategy.md §11 in every piece of generated content — do not default to generic travel-industry phrasing.
5. Prefer clarity over marketing language; when a persuasive phrase and a plain, factual one convey the same point, use the plain one.
6. Avoid duplicate content — do not generate near-identical paragraphs across multiple Package pages for the sake of speed.
7. Keep all content human-first; do not optimise a sentence for a search term at the expense of it reading naturally.
8. Maintain factual consistency between a Package's own fields (e.g. the Overview must not describe inclusions that contradict the Included/Excluded lists).
9. Reference existing content rather than rewriting it unnecessarily — if a Tour Manager description or company fact already exists, reuse it rather than generating a fresh variant.
10. Flag missing information instead of guessing — if a required field (08-data-architecture.md §4) has no source data, mark it as missing rather than producing plausible-sounding filler.
11. Never invent a customer quote, review, or statistic to fill a content gap.
12. Follow the fixed CTA labels exactly ("Book Now," "WhatsApp Us," "Call Now") — never generate a variant phrasing.
13. Do not alter the section order or field structure defined in 04-wireframes.md or 08-data-architecture.md while generating content to fill those fields.
14. Do not generate content implying services the business does not offer (e.g. visa handling, per 01-brand-strategy.md §16).
15. Match the reading level defined in 01-brand-strategy.md §11 (Grade 7–8) in all generated copy.
16. Do not generate seasonal or time-bound phrasing into evergreen fields (Overview, Highlights, About Us) — reserve time-specific language for Departure and Hero Banner content, where it belongs.
17. When generating FAQ content, only produce answers to questions that reflect real, recurring customer concerns already evidenced in 01-brand-strategy.md §9 or supplied by the team — do not invent hypothetical questions.
18. When generating image captions or alt text, describe only what is actually depicted — never assume or invent a location, package, or context not confirmed for that asset.
19. Treat every Content Principle in §2 as a checklist before finalising generated content, not as background reading.
20. If a generation task conflicts with a rule in this document or a prior document (e.g. a request to invent a testimonial, or to rewrite a fixed CTA), decline and flag the conflict rather than proceeding.

---

## 8. Key Takeaways

**Content philosophy:** Every page exists to move a specific, real decision forward — trusting the operator, understanding a package, or resolving a doubt — never to fill space or perform SEO for its own sake. Accuracy and human-first writing take precedence over persuasive polish at every point where the two would conflict.

**Writing consistency:** Every Package page shares the same structure, depth, and voice regardless of destination, so no traveller segment or package feels less cared-for than another. Fixed CTA labels, consistent headings, and reused (not rewritten) shared content keep the site coherent as it scales.

**SEO approach:** Discovery is earned through genuinely unique, accurate, well-linked content — descriptive titles, meaningful descriptions, clean URLs inherited from the existing IA, and content that matches real search intent — never through keyword density or technical tricks, which remain explicitly out of scope for this document.

**Governance:** Content ownership splits between factual accuracy (tied to the Admin Panel data in 08-data-architecture.md) and editorial quality (governed by this document), with a shared archival-over-deletion philosophy that preserves history rather than erasing it.

**Long-term maintainability:** Because content principles and writing standards are defined once here — rather than re-decided per package or per page — new packages, new FAQs, and new testimonials can be added indefinitely without content quality drifting or requiring this document to be rewritten.