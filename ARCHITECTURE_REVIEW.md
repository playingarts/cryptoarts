# Playing Arts Codebase - Architectural Review

**Date**: January 5, 2026
**Branch**: `refactor/structural-improvements`

---

## 1. DUAL COMPONENT STRUCTURE (`/components` vs `/new`)

**Severity: Critical**

**Problem**: The codebase has two parallel component/page hierarchies:
- `/components/` (47 directories, legacy)
- `/new/` (Pages, Contexts, components - refactored)

This creates:
- Confusion about which components to use or extend
- Duplicate implementations (e.g., `Footer`, `Header`, `Card`, `ErrorBoundary`)
- No clear migration path or deprecation markers
- Import paths are inconsistent across the codebase

**When it hurts**: Now. New developers won't know which structure to use. Bug fixes may need to be applied in multiple places.

**Recommendation**:
- Complete the migration to `/new` structure
- Either move `/new` contents to root-level directories or deprecate `/components`
- Add `@deprecated` JSDoc comments to legacy components during transition
- Create an ADR (Architecture Decision Record) documenting the target structure

---

## 2. GRAPHQL SCHEMA FILES MIX MULTIPLE CONCERNS

**Severity: Critical**

**Problem**: Files like `source/graphql/schemas/card.ts` and `opensea.ts` mix:
- Mongoose schema definitions
- Model creation
- Business logic (querying, filtering, price calculations)
- GraphQL resolvers
- GraphQL type definitions
- External API calls (OpenSea)

Example from `card.ts:242-301`: The `price` resolver contains 60 lines of business logic including contract lookups, NFT filtering, and listing queries.

Example from `opensea.ts`: 823 lines mixing MongoDB models, memoized caching, queue management, API retry logic, signature validation, and GraphQL resolvers.

**When it hurts**: Now for `opensea.ts` (untestable, hard to debug). Soon for others as business logic grows.

**Recommendation**:
```
source/
├── models/           # Mongoose schemas only
├── services/         # Business logic (CardService, OpenSeaService)
├── graphql/
│   ├── resolvers/    # Thin resolvers that call services
│   └── typeDefs/     # GraphQL schema definitions
└── lib/              # External API clients (OpenSea client)
```

---

## 3. OPENSEA INTEGRATION IS A MAINTENANCE HAZARD

**Severity: Critical**

**Problem** (`source/graphql/schemas/opensea.ts`):
- 823 lines in a single file
- Complex queue management using MongoDB `Content` collection as a queue
- Recursive retry logic with `setTimeout` (lines 214-221, 389-395)
- Swallowed errors with empty catch blocks or just `console.log`
- Side effects in resolver (triggers `getAssetsRaw` which mutates DB)
- Memoization with `memoizee` combined with manual caching (`cachedAssets`)
- Fire-and-forget `fetch()` calls for revalidation (lines 322-342)

**When it hurts**: Now. Any OpenSea API change or rate limit change will cause cascading failures that are nearly impossible to debug.

**Recommendation**:
- Extract into a dedicated `OpenSeaService` class
- Use a proper job queue (Bull, BullMQ) instead of MongoDB-based queue
- Implement proper error boundaries with typed errors
- Add circuit breaker pattern for external API calls
- Make revalidation awaited or use proper background job handling

---

## 4. APOLLO SSR PATTERN IS OUTDATED

**Severity: Medium**

**Problem** (`source/apollo.tsx`):
- Uses `getInitialProps` which blocks navigation (line 81)
- `withApollo` HOC pattern is deprecated in favor of App Router or `getServerSideProps` with direct cache population
- Complex cache policies with `read` functions (200+ lines) that are hard to reason about
- Commented-out code throughout (30+ lines)
- Dynamic `require()` for schema in SSR mode (line 88-89)

**When it hurts**: Now (performance), Soon (Next.js 15+ migration complexity)

**Recommendation**:
- Migrate to `getServerSideProps` pattern consistently (already done in `[deckId].tsx`)
- Remove `withApollo` HOC in favor of direct Apollo Client usage
- Simplify cache policies - the complex `read` functions suggest data fetching issues that should be solved at the query level
- Clean up commented code

---

## 5. STATE MANAGEMENT IS FRAGMENTED

**Severity: Medium**

**Problem**: Multiple state management approaches coexist:
- Apollo Client cache (primary data)
- React Context (`SignatureContext`, `ViewedContext`, `BagContext`, `FavoritesContext`, `DeckPaletteContext`)
- `store` library for localStorage (`SignatureContext`)
- Custom `useLocalStorage` hook (`BagContext`)
- `react-hookstore` listed in dependencies

Provider stack in `_app.tsx` is 9 levels deep:
```tsx
<MetaMaskProvider>
  <SignatureProvider>
    <DeckPaletteProvider>
      <ThemeProvider>
        <ViewedProvider>
          <IsEuropeProvider>
            <FavoritesProvider>
              <SizeProvider>
                <ErrorBoundary>
```

**When it hurts**: Now (cognitive overhead), Later (state synchronization bugs between contexts)

**Recommendation**:
- Consolidate localStorage handling to use `useLocalStorage` hook consistently
- Consider combining related contexts (e.g., `BagContext` + `FavoritesProvider` → `ShoppingContext`)
- Remove `store` library dependency, use `useLocalStorage` consistently
- Document which state lives where

---

## 6. THEME AND STYLING CONFIGURATION IN `_app.tsx`

**Severity: Medium**

**Problem**: `pages/_app.tsx` is 574 lines, containing:
- Color definitions (98 literal colors)
- Typography definitions (40+ styles)
- Deck-specific theme overrides
- Media query helpers
- Theme type declarations
- Application shell

**When it hurts**: Soon. Adding new themes/colors requires modifying the app shell. No design system documentation.

**Recommendation**:
- Extract to `styles/theme.ts` or `design-system/`
- Consider using CSS custom properties for runtime theming
- Generate TypeScript types from a single source of truth
- Separate deck-specific themes into `deckConfig.ts` (partially done already)

---

## 7. BUSINESS LOGIC IN HOOKS IS NOT TESTABLE

**Severity: Medium**

**Problem** (`hooks/card.ts` and others):
- 430 lines of GraphQL queries duplicated (same fields in `CardsQuery`, `CardQuery`, `HeroCardsQuery`)
- 15 custom hooks that are thin wrappers around `useQuery`/`useLazyQuery`
- No abstraction for common patterns
- Business logic (like data transformation) should be in services, not hooks

**When it hurts**: Later. Query changes require updating multiple locations.

**Recommendation**:
- Use GraphQL fragments for shared field selections
- Create a single `useGraphQL` factory for consistent patterns
- Move any data transformation logic to services
- Consider GraphQL Code Generator for type-safe hooks

---

## 8. TESTING IS MINIMAL

**Severity: Medium**

**Problem**:
- Only 2 test files exist
- `__tests__/pages/api/v1/newsletter/index.test.ts` has 50 lines of test data (`valid`, `invalid` arrays) that are never used
- Tests are commented out (lines 92-123)
- No unit tests for business logic
- No integration tests for GraphQL resolvers
- Storybook exists (77 stories) but no visual regression testing

**When it hurts**: Now. Any refactoring is risky without test coverage.

**Recommendation**:
- Add tests for extracted services (when separated)
- Test GraphQL resolvers in isolation
- Add API integration tests
- Set up Chromatic or similar for Storybook visual testing
- Remove commented-out test code or implement properly

---

## 9. ERROR HANDLING IS INCONSISTENT

**Severity: Medium**

**Problem**:
- Empty catch blocks: `opensea.ts:189-221`, `apollo.tsx:115-116`
- Generic error messages: `card.ts:63` throws `500` literal
- Swallowed errors: `SignatureContext:82-87` catches but doesn't report
- No error boundaries in many components (only one `ErrorBoundary` in `/new`)
- No error logging/monitoring integration visible

**When it hurts**: Now. Production errors are invisible.

**Recommendation**:
- Add error reporting service (Sentry, etc.)
- Create typed error classes
- Implement consistent error handling pattern:
  - Log all errors
  - Display user-friendly messages
  - Report to monitoring
- Add error boundaries at route level

---

## 10. HARDCODED CONFIGURATION SCATTERED

**Severity: Nice-to-have**

**Problem**:
- `setCards` configuration hardcoded in `card.ts:122-203`
- Social media links in environment variables as JSON
- Deck colors in `_app.tsx`
- Some config in `deckConfig.ts` (good), but incomplete migration

**When it hurts**: Later, when non-developers need to update content.

**Recommendation**:
- Consolidate all configuration to `source/config/` or move to CMS
- Complete migration of deck config to `deckConfig.ts`
- Consider feature flags service for runtime configuration

---

## 11. TYPE SAFETY GAPS

**Severity: Nice-to-have**

**Problem**:
- Global `GQL` namespace for GraphQL types (not imported, magic global)
- `as any` casts still present (recently reduced per commit history)
- `as unknown as Promise<GQL.Card>` patterns in resolvers
- Missing strict null checks in some areas

**When it hurts**: Later, as team grows and codebase complexity increases.

**Recommendation**:
- Generate types with GraphQL Code Generator
- Enable stricter TypeScript settings incrementally
- Remove `GQL` global namespace in favor of explicit imports
- Add `// @ts-expect-error` with explanations instead of `as any`

---

## Summary Priority Matrix

| Issue | Severity | Effort | Impact |
|-------|----------|--------|--------|
| Dual structure (`/components` vs `/new`) | Critical | High | High |
| GraphQL schemas mixing concerns | Critical | High | High |
| OpenSea integration complexity | Critical | High | High |
| Apollo SSR pattern | Medium | Medium | Medium |
| State management fragmentation | Medium | Medium | Medium |
| Theme in `_app.tsx` | Medium | Low | Low |
| Hooks not testable | Medium | Medium | Medium |
| Minimal testing | Medium | High | High |
| Error handling | Medium | Medium | High |
| Hardcoded config | Nice-to-have | Low | Low |
| Type safety gaps | Nice-to-have | Medium | Medium |

---

## Recommended First Steps

1. **Extract OpenSea logic** into a proper service with error handling
2. **Choose and document the target component structure** (complete `/new` migration or reverse)
3. **Add error reporting/monitoring** (Sentry or similar)
4. **Separate GraphQL resolver concerns** from business logic

---

## Codebase Metrics

| Area | Count | Size |
|------|-------|------|
| Components | 47 directories | ~1.0MB |
| Pages | 11 top-level + sub-routes | ~208KB |
| API Routes | 4 endpoints | - |
| Source Modules | 24 files | ~128KB |
| Custom Hooks | 13 | ~60KB |
| Storybook Stories | 77 | - |
| GraphQL Schemas | 12 entity schemas | - |
| Contexts | 4 active | - |
| Test Files | 2 | - |
