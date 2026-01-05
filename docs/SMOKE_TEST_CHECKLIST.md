# Smoke Test Checklist

**Target**: https://dev.playingarts.com
**Branch**: `refactor/structural-improvements`
**Last Updated**: January 6, 2026

---

## Automated Tests

Run with: `yarn test:smoke`

| Test | Endpoint | Expected |
|------|----------|----------|
| Homepage loads | `/` | 200 OK |
| Deck page loads | `/crypto` | 200 OK |
| Card page loads | `/crypto/artist-slug` | 200 OK |
| Shop page loads | `/shop` | 200 OK |
| Product page loads | `/shop/cryptoedition` | 200 OK |
| Bag page loads | `/bag` | 200 OK |
| Favorites page loads | `/favorites` | 200 OK |
| Contact page loads | `/contact` | 200 OK |
| Privacy page loads | `/privacy` | 200 OK |
| 404 page works | `/nonexistent` | 404 + Error UI |
| API health | `/api/v1/graphql` | 200 OK |

---

## Manual Tests

### Navigation
- [ ] Header menu opens and closes
- [ ] All deck links work (crypto, cosmos, etc.)
- [ ] Footer links work
- [ ] Back/forward browser navigation works

### Deck Pages (`/[deckId]`)
- [ ] Hero section displays correctly
- [ ] Card gallery loads
- [ ] Cards are clickable
- [ ] Edition selector works (if available)
- [ ] PACE stats display (if available)

### Card Pages (`/[deckId]/[artistSlug]`)
- [ ] Card image/video loads
- [ ] Artist info displays
- [ ] Related cards section works
- [ ] Favorite button works

### Shop (`/shop`)
- [ ] Products display with prices
- [ ] Add to bag works
- [ ] Quantity selector works

### Bag (`/bag`)
- [ ] Items display correctly
- [ ] Quantity can be changed
- [ ] Items can be removed
- [ ] Total calculates correctly

### Contact (`/contact`)
- [ ] Page renders without errors
- [ ] FAQ accordion works
- [ ] Email link is clickable

### Privacy (`/privacy`)
- [ ] Page renders without errors
- [ ] All sections display
- [ ] Contact link works

### 404 Page
- [ ] Shows "404" text
- [ ] Shows "Page not found" message
- [ ] "Back to Home" button works

---

## Performance Checks

- [ ] Pages load in < 3 seconds
- [ ] No console errors
- [ ] No layout shifts after load
- [ ] Images lazy load correctly

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## After Major Changes

When to run full checklist:
1. After page migrations
2. After component removals
3. Before merging to main
4. After dependency updates
