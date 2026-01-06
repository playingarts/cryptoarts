# Apollo Client 4.x Migration Guide

**Status:** Research document (PR 5)
**Current Version:** 3.12.3
**Target Version:** 4.0.x
**Risk Level:** High

---

## Executive Summary

Apollo Client 4.0 is a major release with significant breaking changes. This document audits the current codebase usage and outlines the migration path.

**Recommendation:** Update to Apollo Client 3.14 first (to see deprecation warnings), then migrate to 4.x using the official codemod.

---

## Current Codebase Usage

### Hook Usage (8 files)

| File | Hooks Used |
|------|------------|
| `hooks/card.ts` | `useQuery`, `useLazyQuery` (10 hooks) |
| `hooks/deck.ts` | `useQuery`, `useLazyQuery` (3 hooks) |
| `hooks/product.ts` | `useQuery` (2 hooks) |
| `hooks/ratings.ts` | `useQuery`, `useLazyQuery` (2 hooks) |
| `hooks/opensea.ts` | `useQuery`, `useLazyQuery` (3 hooks) |
| `hooks/podcast.ts` | `useQuery` (1 hook) |
| `hooks/deal.ts` | `useLazyQuery` (1 hook) |
| `hooks/loser.ts` | `useQuery`, `useLazyQuery` (2 hooks) |

**Total: ~24 Apollo hooks**

### Core Apollo Setup

| File | Usage |
|------|-------|
| `source/apollo.tsx` | `ApolloClient`, `ApolloProvider`, `InMemoryCache`, `NormalizedCacheObject` |
| `source/apollo/cachePolicies.ts` | `TypePolicies`, `Reference`, `gql` |
| `.storybook/preview.tsx` | `ApolloClient`, `ApolloProvider`, `InMemoryCache` |

### GraphQL Schema Files (9 files)

All in `source/graphql/schemas/`:
- `card.ts`, `artist.ts`, `content.ts`, `contract.ts`, `deal.ts`
- `listing.ts`, `opensea.ts`, `product.ts`, `rating.ts`

Uses: `gql`, `ApolloError`

---

## Breaking Changes in Apollo Client 4.0

### 1. React Imports Moved

**Before (3.x):**
```typescript
import { useQuery, useLazyQuery } from "@apollo/client";
```

**After (4.x):**
```typescript
import { useQuery, useLazyQuery } from "@apollo/client/react";
```

**Impact:** All 8 hook files need import updates.

### 2. RxJS Replaces zen-observable

RxJS is now a peer dependency. Must install separately.

```bash
yarn add rxjs
```

### 3. ApolloClient Constructor Changes

**Before (3.x):**
```typescript
new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
```

**After (4.x):**
```typescript
import { HttpLink } from "@apollo/client/link/http";

new ApolloClient({
  link: new HttpLink({ uri: "/api/graphql" }),
  cache: new InMemoryCache(),
  devtools: { enabled: true },
});
```

**Impact:** `source/apollo.tsx` needs refactoring.

### 4. Error Handling Changes

`ApolloError` is replaced with specific error classes:
- `GraphQLError` - server errors
- `NetworkError` - connection failures
- `ParseError` - response parsing issues

**Impact:** `source/graphql/schemas/deal.ts` and `opensea.ts` import `ApolloError`.

### 5. Removed APIs

- Render prop components (`<Query>`, `<Mutation>`) - **Not used in codebase**
- Higher-order components (`graphql()`) - **Not used in codebase**

### 6. Local State Changes

`@client` directives and `resolvers` require explicit opt-in via `localState` option.

**Impact:** Need to audit if local state is used (appears minimal).

---

## Migration Steps

### Phase 1: Preparation (Low Risk)

1. **Update to Apollo Client 3.14** to see deprecation warnings
   ```bash
   yarn add @apollo/client@^3.14.0
   ```

2. **Run tests and verify** all existing functionality works

3. **Fix any deprecation warnings** that appear in console

### Phase 2: Run Codemod

```bash
npx @apollo/client-codemod-migrate-3-to-4 ./hooks ./source ./new ./.storybook
```

This handles ~90% of changes automatically:
- Import path updates
- Constructor option renames
- HttpLink creation

### Phase 3: Manual Fixes

1. **Install RxJS peer dependency**
   ```bash
   yarn add rxjs
   ```

2. **Update error handling** in `deal.ts` and `opensea.ts`

3. **Update Storybook mock client** in `.storybook/preview.tsx`

4. **Update test utilities** in `jest/apolloTestUtils.ts`

### Phase 4: Verification

1. `yarn lint:tsc` - Type checking
2. `yarn test` - All 86 tests pass
3. `yarn test:smoke` - Smoke tests pass
4. Manual testing of critical flows

---

## Coupled Dependencies

These packages are tied to the GraphQL/Apollo ecosystem and may need updates:

| Package | Current | Notes |
|---------|---------|-------|
| `graphql` | 15.9.0 | Apollo 4.x supports GraphQL 16.x |
| `@graphql-codegen/*` | 4.x | May need update for GraphQL 16 |
| `@graphql-tools/stitch` | 9.4.10 | Check compatibility |

**Recommendation:** Upgrade GraphQL to 16.x alongside Apollo 4.x.

---

## Risk Assessment

| Area | Risk | Mitigation |
|------|------|------------|
| Hook behavior changes | Medium | Existing hook tests cover basic behavior |
| Cache policies | Low | `cachePolicies.ts` uses standard TypePolicies API |
| SSR/hydration | Medium | Test `withApollo` HOC thoroughly |
| Error handling | Low | Only 2 files use ApolloError |
| Bundle size | Positive | Expected 20-30% reduction |

---

## Estimated Effort

| Task | Time |
|------|------|
| Phase 1: Update to 3.14, fix warnings | 1 hour |
| Phase 2: Run codemod | 15 minutes |
| Phase 3: Manual fixes | 2-3 hours |
| Phase 4: Testing & verification | 2 hours |
| **Total** | **~6 hours** |

---

## References

- [Official Migration Guide](https://www.apollographql.com/docs/react/migrating/apollo-client-4-migration)
- [Apollo Client 4.0 Announcement](https://www.apollographql.com/blog/announcing-apollo-client-4-0)
- [Migration Codemod](https://www.npmjs.com/package/@apollo/client-codemod-migrate-3-to-4)
- [GitHub Issue #12294](https://github.com/apollographql/apollo-client/issues/12294)

---

## Next Steps

1. Schedule Apollo 4.x upgrade after current refactor PRs are stable
2. Create a dedicated branch for the upgrade
3. Consider upgrading GraphQL to 16.x simultaneously
4. Plan for a staged rollout with feature flags if needed
