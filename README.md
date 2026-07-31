# Sangam Tours — Project Documentation

## 1. Welcome

This repository contains the complete architecture, design, engineering methodology, and implementation guidance for the **Sangam Tours** website.

It is not a code repository first — it is a **documentation system** first. Every design decision, every component, every API contract, and every line of implementation should be derived from the documentation contained here.

If you are new to this project, this README is your starting point. Read it fully before opening any other file.

---

## 2. Project Vision

Sangam Tours is building a modern, trustworthy, premium travel website — one that reflects a long-standing offline reputation while delivering a digital experience worthy of that trust.

The documentation in this repository exists to translate that vision into a consistent, well-governed product: a site that feels credible to families, senior citizens, couples, groups, solo travellers, and corporate clients alike, and that can be built and extended without losing coherence over time.

---

## 3. Documentation Philosophy

This project is governed by a small set of non-negotiable principles:

- **Documentation First** — nothing is built before it is documented.
- **Architecture Before Code** — structure and rules precede implementation.
- **Quality By Design** — quality is planned, not inspected in afterward.
- **Consistency Over Convenience** — shared standards beat local shortcuts.
- **AI-Assisted Engineering** — documentation is written to be machine-readable and agent-navigable, not just human-readable.
- **Long-Term Maintainability** — decisions are made to survive team and tooling changes.

Documentation is treated as the **source of truth**. Where code and documentation disagree, documentation wins until it is deliberately updated.

---

## 4. Documentation Structure

The documentation is organized into a single directional hierarchy — each layer builds on the one before it:

```
Business (01)
    ↓
Users (02)
    ↓
Architecture (03)
    ↓
Design (04–07)
    ↓
Data (08)
    ↓
API (09)
    ↓
Content (10)
    ↓
Operations (11)
    ↓
Quality (12)
    ↓
Engineering (13)
```

Each document owns exactly **one domain** and does not overlap with another. If a rule seems to belong in two places, it belongs in only one — consult `ARCHITECTURE_INDEX.md` to find which.

---

## 5. Documentation Library

| File | Purpose |
|---|---|
| **ARCHITECTURE_INDEX.md** | Master navigation guide — where to look before making any decision |
| **01-brand-strategy.md** | Brand identity, voice, values, and positioning |
| **02-user-personas.md** | Target users, goals, pain points, and journeys |
| **03-information-architecture.md** | Sitemap, navigation, URL structure, and user flows |
| **04-wireframes.md** | Page-level layout and content blocks |
| **05-design-system.md** | Color, typography, spacing, and motion tokens |
| **06-component-library.md** | Reusable UI components and their states |
| **07-experience-guidelines.md** | Interaction, motion, and emotional experience principles |
| **08-data-architecture.md** | Content models, fields, and relationships |
| **09-api-contract.md** | API resources, requests, responses, and errors |
| **10-content-and-seo-strategy.md** | Writing rules, content strategy, and SEO principles |
| **11-deployment-and-operations.md** | Release, monitoring, incident, and maintenance process |
| **12-quality-assurance.md** | Quality dimensions, verification, and release readiness |
| **13-ai-development-playbook.md** | Engineering workflow and AI decision-making process |

---

## 6. How to Use This Repository

### For a new developer
```
README
   ↓
ARCHITECTURE_INDEX
   ↓
Relevant documents (per task)
   ↓
Implementation
```

### For AI agents
```
README
   ↓
ARCHITECTURE_INDEX
   ↓
Identify governing documents
   ↓
Read them
   ↓
Follow AI Development Playbook (13)
   ↓
Verify against Quality Assurance (12)
```

### For designers
Start with the Design & Experience set (`04–07`) after reading Brand Strategy (`01`) and User Personas (`02`) for context. Never introduce a new visual pattern without checking whether the Design System (`05`) or Component Library (`06`) already defines it.

### For QA
Start with Quality Assurance (`12`), then cross-reference the document that governs the feature under test — the Decision Matrix in `ARCHITECTURE_INDEX.md` will point you to it directly.

### For content editors
Start with Brand Strategy (`01`) and User Personas (`02`) for voice and audience, then work from Content & SEO Strategy (`10`) for writing rules per page type.

---

## 7. Documentation Principles

- One source of truth per decision.
- One responsibility per document — no overlapping ownership.
- No undocumented behavior.
- Documentation evolves with the product; it is never left stale.
- No implementation before understanding.
- Quality is verified before release, not assumed.
- Consistency is maintained across the entire system.
- Architecture governs implementation — not the other way around.

---

## 8. Contribution Philosophy

- **Understand before changing.** Read the governing document before proposing or making a change.
- **Read governing documentation first.** Use `ARCHITECTURE_INDEX.md` to identify it.
- **Keep documentation synchronized.** If a change affects a documented rule, the documentation is updated alongside it.
- **Respect architectural boundaries.** Do not solve a design problem in the API contract, or a content problem in the component library.
- **Prefer consistency.** A consistent, documented pattern is preferred over a locally "better" one.
- **Document significant decisions.** Undocumented decisions are treated as if they don't exist.
- **Verify before completion.** No change is finished until it has been checked against Quality Assurance (`12`).

---

## 9. Repository Philosophy

This documentation exists because:

- **Long-term maintainability** requires decisions to outlive the people who made them.
- **Knowledge preservation** means intent is not lost when context is lost.
- **AI collaboration** requires structured, navigable, unambiguous documentation — not tribal knowledge.
- **Architectural drift** is prevented by making the source of truth explicit and singular.
- **Engineering decisions** become repeatable rather than reinvented on every task.
- **Business intent** — the reasons behind the product — stays alive as the team and tooling change.

This repository is designed so that both humans and AI agents can operate on it with the same reliability.

---

## 10. Quick Start

| Path | Sequence |
|---|---|
| **New Engineer** | README → ARCHITECTURE_INDEX → relevant documents → development |
| **New Designer** | README → 01–07 |
| **New QA** | README → 12 → 13 |
| **New AI Agent** | README → ARCHITECTURE_INDEX → relevant documents → 13 → 12 |

### Application & production operations

The Next.js application lives in `app/`. Implementation runbooks (not constitution documents):

- [`docs/implementation/production-operations.md`](docs/implementation/production-operations.md) — env, deploy, health, rollback, logging
- [`docs/implementation/release-checklist.md`](docs/implementation/release-checklist.md) — Document 12 §5 mapped checklist

From `app/`: `npm ci && npm run verify:production`

---

## 11. Final Notes

This documentation is not supplementary material — **it is the project**.

Every implementation should strengthen the documentation, not drift away from it. When in doubt, the documentation is right until it is deliberately changed. Start at `ARCHITECTURE_INDEX.md` for your next step.