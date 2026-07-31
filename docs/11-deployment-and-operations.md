# Sangam Tours — Deployment & Operations Document

**Internal Reference Document | Version 1.0**
**Prepared for:** DevOps Architects, Site Reliability Engineers, Cloud Architects, Software Architects, Operations Leads, AI Coding Agents (Cursor), and future team members
**Companion to:** 01-brand-strategy.md, 02-user-personas.md, 03-information-architecture.md, 04-wireframes.md, 05-design-system.md, 06-component-library.md, 07-experience-guidelines.md, 08-data-architecture.md, 09-api-contract.md, 10-content-and-seo-strategy.md
**Purpose:** This document answers one question only: **how is the website deployed, operated, monitored, maintained, and kept reliable throughout its lifecycle?** It does not repeat brand voice, personas, structure, layouts, styling, component behaviour, data models, API behaviour, or content standards — those live in the companion documents. This document defines operational standards, not implementation.

---

## 1. Purpose

Ten documents precede this one, and each closed a different gap. 08-data-architecture.md defined what the site stores. 09-api-contract.md defined how software reads and writes it. 10-content-and-seo-strategy.md defined what gets published and how it should read. None of them answer what happens once a working version of the site needs to reach real visitors, and keep working, indefinitely, without anyone actively watching it every day.

That is a different discipline from everything before it. Architecture answers what a system *is*. Operations answers what happens *to* that system over time — how a change moves from finished work into something a visitor relies on, what happens when something breaks at 2 a.m., who is responsible for noticing, and how the site stays trustworthy on its hundredth deployment as reliably as it was on its first.

Deployment is only one part of operations, and a narrow one. Deployment is the act of releasing a change. Operations is everything that makes that act safe to repeat: the standards a release must meet before it happens, the verification that confirms it worked, the monitoring that notices when it didn't, the maintenance that keeps the system healthy between releases, and the governance that decides who is allowed to do any of this. A site that deploys cleanly but has no plan for what happens after is not operationally sound — it has simply not failed yet.

This document is deliberately distinguished from the implementation work that will eventually sit beside it:

- **This document** defines operational *philosophy and standards* — what "reliable," "safe," and "recoverable" mean for this site, independent of any platform.
- **Future implementation documentation** will define the *mechanics* — which hosting platform, which CI/CD pipeline, which monitoring tool, which commands run in which order. That work must satisfy the standards set here; it does not define them.

Every standard in this document is written to remain true regardless of which hosting provider, deployment pipeline, or monitoring stack is eventually chosen, and regardless of how those choices change in future years. A platform migration should never require rewriting this document — only the implementation documentation that sits underneath it.

---

## 2. Operational Principles

These principles govern every operational decision for the site, from the first deployment onward. Where a shortcut conflicts with a principle, the principle wins — the business depends on paid ad traffic converting reliably, and an unreliable site fails that dependency silently.

1. **Reliability First** — The site's job is to be available and correct when a visitor arrives from a paid ad. Every other operational concern is secondary to this.
2. **Simplicity** — The simplest process that reliably achieves the outcome is preferred over a more sophisticated one that is harder to reason about or recover from.
3. **Repeatability** — Any operational action performed once (a deployment, a rollback, a backup restore) must be performed the same way every time, producing the same result. Actions that depend on memory or improvisation are not repeatable.
4. **Predictability** — Nothing about how the site behaves in production should surprise the people operating it. Predictable failure is preferable to unpredictable success.
5. **Safe Deployments** — A deployment must never be allowed to leave the site in a broken or inconsistent state for visitors, even temporarily.
6. **Observability** — The operational state of the site (is it up, is it correct, is it fast) must be knowable without guessing, and without waiting for a visitor to report a problem.
7. **Recoverability** — Every operational action that changes production must have a known, tested way to be undone.
8. **Security Awareness** — Every operational process is designed assuming it could be misused or attacked, not only assuming good-faith use.
9. **Documentation-First** — An operational capability that is not documented does not reliably exist. Undocumented tribal knowledge is treated as a gap to close, not an asset to rely on.
10. **Automation Where Appropriate** — Repetitive, well-understood operational steps should be automated to reduce human error, but automation is never a substitute for understanding what it does.
11. **Least Surprise** — Operational processes should behave the way a careful operator would expect them to, without hidden side effects or silent exceptions.
12. **Continuous Improvement** — Every incident, near-miss, or manual workaround is treated as a signal to improve the process, not just to fix the immediate symptom.
13. **Minimal Production Footprint** — Only what is necessary to serve the live site runs in production. Debugging tools, test data, and temporary fixes do not accumulate there.
14. **Change Traceability** — Every change that reaches production can be traced back to what changed, why, and who approved it.
15. **Business Continuity Awareness** — Because the site is the primary conversion path for paid ad spend, operational decisions account for the cost of downtime, not just the cost of the fix.

---

## 3. Deployment Philosophy

Deployment is the mechanism by which finished, approved work becomes what a visitor sees. The following principles govern how that mechanism must behave, independent of which tooling eventually implements it.

- **Repeatable Deployments** — Releasing the same approved version twice must produce an identical result. A deployment that depends on manual, one-off steps is not acceptable as a standard process.
- **Versioned Releases** — Every deployment corresponds to a specific, identifiable version of the site. It must always be possible to state precisely what version is currently live, and what version preceded it.
- **Rollback Readiness** — Before any deployment proceeds, a way back to the previous working version must already exist and be known. Rollback readiness is a precondition of deployment, not an afterthought discovered during an incident.
- **Configuration Separate from Code** — Environment-specific values (API endpoints, credentials, feature toggles) are managed separately from the application itself, so the same release can move between environments without being rebuilt or rewritten.
- **Environment Separation** — Work-in-progress and experimentation happen in environments fully isolated from production. Nothing reaches a visitor-facing environment without having passed through the standard release process.
- **Deployment Validation** — A deployment is not considered complete the moment code is live; it is complete once it has been verified to work as intended (§4.3). "Deployed" and "verified" are distinct states.
- **Minimizing Downtime** — Deployments are designed so that visitors experience no interruption, or the shortest possible interruption, during a release. A deployment method that requires taking the site offline is treated as a last resort, not a default.
- **Small, Frequent Releases Over Large, Rare Ones** — Smaller changes released more often are easier to verify, easier to roll back, and easier to attribute if something goes wrong than large batched releases.
- **No Untested Path to Production** — Every change reaches production by the same validated route. There is no separate, faster, less-scrutinised path for "small" or "urgent" changes.

---

## 4. Operational Lifecycle

Every release moves through the same stages, regardless of its size. Skipping a stage is a deviation from standard, not a faster version of it.

### 4.1 Release Preparation

- The change is complete, reviewed, and matches what was approved — not a variation introduced late.
- The change has been validated against the standards defined in the companion documents it touches (data model, API contract, content standards, design system, as applicable).
- A rollback path for this specific release is confirmed before deployment begins.
- Anyone who needs to know a release is happening (per §7.1) has been informed.

### 4.2 Deployment

- The release is applied through the standard, repeatable process — never through direct, manual changes to the live environment (§5, rule 5 below and §8).
- The release is applied to a lower environment first wherever practical, and only promoted to production once confirmed there.
- If any step of the deployment process fails or behaves unexpectedly, the default response is to stop and roll back — not to push through and fix forward.

### 4.3 Verification

- Deployment and verification are separate steps. A release is not "done" until it has been verified.
- Verification confirms the site is reachable, core visitor journeys work (browsing packages, viewing a package detail, submitting an enquiry), and no new errors are occurring.
- Verification happens immediately after deployment, not left for the next person to notice.

### 4.4 Monitoring

- Once verified, the release enters ongoing monitoring — the continuous, passive confirmation that the site remains healthy between deployments (§6).
- Monitoring is not a one-time check; it is a standing responsibility for as long as the release is live.

### 4.5 Maintenance

- Routine maintenance (dependency updates, minor fixes, content or data corrections) follows the same release process as any other change — it is not exempt because it is "small."
- Maintenance is scheduled and tracked, not performed reactively only when something breaks.

### 4.6 Updates

- Larger, planned changes (new features, structural changes) follow release preparation in full, including a review against the relevant companion document(s) they affect.
- An update that changes a content model, API resource, or design pattern defined in an earlier document requires that document to be reconciled, not silently diverged from.

### 4.7 Incident Response

- An incident is any deviation from expected operation that visibly or measurably affects visitors.
- The first priority during an incident is restoring visitor-facing service, by rollback if necessary — root cause analysis follows restoration, not the reverse.
- Every incident is recorded: what happened, what was affected, how it was resolved, and what will prevent recurrence.

### 4.8 Retirement

- When a feature, page, or piece of functionality is retired, it is removed deliberately and traceably — not simply left unmaintained and unlinked.
- Retirement includes updating any companion document that referenced the retired capability, so documentation never describes something that no longer exists.

---

## 5. Reliability Principles

- **Availability** — The site is expected to be reachable and functioning at all times visitors may arrive from active ad campaigns, which in practice means continuously. Planned interruptions are minimized and, where unavoidable, scheduled for lowest-traffic periods.
- **Graceful Degradation** — If a non-essential part of the site fails (a gallery image, a testimonial feed), the core visitor journey — browsing packages and submitting an enquiry — must continue to function. A single failed component must never take down the whole experience.
- **Fault Tolerance** — The system is designed assuming individual parts will occasionally fail, and failure of one part should not cascade into failure of unrelated parts.
- **Recovery** — Every category of failure (bad deployment, data corruption, service outage) has a known recovery path, decided in advance rather than improvised during the failure.
- **Backup Philosophy** — Data that cannot be regenerated (packages, testimonials, enquiries, content) is backed up on a regular, predictable schedule, and restoring from a backup is a tested capability, not an assumed one.
- **Operational Resilience** — The system tolerates routine operational activity (deployments, maintenance, monitoring) without visitor-facing disruption; resilience is judged under normal operational load, not only under ideal conditions.
- **Minimizing User Disruption** — Every operational decision weighs its effect on a visitor mid-journey (browsing, filling an enquiry form) and prefers the option that least disrupts them.

---

## 6. Security & Operational Safety

- **Protecting Sensitive Data** — Visitor-submitted data (enquiries, contact details) and any operational credentials are handled as sensitive by default, with access limited to what a role genuinely requires.
- **Secret Management Principles** — Credentials, keys, and tokens are never stored alongside application code, never exposed in visitor-facing output, and never shared through insecure channels. Rotation is planned for, not indefinite.
- **Least Privilege** — Every person and every automated process is granted the minimum operational access needed to do its job, and no more. Broad or permanent elevated access is avoided.
- **Secure Configuration** — Production configuration defaults to the more restrictive, more secure option; conveniences that weaken security are reserved for non-production environments only.
- **Dependency Maintenance** — Third-party components the site relies on are kept current against known vulnerabilities on a regular cadence, not only after an incident.
- **Auditability** — Every change to production, and every access to sensitive data, can be traced to who did it and when.
- **Responsible Access** — Access to production is granted deliberately, reviewed periodically, and revoked promptly when no longer needed (e.g. a contributor leaving the project).

---

## 7. Operational Governance

### 7.1 Ownership & Responsibilities

- A named owner is responsible for the operational health of the site at any given time, even if day-to-day tasks are shared.
- Responsibility for deployment, monitoring response, and incident response is explicit, not assumed to be "whoever notices."

### 7.2 Documentation Maintenance

- Operational documentation (this document and its future implementation companions) is kept current with how the system actually runs. A discrepancy between documented process and actual process is treated as a defect to fix, not a detail to tolerate.

### 7.3 Operational Reviews

- The operational setup (deployment process, monitoring coverage, backup and recovery readiness) is reviewed periodically, independent of any specific incident, to confirm it still matches the standards in this document.

### 7.4 Release Approvals

- A release to production requires confirmation that release preparation (§4.1) is complete. No release reaches production without this confirmation, regardless of its size or urgency.

### 7.5 Change Management

- Every production change is traceable to a specific, described reason. Undocumented or unexplained changes to production are not permitted under any circumstance.
- Emergency changes follow an abbreviated version of the same process — they are never fully exempt from review and traceability.

### 7.6 Maintenance Philosophy

- Maintenance is treated as an ongoing responsibility with a regular cadence, not a task performed only in reaction to failure. A system maintained only reactively accumulates risk invisibly until it fails visibly.

---

## 8. AI Operations Rules

These rules govern how an AI coding agent (or any automated operational tool) may act on this project's production environment. They apply regardless of how urgent, small, or well-intentioned a requested change appears.

1. Never deploy a change that has not been documented and reviewed per §4.1.
2. Never bypass deployment validation (§3, §4.3) to save time.
3. Never expose secrets, credentials, or access tokens in code, output, logs, or conversation.
4. Always confirm a rollback path exists and is understood before deploying.
5. Never modify the production environment directly; all changes flow through the standard release process.
6. Keep environments (development, staging, production) strictly isolated from one another.
7. Never treat a deployment as complete until it has been verified per §4.3.
8. Prefer repeatable, documented processes over faster, improvised ones — even under time pressure.
9. Flag missing or outdated operational documentation instead of proceeding around the gap.
10. Never introduce an untested change directly to production "to save a step."
11. Never delete or overwrite backups, or reduce backup frequency, without explicit approval.
12. Never grant, escalate, or reuse access privileges beyond what a specific task requires.
13. Treat any request to skip verification, rollback readiness, or review as a signal to pause and confirm intent, not a routine instruction to follow.
14. Never resolve an incident by silently patching production without recording what happened (§4.7).
15. Assume any operational action might need to be undone, and confirm it can be before performing it.
16. Never introduce a new operational dependency (service, tool, integration) without documenting what it does and why it is needed.
17. Never make a change that contradicts a standard set in this document without first flagging the conflict.
18. Prefer small, isolated changes over large, bundled ones when operating on production.
19. Never assume prior operational context that has not been explicitly documented or confirmed.
20. When uncertain whether an action is safe to perform, do not perform it — surface the uncertainty instead.

---

## 9. Key Takeaways

- **Deployment philosophy:** every release is repeatable, versioned, validated, and rollback-ready before it happens — deployment is a controlled process, never an improvisation.
- **Operational mindset:** the lifecycle does not end at deployment. Preparation, verification, monitoring, maintenance, incident response, and retirement are all standing responsibilities, not one-time events.
- **Reliability:** the site is built to degrade gracefully, recover predictably, and disrupt visitors as little as possible, because its sole commercial purpose is converting paid traffic into enquiries.
- **Governance:** every production change is owned, traceable, reviewed, and documented — undocumented or unapproved changes to production are never acceptable, regardless of size or urgency.
- **Long-term maintainability:** these standards are written to remain valid regardless of hosting platform, deployment tooling, or monitoring stack, so that operational discipline survives every future technology change this project undergoes.