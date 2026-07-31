# ARCHITECTURE_INDEX.md

## Sangam Tours — Master Documentation Index

This document is the **navigation layer** for the Sangam Tours project documentation. It does not define architecture, design, content, or engineering standards — it tells you **where those definitions live**.

---

## 1. Purpose

- The Sangam Tours documentation is split across 13 documents because each document owns a single domain of decision-making (brand, users, structure, design, data, API, content, operations, quality, engineering). Splitting prevents conflicting or duplicated rules.
- Every engineer, designer, content writer, and AI agent should **begin here** before opening any individual document — this index tells you which file governs the decision in front of you.
- Use this document to avoid: guessing which file is authoritative, duplicating standards already defined elsewhere, or making changes that conflict with an existing document.
- This file answers one question only: **"Where should I look before making any decision?"**

---

## 2. Documentation Reading Order

```
01 Brand Strategy
   ↓
02 User Personas
   ↓
03 Information Architecture
   ↓
04 Wireframes
   ↓
05 Design System
   ↓
06 Component Library
   ↓
07 Experience Guidelines
   ↓
08 Data Architecture
   ↓
09 API Contract
   ↓
10 Content & SEO Strategy
   ↓
11 Deployment & Operations
   ↓
12 Quality Assurance
   ↓
13 AI Development Playbook
```

**Logic:** Business intent (01–02) → Structure (03–04) → Visual system (05–07) → Data & integration (08–09) → Content (10) → Operations & quality (11–12) → Engineering execution (13).

---

## 3. Documentation Map

| Document | Purpose | Read When |
|---|---|---|
| **01 – Brand Strategy** | Defines brand identity, voice, positioning, values, and AI design rules | Making any branding, tone, or messaging decision |
| **02 – User Personas** | Defines target users, goals, pain points, and journeys | Designing features, flows, or content for a specific audience |
| **03 – Information Architecture** | Defines sitemap, navigation, URL structure, and user flows | Adding/removing pages, changing navigation or site structure |
| **04 – Wireframes** | Defines page-level layout and content blocks | Building or modifying a page layout |
| **05 – Design System** | Defines color, typography, spacing, motion tokens | Styling any UI element |
| **06 – Component Library** | Defines reusable UI components and their states | Building, modifying, or reusing a component |
| **07 – Experience Guidelines** | Defines interaction, motion, and emotional experience principles | Designing interactions, transitions, or micro-experiences |
| **08 – Data Architecture** | Defines content models, fields, and relationships | Modifying data models, content types, or field structures |
| **09 – API Contract** | Defines API resources, requests, responses, and errors | Building, consuming, or modifying any API endpoint |
| **10 – Content & SEO Strategy** | Defines writing rules, page-type content strategy, SEO principles | Writing or editing on-site content, metadata |
| **11 – Deployment & Operations** | Defines release, monitoring, incident, and maintenance process | Deploying, releasing, or operating the live site |
| **12 – Quality Assurance** | Defines quality dimensions, verification, and release readiness | Testing, reviewing, or approving a release |
| **13 – AI Development Playbook** | Defines engineering workflow and AI decision-making process | Implementing any feature or code change |

---

## 4. Decision Matrix

| If you need to... | Read |
|---|---|
| Change brand voice or tone | 01 |
| Update mission/vision statement | 01 |
| Change target audience definition | 01 + 02 |
| Add a new user persona | 02 |
| Understand user pain points | 02 |
| Map a new user journey | 02 + 03 |
| Add a new page | 03 + 04 |
| Remove a page | 03 |
| Change primary navigation | 03 |
| Change footer navigation | 03 |
| Change mobile navigation | 03 |
| Modify URL structure | 03 |
| Add a new user flow | 03 |
| Change breadcrumb behaviour | 03 + 06 |
| Redesign the homepage layout | 04 |
| Redesign a package detail page | 04 |
| Change listing page layout | 04 |
| Add a new wireframe section | 04 + 03 |
| Change brand colors | 05 |
| Change typography scale | 05 |
| Change spacing/layout grid | 05 |
| Update iconography | 05 |
| Change elevation/shadow rules | 05 |
| Modify motion/animation tokens | 05 + 07 |
| Review accessibility color rules | 05 |
| Modify a component | 05 + 06 |
| Create a new component | 06 + 05 |
| Change CTA button behaviour | 06 |
| Change form input behaviour | 06 + 08 |
| Update card component design | 06 + 05 |
| Change header/footer components | 06 + 03 |
| Change interaction feel | 07 |
| Change scrolling behaviour | 07 |
| Change page transition | 07 |
| Add a delight moment | 07 |
| Review performance experience | 07 + 11 |
| Modify database/content model | 08 |
| Add a new content field | 08 |
| Change relationships between models | 08 |
| Update content validation rules | 08 + 12 |
| Change media/image handling | 08 + 05 |
| Change API endpoint | 08 + 09 |
| Add a new API resource | 09 + 08 |
| Change API request/response shape | 09 |
| Handle API errors | 09 |
| Version an API | 09 |
| Write homepage copy | 10 + 01 |
| Write package description | 10 + 08 |
| Write itinerary content | 10 |
| Write FAQ content | 10 + 08 |
| Write testimonial copy | 10 + 08 |
| Write image captions | 10 |
| Optimize a page for SEO | 10 |
| Update meta titles/descriptions | 10 + 08 |
| Deploy to production | 11 |
| Roll back a release | 11 |
| Set up monitoring | 11 |
| Handle a production incident | 11 |
| Plan a maintenance window | 11 |
| Retire a feature/page | 11 + 03 |
| Approve a release | 11 + 12 |
| Write/execute a test plan | 12 |
| Review accessibility compliance | 12 + 05 |
| Review visual quality | 12 + 05 |
| Review data quality | 12 + 08 |
| Review API quality | 12 + 09 |
| Review security posture | 12 + 11 |
| Manage a defect | 12 |
| Implement a new feature | 13 |
| Decide how to approach a change | 13 |
| Follow documentation-driven development | 13 |
| Apply change management rules | 13 + 11 |
| Verify work before completion | 13 + 12 |
| Add a new enquiry form field | 06 + 08 + 09 + 10 + 12 + 13 |
| Add a new package category | 08 + 03 + 10 |
| Launch a new landing page campaign | 03 + 04 + 10 |
| Change WhatsApp/Call CTA logic | 06 + 09 |
| Add a new testimonial | 08 + 10 |
| Add a new tour manager profile | 08 |
| Change legal/policy pages | 03 + 10 |
| Change social links | 08 |
| Update company/contact info | 08 + 10 |
| Improve page load performance | 07 + 11 + 12 |

---

## 5. Cross-Document Relationships

| Document Set | Relationship |
|---|---|
| **01 + 02** | Brand identity must align with real user needs and language |
| **03 + 04** | Site structure defines what wireframes must contain |
| **05 + 06 + 07** | Design tokens → components → experience form one continuous UI system |
| **06 + 08** | Form and data-driven components must match content model fields |
| **08 + 09** | API contracts expose the data architecture; they must stay in sync |
| **09 + 06** | Components consuming dynamic data must match API response shape |
| **10 + 01** | Content tone must reflect brand voice |
| **10 + 08** | Content fields (descriptions, FAQs, testimonials) map to data models |
| **11 + 12** | Deployment readiness is gated by quality verification |
| **12 + 13** | Engineering work is not complete until it passes quality verification |
| **13 + all** | The AI Playbook governs *how* every other document is applied during implementation |

---

## 6. Source of Truth Matrix

| Question | Source of Truth |
|---|---|
| Brand voice | 01 |
| Brand values | 01 |
| Mission/vision | 01 |
| Positioning statement | 01 |
| USP | 01 |
| Target audience segments | 01 + 02 |
| User personas | 02 |
| User pain points | 02 |
| Customer journey | 02 |
| Accessibility (UX intent) | 02 + 05 |
| Sitemap | 03 |
| Navigation structure | 03 |
| URL structure | 03 |
| User flows | 03 |
| CTA placement strategy | 03 |
| Internal linking | 03 |
| Homepage layout | 04 |
| Package detail layout | 04 |
| Listing page layout | 04 |
| Wireframe content blocks | 04 |
| Color system | 05 |
| Typography | 05 |
| Spacing/layout grid | 05 |
| Iconography | 05 |
| Elevation & shape | 05 |
| Motion tokens | 05 |
| Accessibility (visual contrast) | 05 |
| Component inventory | 06 |
| Component states/behaviour | 06 |
| Button behaviour | 06 |
| Form component rules | 06 |
| Card component structure | 06 |
| Interaction feel | 07 |
| Scroll behaviour | 07 |
| Motion philosophy | 07 |
| Emotional journey design | 07 |
| Delight moments | 07 |
| Performance experience intent | 07 |
| Content models | 08 |
| Field conventions | 08 |
| Model relationships | 08 |
| Content lifecycle | 08 |
| Media architecture | 08 |
| Content validation rules | 08 |
| Content governance | 08 |
| API resources | 09 |
| Request contract | 09 |
| Response contract | 09 |
| Error handling | 09 |
| API versioning | 09 |
| Page-type content strategy | 10 |
| Writing guidelines | 10 |
| SEO principles | 10 |
| Content governance (editorial) | 10 |
| Deployment philosophy | 11 |
| Release process | 11 |
| Monitoring approach | 11 |
| Incident response | 11 |
| Operational governance | 11 |
| Security & operational safety | 11 |
| Quality dimensions | 12 |
| Verification philosophy | 12 |
| Release readiness criteria | 12 |
| Defect management | 12 |
| Engineering workflow | 13 |
| Documentation-driven development | 13 |
| Decision-making framework | 13 |
| Change management (engineering) | 13 |
| AI decision checklist | 13 |

---

## 7. AI Navigation Workflow

For every task, an AI agent should follow this sequence:

```
1. Understand request
        ↓
2. Find governing documents  (use Section 4 — Decision Matrix)
        ↓
3. Read documents  (use Section 6 — Source of Truth to resolve ambiguity)
        ↓
4. Impact analysis  (check Section 5 — Cross-Document Relationships)
        ↓
5. Implementation  (apply rules from 13 — AI Development Playbook)
        ↓
6. Verification  (apply checks from 12 — Quality Assurance)
        ↓
7. Documentation update  (if scope changed, note it — do not silently diverge)
        ↓
8. Completion
```

**Rule:** Never implement a change without first identifying its governing document(s) via Section 4.

---

## 8. Quick Start Guide

| Role | Start With |
|---|---|
| **Designer** | 04 → 05 → 06 → 07 |
| **Frontend Developer** | 03 → 04 → 05 → 06 → 07 → 09 → 12 → 13 |
| **Backend Developer** | 08 → 09 → 11 → 12 → 13 |
| **Content Editor** | 01 → 02 → 10 |
| **QA Engineer** | 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11 → 12 |
| **Operations Engineer** | 11 → 12 → 13 |
| **AI Agent** | This document first → then relevant documents per Section 4 |

---

## 9. Key Takeaways

- **Hierarchy:** 01–02 (why/who) → 03–04 (structure) → 05–07 (design/experience) → 08–09 (data/API) → 10 (content) → 11–12 (operations/quality) → 13 (engineering execution).
- **Source of truth:** Every decision has exactly one governing document — resolve conflicts using Section 6, never by guessing.
- **Reading order matters:** Later documents assume the decisions made in earlier ones; do not read out of sequence when onboarding.
- **Decision lookup first:** Always consult Section 4 before making a change — it prevents duplicated or conflicting standards.
- **Documentation-first philosophy:** No implementation should begin without first identifying and reading its governing document(s). This index exists so that step never gets skipped.

---

*This document is a navigation aid only. It contains no architectural, design, or engineering decisions of its own. All authority rests in documents 01–13.*