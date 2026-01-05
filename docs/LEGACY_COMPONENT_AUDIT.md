# Legacy Component Audit

**Date**: January 5, 2026
**Branch**: `refactor/structural-improvements`

## Summary

- **Total Components in `/components/`**: 45 (excluding `_composed/`)
- **Used**: 32 (71%)
- **Unused**: 13 (29%)

---

## UNUSED COMPONENTS (Safe to Remove)

These components have no production imports - only Storybook stories:

| Component | Notes |
|-----------|-------|
| `AllEntriesBlock` | Only in story file |
| `AllEntriesCard` | Only in story file |
| `Arrowed` | Only in story file |
| `Carousel` | Only in story file |
| `EmailForm` | Only in story file (new version exists in `/new/`) |
| `Faq` | Only in story file (composed version used) |
| `FaqItem` | Only in story file |
| `LatestRelease` | Only in story file |
| `Loader` | Only in story file |
| `MetamaskButton` | Only in story file |
| `Nav` | Only in story file |
| `NFTHolder` | Only in story file |
| `Roadmap` | Only in story file |
| `Select` | No imports found |
| `Stat` | Only in story file |
| `StoreButtons` | Only in story file |
| `Truncate` | No imports found |

---

## USED COMPONENTS

### Core Layout (Used by `/new/`)
- `Grid` - Heavily used across entire codebase
- `SizeProvider` - Used in `_app.tsx` and many components
- `Icons/*` - Various icons used throughout

### Used by Legacy Pages Only (`/pages/old/`)
These will become unused after Step 6 removes `/pages/old/`:

- `AddToBagButton`
- `AugmentedReality` (old version)
- `BagButton`
- `BlockTitle`
- `Card` (old version)
- `CrazyAcesBanner`
- `DeckBlock`
- `DeckNav`
- `EurToUsd`
- `Hero` (old version)
- `Line`
- `Link` (old version)
- `Modal`
- `Quote`
- `ScrollArrow`
- `ScrollIntoView`
- `SelectButton`
- `Shop/*` (CheckoutItem, Item, Sheets, SoldOut, Bundle)
- `StatBlock`
- `Text` (old version)

### Used by Active Pages
- `Button` - Used in `privacy.tsx`, `contact.tsx`, `404.tsx`, and `/new/`
- `Charts` - Used by `/new/Pages/Deck/PACE/`
- `Footer` - Used by `_composed/GlobalLayout`
- `Header` - Used by `_composed/GlobalLayout`
- `Layout` - Used by `privacy.tsx`, `contact.tsx`, `404.tsx`

---

## Recommendations

### Step 5: Remove These Unused Components
```
components/AllEntriesBlock/
components/AllEntriesCard/
components/Arrowed/
components/Carousel/
components/EmailForm/
components/Faq/
components/FaqItem/
components/LatestRelease/
components/Loader/
components/MetamaskButton/
components/Nav/
components/NFTHolder/
components/Roadmap/
components/Select/
components/Stat/
components/StoreButtons/
components/Truncate/
```

### Step 6: After Removing `/pages/old/`
Re-audit to identify additional unused components.

### Future Consideration
- `Button` has a `/new/Buttons/Button/` replacement
- `Text` has a `/new/Text/` replacement
- Many Icons have `/new/Icons/` replacements
