# Production operations (implementation)

**Companion to:** Document 11 (philosophy) and Document 12 (release readiness).  
**Scope:** How this Next.js app is configured, deployed, verified, and rolled back. Platform-agnostic standards live in Doc 11; this file records the current mechanics.

## Environments

| Environment | Purpose | Notes |
|---|---|---|
| Local | Development | `npm run dev` in `app/` |
| Preview / staging | Pre-production verification | Same build artifact as production |
| Production | Visitor-facing site | `CONTENT_SOURCE=local` (or future CMS adapter) |

Work-in-progress never reaches production outside the release process (Document 11 §3).

## Configuration

Copy `app/.env.example` → `app/.env.local` when overrides are needed.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended in production | Absolute origin for canonicals, Open Graph, sitemap, robots (e.g. `https://www.sangamtours.com`) |
| `CONTENT_SOURCE` | No (default `local`) | `local` \| `empty`. `empty` is for EmptyState regression only and is **blocked in production**. |

Secrets must not be committed. Client-exposed values use the `NEXT_PUBLIC_` prefix only.

## Build & run

From `app/`:

```bash
npm ci
npm run lint
npm run test
npm run build
npm run start
```

Full verification (unit + e2e against a production build):

```bash
npm run test:all
# or
npm run verify:production
```

## Health check

`GET /api/health` returns `{ ok: true, status: "healthy", ... }` with `Cache-Control: no-store`.  
Use for uptime probes. It does not expose catalogue or enquiry data.

## Security headers

`next.config.ts` sets site-wide:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera/microphone/geolocation/payment disabled)
- `Strict-Transport-Security` (HTTPS hosts)
- `poweredByHeader: false`

Immutable assets under `/brand` and `/_next/static` keep long-cache headers.

## Logging

`src/lib/logger.ts` emits JSON lines to stdout/stderr.

- Route / global errors log `digest` and error `name` only.
- Enquiry failures log API **category** and safe message — never name, phone, email, or free-text message (Document 09 §6).

Wire host log drains (Vercel/Logflare/etc.) to these streams; do not invent visitor analytics unless documented.

## Deploy (current recommendation)

Platform-agnostic standard: deploy the **same** `npm run build` artifact via the host’s promotion path.

Typical Vercel flow:

1. Connect the repository; set Root Directory to `app`.
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
3. Leave `CONTENT_SOURCE` unset or `local`.
4. Promote a preview deployment only after Document 12 release checklist sign-off.
5. **Rollback** = redeploy the previous known-good deployment in the host UI (Document 11 §3 Rollback Readiness). Confirm the path before each release.

## Post-deploy smoke (Document 11 §4.3)

Immediately after production promotion:

1. `/` loads with brand + primary CTA chrome.
2. `/domestic` and `/international` reachable (EmptyState OK until packages exist).
3. `/contact` shows Call / WhatsApp paths.
4. `/api/health` returns `ok: true`.
5. `/robots.txt` and `/sitemap.xml` reachable.
6. No new error spikes in host logs.

## Monitoring assumptions

Document 11 monitoring is operational health (reachability, errors, incidents) — **not** marketing analytics. No GA/GTM/PostHog is included. Add analytics only after an explicit documentation update.

## Incident response (summary)

1. Restore visitor service first (rollback if needed).
2. Record what happened, impact, resolution, and prevention (Document 11 §4.7).
3. Do not silently patch production outside the release process.
