# Release checklist

Mapped to **Document 12 §5 Release Readiness**. A release is ready only when every row is satisfied (not averaged).

| Condition | Concrete check | Owner | Done |
|---|---|---|---|
| **Functionality Complete** | Primary paths + empty/error states verified: `npm run test:all` green; smoke packages/contact/FAQ/gallery journeys pass | Eng | ☐ |
| **Documentation Updated** | Behaviour/data/content changes reflected in docs 01–13 (or an explicit exception recorded) | Eng / Content | ☐ |
| **Accessibility Verified** | Playwright a11y suite (axe serious/critical) green on critical routes; skip link still works | Eng | ☐ |
| **Content Reviewed** | Published copy checked against Document 10 (no fabricated packages/testimonials; Akola pending left flagged) | Content | ☐ |
| **Operational Readiness** | Env vars set (`NEXT_PUBLIC_SITE_URL`); `CONTENT_SOURCE` not `empty` in production; `/api/health` OK; rollback path known | Eng / Ops | ☐ |
| **Rollback Confirmed** | Previous deployment identified in host UI before promote; restore steps understood | Ops | ☐ |
| **Unresolved Issues Evaluated** | Known gaps classified (accepted / follow-up / fixed) — e.g. empty package seed, enquiry not persisted yet | Product | ☐ |
| **Approval Process** | Named owner signs off against this checklist and Document 12 | Release approver | ☐ |

## Pre-promote commands (`app/`)

```bash
npm ci
npm run lint
npm run verify:production
```

## Post-promote

Follow smoke steps in [`production-operations.md`](./production-operations.md).

## Sign-off

- Release version / commit: ____________________
- Approver: ____________________
- Date: ____________________
