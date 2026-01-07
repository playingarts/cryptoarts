# Senior Engineer Code Review

**Date:** 2026-01-07
**Codebase:** Playing Arts Next.js
**Reviewer:** Claude Code

---

## Critical Issues (Fix Immediately)

### 1. Duplicate Rate Limiting Implementation

**Files:**
- `middleware.ts` (55 lines)
- `app/api/v1/graphql/route.ts` (20 lines)
- `app/api/v1/newsletter/route.ts` (17 lines)

**Problem:** Identical rate limiting logic in 3 places with slight variations. Maintenance nightmare, inconsistent behavior.

**Recommendation:** Extract to `lib/rateLimitChecker.ts`:
```typescript
export function createRateLimiter(config: RateLimitConfig) {
  // Single implementation with configurable limits
}
```

---

### 2. Dynamic require() Breaking ESM Compatibility

**Files:**
- `source/apollo.tsx` (Lines 58, 129)
- `pages/[deckId].tsx` (Line 19)

**Problem:** ESM/CJS mixing breaks in edge environments, requires eslint disable comments.

```typescript
// Anti-pattern:
schema: require("../source/graphql/schema").schema,
const { SchemaLink } = require("@apollo/client/link/schema");
```

**Recommendation:** Use ES6 imports consistently. Export schema as static constant.

---

### 3. Unsafe Type Casting in OpenSea Data

**Files:**
- `source/services/OpenSeaService.ts` (Line 327)
- `source/graphql/schemas/opensea.ts` (Line 101)

**Problem:** Uses `as unknown as GQL.Nft` to bypass type system. No runtime validation.

**Recommendation:** Apply io-ts validation consistently:
```typescript
const validated = decodeWith(NftType)(nft);
if (!validated) throw new ValidationError("Invalid NFT data");
return validated;
```

---

## High Priority Issues (1-2 Sprints)

### 4. Mixed Router Paradigms

**Current State:**
- Pages Router: 10+ pages in `/pages`
- App Router: Only 2 API routes in `/app`

**Problem:** Developers must know both paradigms, inconsistent patterns, testing differs.

**Recommendation:** Create migration plan with phases. Document which pages migrate when.

---

### 5. Unsafe Context Pattern

**Files:**
- `contexts/SignatureContext/index.tsx` (Line 28)
- `contexts/viewedContext/index.tsx` (Line 25)
- `components/Contexts/bag/index.tsx` (Line 28)
- `components/Contexts/favorites/index.tsx` (Line 19)

**Problem:** `createContext({} as Props)` creates unsafe default. Crashes if provider missing.

**Recommendation:** Create safe context factory:
```typescript
function createSafeContext<T>(name: string) {
  const context = createContext<T | undefined>(undefined);
  const useHook = () => {
    const ctx = useContext(context);
    if (!ctx) throw new Error(`${name}Provider not found`);
    return ctx;
  };
  return { context, useHook };
}
```

---

### 6. Silent Error Failures

**Files:**
- `source/apollo.tsx` (Line 79)
- `app/api/v1/assets/[contractId]/route.ts` (Line 92)
- `app/api/revalidate/route.ts` (Line 35)

**Problem:** Empty catch blocks with no logging. Cannot debug production issues.

**Recommendation:** Use AppError classes with structured logging:
```typescript
catch (error) {
  const appError = wrapError(error, "Failed to fetch assets");
  logger.error("Asset fetch failed", appError);
  Sentry.captureException(appError);
  return NextResponse.json(appError.toJSON(), { status: 500 });
}
```

---

### 7. localStorage Coupling

**Problem:** 43 localStorage usages scattered, no validation, hydration mismatches.

**Recommendation:** Create persistence layer with Zod validation:
```typescript
export const StorageSchema = {
  bag: z.record(z.string(), z.number()),
  favorites: z.record(z.string(), z.array(z.string())),
};
```

---

## Medium Priority Issues (1-3 Sprints)

### 8. Oversized Components

| Component | Lines | Issue |
|-----------|-------|-------|
| Card/index.tsx | 439 | 7 hooks, inline object creation |
| MainMenu | 365 | Too many state updates |
| ProductPage About | 328 | |
| Footer | 313 | |

**Recommendation:** Split into smaller components. Use React.lazy() for off-screen lists.

---

### 9. Inconsistent API Response Formats

**Problem:** 4 different error formats across endpoints.

**Recommendation:** Create standardized response helper:
```typescript
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: { version: string; timestamp: string };
};
```

---

### 10. ESLint Ignores Core Directories

**File:** `eslint.config.mjs`

**Problem:** `source/**` and `components/**` excluded from linting.

**Recommendation:** Lint everything except node_modules, .next, dist, coverage.

---

## Low Priority Issues

### 11. Mongoose Connection Pooling
No serverless-optimized pooling configuration.

### 12. Inconsistent Logging
Mix of console.log, logger.error, Sentry.captureException.

---

## Positive Findings ✅

- **Security**: CSP headers, GraphQL introspection disabled, rate limiting
- **Error Classes**: Well-designed AppError hierarchy in `source/lib/errors.ts`
- **GraphQL Architecture**: Clean schema stitching, co-located resolvers
- **ISR Configuration**: Smart 60s revalidation balance
- **Context Hooks**: Correctly use useCallback to prevent re-renders

---

## Action Plan

| Week | Task | Priority |
|------|------|----------|
| 1 | Extract rate limiting to shared utility | Critical |
| 1 | Document Pages → App Router migration | High |
| 2 | Fix ESM imports in apollo.tsx, [deckId].tsx | Critical |
| 2 | Add OpenSeaService tests | High |
| 3 | Create safe context factory pattern | High |
| 3 | Add structured logging with request IDs | High |
| 4 | Standardize API response formats | Medium |
| 4 | Split oversized components | Medium |
