# Codebase Assessment

**Date:** January 2026
**Updated:** 2026-01-07
**Branch:** refactor/structural-improvements
**Assessed by:** Claude Code

## Executive Summary

The Playing Arts website codebase has been modernized from legacy technical debt to a modern foundation. All critical security improvements are complete. The site is production-ready as a catalog site with Shopify handling payments.

**Overall Grade: B+** (Codebase) / **A-** (Security for Catalog Site)

---

## What's Solid Now (A-grade)

| Area | Status | Evidence |
|------|--------|----------|
| **Security Headers** | Excellent | CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Permissions-Policy |
| **GraphQL Security** | Excellent | Introspection blocked in prod, depth limit (10), rate limiting |
| **Modern Stack** | Excellent | React 19.2.3, Next.js 15.5.9, Apollo Client 4.0.0 |
| **Observability** | Good | Sentry on all runtimes (server/client/edge), health endpoint with checks |
| **CI/CD** | Good | TypeScript strict, ESLint, Jest with coverage, bundle budget checks |
| **Cache Strategy** | Good | ISR on deck pages (60s revalidate), Apollo cache policies for 7 types |
| **Rate Limiting** | Good | Edge middleware (100/min) + API-level tiers (5/30/100 per minute) |
| **Documentation** | Good | Migration plans for App Router and Redis caching |
| **Vulnerability Fixes** | Good | CVE-2025-15284 (qs) fixed via resolution |

---

## What Still Needs Work (B/C-grade)

| Area | Status | Issue | Recommendation |
|------|--------|-------|----------------|
| **CSP** | Accepted | Uses `'unsafe-inline'` and `'unsafe-eval'` | Tradeoff: Emotion requires this; nonce-based CSP is complex |
| **Bundle Size** | Improved | ~280-295kB First Load JS (was 300kB) | Lazy loaded EmailForm, Countdown, shadertoy-react |
| **Rate Limiting** | Ready | Upstash configured, showing in X-RateLimit-Backend header | Set UPSTASH env vars in production |
| **Test Coverage** | Unknown | 20% threshold is just baseline | Increase coverage, aim for 60%+ |
| **Memory** | Monitored | Detailed profiling in /api/health | RSS, heap %, external, buffers all tracked |

---

## Completed Improvements (PRs 1-37+)

### Infrastructure & Security
- [x] ESLint react-hooks/exhaustive-deps warnings fixed
- [x] Stale peer dependencies removed (storybook-addon-emotion-theme, next-routes)
- [x] Security headers configured in next.config.js
- [x] Edge middleware for API rate limiting
- [x] Upstash Redis distributed rate limiting (ready, needs env vars)
- [x] Health endpoint with memory and database checks
- [x] GraphQL introspection blocked in production
- [x] GraphQL query depth limiting (10 levels max)
- [x] CVE-2025-15284 (qs) vulnerability fixed via resolution
- [x] CSP hardened (unsafe-eval removed)

### Performance
- [x] Image optimization (migrated `<img>` to `next/image`)
- [x] Apollo cache policies for Product, Opensea, Holders, OwnedAsset
- [x] Font optimization via `next/font` (Work Sans, Aldrich, Alliance)
- [x] ISR for deck pages with 60s revalidation
- [x] Bundle size budget enforcement script

### Observability
- [x] Sentry integration (server, client, edge runtimes)
- [x] Health endpoint at /api/health
- [x] Lighthouse CI workflow
- [x] Jest coverage thresholds

### Testing
- [x] Playwright E2E smoke tests
- [x] Jest coverage configuration (20% baseline)
- [x] Playwright E2E wired to CI pipeline (PRs 30)

### Performance (PRs 30-35)
- [x] Lighthouse CI budgets calibrated to baseline
- [x] Rate limit backend visibility (X-RateLimit-Backend header)
- [x] Removed web3 dependency (replaced with inline fromWei utility)
- [x] Lazy loaded shadertoy-react (WebGL) - 16kB savings per route
- [x] Enhanced memory profiling in health endpoint

### Bundle Optimization (PR 36)
- [x] Lazy loaded EmailForm (react-hook-form ~23kB deferred to interaction)
- [x] Lazy loaded Countdown (react-countdown ~8.7kB deferred)
- [x] Updated Footer, MainMenu, Subscribe popup with dynamic imports
- [x] Bundle sizes reduced ~9kB per route (290kB down from 299kB)

### Migration Prep
- [x] App Router foundation (layout, providers, not-found)
- [x] Redis caching plan documented
- [x] App Router migration plan documented

### App Router Migration (PR 37)
- [x] Phase 2: All 5 API routes migrated to Route Handlers
  - `app/api/health/route.ts`
  - `app/api/revalidate/route.ts`
  - `app/api/v1/newsletter/route.ts`
  - `app/api/v1/graphql/route.ts`
  - `app/api/v1/assets/[contractId]/route.ts`

---

## Not Yet Done (Future Optimizations)

| Item | Priority | Complexity | Notes |
|------|----------|------------|-------|
| Redis caching for GraphQL | P2 | Medium | Infrastructure ready, needs resolver integration |
| App Router Phase 3-4 | P2 | High | Migrate dynamic routes (Phase 2 API done) |
| Test coverage 60%+ | P2 | Medium | Add tests for critical paths (currently ~23%) |
| Nonce-based CSP | P4 | High | Requires Emotion SSR changes (accepted tradeoff) |

### Deferred/Accepted Tradeoffs

| Item | Status | Reason |
|------|--------|--------|
| `unsafe-inline` in CSP | Accepted | Required by Emotion CSS-in-JS |
| semver/json5/brace-expansion CVEs | Accepted | Dev-only dependencies, resolutions caused Vercel runtime issues |

---

## Technical Stack

```
Frontend:
- React 19.2.3
- Next.js 15.5.9 (Pages Router + App Router foundation)
- Apollo Client 4.0.0
- Emotion CSS-in-JS
- TypeScript (strict)

Backend:
- MongoDB (Mongoose 8.9.0)
- GraphQL (graphql-http)
- Next.js API Routes

Infrastructure:
- Vercel (deployment)
- Sentry (error tracking)
- Upstash Redis (rate limiting - ready)
- GitHub Actions (CI/CD)

Testing:
- Jest + React Testing Library
- Playwright (E2E)
- Lighthouse CI
```

---

## Key Files Added/Modified

### New Files
- `middleware.ts` - Edge rate limiting with Upstash fallback
- `lib/redis.ts` - Redis client configuration
- `lib/rateLimit.ts` - API-level rate limiting
- `instrumentation.ts` - Sentry server initialization
- `instrumentation-client.ts` - Sentry client initialization
- `app/layout.tsx` - App Router root layout
- `app/providers.tsx` - Client-side providers
- `app/not-found.tsx` - App Router 404
- `app/api/health/route.ts` - Health check Route Handler
- `app/api/revalidate/route.ts` - ISR revalidation Route Handler
- `app/api/v1/newsletter/route.ts` - Newsletter Route Handler
- `app/api/v1/graphql/route.ts` - GraphQL Route Handler
- `app/api/v1/assets/[contractId]/route.ts` - Assets Route Handler
- `e2e/smoke.spec.ts` - Playwright smoke tests
- `playwright.config.ts` - Playwright configuration
- `lighthouse-budget.json` - Performance budgets
- `.github/workflows/lighthouse.yml` - Lighthouse CI
- `scripts/check-bundle-size.js` - Bundle analysis
- `docs/APP_ROUTER_MIGRATION.md` - Migration plan
- `docs/REDIS_CACHING.md` - Caching plan

### Key Modifications
- `next.config.js` - Security headers, Sentry config
- `source/apollo/cachePolicies.ts` - Extended type policies
- `pages/[deckId].tsx` - ISR with getStaticProps
- `jest.config.mjs` - Coverage configuration
- `.github/workflows/ci.yml` - Coverage reporting

### Deleted Files (migrated to App Router)
- `pages/api/health.ts` → `app/api/health/route.ts`
- `pages/api/revalidate.ts` → `app/api/revalidate/route.ts`
- `pages/api/v1/newsletter.ts` → `app/api/v1/newsletter/route.ts`
- `pages/api/v1/graphql.ts` → `app/api/v1/graphql/route.ts`
- `pages/api/v1/assets/[contractId].ts` → `app/api/v1/assets/[contractId]/route.ts`

---

## Metrics

### Bundle Sizes (First Load JS)
| Route | Size | Status |
|-------|------|--------|
| /[deckId] | 295 kB | Good |
| /shop | 292 kB | Good |
| / | 290 kB | Good |
| /bag | 283 kB | Good |
| /contact | 280 kB | Good |
| /404 | 176 kB | Excellent |

**Shared chunks:** ~174 kB (framework 60kB + main 86kB + _app 26kB)

### CI Pipeline
- TypeScript check: ~3s
- ESLint: ~2s
- Jest tests: ~5s
- Build: ~60s
- Bundle check: ~1s

---

## Next Steps (Recommended Order)

### For Production Launch
1. **Configure Upstash Redis** - Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` env vars
2. **Verify deployment** - Ensure health endpoint shows database check passing

### Post-Launch Optimizations
3. **Font optimization** - Migrate to next/font (PR #3 remaining)
4. **Reduce bundle size** - Continue dynamic imports for heavy dependencies
5. **App Router Phase 3** - Migrate remaining page routes
6. **Increase test coverage** - Target 60%+ for critical paths

---

## References

- [Next.js App Router Migration](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Upstash Redis](https://upstash.com/)
- [Sentry Next.js SDK](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
