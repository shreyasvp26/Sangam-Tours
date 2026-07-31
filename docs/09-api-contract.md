# Sangam Tours — API Contract Document

**Internal Reference Document | Version 1.0**
**Prepared for:** Backend Developers, API Architects, Frontend Developers, AI Coding Agents (Cursor), and future team members
**Companion to:** 01-brand-strategy.md, 02-user-personas.md, 03-information-architecture.md, 04-wireframes.md, 05-design-system.md, 06-component-library.md, 07-experience-guidelines.md, 08-data-architecture.md
**Purpose:** This document answers one question only: **how does the frontend communicate with the backend?** It does not repeat brand voice, personas, site structure, layouts, styling, component behaviour, or content models — those live in the companion documents. This document defines the logical API contract: resources, operations, request/response conventions, and errors.

---

## 1. Purpose

08-data-architecture.md defined *what data exists*. It deliberately stopped short of defining how software reads or writes that data. That is the gap this document closes.

An **API Contract** is the agreed, technology-independent boundary between frontend and backend: which resources are exposed, what operations are permitted on each, what a request must contain, what a response guarantees, and how failures are communicated — consistently, across every resource. The frontend can be built against this contract without a working backend, and the backend can be built against it without a finished frontend, and the two will still meet correctly.

This is distinct from **Data Architecture (08)**, which defines content, fields, and relationships — this document assumes those as given and adds none. It is distinct from **backend implementation**, which is the actual code (framework, ORM, database) — this document defines required behaviour, not how it is achieved. It is distinct from **authentication implementation** — this document defines only which operations require an authenticated Admin, not the login mechanism itself.

---

## 2. API Design Principles

1. **Resource-Oriented** — Organised around the content models in 08-data-architecture.md, not around pages.
2. **Predictable** — Every resource follows the same conventions for reading and writing.
3. **Consistent Naming** — Resource and field names mirror 08-data-architecture.md exactly.
4. **Stateless** — Every request carries everything needed; no per-visitor session state for public browsing.
5. **Validation-First** — Every write is validated against 08-data-architecture.md §8 before anything is persisted.
6. **Explicit Errors** — Every failure returns a specific, identifiable reason (§6).
7. **No Hidden Side Effects** — Reading never mutates data; an operation does only what it implies.
8. **Backward Compatible by Default** — New fields and resources can be added without breaking existing behaviour (§7).
9. **Minimal Payloads** — Related content is referenced (identifier + minimal display fields), not duplicated inline.
10. **Public/Admin Separation** — Every resource states explicitly what is publicly readable versus Admin-only.
11. **Read Reflects Publication State** — Public reads return only Published content; Draft, Archived, Deleted are invisible.
12. **Derived Values Computed, Not Stored** — Computed at response time (e.g. a Package's "upcoming" status), never persisted.
13. **Safe Deletion Enforced** — A delete on a resource with live references is rejected, not silently archived.
14. **Idempotent Where Expected** — Repeated identical reads or writes produce the same end state.
15. **Technology-Independent** — Describes behaviour only; no server framework, database, or transport is assumed.

---

## 3. Resources

Each resource below corresponds to a content model in 08-data-architecture.md. Fields, relationships, and validation are not repeated here — only operations and their availability.

| Resource (§ ref) | Public Read | Admin Read | Write |
|---|---|---|---|
| **Packages** (4.2) | List/retrieve Published Packages, filterable by Category or Destination | All Statuses | Admin only: create, update, Status transitions (Draft → Published → Archived); hard delete only if no Enquiry/Testimonial/FAQ references it |
| **Categories** (4.1) | List/retrieve, with associated Packages | — | Admin only: create, update; delete blocked while any Package references it |
| **Destinations** (4.3) | List (feeds Gallery filter) | — | Admin only: create, update; delete blocked while referenced |
| **Departures** (4.4) | List per Package, with derived Status | — | Admin only: create, update, cancel; a Package cannot publish without one |
| **Gallery** (4.5) | List/retrieve, filterable by Destination or Package | — | Admin only: upload, tag, reorder, archive; Alt Text mandatory |
| **Testimonials** (4.6) | List Published, filterable by Package or Featured flag | — | Admin only: create, update, Status change |
| **FAQs** (4.7) | List, filterable by FAQ Category or Package | — | Admin only: create, update, reorder, archive |
| **Tour Managers** (4.8) | List active profiles | — | Admin only: create, update, archive |
| **Company** (4.9) | Retrieve the single record | — | Admin only: update (no create/delete — exactly one record) |
| **Contact** (4.10) | List all office records | — | Admin only: create, update (new office = new record, never merged) |
| **Homepage** (4.11–4.12) | Retrieve active Hero Banner + resolved Section content, in order | — | Admin only: update Hero Banner and Section content references; Section Types themselves are fixed |
| **Navigation** (4.13) | List active items, in order | — | Admin only: update Target Route only — Label/Placement/Order are fixed |
| **Footer** (4.14) | Retrieve four columns, resolved | — | Not exposed — updates automatically as underlying resources change |
| **SEO** (4.15) | Resolved automatically alongside its page/Package's own read | — | Admin only: update; a Package cannot publish without complete SEO Metadata |
| **Legal** (4.16) | List/retrieve the three fixed documents | — | Admin only: update Body Content; Last Updated Date auto-sets; no 4th type |
| **Social Links** (4.17) | List active links, in order | — | Admin only: create, update, deactivate |
| **Enquiries** (4.18) | — (never publicly readable) | List/retrieve, filterable by Status or Package | Public: submit (all 8 fields required, no extras; Timestamp/Status system-assigned). Admin: update Status only — name/contact/timestamp immutable |

Full-text search is not a launch requirement (no Blog, no site-wide search per 03-information-architecture.md §4.6) and is not defined here; if introduced later, it is additive.

---

## 4. Request Contract

**Identifiers** — Internal references between resources always use the stable identifier (08-data-architecture.md §2, principle 4). Public single-resource retrieval uses the Package's slug where one exists; Admin writes always address a resource by its stable identifier, never a slug, since a slug may change before publication.

**Filtering** — Optional by default; omitting a filter returns the full public-eligible set. Every filter corresponds to a field or relationship already defined in 08-data-architecture.md — filtering never exposes a field not already public content. Multiple filters combine as AND unless stated otherwise.

**Sorting** — Resources with an explicit Display Order (Gallery Items, FAQs, Navigation, Social Links, Homepage Section content) return in that order by default. Resources without a curated order (Packages, Testimonials, Enquiries) default to most-recent-first, with an explicit sort parameter available where needed (e.g. Packages by nearest Departure).

**Pagination** — Any list capable of growing large (Packages, Gallery Items, Testimonials, Enquiries) is paginated by default, with a bounded default page size. Pagination is page-based (page number + size); every paginated response states total count and whether further pages exist.

**Validation Expectations** — Every write is checked against 08-data-architecture.md §3 and §8 before persisting. Missing required fields reject the whole request — no partial success. Invalid relationships (e.g. an Enquiry referencing a non-existent Package) are rejected, never silently nulled. Immutable fields (a published slug, an Enquiry's Timestamp) reject any attempted change. Draft saves apply relaxed validation; Publish transitions apply full validation, per 08-data-architecture.md §8.

---

## 5. Response Contract

- **Successful reads** return the requested resource(s) as defined in 08-data-architecture.md, with related resources referenced rather than fully nested. **Successful writes** return the resulting resource state, so the frontend never has to re-fetch immediately after a write. A successful Enquiry submission returns receipt confirmation only — no internal fields.
- **Empty responses** are successes, not errors. A list with no matches returns an empty set; a Package Detail page with no package-specific Testimonials/FAQs returns an explicit empty result so the frontend applies its defined fallback (08-data-architecture.md §5). A pending field (e.g. the Akola address) returns its explicit placeholder state — never omitted or fabricated (08-data-architecture.md §11, rule 10).
- **Validation failures** identify which field(s) failed and why; the prior resource state is unchanged.
- **Authorization failures** are returned when an operation is attempted without a valid Admin identity, or outside a future narrower role's scope — distinct from validation failures, since this is about *who is asking*.
- **Missing resource** responses cover non-existent, unpublished, or archived resources. A public request for a Draft or Archived Package returns the identical response to one that never existed — publication state is never leaked.
- **Server failures** cover backend errors unrelated to request validity. No internal detail (stack traces, database errors) is ever exposed to the caller; the cause is logged server-side only.

---

## 6. Error Handling

Every resource in §3 fails in the same shape, so error-handling logic written for one resource works for all of them.

| Category | Meaning | Example |
|---|---|---|
| Validation | Request is malformed or incomplete | Publishing a Package with no Departure |
| Business Rule | Well-formed request violates a lifecycle rule | Deleting a Category still referenced by Packages |
| Missing Data | Resource doesn't exist or isn't visible to this caller | Requesting an unpublished Package's slug |
| Authorization | Caller isn't permitted to perform this operation | Unauthenticated Testimonial update |
| Unexpected Failure | Error outside the caller's control | Transient backend error |

Every error response states its category so the frontend can branch predictably (inline field errors for Validation, redirect-to-login for Authorization). Business Rule failures always name the blocking relationship or constraint (e.g. "referenced by N Enquiries"), never a bare rejection. No resource defines its own bespoke error shape.

---

## 7. Versioning

1. **Backward compatibility is the default** — existing frontend behaviour must not break without an explicit, coordinated breaking change.
2. **Adding fields is non-breaking** — new optional response fields don't affect code that doesn't read them.
3. **Adding resources is non-breaking** — a future resource (e.g. a Blog, per 08-data-architecture.md §10) never requires changing existing contracts.
4. **Deprecating fields is explicit and gradual** — marked deprecated, kept returning through a transition period, removed only after migration.
5. **Breaking changes get a version boundary** — renaming a field, changing its meaning or required/optional status, or altering identifier semantics are breaking changes, introduced deliberately, never silently.
6. **Relationships stay stable** — because every relationship points to a stable identifier, adding new related content is never breaking (08-data-architecture.md §2, principle 4).
7. **This document is the compatibility source of truth** — an implementation need that appears to require an unanticipated breaking change is flagged and resolved here first, per 08-data-architecture.md §11, rule 20.

---

## 8. AI API Rules

1. Never expose unpublished (Draft/Archived) content through any public read, regardless of filtering.
2. Never return a Deleted entity from any operation.
3. Never mutate an immutable identifier or a published Package's slug.
4. Always validate a write against 08-data-architecture.md §8 before persisting — no partial writes on failure.
5. Never expose internal-only fields (Enquiry Status history, Admin notes) to public callers.
6. Keep every response and error shape consistent with §5 and §6 — no resource-specific conventions.
7. Preserve backward compatibility by default (§7); flag, don't silently make, breaking changes.
8. Return a specific, categorized error (§6) for every failure.
9. Reference related resources rather than duplicating their content inline.
10. Never fabricate missing data — return the explicit empty/placeholder state instead (08-data-architecture.md §11, rule 10).
11. Enforce the Public/Admin boundary in §3 for every operation without exception.
12. Reject deletes on resources with live references rather than silently archiving or cascading.
13. Never accept an Enquiry field beyond the eight defined in 08-data-architecture.md §4.18.
14. Always system-assign Enquiry Submitted Timestamp and initial Status — never accept these from the client.
15. Enforce Alt Text as a hard precondition for any Gallery Item create/update.
16. Enforce singular/fixed-count constraints — one Active Hero Banner per page/Package, one Company Information record, exactly three Legal Documents.
17. Derive computed values (Package "upcoming" status, Departure Status) at response time, never from a stored field.
18. Apply relaxed validation on Draft saves, full validation only at Publish, per 08-data-architecture.md §8.
19. Keep this contract technology-agnostic — defer framework, ORM, and database decisions to later documents.
20. Flag any gap where implementation needs a field, resource, or behaviour not defined here or in 08, rather than improvising silently.

---

## 9. Key Takeaways

**API philosophy:** Every resource is organised around the content models already defined in 08-data-architecture.md — nothing is invented independently at the API layer. All seventeen resources in §3 share the same operations, request conventions, and response/error shapes.

**Consistency:** Filtering, sorting, pagination, and validation behave identically wherever they apply (§4); every failure is categorised the same way (§6), so error-handling logic is written once.

**Validation:** Nothing reaches Published state, and nothing is accepted from a public caller, without passing 08-data-architecture.md §8's completeness and relationship rules — enforced here at the request/response boundary.

**Versioning:** Backward compatibility is the default assumption (§7); breaking changes are the deliberate, coordinated exception.

**Reliability:** Public reads only ever reflect Published content; empty results are successes, not errors; writes either fully succeed or leave prior state untouched. This document is the contract every subsequent backend implementation, Admin Panel build, and frontend integration is built against.