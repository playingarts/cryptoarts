# Legacy Component Audit

**Date**: January 5, 2026
**Branch**: `refactor/structural-improvements`
**Last Updated**: After Step 5+6 cleanup

## Summary

- **Files Removed**: 40 files (7,581 lines)
- **Remaining Legacy Components**: ~25 (some still needed by active pages)

---

## REMOVED (Step 5+6)

### Removed Pages (`/pages/old/`)
- `[deckId].tsx`
- `[deckId]/[artistId].tsx`
- `[deckId]/contest/[artistId].tsx`
- `bag.tsx`
- `index.tsx`
- `shop.tsx`

### Removed Base Components (6)
- `AllEntriesBlock/`
- `AllEntriesCard/`
- `LatestRelease/`
- `NFTHolder/`
- `Roadmap/`
- `Select/`

### Removed `_composed/` Components (14)
- `ArtContest/`
- `BrowseCollection/`
- `CardBlock/`
- `CardContent/`
- `CardOfTheDay/`
- `ComposedCardList/`
- `ComposedEntries/`
- `ComposedMainHero/`
- `ComposedRoadmap/`
- `Gallery/`
- `GamePromo/`
- `Holders/`
- `Pace/`
- `Supply/`

---

## RETAINED COMPONENTS

### Still Used by Active Pages
These legacy components are still imported by active pages (`privacy.tsx`, `contact.tsx`, `404.tsx`, `shop/crypto.tsx`) or `/new/`:

**Base Components:**
- `Arrowed` - Used by Quote, StatBlock
- `Button` - Used by active pages and `/new/`
- `Card` - Used by `404.tsx` and `/new/`
- `Carousel` - Used by ModalMenu
- `Charts` - Used by `/new/Pages/Deck/PACE/`
- `EmailForm` - Used by ModalMenu, Shop/SoldOut
- `Faq` - Used by `_composed/Faq`
- `FaqItem` - Used by Faq
- `Footer` - Used by GlobalLayout
- `Grid` - Core layout, heavily used
- `Header` - Used by GlobalLayout
- `Icons/*` - Various icons used throughout
- `Layout` - Used by active pages
- `Loader` - Used by Button, Card
- `MetamaskButton` - Used by Header
- `Nav` - Used by Header, ModalMenu
- `Quote` - Used by GlobalLayout
- `SizeProvider` - Core provider
- `Stat` - Used by `_composed/Stats`
- `StatBlock` - Used by Stats, Podcast, etc.
- `StoreButtons` - Used by AugmentedReality, ModalMenu
- `Truncate` - Used by Quote

**Retained `_composed/` Components:**
- `BlockWithProperties/` - Used by DeckBlock
- `ComposedHeader/` - Used by GlobalLayout
- `ComposedMain/` - Used by `shop/crypto.tsx`
- `Faq/` - Used by `shop/crypto.tsx`, `contact.tsx`
- `GlobalLayout/` - Used by `privacy.tsx`, `contact.tsx`, `404.tsx`, `shop/crypto.tsx`
- `ModalMenu/` - Used by Header, Footer
- `Podcast/` - Used by Card/Block
- `PodcastAndSocials/` - Used by `shop/crypto.tsx`
- `PrivacyNotice/` - Used by GlobalLayout
- `Stats/` - Used by `/new/Pages/Deck/PACE/`

---

## Next Steps (Step 7)

### Potential Future Cleanup
When active pages migrate to `/new/` components, these will become removable:
- `AugmentedReality` (has `/new/` replacement)
- `Button` (has `/new/Buttons/Button/` replacement)
- `Card` (partially duplicated in `/new/`)
- `Text` (has `/new/Text/` replacement)
- Many `_composed/` components

### Remaining Work
1. Consolidate shared utilities between `/components/` and `/new/`
2. Migrate remaining active legacy pages to use `/new/` patterns
3. Final cleanup of legacy components after migration
