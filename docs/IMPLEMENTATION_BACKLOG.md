# Implementation Backlog - Structural Refactoring

**Branch**: `refactor/structural-improvements`
**Target deployment**: https://dev.playingarts.com
**Created**: January 5, 2026

---

## Phase 1: Foundation & Documentation (Steps 1-3)

### Step 1: Create ADR documenting migration strategy
- **Goal**: Establish clear documentation of architectural decisions for the `/new` migration
- **Files to create**:
  - `docs/adr/001-new-directory-migration.md`
  - `docs/adr/README.md`
- **Acceptance criteria**: ADR exists, explains migration strategy, documents what stays/goes
- **Risk level**: Low
- **Testing notes**: N/A (documentation only)
- **Impact on dev.playingarts.com**: None

### Step 2: Extract theme configuration from `_app.tsx`
- **Goal**: Move 400+ lines of theme/color/typography config to dedicated module
- **Files to touch**:
  - Create `styles/theme/index.ts`
  - Create `styles/theme/colors.ts`
  - Create `styles/theme/typography.ts`
  - Create `styles/theme/breakpoints.ts`
  - Modify `pages/_app.tsx` (import from new location)
- **Acceptance criteria**: `_app.tsx` < 150 lines, theme imports work, no visual changes
- **Risk level**: Low
- **Testing notes**: Visual inspection of dev site, Storybook still works
- **Impact on dev.playingarts.com**: None (same output)

### Step 3: Add error logging foundation
- **Goal**: Create centralized error logging utility for consistent error handling
- **Files to create**:
  - `source/lib/logger.ts` (client-safe error logger)
  - `source/lib/errors.ts` (typed error classes)
- **Files to modify**:
  - `source/graphql/schemas/opensea.ts` (replace console.log with logger)
- **Acceptance criteria**: Logger utility exists, at least one file uses it
- **Risk level**: Low
- **Testing notes**: Check console output in dev
- **Impact on dev.playingarts.com**: Better error visibility

---

## Phase 2: Clean Up Dual Structure (Steps 4-7)

### Step 4: Audit legacy components usage
- **Goal**: Document which `/components` are still imported anywhere
- **Files to create**:
  - `docs/LEGACY_COMPONENT_AUDIT.md`
- **Acceptance criteria**: Complete list of used vs unused legacy components
- **Risk level**: Low
- **Testing notes**: N/A (analysis only)
- **Impact on dev.playingarts.com**: None

### Step 5: Remove unused legacy components
- **Goal**: Delete `/components` directories that have no imports
- **Files to delete**: (determined by Step 4 audit)
- **Acceptance criteria**: Only actively-used legacy components remain
- **Risk level**: Medium
- **Testing notes**: `yarn build` succeeds, dev site works
- **Impact on dev.playingarts.com**: None (unused code removed)

### Step 6: Remove `/pages/old/` directory
- **Goal**: Delete legacy page implementations
- **Files to delete**:
  - `pages/old/[deckId].tsx`
  - `pages/old/index.tsx`
  - `pages/old/shop.tsx`
- **Acceptance criteria**: No `/old` routes exist, no broken imports
- **Risk level**: Medium
- **Testing notes**: `yarn build` succeeds, verify no 404s on expected routes
- **Impact on dev.playingarts.com**: Old routes removed (intentional)

### Step 7: Consolidate remaining shared components
- **Goal**: Move still-needed `/components` to `/new` or mark with clear ownership
- **Files to touch**: (determined by Step 4 audit - likely `SizeProvider`, `Layout`)
- **Acceptance criteria**: Clear single location for each component type
- **Risk level**: Medium
- **Testing notes**: Full site navigation test
- **Impact on dev.playingarts.com**: None (same functionality, cleaner structure)

---

## Phase 3: GraphQL Refactoring (Steps 8-13)

### Step 8: Extract Mongoose models to `/source/models/`
- **Goal**: Separate data models from GraphQL resolver logic
- **Files to create**:
  - `source/models/index.ts`
  - `source/models/Card.ts`
  - `source/models/Artist.ts`
  - `source/models/Deck.ts`
  - `source/models/Nft.ts`
  - `source/models/Listing.ts`
  - `source/models/Content.ts`
  - `source/models/Contract.ts`
  - `source/models/Product.ts`
  - `source/models/Deal.ts`
  - `source/models/Loser.ts`
  - `source/models/Podcast.ts`
  - `source/models/Rating.ts`
- **Files to modify**: All `source/graphql/schemas/*.ts` (import models from new location)
- **Acceptance criteria**: Models in dedicated directory, schemas import from there
- **Risk level**: Medium
- **Testing notes**: All GraphQL queries still work
- **Impact on dev.playingarts.com**: None (same functionality)

### Step 9: Create CardService with business logic
- **Goal**: Extract card-related business logic from resolver
- **Files to create**:
  - `source/services/CardService.ts`
  - `source/services/index.ts`
- **Files to modify**:
  - `source/graphql/schemas/card.ts` (use CardService)
- **Acceptance criteria**: Card queries work, logic is in service
- **Risk level**: Medium
- **Testing notes**: Test card queries via GraphQL playground
- **Impact on dev.playingarts.com**: None

### Step 10: Create OpenSeaClient for API calls
- **Goal**: Extract OpenSea API HTTP calls to dedicated client
- **Files to create**:
  - `source/lib/OpenSeaClient.ts`
- **Files to modify**:
  - `source/graphql/schemas/opensea.ts` (use client for API calls)
- **Acceptance criteria**: All fetch() calls to OpenSea go through client
- **Risk level**: High
- **Testing notes**: Test NFT pages load correctly
- **Impact on dev.playingarts.com**: None (same functionality, better structure)

### Step 11: Create OpenSeaService with business logic
- **Goal**: Extract OpenSea business logic (caching, queue, holders calculation)
- **Files to create**:
  - `source/services/OpenSeaService.ts`
- **Files to modify**:
  - `source/graphql/schemas/opensea.ts` (delegate to service)
- **Acceptance criteria**: opensea.ts < 200 lines, service handles logic
- **Risk level**: High
- **Testing notes**: Test NFT ownership, holders display
- **Impact on dev.playingarts.com**: None

### Step 12: Refactor remaining GraphQL resolvers
- **Goal**: Make resolvers thin - just call services
- **Files to modify**:
  - `source/graphql/schemas/deck.ts`
  - `source/graphql/schemas/artist.ts`
  - `source/graphql/schemas/product.ts`
  - `source/graphql/schemas/contract.ts`
  - `source/graphql/schemas/listing.ts`
- **Files to create**:
  - `source/services/DeckService.ts`
  - `source/services/ArtistService.ts`
  - `source/services/ProductService.ts`
- **Acceptance criteria**: Each schema file < 150 lines
- **Risk level**: Medium
- **Testing notes**: Full GraphQL query coverage
- **Impact on dev.playingarts.com**: None

### Step 13: Add tests for extracted services
- **Goal**: Test business logic in isolation
- **Files to create**:
  - `__tests__/services/CardService.test.ts`
  - `__tests__/services/OpenSeaService.test.ts`
- **Acceptance criteria**: Core service methods have test coverage
- **Risk level**: Low
- **Testing notes**: `yarn test` passes
- **Impact on dev.playingarts.com**: None

---

## Phase 4: State Management Cleanup (Steps 14-16)

### Step 14: Migrate SignatureContext to useLocalStorage
- **Goal**: Remove `store` library dependency, use consistent localStorage pattern
- **Files to modify**:
  - `contexts/SignatureContext/index.tsx`
- **Acceptance criteria**: `store` library no longer used in SignatureContext
- **Risk level**: Medium
- **Testing notes**: Test MetaMask signature flow
- **Impact on dev.playingarts.com**: None

### Step 15: Consolidate ViewedContext with useLocalStorage
- **Goal**: Use consistent localStorage pattern
- **Files to modify**:
  - `contexts/viewedContext/index.tsx`
- **Acceptance criteria**: All contexts use `useLocalStorage` hook
- **Risk level**: Low
- **Testing notes**: Test viewed cards persistence
- **Impact on dev.playingarts.com**: None

### Step 16: Remove `store` package dependency
- **Goal**: Clean up unused dependency
- **Files to modify**:
  - `package.json`
- **Acceptance criteria**: `yarn install` works, no `store` imports remain
- **Risk level**: Low
- **Testing notes**: `yarn build` succeeds
- **Impact on dev.playingarts.com**: Smaller bundle

---

## Phase 5: Apollo & Data Layer Cleanup (Steps 17-19)

### Step 17: Clean up apollo.tsx
- **Goal**: Remove commented code, simplify where possible
- **Files to modify**:
  - `source/apollo.tsx`
- **Acceptance criteria**: No commented-out code blocks, file < 250 lines
- **Risk level**: Medium
- **Testing notes**: SSR still works, pages load with data
- **Impact on dev.playingarts.com**: None

### Step 18: Add GraphQL fragments for shared fields
- **Goal**: Reduce query duplication in hooks
- **Files to create**:
  - `hooks/fragments/card.ts`
  - `hooks/fragments/artist.ts`
  - `hooks/fragments/deck.ts`
- **Files to modify**:
  - `hooks/card.ts` (use fragments)
  - `hooks/deck.ts` (use fragments)
- **Acceptance criteria**: Shared field selections use fragments
- **Risk level**: Low
- **Testing notes**: All card/deck queries work
- **Impact on dev.playingarts.com**: None

### Step 19: Simplify Apollo cache policies
- **Goal**: Remove overly complex cache `read` functions where possible
- **Files to modify**:
  - `source/apollo.tsx`
- **Acceptance criteria**: Cache policies are documented, unnecessary ones removed
- **Risk level**: High
- **Testing notes**: Navigation between pages maintains cache correctly
- **Impact on dev.playingarts.com**: Potential cache behavior changes (test thoroughly)

---

## Phase 6: Error Handling & Testing (Steps 20-22)

### Step 20: Add error boundaries at route level
- **Goal**: Prevent full app crashes from component errors
- **Files to create**:
  - `new/ErrorBoundary/RouteErrorBoundary.tsx`
- **Files to modify**:
  - `pages/_app.tsx` (wrap routes)
- **Acceptance criteria**: Component errors show error UI, don't crash app
- **Risk level**: Low
- **Testing notes**: Manually trigger error, verify boundary catches it
- **Impact on dev.playingarts.com**: Better error UX

### Step 21: Add integration tests for critical paths
- **Goal**: Test key user flows
- **Files to create**:
  - `__tests__/integration/deck-page.test.ts`
  - `__tests__/integration/card-page.test.ts`
- **Acceptance criteria**: Tests for viewing deck, viewing card exist
- **Risk level**: Low
- **Testing notes**: `yarn test` passes
- **Impact on dev.playingarts.com**: None

### Step 22: Clean up unused test code
- **Goal**: Remove commented tests, unused test data
- **Files to modify**:
  - `__tests__/pages/api/v1/newsletter/index.test.ts`
- **Acceptance criteria**: No commented-out test code, all test data is used
- **Risk level**: Low
- **Testing notes**: `yarn test` passes
- **Impact on dev.playingarts.com**: None

---

## Summary

| Phase | Steps | Risk | Estimated Commits |
|-------|-------|------|-------------------|
| 1. Foundation | 1-3 | Low | 3 |
| 2. Dual Structure | 4-7 | Medium | 4 |
| 3. GraphQL | 8-13 | Medium-High | 6 |
| 4. State Management | 14-16 | Low-Medium | 3 |
| 5. Apollo | 17-19 | Medium-High | 3 |
| 6. Testing | 20-22 | Low | 3 |
| **Total** | **22** | | **22 commits** |

---

## Execution Notes

- Each step should be a single commit
- Run `yarn lint:tsc` before each commit
- Run `yarn build` before pushing
- Monitor dev.playingarts.com after each deploy
- Steps can be reordered within phases if needed
- If a step fails, revert and reassess before continuing
