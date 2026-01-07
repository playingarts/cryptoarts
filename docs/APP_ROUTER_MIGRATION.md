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

### API Routes (5 endpoints) ✅ All Migrated
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

## Migration Status

| Phase | Description | Status |
|-------|-------------|--------|
| Phase 1 | Foundation (layout, providers, not-found) | ✅ Complete |
| Phase 2 | API Routes | ✅ Complete |
| Phase 3 | Page Routes | 🔄 In Progress |
| Phase 4 | Cleanup | ⏳ Pending |

---

## Phase 3: Page Routes Migration

### Prerequisites

Before migrating page routes, fix the ESM import issue in `[deckId].tsx`:

```tsx
// ❌ Current (breaks ESM)
const client = initApolloClient(undefined, {
  schema: (await require("../source/graphql/schema")).schema,
});

// ✅ Fixed (static import)
import { schema } from "@/source/graphql/schema";
const client = initApolloClient(undefined, { schema });
```

### 3.1 Simple Pages (Low Complexity)

These pages only connect to MongoDB and render client components.

#### Pattern: Pages Router → App Router

**Before (Pages Router):**
```tsx
// pages/shop.tsx
import { connect } from "../source/mongoose";
export { default } from "@/components/Pages/Shop";

export const getServerSideProps = async () => {
  await connect();
  return { props: {} };
};
```

**After (App Router):**
```tsx
// app/shop/page.tsx
import { connect } from "@/source/mongoose";
import Shop from "@/components/Pages/Shop";

export default async function ShopPage() {
  await connect();
  return <Shop />;
}
```

#### Pages to Migrate

| Page | Source | Target | Notes |
|------|--------|--------|-------|
| Home | `pages/index.tsx` | `app/page.tsx` | Entry point |
| Shop | `pages/shop.tsx` | `app/shop/page.tsx` | Listing |
| Product | `pages/shop/[pId].tsx` | `app/shop/[pId]/page.tsx` | Dynamic |
| Bag | `pages/bag.tsx` | `app/bag/page.tsx` | Client-heavy |
| Favorites | `pages/favorites.tsx` | `app/favorites/page.tsx` | Client-heavy |
| Contact | `pages/contact.tsx` | `app/contact/page.tsx` | Uses withApollo |
| Privacy | `pages/privacy.tsx` | `app/privacy/page.tsx` | Uses withApollo |

### 3.2 ISR Pages (High Complexity)

These pages use `getStaticPaths` + `getStaticProps` with ISR.

#### Pattern: ISR Migration

**Before (Pages Router):**
```tsx
// pages/[deckId].tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const decks = await fetchDecks();
  return {
    paths: decks.map((d) => ({ params: { deckId: d.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await fetchDeckData(params.deckId);
  if (!data) return { notFound: true, revalidate: 60 };
  return { props: { cache: data }, revalidate: 60 };
};
```

**After (App Router):**
```tsx
// app/[deckId]/page.tsx
import { notFound } from "next/navigation";
import { connect } from "@/source/mongoose";
import { initApolloClient } from "@/source/apollo";
import { schema } from "@/source/graphql/schema";
import Deck from "@/components/Pages/Deck";

// ISR configuration
export const revalidate = 60;
export const dynamicParams = true; // fallback: 'blocking'

export async function generateStaticParams() {
  await connect();
  const client = initApolloClient(undefined, { schema });
  const { data } = await client.query({ query: DecksNavQuery });
  return data.decks.map((d: GQL.Deck) => ({ deckId: d.slug }));
}

export default async function DeckPage({
  params,
}: {
  params: { deckId: string };
}) {
  await connect();
  const client = initApolloClient(undefined, { schema });

  const { data } = await client.query({
    query: DeckQuery,
    variables: { slug: params.deckId },
  });

  if (!data?.deck) {
    notFound();
  }

  // Prefetch related data
  await Promise.all([
    client.query({ query: CardsForDeckQuery, variables: { deck: data.deck._id } }),
    client.query({ query: LosersQuery, variables: { deck: data.deck._id } }),
    client.query({ query: HeroCardsQuery, variables: { deck: data.deck._id, slug: data.deck.slug } }),
  ]);

  return <Deck initialCache={client.cache.extract()} />;
}
```

#### ISR Pages to Migrate

| Page | Source | Target | Complexity |
|------|--------|--------|------------|
| Deck | `pages/[deckId].tsx` | `app/[deckId]/page.tsx` | High |
| Artist Card | `pages/[deckId]/[artistSlug].tsx` | `app/[deckId]/[artistSlug]/page.tsx` | High |

### 3.3 Pages Using withApollo HOC

**Before (Pages Router):**
```tsx
// pages/contact.tsx
import { withApollo } from "../source/apollo";
import ContactPage from "@/components/Pages/ContactPage";
export default withApollo(ContactPage, { ssr: false });
```

**After (App Router):**
```tsx
// app/contact/page.tsx
import ContactPage from "@/components/Pages/ContactPage";

// No SSR data fetching (client-side only)
export default function Contact() {
  return <ContactPage />;
}
```

For client-side Apollo, the `ApolloProvider` in `app/providers.tsx` handles hydration.

---

## Migration Order (Recommended)

### Step 1: Fix ESM Imports (Prerequisite)
- [ ] Update `pages/[deckId].tsx` - replace dynamic `require()` with static import
- [ ] Update `pages/[deckId]/[artistSlug].tsx` - replace dynamic `require()` with static import
- [ ] Update `source/apollo.tsx` if needed

### Step 2: Migrate Simple Client-Only Pages
- [ ] `/contact` → `app/contact/page.tsx`
- [ ] `/privacy` → `app/privacy/page.tsx`

### Step 3: Migrate Simple SSR Pages
- [ ] `/` → `app/page.tsx`
- [ ] `/shop` → `app/shop/page.tsx`
- [ ] `/shop/[pId]` → `app/shop/[pId]/page.tsx`
- [ ] `/bag` → `app/bag/page.tsx`
- [ ] `/favorites` → `app/favorites/page.tsx`

### Step 4: Migrate ISR Pages
- [ ] `/[deckId]` → `app/[deckId]/page.tsx`
- [ ] `/[deckId]/[artistSlug]` → `app/[deckId]/[artistSlug]/page.tsx`

### Step 5: Cleanup
- [ ] Delete migrated files from `pages/`
- [ ] Remove `pages/_app.tsx` (replaced by `app/layout.tsx`)
- [ ] Remove `pages/_document.tsx` (replaced by `app/layout.tsx`)
- [ ] Update imports and tests

---

## Technical Considerations

### Apollo Client Integration

The current `withApollo` HOC pattern doesn't work with App Router Server Components.

**Server-side data fetching:**
```tsx
// In a Server Component
const client = initApolloClient(undefined, { schema });
const { data } = await client.query({ query: MyQuery });
```

**Client-side hydration:**
```tsx
// app/providers.tsx already sets up ApolloProvider
// Client components use hooks as normal:
const { data } = useQuery(MyQuery);
```

**Cache hydration pattern:**
```tsx
// Server Component
export default async function Page() {
  const client = initApolloClient(undefined, { schema });
  await client.query({ query: MyQuery });
  const cache = client.cache.extract();

  return <ClientComponent initialCache={cache} />;
}

// Client Component
'use client';
function ClientComponent({ initialCache }) {
  // Hydrate Apollo cache with server data
  const client = useApolloClient();
  useEffect(() => {
    client.cache.restore(initialCache);
  }, []);
  // ...
}
```

### Metadata Migration

**Before (Pages Router):**
```tsx
// In component
<Head>
  <title>Page Title</title>
  <meta name="description" content="..." />
</Head>
```

**After (App Router):**
```tsx
// At top of page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title",
  description: "...",
};

// Or dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await fetchData(params.id);
  return { title: data.name };
}
```

### Route Segment Config

```tsx
// Static page rebuilt every 60s
export const revalidate = 60;

// Dynamic page (no caching)
export const dynamic = 'force-dynamic';

// Fully static (build-time only)
export const dynamic = 'force-static';

// Handle unknown dynamic paths
export const dynamicParams = true; // fallback: 'blocking'
export const dynamicParams = false; // fallback: false (404)
```

---

## Validation Checklist

For each migrated page:

- [ ] Page renders correctly at the route
- [ ] Data is fetched properly (check network tab)
- [ ] SEO metadata is present (view source)
- [ ] No hydration warnings in console
- [ ] Client-side navigation works
- [ ] Apollo queries execute correctly
- [ ] ISR revalidation works (if applicable)
- [ ] Error boundaries catch errors
- [ ] Loading states work as expected

---

## Rollback Strategy

During migration, both routers coexist safely:

1. **Route precedence**: `app/` routes take precedence over `pages/`
2. **Quick rollback**: Delete the `app/` route file to restore `pages/` behavior
3. **No code changes needed**: Just file deletion

Example:
```bash
# To rollback /shop migration
rm app/shop/page.tsx
# pages/shop.tsx automatically serves /shop again
```

---

## References

- [Next.js App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Data Fetching in App Router](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [ISR in App Router](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Apollo Client with App Router](https://www.apollographql.com/blog/apollo-client-nextjs-app-router/)
