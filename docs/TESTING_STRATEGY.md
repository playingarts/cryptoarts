# Testing Strategy

**Branch:** refactor/structural-improvements
**Target:** 60%+ coverage (from ~23%)
**Date:** 2026-01-07

---

## 1. Testing Philosophy

### Principles
- **Test behavior, not implementation** - Focus on inputs/outputs, not internal details
- **Mock at boundaries** - External services (OpenSea, Coinbase, MongoDB) mocked at integration points
- **No snapshots** - Explicit assertions for maintainability
- **No network calls in unit tests** - All external dependencies mocked
- **Fast feedback** - Tests should run in <10s

### Test Pyramid
```
       /\
      /  \    E2E (Playwright) - Critical user flows only
     /----\
    /      \  Integration - API routes with mocked DB
   /--------\
  /          \ Unit - Resolvers, hooks, utils with mocked dependencies
 /____________\
```

---

## 2. Priority Areas

### HIGH RISK - PR #1: GraphQL Resolvers

| File | Risk | Test Focus |
|------|------|------------|
| `source/graphql/schemas/deal.ts` | Critical | Signature validation, discount code logic, edge cases |
| `source/graphql/schemas/opensea.ts` | High | External API integration boundaries, error handling |
| `source/graphql/schemas/product.ts` | Medium | Currency conversion, price calculations |
| `source/graphql/schemas/deck.ts` | Low | Basic CRUD, null handling |

**Key scenarios:**
- Valid/invalid signatures
- Missing/expired deals
- External API failures
- Currency conversion edge cases (0, negative, large numbers)

### MEDIUM RISK - PR #2: API Routes

| Route | Test Focus |
|-------|------------|
| `app/api/v1/newsletter/route.ts` | Email validation, rate limiting |
| `app/api/v1/graphql/route.ts` | Request handling, depth limiting |
| `app/api/health/route.ts` | Health check responses |
| `app/api/revalidate/route.ts` | ISR revalidation |

### MEDIUM RISK - PR #3: Hooks

| Hook | Test Focus |
|------|------------|
| `hooks/useLocalStorage.ts` | SSR safety, serialization, error handling |
| `hooks/useBag.ts` | Cart operations, persistence |
| `hooks/useMetaMaskAccount.ts` | Wallet connection states |

### LOW RISK - PR #4: Utils/Services

| File | Test Focus |
|------|------------|
| `lib/rateLimit.ts` | Rate limit logic |
| `source/services/OpenSeaService.ts` | Already has tests, expand coverage |
| `source/utils/*.ts` | Pure functions, edge cases |

---

## 3. Mocking Strategy

### MongoDB Models
```typescript
jest.mock('source/mongoose', () => ({
  ProductModel: {
    findOne: jest.fn(),
    find: jest.fn(),
  },
  DealModel: {
    findOne: jest.fn(),
  },
}));
```

### External APIs
```typescript
// Mock fetch globally for Coinbase, OpenSea
global.fetch = jest.fn();

// Or mock specific services
jest.mock('source/services/OpenSeaService', () => ({
  getAssets: jest.fn(),
  calculateHolders: jest.fn(),
}));
```

### Signature Validation
```typescript
jest.mock('@metamask/eth-sig-util', () => ({
  recoverPersonalSignature: jest.fn(),
}));
```

---

## 4. Test File Structure

```
__tests__/
├── graphql/
│   ├── resolvers/
│   │   ├── deal.test.ts
│   │   ├── opensea.test.ts
│   │   ├── product.test.ts
│   │   └── deck.test.ts
│   └── schema.test.ts
├── api/
│   ├── newsletter.test.ts
│   ├── graphql.test.ts
│   ├── health.test.ts
│   └── revalidate.test.ts
├── hooks/
│   ├── useLocalStorage.test.ts
│   ├── useBag.test.ts
│   └── useMetaMaskAccount.test.ts
├── services/
│   └── OpenSeaService.test.ts (existing, expand)
└── utils/
    └── (as needed)
```

---

## 5. Coverage Goals

| Area | Current | Target | Priority |
|------|---------|--------|----------|
| GraphQL Resolvers | ~10% | 80% | P1 |
| API Routes | ~15% | 70% | P2 |
| Hooks | ~20% | 70% | P3 |
| Utils/Services | ~30% | 60% | P4 |
| **Overall** | **~23%** | **60%+** | - |

---

## 6. CI Integration

Tests run on every PR:
```yaml
- name: Run tests with coverage
  run: yarn jest --coverage --ci
```

Coverage thresholds enforced in `jest.config.mjs`:
```javascript
coverageThreshold: {
  global: {
    branches: 60,
    functions: 60,
    lines: 60,
    statements: 60,
  },
},
```

---

## 7. Execution Plan

| PR | Focus | Est. Tests | Coverage Impact |
|----|-------|------------|-----------------|
| #1 | GraphQL Resolvers | ~30 | +15% |
| #2 | API Routes | ~20 | +10% |
| #3 | Hooks | ~25 | +10% |
| #4 | Utils/Services | ~15 | +5% |
| **Total** | - | **~90** | **+40%** |

Each PR should be independently mergeable and improve coverage incrementally.
