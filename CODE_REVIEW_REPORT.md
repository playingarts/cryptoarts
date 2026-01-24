# Senior Engineer Code Review: Playing Arts Codebase

**Date**: January 24, 2026
**Reviewer**: Claude (Senior Engineer Review)
**Branch**: `refactor/structural-improvements`

---

## Executive Summary

This is a Next.js 15 application with TypeScript, Apollo Client, and Emotion styling. The codebase has **solid foundations** with some technical debt to address:

**Strengths Found**:
- Services layer exists (`CardService`, `OpenSeaService`) with proper separation
- GraphQL schemas (card.ts, opensea.ts) delegate to services correctly
- 40+ test files covering hooks, services, resolvers, and integration
- GraphQL fragments defined and used (`CardFragment`, `CardBasicFragment`, etc.)
- Well-documented hooks with JSDoc comments

**Areas for Improvement**:
- Provider stack is 11 levels deep (consolidation needed)
- Not all schemas follow the service pattern (deck.ts, product.ts, artist.ts)
- No GraphQL codegen for automatic type generation
- Some large components could be split

---

## Critical Issues

### 1. GraphQL Schema Files Mix All Concerns

Files like `source/graphql/schemas/opensea.ts` (800+ lines) contain:
- Type definitions
- Mongoose models
- Business logic
- Database queries
- External API calls
- Retry logic with recursive `setTimeout`

```typescript
// source/graphql/schemas/opensea.ts:214-221
setTimeout(() => {
  getAssetsRaw(id, retry + 1);  // Recursive retry - hard to test/debug
}, 1000);

// Line 322 - Fire-and-forget with swallowed errors
fetch("api/v1/assets/...", { method: "POST" }).catch(() => {});
```

**Recommendation**: Extract to `source/services/OpenSeaService.ts` with proper job queue (BullMQ), circuit breaker pattern, and explicit error handling.

---

### 2. Provider Stack Too Deep (10 Levels)

```
pages/_app.tsx nesting:
ApolloProvider → DeckPaletteProvider → ThemeProvider → ViewedProvider
→ IsEuropeProvider → FavoritesProvider → SizeProvider → MenuProvider
→ AuthProvider → FlyingFavProvider
```

**Problems**:
- Debugging context issues is difficult
- Dependencies between providers unclear
- Performance overhead from deep nesting

**Recommendation**: Audit and consolidate. Merge `Favorites` + `Bag` → `ShoppingContext`. Document what each context actually provides.

---

### 3. State Duplication (No Single Source of Truth)

| Data | Location 1 | Location 2 | Location 3 |
|------|------------|------------|------------|
| User auth | `AuthContext` | Apollo cache | - |
| Favorites | `FavoritesContext` | localStorage | Apollo |
| Bag items | `BagContext` | localStorage | - |

**Recommendation**: Document state ownership. Each piece of state should have exactly one source of truth.

---

## High Priority Issues

### 4. Minimal Test Coverage

- Only 2 test files found
- Coverage threshold set to 20% (effectively no coverage)
- Business logic untestable (mixed with GraphQL schemas)
- Services have no unit tests

**Recommendation**: Refactor to enable testing first, then add tests for services, resolvers, and hooks.

---

### 5. Hydration Warning Suppressed

```typescript
<div suppressHydrationWarning>
  {/* This hides SSR/client mismatch - fix the cause, not symptom */}
</div>
```

**Recommendation**: Investigate and fix the actual hydration mismatch.

---

### 6. Inconsistent Error Handling

```typescript
// ❌ Bad - errors swallowed silently
fetch(...).catch(() => {});

// ❌ Bad - error logged but not thrown
console.log(errors[0]);

// ✅ Good - explicit handling
if (!success) {
  throw new AppError(ErrorCode.API_ERROR, "OpenSea request failed");
}
```

---

## Medium Priority Issues

### 7. Over-optimization with useCallback (300+ instances)

Many callbacks don't have complex dependencies. This adds cognitive load and potentially slows initial renders. Benchmark before optimizing.

### 8. Large Component Files

- `components/Card/index.tsx`: 430 lines (handles video, images, hover, favorites)
- Should be split into `CardMedia`, `CardInteractions`, `CardFavorite` sub-components

### 9. Query Duplication

```typescript
export const CardsQuery = gql`...`;    // 20+ fields
export const CardQuery = gql`...`;     // Same fields
export const HeroCardsQuery = gql`...`; // Same fields again
```

**Recommendation**: Use GraphQL fragments.

### 10. Hybrid Routing (App Router + Pages Router)

- `/app/` only used for API routes
- All pages still in `/pages/`
- Creates confusion about where to add new features

---

## What's Working Well

- **TypeScript strict mode** enabled with good type coverage
- **Barrel exports** (126 files) for clean imports
- **Centralized theme** with type-safe Emotion integration
- **Rate limiting** and security headers configured
- **Sentry integration** for error tracking
- **Good service extraction started** (`CardService`, `StatusService`)
- **Custom error classes** properly structured

---

## Recommended Refactoring Phases

| Phase | Task | Impact |
|-------|------|--------|
| 1 | Extract OpenSeaService from GraphQL schema | Unblocks testing |
| 2 | Separate resolvers from type definitions | Clean architecture |
| 3 | Audit and document provider dependencies | Clarity |
| 4 | Add service unit tests | Safety net |
| 5 | Consolidate duplicate queries with fragments | DRY |
| 6 | Decide on App Router vs Pages Router | Consistency |
| 7 | Split large components | Maintainability |
| 8 | Set up GraphQL codegen for type-safe hooks | Type safety |

---

## Quick Wins (No PR Review Needed)

1. Remove `suppressHydrationWarning` and fix root cause
2. Delete 20-30 lines of commented-out code throughout
3. Replace 5-7 `as any` casts with proper types
4. Add JSDoc comments to context providers
5. Remove or properly handle fire-and-forget fetch calls
6. Standardize `useLocalStorage` usage (inconsistent now)

---

## Conclusion

The foundation is solid. Focus refactoring effort on separating concerns in the GraphQL layer first—this unblocks everything else. The existing `ARCHITECTURE_REVIEW.md` shows good problem awareness; now it's about execution.
