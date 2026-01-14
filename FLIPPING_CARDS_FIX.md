# FlippingHeroCard Fix - Intersection Observer Issue

## Problem

On the `/crypto` page, users reported that the hero cards showed "the same two cards flipping back and forth" with no new cards appearing, despite there being 56 cards in the deck.

## Root Cause

The FlippingHeroCard component uses an IntersectionObserver with `threshold: 0.5` to detect when the card is visible in the viewport. This pauses the flipping animation when the card is scrolled out of view to save resources.

However, on the hero section there are TWO FlippingHeroCard instances (left and right), positioned with overlapping layouts:
- **Left card**: `left: 95px`, `zIndex: 2` (on top)
- **Right card**: `left: 275px`, `zIndex: 1` (behind)
- **Card width**: 340px
- **Overlap region**: 160px

Because the right card is partially obscured by the left card, the IntersectionObserver with `threshold: 0.5` (requires 50% visibility) never detected it as "in view". This caused `isInView` to remain `false`, which set `shouldPause = true`, preventing the animation loop from executing flips.

## Solution

Added a `disableIntersectionObserver` prop to FlippingHeroCard that:
1. Skips setting up the IntersectionObserver entirely for hero cards
2. Initializes `isInView` state to `true` when the prop is enabled
3. Is passed from the parent HeroCards component to both left and right instances

This ensures that overlapping hero cards (which are always at the top of the page) don't have their animations paused due to z-index stacking issues.

## Files Changed

- `/Users/vlad/cryptoarts/components/Pages/Deck/Hero/HeroCards/FlippingHeroCard.tsx`
  - Added `disableIntersectionObserver?: boolean` prop
  - Initialize `isInView` state based on `disableIntersectionObserver` value
  - Skip IntersectionObserver setup when prop is true

- `/Users/vlad/cryptoarts/components/Pages/Deck/Hero/HeroCards/index.tsx`
  - Pass `disableIntersectionObserver` prop to both FlippingHeroCard instances

## Testing

Created Playwright test (`e2e/flipping-hero-cards.spec.ts`) that:
- Observes the hero section for 20 seconds
- Tracks unique card images seen over time
- Verifies that at least 4+ unique cards are shown (indicating both cards are flipping)
- Confirms card variety increases over time

## Technical Details

The fix preserves the IntersectionObserver for other uses of FlippingHeroCard (e.g., in card galleries where pausing off-screen animations is beneficial), while disabling it specifically for the always-visible hero cards.

This is a targeted fix that maintains the original performance optimization intent while solving the specific issue with overlapping hero cards.
