# Structural Improvements Implementation Plan

**Created**: January 24, 2026
**Branch**: `refactor/structural-improvements`

---

## Current State Assessment

After detailed review, the codebase is in better shape than initial assessment:
- **Services extracted**: `CardService`, `OpenSeaService` exist and are used by resolvers
- **GraphQL schemas are clean**: `card.ts` and `opensea.ts` delegate to services properly
- **Test coverage exists**: 40+ test files across hooks, services, resolvers, integration
- **Fragments used**: `CardFragment`, `CardBasicFragment`, etc. reduce query duplication
- **Hooks well-documented**: Clear JSDoc comments explaining purpose

**Remaining Issues**:
- Provider stack still 11 levels deep
- Some schemas still mix concerns (deck.ts, product.ts, artist.ts)
- Not all services have tests
- No GraphQL codegen for type-safe hooks
- App Router migration incomplete

---

## Phase 1: Complete Service Extraction

**Goal**: Ensure ALL GraphQL schemas follow the `card.ts` pattern (thin resolvers, business logic in services)

### 1.1 Audit Schema Files

| Schema File | Current State | Action Needed |
|-------------|---------------|---------------|
| `card.ts` | Clean (uses CardService) | None |
| `opensea.ts` | Clean (uses OpenSeaService) | None |
| `deck.ts` | Mixed concerns | Extract DeckService |
| `product.ts` | Mixed concerns | Extract ProductService |
| `artist.ts` | Mixed concerns | Extract ArtistService |
| `contract.ts` | Mixed | Extract ContractService |
| `listing.ts` | Mixed | Extract ListingService |
| `deal.ts` | Small | Keep as-is or combine |
| `rating.ts` | Small | Keep as-is or combine |
| `podcast.ts` | Small | Keep as-is |
| `content.ts` | Small | Keep as-is |
| `loser.ts` | Small | Keep as-is |

### 1.2 Create DeckService

```typescript
// source/services/DeckService.ts
export class DeckService {
  async getDeck(args: { id?: string; slug?: string }): Promise<GQL.Deck | null>;
  async getDecks(args?: { shuffle?: boolean; limit?: number }): Promise<GQL.Deck[]>;
  async getDecksBySlug(slugs: string[]): Promise<GQL.Deck[]>;
  getDeckPalette(deck: GQL.Deck): DeckPalette;
}
```

### 1.3 Create ProductService

```typescript
// source/services/ProductService.ts
export class ProductService {
  async getProduct(args: { id?: string; deck?: string; slug?: string }): Promise<GQL.Product | null>;
  async getProducts(args?: { deck?: string; type?: string }): Promise<GQL.Product[]>;
  async getProductsByDeck(deckId: string): Promise<GQL.Product[]>;
  calculatePrice(product: GQL.Product, isEurope: boolean): number;
}
```

### 1.4 Tasks

- [ ] Create `source/services/DeckService.ts`
- [ ] Create `source/services/ProductService.ts`
- [ ] Create `source/services/ArtistService.ts`
- [ ] Refactor `deck.ts` to use DeckService
- [ ] Refactor `product.ts` to use ProductService
- [ ] Refactor `artist.ts` to use ArtistService
- [ ] Update `source/services/index.ts` to export new services
- [ ] Add unit tests for new services

---

## Phase 2: Separate Resolvers from Type Definitions

**Goal**: Split each schema file into `typeDefs` and `resolvers` for clarity

### 2.1 New Directory Structure

```
source/graphql/
├── schema.ts              # Schema stitching (keep)
├── typeDefs/
│   ├── index.ts           # Exports all typeDefs
│   ├── card.ts            # Card type definitions
│   ├── deck.ts
│   ├── product.ts
│   ├── artist.ts
│   ├── opensea.ts
│   └── ...
└── resolvers/
    ├── index.ts           # Exports all resolvers
    ├── card.ts            # Card resolvers (thin, calls CardService)
    ├── deck.ts
    ├── product.ts
    ├── artist.ts
    ├── opensea.ts
    └── ...
```

### 2.2 Migration Pattern

```typescript
// Before: source/graphql/schemas/card.ts (mixed)
export const typeDefs = gql`...`;
export const resolvers = { ... };

// After: source/graphql/typeDefs/card.ts
export const typeDefs = gql`...`;

// After: source/graphql/resolvers/card.ts
import { cardService } from "../../services";
export const resolvers: GQL.Resolvers = { ... };
```

### 2.3 Tasks

- [ ] Create `source/graphql/typeDefs/` directory
- [ ] Create `source/graphql/resolvers/` directory
- [ ] Move typeDefs from each schema file to typeDefs/
- [ ] Move resolvers from each schema file to resolvers/
- [ ] Update `schema.ts` to import from new locations
- [ ] Delete old `schemas/` directory (keep backward compat exports temporarily)
- [ ] Update imports throughout codebase

---

## Phase 3: Provider Consolidation

**Goal**: Reduce provider nesting from 11 levels to 6-7 levels

### 3.1 Current Provider Stack (11 levels)

```
1. ApolloProvider
2. DeckPaletteProvider
3. HeroCardsProvider
4. ThemeProvider
5. ViewedProvider
6. IsEuropeProvider
7. FavoritesProvider
8. SizeProvider
9. MenuProvider
10. AuthProvider
11. FlyingFavProvider
```

### 3.2 Proposed Consolidation

| Current Providers | New Provider | Rationale |
|-------------------|--------------|-----------|
| ViewedProvider + FavoritesProvider + FlyingFavProvider | UserPreferencesProvider | All user preference state |
| IsEuropeProvider + SizeProvider | DeviceProvider | Device/locale detection |
| DeckPaletteProvider + HeroCardsProvider | DeckContextProvider | Both are deck-page specific |

### 3.3 New Provider Stack (7 levels)

```
1. ApolloProvider           # Data fetching
2. ThemeProvider            # Styling
3. DeviceProvider           # IsEurope + Size + window dimensions
4. AuthProvider             # Authentication
5. UserPreferencesProvider  # Viewed + Favorites + FlyingFav
6. DeckContextProvider      # DeckPalette + HeroCards (lazy loaded)
7. MenuProvider             # UI state
```

### 3.4 Tasks

- [ ] Document current provider dependencies (which needs which)
- [ ] Create `components/Contexts/device/index.tsx` (merge IsEurope + Size)
- [ ] Create `components/Contexts/userPreferences/index.tsx` (merge Viewed + Favorites + FlyingFav)
- [ ] Create `components/Contexts/deckContext/index.tsx` (merge DeckPalette + HeroCards)
- [ ] Update `_app.tsx` to use new providers
- [ ] Update `app/providers.tsx` to match
- [ ] Update all consumer components to use new context hooks
- [ ] Add JSDoc documentation to each provider
- [ ] Delete deprecated provider files

---

## Phase 4: Expand Test Coverage

**Goal**: Increase coverage from ~40% to 70%+ with focused tests

### 4.1 Current Test Coverage

```
__tests__/
├── services/         # CardService, OpenSeaService ✓
├── hooks/            # Most hooks covered ✓
├── graphql/resolvers/ # Some resolvers ✓
├── integration/      # Card/deck hooks ✓
├── api/              # Some API routes ✓
├── components/       # Only HeroCards ✗
├── contexts/         # Only ViewedContext ✗
└── lib/              # Utils covered ✓
```

### 4.2 Priority Tests to Add

**High Priority** (business-critical):
- [ ] `__tests__/services/DeckService.test.ts` (after Phase 1)
- [ ] `__tests__/services/ProductService.test.ts` (after Phase 1)
- [ ] `__tests__/contexts/favorites.test.tsx`
- [ ] `__tests__/contexts/auth.test.tsx`
- [ ] `__tests__/contexts/bag.test.tsx`

**Medium Priority** (integration):
- [ ] `__tests__/graphql/resolvers/artist.test.ts`
- [ ] `__tests__/graphql/resolvers/contract.test.ts`
- [ ] `__tests__/integration/favorites-flow.test.ts`
- [ ] `__tests__/integration/auth-flow.test.ts`

**Lower Priority** (components):
- [ ] `__tests__/components/Card.test.tsx`
- [ ] `__tests__/components/Header.test.tsx`
- [ ] Storybook visual regression with Chromatic

### 4.3 Test Infrastructure

- [ ] Update jest.config.mjs coverage thresholds to 60%
- [ ] Add test:coverage script to package.json
- [ ] Set up Chromatic for Storybook visual testing
- [ ] Add E2E tests for critical flows with Playwright

---

## Phase 5: GraphQL Query Optimization

**Goal**: Eliminate query duplication using fragments consistently

### 5.1 Current Fragment Usage

Fragments already exist in `hooks/fragments.ts`:
- `CardFragment` - Full card data
- `CardBasicFragment` - Minimal card data
- `CardForDeckFragment` - Deck listing optimized
- `CardPopFragment` - Popup display
- `CardWithSlugsFragment` - With navigation info
- `ERC1155Fragment` - NFT data

### 5.2 Remaining Duplication

Check for inline queries that should use fragments:
- `hooks/deck.ts` - DeckFragment needed?
- `hooks/product.ts` - ProductFragment needed?
- `hooks/opensea.ts` - Already uses schema types

### 5.3 Tasks

- [ ] Audit all hooks files for inline field selections
- [ ] Create `DeckFragment`, `DeckBasicFragment` in fragments.ts
- [ ] Create `ProductFragment`, `ProductBasicFragment`
- [ ] Create `ArtistFragment`, `ArtistBasicFragment`
- [ ] Update hooks to use fragments consistently
- [ ] Document fragment usage in README

---

## Phase 6: Routing Architecture Decision

**Goal**: Commit to either App Router or Pages Router fully

### 6.1 Current State

- `pages/` - All public pages (card, deck, shop, etc.)
- `app/` - Only API routes (`/api/v1/graphql`, `/api/auth/*`, `/api/v1/upload/*`)

### 6.2 Options

**Option A: Stay on Pages Router**
- Pros: Working, well-tested, simpler mental model
- Cons: Won't get latest Next.js features (RSC, streaming)
- Action: Remove `app/` directory for non-API routes, document decision

**Option B: Migrate to App Router**
- Pros: Server Components, better performance potential
- Cons: Large migration effort, may break SSG patterns
- Action: Create migration plan, do incrementally

### 6.3 Recommendation

**Stay on Pages Router** for now. The current SSG with ISR pattern works well. Migration to App Router should be a dedicated project when:
- Next.js App Router is more stable
- There's a clear performance benefit to gain
- Team has bandwidth for migration

### 6.4 Tasks

- [ ] Document routing decision in ADR (Architecture Decision Record)
- [ ] Ensure `app/` only contains API routes (no pages)
- [ ] Add lint rule to prevent page creation in app/
- [ ] Update CLAUDE.md with routing guidelines

---

## Phase 7: Component Architecture Improvements

**Goal**: Split large components, standardize patterns

### 7.1 Components to Split

| Component | Lines | Suggested Split |
|-----------|-------|-----------------|
| `Card/index.tsx` | 430 | CardMedia, CardOverlay, CardFavorite |
| `CardPage/index.tsx` | 300+ | Hero, Gallery, More (already split?) |
| `Shop/Collection/index.tsx` | 400+ | ProductGrid, ReviewsCarousel |

### 7.2 Standardize Component Pattern

```typescript
// Standard component structure
import { FC, memo } from "react";

export interface ComponentNameProps {
  // Required props first
  title: string;
  // Optional props with defaults documented
  variant?: "primary" | "secondary";
}

/**
 * ComponentName - Brief description
 *
 * Used in: ParentComponent, OtherPlace
 */
const ComponentName: FC<ComponentNameProps> = memo(({ title, variant = "primary" }) => {
  // Implementation
});

ComponentName.displayName = "ComponentName";
export default ComponentName;
```

### 7.3 Tasks

- [ ] Audit components over 300 lines
- [ ] Create component splitting plan for each
- [ ] Extract `CardMedia` from Card component
- [ ] Extract `CardOverlay` from Card component
- [ ] Document component patterns in CLAUDE.md
- [ ] Remove unnecessary useCallback/useMemo (benchmark first)

---

## Phase 8: GraphQL Codegen Setup

**Goal**: Generate type-safe hooks from GraphQL schema

### 8.1 Current State

- Types come from `GQL` namespace (manually maintained?)
- Hooks manually wrap `useQuery` with type assertions
- No automatic sync between schema and types

### 8.2 Codegen Configuration

```yaml
# codegen.yml
schema: "source/graphql/schema.ts"
documents: "hooks/**/*.ts"
generates:
  source/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      withHooks: true
      withComponent: false
```

### 8.3 Tasks

- [ ] Install @graphql-codegen/cli and plugins
- [ ] Create codegen.yml configuration
- [ ] Generate initial types
- [ ] Compare generated types with existing GQL namespace
- [ ] Migrate hooks to use generated hooks (incremental)
- [ ] Add codegen to pre-commit hook
- [ ] Document codegen workflow

---

## Execution Order

### Sprint 1 (Week 1-2): Foundation
1. Phase 1: Complete service extraction
2. Phase 4 (partial): Add tests for new services

### Sprint 2 (Week 3-4): Architecture
3. Phase 2: Separate resolvers from typeDefs
4. Phase 3: Provider consolidation

### Sprint 3 (Week 5-6): Optimization
5. Phase 5: GraphQL query optimization
6. Phase 6: Routing decision + documentation

### Sprint 4 (Week 7-8): Polish
7. Phase 7: Component improvements
8. Phase 8: GraphQL codegen setup

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Test coverage | ~40% | 70% |
| Provider nesting | 11 | 7 |
| Schema files with services | 2/12 | 12/12 |
| Components >400 lines | 3+ | 0 |
| GraphQL codegen | No | Yes |

---

## Quick Wins (Can Do Anytime)

- [ ] Add JSDoc to all context providers
- [ ] Remove commented-out code throughout codebase
- [ ] Document state ownership (which data lives where)
- [ ] Add displayName to all memoized components
- [ ] Create ADR for routing decision
