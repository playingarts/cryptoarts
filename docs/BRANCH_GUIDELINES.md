# Branch Guidelines

**Branch**: `refactor/structural-improvements`
**Last Updated**: January 6, 2026

---

## Working Rules

1. **We are ONLY working on the branch**: `refactor/structural-improvements`

2. **This branch is allowed to diverge structurally from main** - Large-scale removals and reorganizations are permitted here.

3. **The `/new/` directory is the newly designed website** - It will soon become the main website.

4. **`/new` is currently deployed at**: https://dev.playingarts.com

5. **The old website** (legacy structure, e.g. `/components` and old pages) is currently the main production website on the `main` branch.

6. **In `refactor/structural-improvements`**, the old website can be removed if that simplifies the migration and reduces dual-structure confusion.

7. **HOWEVER**: Do NOT remove legacy code from the `main` branch. Only change this branch.

---

## Branch Strategy

```
main (production)
├── /components/     ← Legacy, DO NOT REMOVE from main
├── /pages/old/      ← Legacy, DO NOT REMOVE from main
└── /new/            ← New website

refactor/structural-improvements (dev.playingarts.com)
├── /components/     ← CAN be removed/simplified
├── /pages/old/      ← REMOVED (Step 6)
└── /new/            ← Primary website code
```

---

## Deployment

| Branch | Deployment URL |
|--------|---------------|
| `main` | https://playingarts.com (production) |
| `refactor/structural-improvements` | https://dev.playingarts.com |

---

## What's Allowed on This Branch

✅ Remove unused legacy components
✅ Remove legacy pages (`/pages/old/`)
✅ Restructure `/components/` directory
✅ Consolidate duplicate code
✅ Break compatibility with `main` branch structure

## What's NOT Allowed

❌ Push legacy removals to `main` branch
❌ Break https://dev.playingarts.com functionality
❌ Remove `/new/` components that are actively used
