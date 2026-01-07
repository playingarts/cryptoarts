#!/bin/bash
#
# Post-push deployment verification script
# Waits for Vercel deployment and runs smoke tests
#
# Usage: ./scripts/verify-deployment.sh [deployment_url]
#
# If no URL provided, defaults to https://dev.playingarts.com

set -e

DEPLOYMENT_URL="${1:-https://dev.playingarts.com}"
MAX_WAIT_SECONDS=180
CHECK_INTERVAL=10

echo "🚀 Deployment Verification Script"
echo "=================================="
echo "Target: $DEPLOYMENT_URL"
echo ""

# Function to check if URL returns 200
check_url() {
  local url=$1
  local expected_status=${2:-200}
  local status=$(curl -s -o /dev/null -w "%{http_code}" "$url")

  if [ "$status" = "$expected_status" ]; then
    return 0
  else
    return 1
  fi
}

# Function to get health status
get_health_status() {
  curl -s "$DEPLOYMENT_URL/api/health" | grep -o '"status":"[^"]*"' | cut -d'"' -f4
}

echo "⏳ Waiting for deployment to be ready..."

# Wait for deployment to be healthy
waited=0
while [ $waited -lt $MAX_WAIT_SECONDS ]; do
  health_status=$(get_health_status 2>/dev/null || echo "unreachable")

  if [ "$health_status" = "ok" ]; then
    echo "✅ Health check passed (status: ok)"
    break
  elif [ "$health_status" = "down" ]; then
    echo "❌ CRITICAL: Health check reports service is DOWN"
    echo "   Check Vercel logs: vercel logs $DEPLOYMENT_URL"
    exit 1
  fi

  echo "   Waiting... ($waited/${MAX_WAIT_SECONDS}s) - status: $health_status"
  sleep $CHECK_INTERVAL
  waited=$((waited + CHECK_INTERVAL))
done

if [ $waited -ge $MAX_WAIT_SECONDS ]; then
  echo "❌ Timeout waiting for deployment to be ready"
  exit 1
fi

echo ""
echo "🧪 Running smoke tests..."
echo ""

# Test critical pages
FAILED=0

# Homepage
echo -n "  Homepage ($DEPLOYMENT_URL/)... "
if check_url "$DEPLOYMENT_URL/"; then
  echo "✅ OK"
else
  echo "❌ FAILED"
  FAILED=1
fi

# Shop page
echo -n "  Shop page ($DEPLOYMENT_URL/shop)... "
if check_url "$DEPLOYMENT_URL/shop"; then
  echo "✅ OK"
else
  echo "❌ FAILED"
  FAILED=1
fi

# Deck page (crypto)
echo -n "  Deck page ($DEPLOYMENT_URL/crypto)... "
if check_url "$DEPLOYMENT_URL/crypto"; then
  echo "✅ OK"
else
  echo "❌ FAILED"
  FAILED=1
fi

# GraphQL endpoint
echo -n "  GraphQL endpoint... "
gql_response=$(curl -s -X POST "$DEPLOYMENT_URL/api/v1/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}')
if echo "$gql_response" | grep -q "__typename"; then
  echo "✅ OK"
else
  echo "❌ FAILED"
  FAILED=1
fi

echo ""

if [ $FAILED -eq 1 ]; then
  echo "❌ SMOKE TESTS FAILED"
  echo ""
  echo "Some pages are not responding correctly."
  echo "Check Vercel logs: vercel logs $DEPLOYMENT_URL"
  exit 1
fi

echo "✅ ALL SMOKE TESTS PASSED"
echo ""
echo "Deployment verified successfully!"
