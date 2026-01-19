# Performance Analysis Report: playingarts.com vs dev.playingarts.com

**Date**: January 19, 2026
**Branch**: `refactor/structural-improvements`

---

## Executive Summary

The main site (`playingarts.com`) loads **3-5x faster** than the dev site (`dev.playingarts.com`). The root causes are fundamentally different architectural decisions around data fetching and caching.

---

## Key Metrics Comparison

| Metric | Main Site | Dev Site | Difference |
|--------|-----------|----------|------------|
| **TTFB (avg)** | 47ms | 116ms | **2.5x slower** |
| **HTML Size** | 362 KB | 118 KB | Main has more SSR data |
| **Cards in SSR** | 388 | 0 | **Critical difference** |
| **Next.js Cache** | HIT | N/A | Main uses ISR |
| **CDN Cache** | HIT (age: 24 days) | Must-revalidate | **Huge difference** |
| **JS Chunks** | 15 files | 10 files | Different bundling |

---

## Root Cause Analysis

### 1. SSR Strategy: getServerSideProps vs getStaticProps

| Aspect | Main Site (master) | Dev Site (refactor branch) |
|--------|-------------------|---------------------------|
| **Method** | `getServerSideProps` | `getStaticProps` |
| **Data** | Apollo cache with 388 cards, decks, products | 444 serialized homeCards only |
| **Caching** | `s-maxage=31536000` (1 year) | `max-age=0, must-revalidate` |
| **Runtime** | Vercel Edge (cached) | Vercel Serverless (revalidates) |

**Main site (master):**
```javascript
export const getServerSideProps = async () => {
  const client = initApolloClient();
  await client.query({ query: DecksQuery });
  await client.query({ query: RandomCardsQueryWithoutDeck });
  return { props: { cache: client.cache.extract() } };
};
export default withApollo(Home, { ssr: false });
```

**Dev site (refactor branch):**
```javascript
export const getStaticProps = async () => {
  const homeCards = await cardService.getHomeCards(500);
  return { props: { homeCards }, revalidate: 60 };
};
```

### 2. Cache Headers - The Biggest Factor

| Site | Cache Behavior | Effect |
|------|----------------|--------|
| **Main** | `x-nextjs-cache: HIT`, `age: 24 days` | Pre-rendered, served from edge |
| **Dev** | `must-revalidate`, regenerates | Server hit on every request |

The main site has been cached for **24+ days** and serves directly from Cloudflare edge. The dev site requires server validation on every request.

### 3. Data Hydration Approach

**Main site**: Ships full Apollo cache (191 KB of data) with the HTML
- All decks, products, and cards pre-loaded
- No additional GraphQL calls needed after page load
- Client-side navigation is instant

**Dev site**: Ships minimal data (444 card summaries)
- Components make additional queries after mount
- Client waits for API responses to render content
- More network round-trips

### 4. Component Architecture

**Dev site** uses more aggressive lazy loading:
```javascript
const Collection = dynamic(() => import("../Home/Collection"), { ssr: false });
const Gallery = dynamic(() => import("../Home/Gallery"), { ssr: false });
```

While lazy loading helps initial bundle size, combined with client-side data fetching, it creates a **waterfall**:
1. Page loads → 2. JS hydrates → 3. Lazy components load → 4. GraphQL queries fire → 5. Content renders

### 5. JS Bundle Comparison

| Main Site | Dev Site |
|-----------|----------|
| 15 chunk files | 10 chunk files |
| More granular splitting | Larger chunks |
| _app: different hash | _app: 297 KB |

---

## Why Main Site Is Faster

1. **24+ Day Edge Cache**: The HTML is literally served from CDN memory without touching the server
2. **Pre-populated Apollo Cache**: All data embedded in HTML, no client-side fetches needed
3. **Static Generation with Long TTL**: ISR with long cache creates near-static behavior
4. **Simpler Hydration**: Less work for React to do on mount

---

## Why Dev Site Is Slower

1. **ISR with 60s Revalidation**: Forces server regeneration frequently
2. **No Apollo Cache SSR**: Components fetch data client-side after mount
3. **Lazy Loading + Client Fetch**: Creates loading waterfalls
4. **Must-Revalidate Headers**: No edge caching benefit

---

## Recommendations to Fix Dev Site

### Phase 1: Quick Wins (Cache Configuration)
- [ ] Increase `revalidate` from 60s to 3600s (1 hour) or higher
- [ ] Configure Vercel headers to return proper `s-maxage` for static pages

### Phase 2: Data Hydration (Medium Effort)
- [ ] Restore Apollo cache hydration in `getStaticProps`
- [ ] Pre-fetch DecksQuery and RandomCardsQuery server-side
- [ ] Ship Apollo cache extract in pageProps
- [ ] Remove client-side data fetching from Home components

### Phase 3: Architecture Alignment
- [ ] Consider switching back to `getServerSideProps` with caching (matches main site)
- [ ] Add `fetchpriority="high"` for hero images
- [ ] Review lazy loading strategy - ensure data is available before components load

---

## Summary Table

| Factor | Main Site | Dev Site | Impact |
|--------|-----------|----------|--------|
| Edge Cache | ✅ 24 days | ❌ Must revalidate | **HIGH** |
| Apollo SSR | ✅ 388 cards | ❌ None | **HIGH** |
| TTFB | 47ms | 116ms | Medium |
| Data in HTML | 362 KB | 118 KB | Medium |
| Lazy loading | Minimal | Aggressive | Low |

---

## Conclusion

**Bottom line**: The main site's combination of `getServerSideProps` + Apollo cache hydration + long-lived edge cache creates a near-static experience. The dev site's ISR approach with client-side data fetching introduces multiple performance penalties.

The fix requires restoring Apollo cache hydration to eliminate client-side data fetching waterfalls, and configuring proper cache headers to leverage edge caching.
