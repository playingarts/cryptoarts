# Playing Arts Modernization Plan

> Branch: `refactor/structural-improvements`
> Created: 2026-01-06

## Current State Assessment

| Area | Status | Notes |
|------|--------|-------|
| Next.js | 15.5.9 | Current stable |
| React | 19.0.0 | Needs minor bump to 19.2.3 |
| TypeScript | 5.7.2 | Good |
| Bundle (First Load) | 120-248 kB | No budget enforcement |
| Security Headers | Missing | Only HSTS present |
| CI Pipeline | Basic | No build/bundle checks |
| API Security | Minimal | No rate limiting |

---

## 1. Modern Web Standard Checklist

### Performance
- [ ] **P1**: Bundle size budget: First Load JS < 150 kB (currently 120-248 kB)
- [ ] **P2**: Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **P3**: Use `next/font` for Google Fonts (eliminate render-blocking)
- [ ] **P4**: Migrate `images.domains` to `remotePatterns` (deprecated config)
- [ ] **P5**: Add bundle analyzer CI gate

### Security
- [x] **S1**: HTTPS enforced (Vercel handles HSTS)
- [ ] **S2**: Content-Security-Policy header
- [ ] **S3**: X-Frame-Options: DENY
- [ ] **S4**: X-Content-Type-Options: nosniff
- [ ] **S5**: Referrer-Policy: strict-origin-when-cross-origin
- [ ] **S6**: Permissions-Policy (disable unnecessary APIs)
- [ ] **S7**: Rate limiting on API endpoints
- [ ] **S8**: Remove deprecated express-graphql (use graphql-http)

### Reliability & Observability
- [ ] **R1**: Error boundary with reporting (partial - ErrorBoundary exists)
- [ ] **R2**: API error logging standardization
- [ ] **R3**: Health check endpoint
- [ ] **R4**: Structured logging for API routes

### Upgrade Readiness
- [ ] **U1**: Remove deprecated configs (images.domains)
- [ ] **U2**: Pin dependency strategy documented
- [ ] **U3**: Remove unused .eslintrc file (migrated to flat config)
- [ ] **U4**: Update React to 19.2.3
- [ ] **U5**: Update minor dependencies

### DX Guardrails
- [x] **D1**: TypeScript strict mode
- [x] **D2**: ESLint in CI
- [ ] **D3**: Build step in CI
- [ ] **D4**: Bundle size CI gate
- [ ] **D5**: Smoke tests in CI (optional - already exists locally)

---

## 2. Execution Plan (8 PRs)

### PR #1: Security Headers & Config Cleanup (HIGH IMPACT / LOW RISK)
**Goal**: Add security headers via Next.js config, clean up deprecated configs

**Files**:
- `next.config.js` - Add headers, migrate images.domains to remotePatterns
- `.eslintrc` - Delete (migrated to flat config)

**Risk**: Low - headers are additive, config changes are backwards compatible

**Acceptance Criteria**:
- All security headers present in response: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- `images.remotePatterns` replaces `images.domains`
- No `.eslintrc` file

**Verification**:
```bash
yarn build
yarn lint
curl -sI https://dev.playingarts.com | grep -E "x-frame|content-security|x-content-type|referrer-policy"
```

---

### PR #2: CI Pipeline Hardening
**Goal**: Add build step, bundle size tracking to CI

**Files**:
- `.github/workflows/ci.yml` - Add build step, bundle size output

**Risk**: Low - CI-only changes, no runtime impact

**Acceptance Criteria**:
- CI runs `yarn build`
- Build output shows bundle sizes
- CI fails if build fails

**Verification**: Push and verify CI passes with build step

---

### PR #3: Font Optimization with next/font
**Goal**: Replace external Google Fonts with next/font for better performance

**Files**:
- `pages/_document.tsx` - Remove external font links
- `pages/_app.tsx` or new font config - Add next/font setup
- `styles/theme/typography.ts` - Update font family references

**Risk**: Medium - visual changes possible, needs QA

**Acceptance Criteria**:
- No external Google Font requests on page load
- Fonts self-hosted via next/font
- No FOUT (flash of unstyled text)

**Verification**:
```bash
yarn build
# Check network tab - no fonts.googleapis.com requests
```

---

### PR #4: API Rate Limiting
**Goal**: Add rate limiting to public API endpoints

**Files**:
- `pages/api/v1/newsletter.ts` - Add rate limiting
- `pages/api/v1/graphql.ts` - Add rate limiting
- `lib/rateLimit.ts` (new) - Shared rate limiting utility

**Risk**: Medium - could block legitimate users if misconfigured

**Acceptance Criteria**:
- Newsletter endpoint: 5 requests/minute per IP
- GraphQL endpoint: 100 requests/minute per IP
- Returns 429 with Retry-After header when exceeded

**Verification**: Manual testing with curl loop

---

### PR #5: Replace express-graphql with graphql-http
**Goal**: Remove deprecated express-graphql package

**Files**:
- `pages/api/v1/graphql.ts` - Migrate to graphql-http
- `package.json` - Remove express-graphql, add graphql-http

**Risk**: Medium - GraphQL is core functionality

**Acceptance Criteria**:
- GraphQL endpoint works identically
- express-graphql removed from dependencies
- All existing queries work

**Verification**:
```bash
yarn test:smoke
curl -X POST https://dev.playingarts.com/api/v1/graphql -H "Content-Type: application/json" -d '{"query":"{ decks { _id } }"}'
```

---

### PR #6: Dependency Updates (Minor/Patch)
**Goal**: Update safe dependencies

**Files**:
- `package.json`
- `yarn.lock`

**Risk**: Low - only minor/patch updates

**Acceptance Criteria**:
- React 19.0.0 -> 19.2.3
- react-dom 19.0.0 -> 19.2.3
- All minor dependency updates applied
- Build passes, tests pass

**Verification**:
```bash
yarn install
yarn build
yarn test --ci
```

---

### PR #7: Bundle Size Budget Enforcement
**Goal**: Add CI gate for bundle size regression

**Files**:
- `.github/workflows/ci.yml` - Add bundle size check
- `scripts/check-bundle-size.js` (new) - Budget enforcement script

**Risk**: Low - CI-only, informational initially

**Acceptance Criteria**:
- CI reports bundle sizes
- Warning if First Load JS > 150 kB for any route
- Fail CI if First Load JS > 200 kB (configurable)

**Verification**: Push oversized bundle, verify CI warns/fails

---

### PR #8: Health Check & Observability
**Goal**: Add health check endpoint, structured API logging

**Files**:
- `pages/api/health.ts` (new) - Health check endpoint
- `lib/apiLogger.ts` (new) - Structured logging utility
- `pages/api/v1/graphql.ts` - Add request logging
- `pages/api/v1/newsletter.ts` - Add request logging

**Risk**: Low - additive changes

**Acceptance Criteria**:
- GET /api/health returns { status: "ok", version: "1.0.1" }
- API requests logged with: timestamp, method, path, duration, status
- Logs are JSON formatted

**Verification**:
```bash
curl https://dev.playingarts.com/api/health
# Check Vercel logs for structured output
```

---

## 3. Priority Order

| Priority | PR | Impact | Risk | Dependencies |
|----------|-----|--------|------|--------------|
| 1 | PR #1: Security Headers | High | Low | None |
| 2 | PR #2: CI Hardening | High | Low | None |
| 3 | PR #5: Replace express-graphql | High | Medium | None |
| 4 | PR #4: Rate Limiting | Medium | Medium | None |
| 5 | PR #3: Font Optimization | Medium | Medium | None |
| 6 | PR #6: Dependency Updates | Medium | Low | PR #5 |
| 7 | PR #7: Bundle Budget | Medium | Low | PR #2 |
| 8 | PR #8: Health/Observability | Low | Low | None |

---

## Success Metrics

After all PRs merged:
- [ ] SecurityHeaders.com score: A+
- [ ] Lighthouse Performance: > 90
- [ ] Bundle size: < 150 kB First Load JS
- [ ] CI catches: type errors, lint errors, build failures, bundle regressions
- [ ] Zero deprecated dependencies in use
