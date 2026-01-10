# Smoke Test

Quick health check of the Playing Arts website after deployment.

## Steps

1. **Service Health**: Run `mcp__playingarts-monitor__check_status` to verify all services are up
2. **Deployment Status**: Run `mcp__playingarts-monitor__check_deployment` to check latest Vercel deployment
3. **Homepage Test**: Use Puppeteer to navigate to https://dev.playingarts.com and verify:
   - Page loads (no 500 errors)
   - Header is visible
   - Hero section renders
4. **Shop Page Test**: Navigate to https://dev.playingarts.com/shop and verify:
   - Page loads
   - Products are visible
5. **Screenshot**: Take a screenshot of homepage as visual confirmation

## Output

Provide a summary:
- Service status (all green or issues)
- Deployment status
- Page load results
- Any errors or warnings found
- Overall: "All systems operational" or "Issues detected: [list]"
