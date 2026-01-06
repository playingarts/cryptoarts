# App Router Migration Plan

This document outlines the migration strategy from Pages Router to App Router for the Playing Arts website.

## Current Architecture

### Pages (10 routes)
- `/` - Homepage (`pages/index.tsx`)
- `/[deckId]` - Deck page (`pages/[deckId].tsx`)
- `/[deckId]/[artistSlug]` - Artist card page (`pages/[deckId]/[artistSlug].tsx`)
- `/shop` - Shop page (`pages/shop.tsx`)
- `/shop/[pId]` - Product page (`pages/shop/[pId].tsx`)
- `/bag` - Shopping bag (`pages/bag.tsx`)
- `/favorites` - Favorites page (`pages/favorites.tsx`)
- `/contact` - Contact page (`pages/contact.tsx`)
- `/privacy` - Privacy policy (`pages/privacy.tsx`)
- `/404` - Not found page (`pages/404.tsx`)

### API Routes (5 endpoints)
- `/api/health` - Health check
- `/api/revalidate` - ISR revalidation
- `/api/v1/graphql` - GraphQL endpoint
- `/api/v1/newsletter` - Newsletter subscription
- `/api/v1/assets/[contractId]` - Asset metadata

### Key Dependencies
- Apollo Client with SSR via `withApollo` HOC
- Emotion CSS-in-JS with `css` prop
- MetaMask integration via `metamask-react`
- Context providers: Signature, Viewed, Bag, Size

## Migration Strategy

### Phase 1: Foundation (Low Risk) ✅ COMPLETED
1. ✅ Create `app/` directory alongside `pages/`
2. ✅ Move `layout.tsx` setup (root layout with providers)
3. ⏳ Migrate static pages first: `/contact`, `/privacy` (pending)
4. ✅ Migrate `/404` to `app/not-found.tsx`

### Phase 2: API Routes ✅ COMPLETED (January 2026)
All 5 API routes migrated to App Router Route Handlers:
- ✅ `pages/api/health.ts` → `app/api/health/route.ts`
- ✅ `pages/api/revalidate.ts` → `app/api/revalidate/route.ts`
- ✅ `pages/api/v1/newsletter.ts` → `app/api/v1/newsletter/route.ts`
- ✅ `pages/api/v1/graphql.ts` → `app/api/v1/graphql/route.ts`
- ✅ `pages/api/v1/assets/[contractId].ts` → `app/api/v1/assets/[contractId]/route.ts`

Key changes in migration:
- Uses `NextRequest`/`NextResponse` from `next/server`
- Named exports (`GET`, `POST`) instead of default export
- Dynamic route params via `Promise<{ paramName: string }>` second argument
- Rate limiting implemented inline (in-memory) for each endpoint
- ISR revalidation uses `revalidatePath()` from `next/cache`

### Phase 3: Dynamic Routes
1. Migrate shop pages: `/shop`, `/shop/[pId]`
2. Migrate deck pages: `/[deckId]`, `/[deckId]/[artistSlug]`
3. Migrate user-specific pages: `/bag`, `/favorites`

### Phase 4: Homepage
1. Migrate `/` with all its components
2. Convert `getInitialProps` to `generateMetadata` + Server Components

## Technical Considerations

### Apollo Client Migration
Current pattern (Pages Router):
```tsx
export default withApollo(Page, { ssr: true });
```

New pattern (App Router):
```tsx
// app/providers.tsx - Client Component
'use client';
export function ApolloProvider({ children }) { ... }

// app/[deckId]/page.tsx - Server Component
export default async function Page({ params }) {
  // Use RSC data fetching or dehydrate Apollo cache
}
```

### Emotion CSS-in-JS
Emotion's `css` prop requires the React runtime. Options:
1. Mark components using `css` prop as `'use client'`
2. Gradually migrate to CSS Modules or Tailwind for server components
3. Use Emotion's SSR streaming support

### Context Providers
Move client-side providers to a client component wrapper:
```tsx
// app/providers.tsx
'use client';
export function Providers({ children }) {
  return (
    <MetaMaskProvider>
      <SignatureProvider>
        <ViewedProvider>
          <BagProvider>
            {children}
          </BagProvider>
        </ViewedProvider>
      </SignatureProvider>
    </MetaMaskProvider>
  );
}
```

### Data Fetching Changes
| Pages Router | App Router |
|--------------|------------|
| `getServerSideProps` | Server Component async function |
| `getStaticProps` | Server Component + `export const revalidate` |
| `getInitialProps` | Server Component async function |
| `useSWR` client-side | Server Component or `use()` hook |

## Risk Assessment

### Low Risk
- Static pages (contact, privacy)
- API Route Handlers (direct conversion)
- 404 page

### Medium Risk
- Shop pages (product data)
- Deck pages (dynamic segments)
- Apollo SSR integration

### High Risk
- Homepage (complex data requirements)
- MetaMask/Web3 integration (client-only)
- Bag/Favorites (localStorage + context)

## Recommended Timeline

1. **Preparation**: Set up `app/` directory, create providers
2. **Phase 1**: Static pages + not-found
3. **Phase 2**: API routes
4. **Phase 3**: Dynamic pages with simpler data needs
5. **Phase 4**: Complex pages (homepage, bag)
6. **Cleanup**: Remove `pages/` directory, update tests

## Rollback Strategy

- Keep `pages/` directory until full migration is verified
- Use feature flags for gradual rollout if needed
- Maintain smoke tests for both routers during migration

## References

- [Next.js App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Incremental Adoption](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#incremental-adoption-steps)
- [Apollo Client with App Router](https://www.apollographql.com/blog/apollo-client-nextjs-app-router/)
