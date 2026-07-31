# Sangam Tours — Quality Assurance Document

**Internal Reference Document | Version 1.0**
**Prepared for:** Product Owners, UI/UX Designers, Frontend and Backend Developers, AI Coding Agents (Cursor), QA Engineers, Content Reviewers, and Release Approvers
**Purpose:** This document defines what "quality" means for www.sangamtours.com, how quality is verified, and how the team decides the website is ready for release. It is the authoritative reference that every future testing process, QA checklist, automation suite, release review, and production verification must derive from.

---

## 1. Purpose

Quality assurance exists because a website that "works" and a website that is "good" are not the same thing. A page can load, a form can submit, and an API can return a 200 response, while the experience still fails a 67-year-old traveller trying to book a pilgrimage tour on a small screen, or a family comparing packages who cannot tell what is included. Testing confirms that code executes. Quality confirms that the outcome the business exists to deliver — a traveller who trusts Sangam Tours enough to send a WhatsApp message — is actually being delivered.

This is why testing alone is not quality. Testing is a verification activity performed against a standard. Without a defined standard, testing has nothing to check against beyond "did it crash." This document is that standard. It exists independently of any test suite, tool, or release checklist, and it will outlive all three.

This document also differs deliberately from the documents that precede it:

| Document | Answers |
|---|---|
| 05-design-system.md, 06-component-library.md | What should the interface look like? |
| 07-experience-guidelines.md | How should the interface behave and feel? |
| 08-data-architecture.md, 09-api-contract.md | How is data structured and exchanged? |
| 10-content-and-seo-strategy.md | What should be written, and how should it be found? |
| 11-deployment-and-operations.md | How does the site get released, run, and kept alive? |
| **12-quality-assurance.md (this document)** | **How do we know all of the above is actually true, and true enough to release?** |

Quality, in this project, is not inspected in at the end. A page built without accessibility in mind cannot be made accessible by a QA pass the week before launch; a package page written without the Included/Not Included structure defined in the content strategy cannot be "tested into" trustworthiness. Quality is a property of how something was designed and built. QA's role is to verify that the property is present — not to manufacture it retroactively.

---

## 2. Quality Principles

These fifteen principles are the project's working definition of quality. Every later section — dimensions, verification, release readiness, governance — exists to operationalise these.

| # | Principle | What It Means for Sangam Tours |
|---|---|---|
| 1 | **User-First Quality** | Quality is judged from the traveller's experience outward, never from internal convenience inward. A change that is easier to build but harder to book is a quality regression. |
| 2 | **Prevention Over Detection** | Defects are cheapest to prevent at design and build time, and most expensive to catch after release. Verification against 01–11 happens before code is written, not only after. |
| 3 | **Consistency** | The same component, pattern, and message should behave identically everywhere it appears, across pages and across devices. |
| 4 | **Completeness** | A feature is not done when the primary path works; it is done when its edge cases, empty states, and failure states are also accounted for. |
| 5 | **Predictability** | The interface should never surprise a user who has already learned how one part of the site behaves. |
| 6 | **Accessibility as a Baseline, Not a Feature** | Accessibility is not an enhancement layered on afterward; it is a condition of the product being finished at all. |
| 7 | **Reliability** | The site behaves the same way on the hundredth visit as the first, and under real network and device conditions, not only ideal ones. |
| 8 | **Maintainability** | Quality includes whether future changes can be made safely, not only whether the current state looks correct. |
| 9 | **Performance Awareness** | Speed and responsiveness are treated as part of user experience, not a separate technical concern measured after the fact. |
| 10 | **Continuous Verification** | Quality is re-checked every time the site changes, not verified once at launch and assumed to persist. |
| 11 | **Documentation Alignment** | If the live site and its documentation (01–11) disagree, that disagreement is itself a defect. |
| 12 | **No Hidden Regressions** | A fix or feature that silently breaks something else is a failure, even if the original defect is resolved. |
| 13 | **Transparency** | Known issues, limitations, and risks are recorded and visible to the team — never hidden to make a release look cleaner than it is. |
| 14 | **Simplicity** | The simplest solution that meets the standard is preferred; complexity introduced without necessity is a quality risk in itself. |
| 15 | **Long-Term Sustainability** | Quality decisions are evaluated against the site's multi-year lifespan, not only the upcoming release. |

---

## 3. Dimensions of Quality

Quality is not one measurement — it is the sum of how the site performs across distinct, sometimes competing, dimensions. Each dimension below defines what "good" looks like conceptually, without prescribing how it is verified.

### 3.1 Functional Quality

**Question:** Does every feature behave correctly, for every user, every time?

- Every user-facing action (browsing packages, submitting an enquiry, filtering, navigating) produces the outcome the user expects, not merely a response from the system.
- Behaviour is correct not only on the success path, but also when inputs are incomplete, unexpected, or malformed.
- Functionality that depends on external systems (WhatsApp, call links, form submission) degrades gracefully rather than failing silently.

### 3.2 User Experience Quality

**Question:** Does every interaction feel intuitive, and does it move the user toward an enquiry?

- Every interaction aligns with the journeys and pain points defined in 02-user-personas.md and the interaction standards in 07-experience-guidelines.md.
- Friction is evaluated in terms of the traveller's momentum: does this step make them more or less likely to complete the enquiry they came to make?
- Interruptions, dead ends, and ambiguous next steps are treated as defects even when nothing is technically "broken."

### 3.3 Visual Quality

**Question:** Does the interface consistently reflect the Design System?

- Colour, typography, spacing, and imagery match 05-design-system.md and 06-component-library.md on every page, not only the primary ones.
- Visual inconsistency between pages is treated as a defect on the same footing as a broken layout, because it directly undermines the trust-driven brand promise defined in 01-brand-strategy.md.
- Visual quality is judged across the real range of devices and screen sizes the audience uses, not a single reference viewport.

### 3.4 Accessibility Quality

**Question:** Can every traveller, regardless of ability or assistance level, use the site?

Given the meaningful senior-citizen segment identified in 02-user-personas.md, accessibility is treated as core audience fit, not a compliance formality.

- **Keyboard Navigation** — every interactive element is reachable and operable without a pointing device.
- **Screen Readers** — content, structure, and interactive elements are exposed in a way that is meaningful when read aloud, not only when seen.
- **Colour Contrast** — text and meaningful UI elements remain legible for users with low vision or colour-vision differences.
- **Focus Management** — the current point of interaction is always visible and moves logically, particularly through multi-step flows like enquiry forms.
- **Readable Content** — content remains understandable at the reading level and pace appropriate for a first-time online booker, not only a digitally fluent user.
- **Motion Accessibility** — animation and transition never become a barrier to users sensitive to motion, and never delay access to essential information or actions.

### 3.5 Performance Quality

**Question:** Does the site feel fast and stable, particularly on the ad-driven mobile traffic it depends on?

- **Fast Perception** — the user perceives progress quickly, even before an action is fully complete.
- **Responsive Interaction** — the interface acknowledges input without perceptible lag.
- **Efficient Loading** — pages arrive at usable content quickly on realistic mobile connections, not only on high-speed office networks.
- **Stable Layouts** — content does not shift unexpectedly as a page loads, which is particularly damaging on the interrupted, mid-scroll visits described in 02-user-personas.md.
- **Graceful Loading** — the user always understands that something is happening, rather than facing a blank or frozen screen.

### 3.6 Content Quality

**Question:** Is what the site says accurate, consistent, and trustworthy?

- **Accuracy** — package details, pricing structure, and inclusions match what is actually offered.
- **Consistency** — terminology, tone, and structure match 10-content-and-seo-strategy.md across every page and package.
- **Grammar** — content is free of errors that would undermine the credibility a 47-year operating history is meant to convey.
- **Trustworthiness** — claims are specific and verifiable rather than vague, in keeping with the brand's transparency values.
- **Freshness** — content reflects current offerings; outdated packages, prices, or dates are treated as defects, not editorial oversights.

### 3.7 Data Quality

**Question:** Is the information the site stores and displays correct and dependable?

- **Integrity** — data is not corrupted, duplicated, or lost as it moves through the system defined in 08-data-architecture.md.
- **Validation** — data entering the system (enquiries, form submissions) is checked against expected shape and constraints before being trusted.
- **Completeness** — required data is never silently partial.
- **Consistency** — the same underlying data is represented identically wherever it appears.

### 3.8 API Quality

**Question:** Does the system's data layer behave exactly as promised?

- **Contract Compliance** — every request and response matches 09-api-contract.md precisely; deviation is a defect regardless of whether it currently causes visible symptoms.
- **Error Handling** — failures are communicated clearly and consistently, never as an unexplained broken state on the front end.
- **Backward Compatibility** — changes to the API do not silently break functionality that depends on its current contract.

### 3.9 Operational Quality

**Question:** Is the site ready to be run, not just ready to be launched?

- **Deployment Readiness** — a release can be shipped following the philosophy defined in 11-deployment-and-operations.md without undocumented manual steps.
- **Recovery Readiness** — the team can reverse a bad change without prolonged downtime or data loss.
- **Monitoring Readiness** — the team can tell, without waiting for a customer complaint, that something has gone wrong.

### 3.10 Security Quality

**Question:** Is traveller data and system integrity protected by default?

- **Safe Defaults** — the system behaves securely without requiring a deliberate configuration step to become safe.
- **Input Validation** — all data entering the system is treated as untrusted until validated.
- **Data Protection** — traveller-submitted information (names, contact details, enquiry content) is handled with a level of care proportionate to its sensitivity.
- **Least Privilege** — every part of the system has access to only what it needs, and no more.

---

## 4. Verification Philosophy

Verification is the disciplined act of confirming that the dimensions in Section 3 are actually present in the live product. This section defines the concepts that verification is built on — not the procedures or tools used to carry it out.

| Concept | Principle |
|---|---|
| **Verification Before Release** | Nothing reaches a traveller without having been checked against the standards in this document; verification is a precondition of release, not a follow-up activity. |
| **Regression Prevention** | Every change is checked not only for whether it achieves its own goal, but for whether it silently damages something that already worked. |
| **Smoke Verification** | Before deeper checks begin, the site's most critical paths — viewing a package, starting an enquiry, reaching contact channels — are confirmed to function at all. |
| **Exploratory Verification** | Beyond scripted expectations, the site is used the way a real, unpredictable traveller would use it, deliberately looking for what a fixed checklist would miss. |
| **Edge Cases** | Behaviour is verified at the boundaries — the longest package name, the traveller with no prior data, the slowest realistic connection — not only in the average case. |
| **Negative Scenarios** | The site's behaviour under invalid input, failed submissions, and unavailable services is verified as carefully as its behaviour under ideal conditions. |
| **Production Verification** | Confirming correctness in a staging environment is not sufficient; the live, real-world environment is checked directly after release. |
| **Documentation Verification** | The live site is checked against 01–11 as a source of truth; where they diverge, the divergence is treated as a defect until resolved deliberately. |

Verification is a shared responsibility, not a single role's job. Designers verify that build matches design intent. Developers verify that behaviour matches the contracts and principles defined across this documentation set. Content owners verify accuracy and freshness. No dimension of quality belongs to exactly one person, because no dimension can be fully assessed from only one vantage point.

---

## 5. Release Readiness

A release is not "ready" because the primary feature works. It is ready when the following conditions are all satisfied. This is the release readiness standard for the Sangam Tours website; it applies equally to the initial launch and to every subsequent release.

| Condition | What "Satisfied" Means |
|---|---|
| **Functionality Complete** | Every feature included in the release behaves as intended across its primary path, edge cases, and failure states. |
| **Documentation Updated** | Any change to behaviour, content structure, or data shape is reflected in the relevant document (01–11) before or alongside release, not after. |
| **Accessibility Verified** | The dimensions defined in Section 3.4 have been checked for anything new or changed in this release. |
| **Content Reviewed** | New or changed content has been checked against 10-content-and-seo-strategy.md for accuracy, consistency, and tone. |
| **Operational Readiness** | The release can be deployed, monitored, and — if necessary — rolled back, per the philosophy in 11-deployment-and-operations.md. |
| **Rollback Confirmed** | A path back to the previous known-good state exists and has been reasoned through before release, not improvised after a failure. |
| **Unresolved Issues Evaluated** | Every known open issue at release time has been consciously reviewed and classified — accepted as non-blocking, scheduled for immediate follow-up, or resolved — never simply forgotten. |
| **Approval Process** | A designated owner has reviewed the release against this document and formally signed off; no release reaches production on the basis of "it looks fine." |

A release that satisfies every condition except one is not ready. Release readiness is a threshold to be met, not an average to be approximated.

---

## 6. Defect Management Philosophy

A defect is any gap between what this documentation set defines as correct and what the live site actually does — whether or not that gap is currently visible to a user.

**Severity** reflects impact on the traveller and the business, not effort to fix. A visually minor issue that breaks trust signals on a package page (for example, an incorrect Included/Not Included list) can outrank a larger but cosmetically invisible backend inefficiency.

**Prioritisation** weighs severity against how many travellers are affected and how central the affected path is to the enquiry journey described in 02-user-personas.md. Defects on the path from ad click to enquiry submission are treated as inherently higher priority than defects on peripheral pages.

**Root Cause Analysis** looks past the symptom to the underlying gap — in design, in documentation, in implementation, or in the verification process itself — that allowed the defect to occur. A defect fixed without understanding its cause is likely to recur in a different form.

**Regression Prevention** treats every resolved defect as a candidate for a permanent check, so the same failure mode does not need to be rediscovered manually in a future release.

**Documentation Updates** follow every defect resolution where the root cause traces back to an ambiguity or gap in 01–11; the documentation is corrected so the same misunderstanding cannot recur.

**Continuous Improvement** means defect patterns are reviewed periodically, not only individually — recurring categories of defect (for example, repeated accessibility gaps, or repeated content inconsistencies) indicate a process gap that needs addressing at its source, not a string of unrelated incidents.

---

## 7. Quality Governance

| Area | Standard |
|---|---|
| **Ownership** | Every dimension of quality in Section 3 has a designated owner responsible for its standard being upheld — not necessarily the person who executes every check, but the person accountable for the outcome. |
| **Review Responsibilities** | Design changes are reviewed against 05–07; content changes against 10; data and API changes against 08–09; every change against this document. |
| **Acceptance Criteria** | Every feature or change is defined with acceptance criteria derived from this document before work begins, not written retroactively to match what was built. |
| **Documentation Maintenance** | This document, and the eleven that precede it, are living references. They are updated whenever the product's understanding of correct behaviour changes — outdated documentation is treated as a quality risk in its own right. |
| **Periodic Quality Reviews** | The site is reviewed against the full dimension set in Section 3 on a recurring basis, independent of any single release, to catch drift that accumulates gradually rather than arriving with one change. |
| **Release Sign-Off Philosophy** | Sign-off is a considered judgment against Section 5, made by someone accountable for the outcome — never a formality applied automatically because a deadline has arrived. |

---

## 8. AI Quality Rules

These rules govern how any AI coding agent (including Cursor) working on this project must reason about quality. They apply to every change, regardless of size.

1. Never assume functionality works without verifying it against the relevant document (01–11) and this one.
2. Never introduce behaviour that is not documented anywhere in 01–11 — if a change requires new behaviour, propose the documentation update alongside it.
3. Never silently ignore a failing validation, check, or constraint in order to make a task appear complete.
4. Always verify new or changed work against the previous documentation before considering it finished.
5. Never sacrifice accessibility for visual polish, animation, or development speed.
6. Preserve the API contract defined in 09-api-contract.md exactly; treat any deviation as a breaking change requiring explicit review.
7. Preserve design consistency with 05-design-system.md and 06-component-library.md; do not introduce one-off patterns.
8. Verify before claiming completion — a task is not "done" because code was written, but because it was checked against the standard it was meant to meet.
9. Flag uncertainty explicitly rather than presenting an assumption as a verified fact.
10. Prefer correctness over speed; a fast but incorrect change creates more work than a slower correct one.
11. Never knowingly introduce a regression, even to resolve an unrelated issue quickly.
12. Treat documentation as part of the product — an undocumented change is an incomplete change.
13. Never remove or weaken an accessibility, security, or data-validation safeguard without explicit review.
14. When a requirement is ambiguous, resolve the ambiguity against the principles in Section 2 rather than choosing the easiest interpretation.
15. Never present partially-verified work as fully verified.
16. Treat every one of the dimensions in Section 3 as relevant to every change — a "backend-only" or "content-only" change can still affect performance, data quality, or accessibility.
17. Never bypass the release readiness conditions in Section 5, even under time pressure.
18. When fixing a defect, address the root cause identified in Section 6, not only the visible symptom.
19. Never assume a previous verification still holds after a later change — re-verify affected areas.
20. Keep visual, functional, and content changes traceable to a specific requirement in 01–11 or an explicitly agreed exception.
21. Never optimise for a metric (speed, code brevity, novelty) at the expense of a principle in Section 2.
22. Treat edge cases and negative scenarios as part of the definition of "done," not as optional extras.
23. When documentation and implementation disagree, raise the conflict rather than silently picking one side.
24. Never assume a fix is complete without considering whether it could have introduced a new regression elsewhere.
25. Hold every change — regardless of who or what authored it — to the same standard defined in this document; no change is exempt because it was small, urgent, or AI-generated.

---

## 9. Key Takeaways

- Quality is judged by outcome for the traveller, not by whether code executes without error; testing is one input to quality, not its definition.
- Ten distinct dimensions — functional, experience, visual, accessibility, performance, content, data, API, operational, and security — together define what "quality" means for this project; a release strong in some dimensions and weak in others is not a quality release.
- Verification is a continuous, shared discipline built on prevention, regression awareness, and checking against documentation as the source of truth — not a one-time gate before launch.
- A release is ready only when every condition in Section 5 is met simultaneously; readiness is a threshold, not an average.
- Defects are managed by understanding root cause and business impact, with resolution feeding back into documentation so the same gap cannot recur.
- Governance assigns clear ownership for every dimension of quality and treats documentation itself as something that must stay current to remain trustworthy.
- This document, together with 01–11, is intended to remain valid regardless of the specific tools, frameworks, or platforms used to build and test the site — quality, as defined here, does not expire when the technology changes.