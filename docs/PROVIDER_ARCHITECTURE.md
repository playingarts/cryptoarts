# Provider Architecture

This document describes the React Context providers used in the Playing Arts application.

## Current Provider Stack (11 Providers)

The providers are nested in `pages/_app.tsx` in this order:

```
1. ApolloProvider           - GraphQL data fetching
2. DeckPaletteProvider      - Deck-specific color palette
3. HeroCardsProvider        - Hero card data for deck pages
4. ThemeProvider            - Emotion CSS-in-JS theming
5. ViewedProvider           - Tracks which cards have been viewed
6. IsEuropeProvider         - Shopping bag + currency detection (misnamed)
7. FavoritesProvider        - Favorite cards storage
8. SizeProvider             - Window width/responsive breakpoints
9. MenuProvider             - Global navigation menu state
10. AuthProvider            - User authentication state
11. FlyingFavProvider       - Flying star animation for favorites
```

## Provider Details

### 1. ApolloProvider (External)
- **Source**: `@apollo/client`
- **Purpose**: GraphQL client for data fetching
- **Dependencies**: None
- **Consumers**: All components using GraphQL queries

### 2. DeckPaletteProvider
- **Source**: `components/Pages/Deck/DeckPaletteContext`
- **Purpose**: Provides deck-specific color palette for styling
- **Dependencies**: None
- **Consumers**: Deck page components, Header

### 3. HeroCardsProvider
- **Source**: `components/Pages/Deck/HeroCardsContext`
- **Purpose**: Hero card data for deck page hero section
- **Dependencies**: None
- **Consumers**: Deck page hero section

### 4. ThemeProvider (External)
- **Source**: `@emotion/react`
- **Purpose**: CSS-in-JS theming
- **Dependencies**: None
- **Consumers**: All styled components

### 5. ViewedProvider
- **Source**: `contexts/viewedContext`
- **Purpose**: Tracks which cards have been viewed (persisted to localStorage)
- **Dependencies**: `useLocalStorage`
- **Storage Key**: `"viewed"`
- **Consumers**: Card components, for "new" badge display

### 6. IsEuropeProvider (BagContext)
- **Source**: `components/Contexts/bag`
- **Purpose**:
  - Shopping bag state (persisted to localStorage)
  - Currency detection (EUR vs USD based on timezone)
- **Dependencies**: `useLocalStorage`
- **Storage Key**: `"cryptoarts:bag"`
- **Note**: The provider name is misleading - it actually manages the shopping bag

### 7. FavoritesProvider
- **Source**: `components/Contexts/favorites`
- **Purpose**: Stores favorite cards per deck (persisted to localStorage)
- **Dependencies**: `useLocalStorage`
- **Storage Key**: `"cryptoarts:favorites"`
- **Consumers**: Card components, FavoritesPage

### 8. SizeProvider
- **Source**: `components/SizeProvider`
- **Purpose**: Provides current window width for responsive design
- **Dependencies**: None
- **Consumers**: Components needing responsive breakpoint info

### 9. MenuProvider
- **Source**: `components/Contexts/menu.tsx`
- **Purpose**: Global navigation menu open/close state
- **Dependencies**: None
- **Note**: Also renders the MainMenu component via portal
- **Consumers**: Header, any component that opens the menu

### 10. AuthProvider
- **Source**: `components/Contexts/auth`
- **Purpose**: User authentication state
- **Dependencies**: Fetches from `/api/auth/me`
- **Consumers**: Admin components, login page

### 11. FlyingFavProvider
- **Source**: `components/Contexts/flyingFav`
- **Purpose**: Flying star animation when adding favorites
- **Dependencies**: None
- **Consumers**: Card components, FloatingFavButton

## State Storage Summary

| Provider | Storage | Key |
|----------|---------|-----|
| ViewedProvider | localStorage | `viewed` |
| BagContext | localStorage | `cryptoarts:bag` |
| FavoritesProvider | localStorage | `cryptoarts:favorites` |
| AuthProvider | API + cookies | `/api/auth/me` |
| Others | Memory only | - |

## Potential Consolidation (Future Work)

The following providers could potentially be merged:

### Option A: UserPreferencesProvider
Merge: `ViewedProvider` + `FavoritesProvider`
- Both track user-specific card state
- Both use localStorage
- Similar API patterns

### Option B: DeviceProvider
Merge: `IsEuropeProvider` (currency part) + `SizeProvider`
- Both detect device/locale info
- Both are read-only state

### Option C: ShoppingProvider
Keep `IsEuropeProvider` (bag part) separate or rename to `BagProvider`
- Clear shopping domain

**Recommendation**: Prioritize renaming `IsEuropeProvider` to `BagProvider` first, as the current name is confusing. Full consolidation can be done incrementally.

## Dependencies Graph

```
None -> ApolloProvider
None -> ThemeProvider
None -> DeckPaletteProvider
None -> HeroCardsProvider
None -> SizeProvider
None -> MenuProvider
None -> FlyingFavProvider

useLocalStorage -> ViewedProvider
useLocalStorage -> BagContext (IsEuropeProvider)
useLocalStorage -> FavoritesProvider

/api/auth/me -> AuthProvider
```

## Usage Examples

### Using Multiple Contexts
```tsx
const MyComponent = () => {
  const { user, isAdmin } = useAuth();
  const { isFavorite, addItem } = useFavorites();
  const { getPrice } = useBag();
  const { width } = useSize();

  // Component logic
};
```

### Checking Provider Availability
```tsx
// MenuContext throws if used outside provider
const { showMenu } = useMenu(); // throws if no MenuProvider

// Others return empty defaults
const { user } = useAuth(); // returns { user: null, ... }
```
