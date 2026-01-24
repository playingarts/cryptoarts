# Structural Improvements - Phase Checklist

Track progress by checking off items as they're completed.

---

## Phase 1: Complete Service Extraction
**Goal**: All GraphQL schemas use services for business logic

### 1.1 Create DeckService
- [ ] Create `source/services/DeckService.ts`
- [ ] Implement `getDeck(args)` method
- [ ] Implement `getDecks(args)` method
- [ ] Implement `getDecksBySlug(slugs)` method
- [ ] Implement `getDeckPalette(deck)` method
- [ ] Export from `source/services/index.ts`

### 1.2 Create ProductService
- [ ] Create `source/services/ProductService.ts`
- [ ] Implement `getProduct(args)` method
- [ ] Implement `getProducts(args)` method
- [ ] Implement `getProductsByDeck(deckId)` method
- [ ] Implement `calculatePrice(product, isEurope)` method
- [ ] Export from `source/services/index.ts`

### 1.3 Create ArtistService
- [ ] Create `source/services/ArtistService.ts`
- [ ] Implement `getArtist(args)` method
- [ ] Implement `getArtists(args)` method
- [ ] Implement `getArtistCards(artistId)` method
- [ ] Export from `source/services/index.ts`

### 1.4 Refactor Schemas
- [ ] Update `source/graphql/schemas/deck.ts` to use DeckService
- [ ] Update `source/graphql/schemas/product.ts` to use ProductService
- [ ] Update `source/graphql/schemas/artist.ts` to use ArtistService

### 1.5 Tests
- [ ] Create `__tests__/services/DeckService.test.ts`
- [ ] Create `__tests__/services/ProductService.test.ts`
- [ ] Create `__tests__/services/ArtistService.test.ts`

---

## Phase 2: Separate Resolvers from Type Definitions
**Goal**: Clean separation of schema definition and implementation

### 2.1 Directory Structure
- [ ] Create `source/graphql/typeDefs/` directory
- [ ] Create `source/graphql/resolvers/` directory
- [ ] Create `source/graphql/typeDefs/index.ts`
- [ ] Create `source/graphql/resolvers/index.ts`

### 2.2 Migrate Each Schema
For each schema file (card, deck, product, artist, opensea, contract, listing, deal, rating, podcast, content, loser):
- [ ] Extract `typeDefs` to `typeDefs/{name}.ts`
- [ ] Extract `resolvers` to `resolvers/{name}.ts`
- [ ] Update imports in resolver to use services

### 2.3 Update Schema Stitching
- [ ] Update `source/graphql/schema.ts` to import from new locations
- [ ] Keep backward-compatible re-exports in old location (temporary)
- [ ] Test GraphQL playground works

### 2.4 Cleanup
- [ ] Remove old `schemas/` files (after verification)
- [ ] Update any imports throughout codebase

---

## Phase 3: Provider Consolidation
**Goal**: Reduce from 11 providers to 7

### 3.1 Documentation
- [ ] Create `docs/PROVIDER_DEPENDENCIES.md`
- [ ] Document what each current provider does
- [ ] Document which components consume which contexts
- [ ] Identify dependencies between providers

### 3.2 Create DeviceProvider
- [ ] Create `components/Contexts/device/index.tsx`
- [ ] Merge `IsEuropeProvider` functionality
- [ ] Merge `SizeProvider` functionality
- [ ] Export `useDevice()` hook with `{ isEurope, isMobile, windowDimensions }`
- [ ] Add tests

### 3.3 Create UserPreferencesProvider
- [ ] Create `components/Contexts/userPreferences/index.tsx`
- [ ] Merge `ViewedProvider` functionality
- [ ] Merge `FavoritesProvider` functionality
- [ ] Merge `FlyingFavProvider` functionality
- [ ] Export `useUserPreferences()` hook
- [ ] Ensure localStorage sync works correctly
- [ ] Add tests

### 3.4 Create DeckContextProvider (optional - page-specific)
- [ ] Evaluate if DeckPalette + HeroCards should be combined
- [ ] Consider lazy loading for deck pages only
- [ ] Implement if beneficial

### 3.5 Update App Entry Points
- [ ] Update `pages/_app.tsx` with new provider stack
- [ ] Update `app/providers.tsx` to match
- [ ] Update all consumer components to use new hooks

### 3.6 Cleanup
- [ ] Deprecate old provider files
- [ ] Add JSDoc to all providers
- [ ] Remove deprecated providers after migration

---

## Phase 4: Expand Test Coverage
**Goal**: Increase from ~40% to 70%

### 4.1 Context Tests
- [ ] `__tests__/contexts/favorites.test.tsx`
- [ ] `__tests__/contexts/auth.test.tsx`
- [ ] `__tests__/contexts/bag.test.tsx`
- [ ] `__tests__/contexts/device.test.tsx` (after Phase 3)
- [ ] `__tests__/contexts/userPreferences.test.tsx` (after Phase 3)

### 4.2 Resolver Tests
- [ ] `__tests__/graphql/resolvers/artist.test.ts`
- [ ] `__tests__/graphql/resolvers/contract.test.ts`
- [ ] `__tests__/graphql/resolvers/listing.test.ts`

### 4.3 Integration Tests
- [ ] `__tests__/integration/favorites-flow.test.ts`
- [ ] `__tests__/integration/auth-flow.test.ts`
- [ ] `__tests__/integration/checkout-flow.test.ts`

### 4.4 Infrastructure
- [ ] Update `jest.config.mjs` coverage thresholds to 60%
- [ ] Add `test:coverage` script to package.json
- [ ] Set up Chromatic for Storybook visual testing
- [ ] Add critical E2E tests with Playwright

---

## Phase 5: GraphQL Query Optimization
**Goal**: Consistent fragment usage across all hooks

### 5.1 Audit Current Fragments
- [ ] List all fragments in `hooks/fragments.ts`
- [ ] Identify which hooks use them
- [ ] Identify inline queries that should use fragments

### 5.2 Create New Fragments
- [ ] `DeckFragment` - Full deck data
- [ ] `DeckBasicFragment` - Minimal deck data (slug, title)
- [ ] `ProductFragment` - Full product data
- [ ] `ProductBasicFragment` - Minimal product data
- [ ] `ArtistFragment` - Full artist data
- [ ] `ArtistBasicFragment` - Minimal artist data

### 5.3 Update Hooks
- [ ] Update `hooks/deck.ts` to use DeckFragment
- [ ] Update `hooks/product.ts` to use ProductFragment
- [ ] Update any inline queries to use appropriate fragments

### 5.4 Documentation
- [ ] Document fragment usage guidelines
- [ ] Add to CLAUDE.md

---

## Phase 6: Routing Architecture Decision
**Goal**: Clear decision and documentation on routing approach

### 6.1 Create ADR
- [ ] Create `docs/adr/001-routing-architecture.md`
- [ ] Document decision: Stay on Pages Router
- [ ] Document rationale
- [ ] Document when to reconsider

### 6.2 Enforce Decision
- [ ] Audit `app/` directory - ensure only API routes
- [ ] Add ESLint rule or comment to prevent page creation in app/
- [ ] Update CLAUDE.md with routing guidelines

### 6.3 Documentation
- [ ] Document SSG + ISR pattern used
- [ ] Document how to add new pages
- [ ] Document API route conventions

---

## Phase 7: Component Architecture
**Goal**: No component over 300 lines, consistent patterns

### 7.1 Audit Large Components
- [ ] List all components over 300 lines
- [ ] Create splitting plan for each
- [ ] Prioritize by complexity/change frequency

### 7.2 Split Card Component (~430 lines)
- [ ] Extract `CardMedia` (image/video handling)
- [ ] Extract `CardOverlay` (hover effects, info display)
- [ ] Extract `CardFavorite` (favorite button logic)
- [ ] Update Card to compose sub-components
- [ ] Add tests for sub-components

### 7.3 Evaluate Other Large Components
- [ ] `Shop/Collection/index.tsx` - split if over 300 lines
- [ ] Any other components found in audit

### 7.4 Document Patterns
- [ ] Add component pattern guide to CLAUDE.md
- [ ] Standard props interface pattern
- [ ] Memo usage guidelines
- [ ] DisplayName requirements

---

## Phase 8: GraphQL Codegen
**Goal**: Automatic type generation from schema

### 8.1 Installation
- [ ] `yarn add -D @graphql-codegen/cli`
- [ ] `yarn add -D @graphql-codegen/typescript`
- [ ] `yarn add -D @graphql-codegen/typescript-operations`
- [ ] `yarn add -D @graphql-codegen/typescript-react-apollo`

### 8.2 Configuration
- [ ] Create `codegen.yml` or `codegen.ts`
- [ ] Configure schema source
- [ ] Configure document sources (hooks/*.ts)
- [ ] Configure output location

### 8.3 Generate and Compare
- [ ] Run initial generation
- [ ] Compare with existing GQL namespace
- [ ] Identify any mismatches/issues

### 8.4 Migration
- [ ] Create migration plan (incremental)
- [ ] Migrate one hook file as proof of concept
- [ ] Document generated hook usage

### 8.5 Automation
- [ ] Add `yarn codegen` script
- [ ] Add to pre-commit hook
- [ ] Add to CI pipeline
- [ ] Document workflow in CLAUDE.md

---

## Quick Wins (Do Anytime)

- [ ] Add JSDoc comments to all context providers
- [ ] Remove all commented-out code
- [ ] Add displayName to all memoized components
- [ ] Replace `as any` with proper types (7 instances)
- [ ] Document state ownership (what lives where)
- [ ] Remove `suppressHydrationWarning` and fix root cause

---

## Progress Tracking

| Phase | Status | Completion |
|-------|--------|------------|
| Phase 1 | Not Started | 0% |
| Phase 2 | Not Started | 0% |
| Phase 3 | Not Started | 0% |
| Phase 4 | Not Started | 0% |
| Phase 5 | Not Started | 0% |
| Phase 6 | Not Started | 0% |
| Phase 7 | Not Started | 0% |
| Phase 8 | Not Started | 0% |

**Last Updated**: January 24, 2026
