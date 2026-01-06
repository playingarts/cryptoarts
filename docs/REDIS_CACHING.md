# Redis Caching Layer Plan

This document outlines the strategy for adding a Redis caching layer to improve API response times and reduce database load.

## Current Architecture

### Data Flow
1. Client makes GraphQL request to `/api/v1/graphql`
2. Resolvers query MongoDB directly
3. Response returned to client

### Pain Points
- Every request hits MongoDB
- No caching between requests
- Slow responses for frequently-accessed data (decks, cards)

## Proposed Architecture

### With Redis Cache
```
Client → GraphQL API → Redis Cache (check)
                         ↓ miss
                      MongoDB → Redis (store) → Response
                         ↓ hit
                      Response (from cache)
```

## Implementation Plan

### Phase 1: Infrastructure Setup

1. **Install Dependencies**
   ```bash
   yarn add ioredis
   yarn add -D @types/ioredis
   ```

2. **Environment Variables**
   ```env
   REDIS_URL=redis://localhost:6379
   REDIS_PASSWORD=optional
   CACHE_TTL=300  # 5 minutes default
   ```

3. **Create Redis Client**
   ```typescript
   // lib/redis.ts
   import Redis from 'ioredis';

   const redis = new Redis(process.env.REDIS_URL, {
     password: process.env.REDIS_PASSWORD,
     maxRetriesPerRequest: 3,
   });

   export default redis;
   ```

### Phase 2: Caching Utilities

1. **Cache Wrapper**
   ```typescript
   // lib/cache.ts
   import redis from './redis';

   export async function cached<T>(
     key: string,
     fetcher: () => Promise<T>,
     ttl: number = 300
   ): Promise<T> {
     const cached = await redis.get(key);
     if (cached) return JSON.parse(cached);

     const data = await fetcher();
     await redis.setex(key, ttl, JSON.stringify(data));
     return data;
   }
   ```

2. **Cache Invalidation**
   ```typescript
   export async function invalidate(pattern: string): Promise<void> {
     const keys = await redis.keys(pattern);
     if (keys.length) await redis.del(...keys);
   }
   ```

### Phase 3: GraphQL Resolver Integration

1. **Deck Resolver with Caching**
   ```typescript
   // Before
   async deck(_, { slug }) {
     return Deck.findOne({ slug });
   }

   // After
   async deck(_, { slug }) {
     return cached(`deck:${slug}`, () => Deck.findOne({ slug }), 300);
   }
   ```

2. **Cards Resolver with Caching**
   ```typescript
   async cards(_, { deck }) {
     return cached(`cards:${deck}`, () => Card.find({ deck }), 300);
   }
   ```

### Phase 4: Cache Invalidation Triggers

1. **On-Demand Revalidation API**
   ```typescript
   // pages/api/cache/invalidate.ts
   export default async function handler(req, res) {
     const { type, slug } = req.body;
     await invalidate(`${type}:${slug}*`);
     res.json({ success: true });
   }
   ```

2. **Webhook Integration**
   - Trigger cache invalidation on CMS updates
   - MongoDB change streams for real-time invalidation

## Cache Key Strategy

| Entity | Key Pattern | TTL | Notes |
|--------|-------------|-----|-------|
| Deck | `deck:{slug}` | 5min | Rarely changes |
| Cards | `cards:{deckId}` | 5min | Rarely changes |
| Artists | `artist:{slug}` | 5min | Rarely changes |
| Opensea | `opensea:{deckId}` | 1min | Changes frequently |
| Holders | `holders:{slug}` | 1min | Changes frequently |
| Products | `product:{id}` | 2min | Stock changes |

## Deployment Options

### Option 1: Upstash Redis (Recommended for Vercel)
- Serverless-friendly
- Edge-compatible
- Built-in REST API
- Free tier available

### Option 2: Redis Cloud
- Traditional Redis
- More features
- Better for high-traffic

### Option 3: Self-hosted
- Full control
- Requires infrastructure management
- Not recommended for Vercel deployment

## Monitoring

1. **Cache Hit Ratio**
   - Track hits vs misses
   - Alert on low hit ratio

2. **Redis Memory Usage**
   - Monitor key count
   - Set memory limits

3. **Latency Metrics**
   - Compare cached vs uncached response times
   - Track cache operation latency

## Migration Strategy

1. **Soft Launch**
   - Enable caching for read-heavy endpoints first
   - Monitor error rates

2. **Gradual Rollout**
   - Add caching to more resolvers
   - Tune TTL values based on usage

3. **Full Integration**
   - Cache all applicable queries
   - Set up monitoring dashboards

## Rollback Plan

1. Feature flag to disable caching
2. Fallback to direct MongoDB queries
3. Clear Redis cache if corrupted

## References

- [Upstash Redis](https://upstash.com/)
- [ioredis Documentation](https://github.com/luin/ioredis)
- [Redis Caching Patterns](https://redis.io/docs/manual/patterns/)
