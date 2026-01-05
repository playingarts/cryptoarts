# ADR 001: /new Directory Migration Strategy

**Status**: Accepted
**Date**: 2026-01-05
**Branch**: `refactor/structural-improvements`

## Context

The Playing Arts codebase has evolved to have two parallel structures:

1. **Legacy structure** (`/components`, `/contexts`, legacy pages)
   - Original implementation
   - Currently powers production at playingarts.com (main branch)
   - Contains 47 component directories
   - Mixed patterns, some technical debt

2. **New structure** (`/new/`)
   - Redesigned website implementation
   - Currently deployed at dev.playingarts.com (this branch)
   - Contains refactored Pages, Contexts, and components
   - Cleaner patterns, better organization

This dual structure creates:
- Confusion about which components to use
- Duplicate implementations (Footer, Header, Card, ErrorBoundary, etc.)
- Maintenance burden (fixes may need to be applied twice)
- Unclear import paths for new development

## Decision

We will **complete the migration to the `/new` structure** on the `refactor/structural-improvements` branch with the following approach:

### What stays

1. **`/new/` directory** - This IS the new website
   - `/new/Pages/` - All page implementations
   - `/new/Contexts/` - React contexts (bag, favorites)
   - `/new/Buttons/`, `/new/Card/`, `/new/Icons/`, etc. - UI components
   - `/new/ErrorBoundary/` - Error handling

2. **Shared infrastructure** (used by `/new`):
   - `/hooks/` - Data fetching hooks (GraphQL)
   - `/source/` - Backend, GraphQL, models, services
   - `/pages/` - Next.js routing (delegates to `/new/Pages/`)
   - `/styles/` - Theme configuration (to be extracted from `_app.tsx`)

3. **Development tooling**:
   - `/.storybook/` - Storybook configuration
   - `/mocks/` - Test mocks
   - `/__tests__/` - Test files

### What goes (from this branch only)

1. **`/pages/old/`** - Legacy page implementations
   - `[deckId].tsx`, `index.tsx`, `shop.tsx`
   - These are superseded by `/new/Pages/`

2. **Unused `/components/`** - Legacy components not imported anywhere
   - Will be identified via audit (Step 4)
   - Only remove components with zero imports

3. **Duplicate components** - Where both `/components/X` and `/new/X` exist:
   - Keep `/new/X` version
   - Update any remaining imports to use `/new/X`
   - Delete `/components/X`

### Migration rules

1. **No changes to `main` branch** - Legacy code remains on main for production
2. **This branch can diverge** - Structure can differ from main
3. **Imports should prefer `/new/`** - When adding new code
4. **Shared code goes to `/hooks/` or `/source/`** - Not component directories

### Future state (post-migration)

```
cryptoarts/
├── new/                    # Website implementation (rename to / eventually)
│   ├── Pages/              # Page components
│   ├── Contexts/           # React contexts
│   ├── Components/         # Shared UI components
│   └── ...
├── pages/                  # Next.js routing (thin, delegates to /new/Pages)
├── hooks/                  # Data fetching hooks
├── source/                 # Backend
│   ├── models/             # Mongoose models
│   ├── services/           # Business logic
│   ├── graphql/            # GraphQL (resolvers + typeDefs only)
│   └── lib/                # Utilities, clients
├── styles/                 # Theme, design tokens
├── docs/                   # Documentation
└── __tests__/              # Tests
```

### Why not rename `/new/` now?

Renaming `/new/` to root-level directories (e.g., `/new/Pages/` → `/app/` or `/views/`) would:
- Create massive git diff noise
- Risk merge conflicts with any parallel work
- Require updating many import paths at once

Instead, we:
1. Complete the cleanup first (remove unused legacy code)
2. Stabilize on `/new/` structure
3. Consider renaming in a future, dedicated PR if desired

## Consequences

### Positive
- Clear single source of truth for components
- Easier onboarding for new developers
- Reduced maintenance burden
- Smaller bundle (unused code removed)
- Cleaner import paths

### Negative
- `/new/` naming is not ideal long-term (but functional)
- Some shared components may need adjustment
- Migration requires careful testing

### Neutral
- Storybook stories may need path updates
- Test mocks may need updates

## Verification

After migration is complete:
- [ ] `yarn build` succeeds
- [ ] `yarn lint:tsc` passes
- [ ] dev.playingarts.com works correctly
- [ ] All pages render without errors
- [ ] Storybook builds and shows components
- [ ] No imports from deleted `/components/` directories
