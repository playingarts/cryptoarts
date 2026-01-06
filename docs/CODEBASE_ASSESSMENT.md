# Codebase Assessment

**Date:** January 2026
**Branch:** refactor/structural-improvements
**Assessed by:** Claude Code

## Executive Summary

The Playing Arts website codebase has been modernized from legacy technical debt to a modern foundation with a clear roadmap. The site is production-ready and maintainable.

**Overall Grade: B+**

---

## What's Solid Now (A-grade)

| Area | Status | Evidence |
|------|--------|----------|
| **Security Headers** | Excellent | CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Permissions-Policy |
| **Modern Stack** | Excellent | React 19.2.3, Next.js 15.5.9, Apollo Client 4.0.0 |
| **Observability** | Good | Sentry on all runtimes (server/client/edge), health endpoint with checks |
| **CI/CD** | Good | TypeScript strict, ESLint, Jest with coverage, bundle budget checks |
| **Cache Strategy** | Good | ISR on deck pages (60s revalidate), Apollo cache policies for 7 types |
| **Rate Limiting** | Good | Edge middleware (100/min) + API-level tiers (5/30/100 per minute) |
| **Documentation** | Good | Migration plans for App Router and Redis caching |

---

## What Still Needs Work (B/C-grade)

| Area | Status | Issue | Recommendation |
|------|--------|-------|----------------|
| **CSP** | Accepted | Uses `'unsafe-inline'` and `'unsafe-eval'` | Tradeoff: Emotion requires this; nonce-based CSP is complex |
| **Bundle Size** | Improved | ~380kB unique JS per route (was 395kB) | Further reduction via code-splitting possible |
| **Rate Limiting** | Ready | Upstash configured, showing in X-RateLimit-Backend header | Set UPSTASH env vars in production |
| **Test Coverage** | Unknown | 20% threshold is just baseline | Increase coverage, aim for 60%+ |
| **Memory** | Monitored | Detailed profiling in /api/health | RSS, heap %, external, buffers all tracked |

---

## Completed Improvements (PRs 1-35)

### Infrastructure & Security
- [x] ESLint react-hooks/exhaustive-deps warnings fixed
- [x] Stale peer dependencies removed (storybook-addon-emotion-theme, next-routes)
- [x] Security headers configured in next.config.js
- [x] Edge middleware for API rate limiting
- [x] Upstash Redis distributed rate limiting (ready, needs env vars)
- [x] Health endpoint with memory and database checks

### Performance
- [x] Image optimization (migrated `<img>` to `next/image`)
- [x] Apollo cache policies for Product, Opensea, Holders, OwnedAsset
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

### Migration Prep
- [x] App Router foundation (layout, providers, not-found)
- [x] Redis caching plan documented
- [x] App Router migration plan documented

---

## Not Yet Done

| Item | Priority | Complexity | Notes |
|------|----------|------------|-------|
| Nonce-based CSP | P0 | High | Requires Emotion SSR changes |
| Redis caching for GraphQL | P1 | Medium | Infrastructure ready, needs resolver integration |
| App Router Phase 2-4 | P2 | High | Migrate static pages, then dynamic routes |
| Bundle size reduction | P2 | Medium | Code-splitting, dynamic imports |
| Test coverage 60%+ | P2 | Medium | Add tests for critical paths |
| E2E tests in CI | P3 | Low | Add Playwright to workflow |

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
- `e2e/smoke.spec.ts` - Playwright smoke tests
- `playwright.config.ts` - Playwright configuration
- `lighthouse-budget.json` - Performance budgets
- `.github/workflows/lighthouse.yml` - Lighthouse CI
- `scripts/check-bundle-size.js` - Bundle analysis
- `docs/APP_ROUTER_MIGRATION.md` - Migration plan
- `docs/REDIS_CACHING.md` - Caching plan

### Key Modifications
- `next.config.js` - Security headers, Sentry config
- `pages/api/health.ts` - MongoDB connectivity check
- `source/apollo/cachePolicies.ts` - Extended type policies
- `pages/[deckId].tsx` - ISR with getStaticProps
- `jest.config.mjs` - Coverage configuration
- `.github/workflows/ci.yml` - Coverage reporting

---

## Metrics

### Bundle Sizes (per route, unique JS)
| Route | Size | Status |
|-------|------|--------|
| /[deckId] | 395 kB | At limit |
| /shop | 391 kB | At limit |
| / | 381 kB | At limit |
| /bag | 354 kB | OK |
| /contact | 336 kB | OK |
| /404 | 5 kB | Excellent |

**Shared chunks:** ~451 kB (framework + main)

### CI Pipeline
- TypeScript check: ~3s
- ESLint: ~2s
- Jest tests: ~5s
- Build: ~60s
- Bundle check: ~1s

---

## Next Steps (Recommended Order)

1. **Configure Upstash Redis** - Set env vars to enable distributed rate limiting
2. **Deploy and verify** - Ensure health endpoint shows database check
3. **Investigate memory** - Profile why heap usage is high
4. **Reduce bundle size** - Dynamic imports for heavy dependencies
5. **Nonce-based CSP** - Research Emotion SSR approach
6. **App Router Phase 2** - Migrate /contact and /privacy pages

---

## References

- [Next.js App Router Migration](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Upstash Redis](https://upstash.com/)
- [Sentry Next.js SDK](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
