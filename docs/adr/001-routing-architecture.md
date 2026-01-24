# ADR 001: Routing Architecture Decision

**Date**: January 24, 2026
**Status**: Accepted
**Decision**: Continue using Pages Router for all pages

## Context

The Playing Arts codebase uses Next.js 15 with a hybrid routing setup:
- **Pages Router** (`pages/`): All public pages (card, deck, shop, favorites, etc.)
- **App Router** (`app/`): Only API routes (`/api/v1/graphql`, `/api/auth/*`, `/api/v1/upload/*`)

This creates confusion about where to add new features and which patterns to follow.

## Decision

**Continue using Pages Router for all pages. Reserve App Router for API routes only.**

## Rationale

### Why Not Migrate to App Router?

1. **Working SSG Pattern**: The current Static Site Generation (SSG) with Incremental Static Regeneration (ISR) pattern works well for this content-heavy site.

2. **Migration Complexity**: Full App Router migration would require:
   - Converting all `getStaticProps`/`getStaticPaths` to new patterns
   - Updating data fetching to use Server Components
   - Potentially restructuring Apollo Client usage
   - Significant testing effort

3. **Limited Benefit**: For a content site with SSG, the main App Router benefits (streaming, server components) provide marginal improvement over the current setup.

4. **Team Familiarity**: The team is experienced with Pages Router patterns.

### Why Keep App Router for APIs?

1. **Route Handlers**: App Router's `route.ts` convention is cleaner for API endpoints
2. **Middleware Integration**: Works well with edge middleware for rate limiting
3. **No Migration Cost**: API routes are already in App Router

## Consequences

### Positive
- Clear separation: pages in `pages/`, APIs in `app/api/`
- No migration effort required
- Existing patterns continue to work

### Negative
- Cannot use Server Components for pages
- Won't get App Router streaming benefits
- Two router systems to understand

## Implementation

### Do
- Add new pages to `pages/` directory
- Add new API routes to `app/api/` directory
- Use `getStaticProps` and `getStaticPaths` for SSG
- Use `withApollo` HOC for Apollo integration in pages

### Don't
- Don't add pages to `app/` directory
- Don't use `loading.tsx` or `error.tsx` conventions (use ErrorBoundary instead)
- Don't create layouts in `app/` for pages (use `_app.tsx`)

## When to Reconsider

Revisit this decision when:
1. Next.js App Router becomes more stable and migration tools improve
2. There's a clear performance need that Server Components would solve
3. Major refactoring is planned anyway
4. Apollo Client has better Server Component support

## Related Files

- `pages/_app.tsx` - Main app layout
- `pages/[deckId]/[artistSlug].tsx` - Card page with SSG
- `app/api/v1/graphql/route.ts` - GraphQL API endpoint
- `next.config.js` - Next.js configuration
