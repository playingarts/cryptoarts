# Security Audit Report: Playing Arts

**Date:** 2026-01-07
**Branch:** refactor/structural-improvements
**Deployment:** https://dev.playingarts.com

---

## A. Executive Summary

### Overall Security Grade: **B**

The application has good foundational security but has several issues requiring attention before production use with payments.

### Top 3 Real-World Risks

1. **GraphQL Introspection Enabled in Production** - Attackers can map your entire API surface, discover hidden queries, and identify attack vectors.

2. **CSP allows `unsafe-inline` and `unsafe-eval`** - XSS attacks are possible if any user-controlled content reaches the DOM; mitigates protection from malicious scripts.

3. **Vulnerable Dependencies with DoS Potential** - `qs` (CVE-2025-15284) and `semver` vulnerabilities can be exploited for denial of service.

---

## B. Detailed Findings

### 1. GraphQL Introspection Enabled

| Attribute | Value |
|-----------|-------|
| **Severity** | **High** |
| **Evidence** | `app/api/v1/graphql/route.ts:7` - No introspection blocking |
| **Live Test** | `GET /api/v1/graphql?query={__schema{types{name}}}` returns full schema |

**Attack Scenario:** Attacker queries `__schema` to discover all types, queries, mutations. They map `ownedAssets`, `deal`, `holders` queries and identify authentication patterns, crafting targeted attacks.

**Recommended Fix:**
```typescript
// In graphql route.ts, wrap handler to block introspection in production
import { NoSchemaIntrospectionCustomRule } from 'graphql';

const graphqlHandler = createHandler({
  schema,
  validationRules: [
    ...(process.env.NODE_ENV === 'production' ? [NoSchemaIntrospectionCustomRule] : [])
  ]
});
```

**Risk if Unfixed:** Complete API surface exposure enabling targeted attacks.

---

### 2. CSP Contains `unsafe-inline` and `unsafe-eval`

| Attribute | Value |
|-----------|-------|
| **Severity** | **Medium** |
| **Evidence** | `next.config.js:37` |

```javascript
"script-src 'self' 'unsafe-inline' 'unsafe-eval' ..."
```

**Attack Scenario:** If any reflection XSS exists (e.g., query params reflected without sanitization), attacker injects `<script>` tags that execute due to `unsafe-inline`. `unsafe-eval` allows attacks via `eval()`.

**Recommended Fix:** Use nonces with Emotion CSS-in-JS:
```javascript
// Use Next.js nonce support instead
"script-src 'self' 'nonce-{NONCE}' https://www.googletagmanager.com..."
"style-src 'self' 'nonce-{NONCE}' https://fonts.googleapis.com"
```

**Risk if Unfixed:** XSS vulnerability surface remains open.

---

### 3. Vulnerable `qs` Dependency (CVE-2025-15284)

| Attribute | Value |
|-----------|-------|
| **Severity** | **High** |
| **Evidence** | `express>qs` version `<6.14.1` |

**Attack Scenario:** Attacker sends `GET /api?filters[]=x&filters[]=x...` with 100,000 elements. The `arrayLimit` protection is bypassed with bracket notation, causing memory exhaustion and server crash.

**Recommended Fix:**
```bash
yarn add express@latest  # Updates qs transitively
# Or add resolution in package.json
"resolutions": { "qs": ">=6.14.1" }
```

**Risk if Unfixed:** Single request can crash serverless function.

---

### 4. In-Memory Rate Limiting on Vercel

| Attribute | Value |
|-----------|-------|
| **Severity** | **Medium** |
| **Evidence** | `middleware.ts:40`, `app/api/v1/graphql/route.ts:10` |

**Attack Scenario:** Vercel spawns multiple edge instances. Each has separate rate limit map. Attacker hits 100 requests × N instances = N×100 requests before any limiting.

**Why It's Partially Mitigated:** Redis rate limiting via Upstash is configured but requires `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` environment variables. Without these, falls back to ineffective in-memory limiting.

**Recommended Fix:** Ensure Upstash Redis is configured in production Vercel environment.

**Risk if Unfixed:** Rate limiting ineffective against distributed attacks.

---

### 5. No GraphQL Query Depth/Complexity Limiting

| Attribute | Value |
|-----------|-------|
| **Severity** | **Medium** |
| **Evidence** | `app/api/v1/graphql/route.ts` - No depth limiting configured |

**Attack Scenario:** Nested query like `{ decks { product { ... } previewCards { ... } ... }}` repeated deeply causes excessive database load.

**Recommended Fix:**
```typescript
import depthLimit from 'graphql-depth-limit';

const graphqlHandler = createHandler({
  schema,
  validationRules: [depthLimit(5)]
});
```

**Risk if Unfixed:** DoS via expensive queries.

---

### 6. TLS Certificate Validation Disabled in Development

| Attribute | Value |
|-----------|-------|
| **Severity** | **Low** |
| **Evidence** | `source/mongoose.ts:29` |

```typescript
...(isDevelopment ? { tlsAllowInvalidCertificates: true } : {}),
```

**Why It's Acceptable:** Only affects development environment. Production connections enforce TLS validation.

---

### 7. DISCOUNT_CODE Exposed in GraphQL Response

| Attribute | Value |
|-----------|-------|
| **Severity** | **Medium** |
| **Evidence** | `source/graphql/schemas/deal.ts:52` |

```typescript
return {
  code: discountCode,  // Sent to client
  ...
};
```

**Attack Scenario:** Authenticated user with valid signature gets discount code. Code may be shareable/abusable.

**Recommended Fix:** Rate limit deal queries per address, add one-time-use tracking.

---

### 8. Error Messages May Leak Internal Details

| Attribute | Value |
|-----------|-------|
| **Severity** | **Low** |
| **Evidence** | `source/services/OpenSeaService.ts:60` |

```typescript
console.log(errors[0]);  // Logs io-ts validation errors
throw new Error("Validation Error");
```

**Why It's Mitigated:** Generic error thrown to client. Detailed errors only in server logs (acceptable).

---

## C. Security Hardening Roadmap

### Must-Fix Before Production

| # | Task | Effort | Risk Reduction |
|---|------|--------|----------------|
| 1 | Disable GraphQL introspection in production | 30 min | High |
| 2 | Configure Upstash Redis for rate limiting | 1 hr | High |
| 3 | Update express/qs dependency | 15 min | High |

### Should-Fix Soon

| # | Task | Effort | Risk Reduction |
|---|------|--------|----------------|
| 4 | Add GraphQL query depth limiting | 1 hr | Medium |
| 5 | Remove `unsafe-eval` from CSP (may require Emotion config) | 2-4 hr | Medium |
| 6 | Add rate limiting per wallet address for deal queries | 1 hr | Medium |
| 7 | Update semver, json5, brace-expansion dependencies | 30 min | Low |

### Acceptable Tradeoffs

| # | Item | Reason |
|---|------|--------|
| 8 | `unsafe-inline` for styles | Required by Emotion CSS-in-JS; low risk as no user-generated CSS |
| 9 | TLS validation disabled in dev | Only affects local development |
| 10 | No CSRF protection on API routes | GraphQL uses POST with JSON body; CORS + SameSite cookies sufficient |

---

## D. Positive Findings (What's Secure)

| Area | Status | Evidence |
|------|--------|----------|
| **Security Headers** | Excellent | All critical headers present (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) |
| **XSS Prevention** | Good | No `dangerouslySetInnerHTML` usage found |
| **Signature Validation** | Solid | Uses `recoverPersonalSignature` from `@metamask/eth-sig-util` |
| **MongoDB Injection** | Protected | Mongoose parameterized queries throughout |
| **Error Handling** | Good | Generic errors to clients, Sentry for internal tracking |
| **No Sensitive Data in localStorage** | Good | Only shopping bag data stored |
| **Input Validation** | Good | Email validation, io-ts for OpenSea responses |

---

## E. Vulnerability Summary

| CVE | Package | Severity | Status |
|-----|---------|----------|--------|
| CVE-2025-15284 | qs | High | Needs update |
| CVE-2022-25883 | semver | High | Dev dependency |
| CVE-2022-46175 | json5 | High | Dev dependency |
| CVE-2025-5889 | brace-expansion | Low | Dev dependency |

---

*Report generated by security audit on 2026-01-07*
