# Post-Refactor Assessment

## Current State

| Area               | Status       | Notes                         |
|--------------------|--------------|-------------------------------|
| /new/ independence | ✅ 100%       | Zero imports from components/ |
| CI                 | ✅ Added      | Typecheck, lint, unit tests   |
| Smoke tests        | ✅ 14 tests   | Critical user flow covered    |
| Legacy components/ | ✅ 1 file     | Only SizeProvider remains     |
| Hooks              | ⚠️ Shared    | Used by both legacy and /new/ |
| Package versions   | ⚠️ Mixed     | Some major updates available  |

## Key Package Versions

| Package       | Current | Latest   | Risk   |
|---------------|---------|----------|--------|
| Next.js       | 15.5.9  | 16.1.1   | Medium |
| React         | 19.0.0  | 19.2.7   | Low    |
| Apollo Client | 3.12.3  | 4.0.11   | High   |
| GraphQL       | 15.8.0  | 16.x     | High   |
| Storybook     | 8.4.7   | 9.0/10.x | High   |
| TypeScript    | 5.7.2   | 5.8.x    | Low    |

---

## Decision: What Comes Next

**Answer: Neither major refactoring nor package updates yet.**

### Reasoning:

1. The /new/ migration succeeded — but we have no tests for the shared hooks/ layer that /new/ depends on. If Apollo 4.x breaks hooks, /new/ breaks.
2. Package updates carry high risk — Apollo 4.x and GraphQL 16 are breaking changes. Without hook test coverage, we can't verify nothing breaks.
3. Legacy code creates noise — 140 files in components/ obscure what's actually used. We should prune before upgrading.

### Correct order:
1. Add safety (hook tests)
2. Remove unused code (reduce surface)
3. Then upgrade packages (one category at a time)

---

## Execution Plan (5 PRs)

### PR 1: Test Coverage for Shared Hooks ✅ COMPLETED

Goal: Ensure hooks used by /new/ have test coverage before any upgrades.

| Attribute    | Value                                                                                                |
|--------------|------------------------------------------------------------------------------------------------------|
| Scope        | hooks/card.ts, hooks/deck.ts, hooks/product.ts, hooks/opensea.ts, hooks/podcast.ts, hooks/ratings.ts |
| Risk         | Low                                                                                                  |
| Acceptance   | Each hook has ≥1 test verifying basic query behavior                                                 |
| Verification | yarn test passes, smoke tests pass                                                                   |

**Status:** Completed in commit `20d8225` - Added 30 tests across 6 hook test files.

---

### PR 2: Remove Unused Legacy Components ✅ COMPLETED

Goal: Audit and remove components/ files not imported anywhere.

| Attribute    | Value                                                  |
|--------------|--------------------------------------------------------|
| Scope        | components/ directory (audit + delete unused)          |
| Risk         | Low (removal only, verified by build)                  |
| Acceptance   | Build passes, no runtime errors on dev.playingarts.com |
| Verification | yarn build, smoke tests, manual spot check             |

**Status:** Completed in commit `1c2d603` - Deleted 140 files (11,779 lines). Only SizeProvider remains.

---

### PR 3: Upgrade Safe Dependencies

Goal: Update low-risk packages that don't require code changes.

| Attribute    | Value                                         |
|--------------|-----------------------------------------------|
| Scope        | @types/*, chalk, dotenv, @typescript-eslint/* |
| Risk         | Low                                           |
| Acceptance   | No code changes required, all tests pass      |
| Verification | yarn lint:tsc, yarn test, smoke tests         |

---

### PR 4: Storybook Upgrade (8.4 → 8.6)

Goal: Update Storybook within major version (safe upgrade path).

| Attribute    | Value                                        |
|--------------|----------------------------------------------|
| Scope        | All @storybook/* packages to 8.6.x           |
| Risk         | Medium                                       |
| Acceptance   | yarn storybook runs, existing stories render |
| Verification | Manual Storybook check                       |

---

### PR 5: Apollo Client Upgrade Preparation

Goal: Audit Apollo usage, document breaking changes, create upgrade plan.

| Attribute    | Value                                                                                      |
|--------------|--------------------------------------------------------------------------------------------|
| Scope        | Research only — no code changes                                                            |
| Risk         | None                                                                                       |
| Acceptance   | Document listing all useQuery/useMutation usages, breaking changes in 4.x, migration steps |
| Verification | N/A                                                                                        |

---

## Package Upgrade Strategy

### Upgrade Now (Low Risk)

- @types/react, @types/react-dom, @types/node
- @typescript-eslint/eslint-plugin, @typescript-eslint/parser
- chalk, dotenv, @metamask/eth-sig-util

### Upgrade Soon (Medium Risk, within major)

- @storybook/* → 8.6.x (stay on v8)
- @babel/core
- @next/bundle-analyzer → match Next.js version

### Block Until Safety Added

- @apollo/client → 4.x (BLOCKED: needs hook tests + migration guide)
- graphql → 16.x (BLOCKED: coupled to Apollo upgrade)
- @graphql-codegen/* → 5.x (BLOCKED: coupled to GraphQL upgrade)
- @graphql-tools/* → 10.x (BLOCKED: coupled to GraphQL upgrade)

### Postpone (Low Priority)

- @storybook/* → 9.x/10.x (major, not urgent)
- Next.js → 16.x (wait for stability)

---

## Stability Net (Minimal)

### Already Have

- ✅ CI: typecheck + lint + unit tests
- ✅ Smoke tests: 14 tests on critical paths
- ✅ Pre-push hooks: lint before push

### Add Later (Not Now)

| Item                      | When                      | Why                           |
|---------------------------|---------------------------|-------------------------------|
| Lighthouse CI             | After package upgrades    | Catch performance regressions |
| E2E tests (Playwright)    | After legacy removal      | Test real user flows          |
| Error monitoring (Sentry) | Before production cutover | Runtime error visibility      |

Current safety net is sufficient for the next 5 PRs.
