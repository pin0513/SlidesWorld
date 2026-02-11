---
name: Performance Monitoring
description: Track Core Web Vitals, bundle size, and performance metrics with Lighthouse CI
---

# Performance Monitoring Skill

## Skill Purpose

Monitor performance metrics for slide presentations including Core Web Vitals (LCP, FID, CLS), bundle size tracking, and Lighthouse CI integration. Set performance budgets and alert when thresholds are exceeded. Ensure slides load fast and provide smooth user experience across devices.

## When to Use This Skill

Activate when:
- Setting up performance monitoring for slide project
- Configuring Lighthouse CI in GitHub Actions
- Defining performance budgets (load time, bundle size)
- Tracking Core Web Vitals over time
- Debugging performance regressions

## Core Web Vitals

### Metrics Definition

**LCP (Largest Contentful Paint)**:
- **Definition**: Time when largest content element is rendered
- **Target**: <2.5 seconds (Good), 2.5-4.0s (Needs Improvement), >4.0s (Poor)
- **Measures**: Loading performance
- **Optimization**: Optimize images, preload critical resources, minimize render-blocking resources

**FID (First Input Delay)**:
- **Definition**: Time from user interaction to browser response
- **Target**: <100ms (Good), 100-300ms (Needs Improvement), >300ms (Poor)
- **Measures**: Interactivity
- **Optimization**: Minimize JavaScript execution, code splitting, defer non-critical JS

**CLS (Cumulative Layout Shift)**:
- **Definition**: Sum of all unexpected layout shifts
- **Target**: <0.1 (Good), 0.1-0.25 (Needs Improvement), >0.25 (Poor)
- **Measures**: Visual stability
- **Optimization**: Set image dimensions, reserve space for ads/embeds, avoid inserting content above existing content

### Measurement Tools

**Chrome DevTools**:
```
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Performance" category
4. Click "Generate report"
5. View Core Web Vitals in report
```

**Web Vitals Extension**:
```
1. Install Web Vitals Chrome Extension
2. Navigate to slide presentation
3. Extension displays LCP, FID, CLS in overlay
```

**web-vitals Library** (JavaScript):
```javascript
import { getLCP, getFID, getCLS } from 'web-vitals';

getLCP(console.log);
getFID(console.log);
getCLS(console.log);
```

## Lighthouse CI Integration

### Installation

**Install Lighthouse CI**:
```bash
npm install -g @lhci/cli
```

### Configuration

**.lighthouserc.json**:
```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000",
        "http://localhost:3000/slide/1",
        "http://localhost:3000/slide/5"
      ],
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop"
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }],

        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }],

        "uses-responsive-images": "error",
        "offscreen-images": "error",
        "unminified-css": "error",
        "unminified-javascript": "error",
        "unused-css-rules": "warn",
        "unused-javascript": "warn",

        "resource-summary:script:size": ["error", { "maxNumericValue": 200000 }],
        "resource-summary:stylesheet:size": ["error", { "maxNumericValue": 50000 }],
        "resource-summary:image:size": ["warn", { "maxNumericValue": 500000 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### GitHub Actions Integration

**.github/workflows/lighthouse.yml**:
```yaml
name: Lighthouse CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    name: Run Lighthouse CI
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Serve production build
        run: npx serve -s dist -p 3000 &
        # Wait for server to start
        timeout: 30

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/slide/1
          uploadArtifacts: true
          temporaryPublicStorage: true

      - name: Comment PR with results
        uses: actions/github-script@v6
        if: github.event_name == 'pull_request'
        with:
          script: |
            const results = require('./lhci_reports/manifest.json');
            const score = results[0].summary.performance;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `📊 Lighthouse Performance Score: ${score * 100}/100`
            })
```

### Manual Lighthouse Run

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Build project
npm run build

# Serve production build
npx serve -s dist -p 3000

# Run Lighthouse CI (in separate terminal)
lhci autorun --config=.lighthouserc.json
```

## Bundle Size Tracking

### Size-limit Integration

**Install size-limit**:
```bash
npm install --save-dev @size-limit/preset-app
```

**Configure package.json**:
```json
{
  "size-limit": [
    {
      "name": "JavaScript bundle",
      "path": "dist/assets/*.js",
      "limit": "200 KB"
    },
    {
      "name": "CSS bundle",
      "path": "dist/assets/*.css",
      "limit": "50 KB"
    },
    {
      "name": "Total bundle",
      "path": "dist/**/*",
      "limit": "500 KB"
    }
  ],
  "scripts": {
    "size": "size-limit"
  }
}
```

**Run size check**:
```bash
npm run size
```

### Bundle Size GitHub Action

**.github/workflows/bundle-size.yml**:
```yaml
name: Bundle Size Check

on:
  pull_request:
    branches: [main]

jobs:
  size:
    name: Check Bundle Size
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Check bundle size
        uses: andresz1/size-limit-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          skip_step: install
```

### Bundle Analyzer

**Webpack Bundle Analyzer**:
```bash
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle
npm run build -- --analyze
```

**Vite Bundle Visualizer**:
```bash
npm install --save-dev rollup-plugin-visualizer

# vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({ open: true, gzipSize: true })
  ]
};

# Analyze bundle
npm run build
# Opens stats.html in browser
```

## Performance Budgets

### Performance Budget Definition

**performance-budget.json**:
```json
{
  "budgets": [
    {
      "resourceType": "script",
      "budget": 200
    },
    {
      "resourceType": "stylesheet",
      "budget": 50
    },
    {
      "resourceType": "image",
      "budget": 500
    },
    {
      "resourceType": "total",
      "budget": 1000
    },
    {
      "metric": "first-contentful-paint",
      "budget": 2000
    },
    {
      "metric": "largest-contentful-paint",
      "budget": 2500
    },
    {
      "metric": "cumulative-layout-shift",
      "budget": 0.1
    },
    {
      "metric": "total-blocking-time",
      "budget": 300
    }
  ]
}
```

### Budget Enforcement

**Fail build if budget exceeded**:
```yaml
      - name: Check performance budget
        run: |
          lhci autorun
          # Exit with error if budget exceeded
        continue-on-error: false
```

## Performance Dashboards

### Lighthouse CI Server

**Setup LHCI Server** (optional, for historical tracking):
```bash
# Install LHCI server
npm install -g @lhci/server

# Start server
lhci server --port=9001

# Configure upload in .lighthouserc.json
{
  "ci": {
    "upload": {
      "target": "lhci",
      "serverBaseUrl": "http://localhost:9001",
      "token": "YOUR_BUILD_TOKEN"
    }
  }
}
```

### SpeedCurve Integration

**Track performance over time**:
```bash
# Sign up at speedcurve.com
# Add site to SpeedCurve
# Configure deploy hook in CI/CD

# Trigger SpeedCurve test after deployment
curl -X POST https://api.speedcurve.com/v1/deploy \
  -H "Authorization: Bearer $SPEEDCURVE_API_KEY" \
  -d "site_id=123&note=Deploy v1.0.0"
```

### WebPageTest API

**Automated WebPageTest runs**:
```bash
# Install WebPageTest API wrapper
npm install webpagetest

# Run test
npx webpagetest test https://slides.example.com \
  --key YOUR_API_KEY \
  --location Dulles:Chrome \
  --poll \
  --specs specs.json
```

## Real User Monitoring (RUM)

### Google Analytics 4 Web Vitals

**ga4-web-vitals.js**:
```javascript
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToGoogleAnalytics({ name, delta, id }) {
  gtag('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    non_interaction: true,
  });
}

getCLS(sendToGoogleAnalytics);
getFID(sendToGoogleAnalytics);
getLCP(sendToGoogleAnalytics);
```

### Custom RUM Implementation

**rum.js**:
```javascript
// Track page load time
window.addEventListener('load', () => {
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;

  // Send to analytics endpoint
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metric: 'page_load_time',
      value: loadTime,
      url: window.location.href,
      timestamp: Date.now()
    })
  });
});

// Track Core Web Vitals
import { getLCP, getFID, getCLS } from 'web-vitals';

function sendMetric({ name, value }) {
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metric: name,
      value: Math.round(value),
      url: window.location.href,
      timestamp: Date.now()
    })
  });
}

getLCP(sendMetric);
getFID(sendMetric);
getCLS(sendMetric);
```

## Performance Optimization Recommendations

### Based on Lighthouse Audit

**Common Issues and Fixes**:

| Issue | Fix |
|-------|-----|
| Large JavaScript bundle | Code splitting, tree shaking, lazy loading |
| Unoptimized images | Convert to WebP, compress, responsive images |
| Render-blocking CSS | Inline critical CSS, defer non-critical CSS |
| Unused JavaScript | Remove unused dependencies, tree shaking |
| No text compression | Enable gzip/brotli compression (server config) |
| Long cache TTL missing | Set Cache-Control headers for static assets |

### Performance Checklist

- [ ] Bundle size <200KB (JS), <50KB (CSS)
- [ ] Images optimized (WebP, compressed, lazy loaded)
- [ ] Critical CSS inlined
- [ ] Non-critical resources deferred
- [ ] CDN configured with proper cache headers
- [ ] LCP <2.5s, FID <100ms, CLS <0.1
- [ ] Lighthouse Performance score ≥90

## Input/Output Examples

### Example 1: Setup Lighthouse CI

**Input**:
```
User: Set up Lighthouse CI to track performance on every pull request
```

**Output**:
```
Created .lighthouserc.json with performance budgets:
- LCP <2.5s
- FID <100ms
- CLS <0.1
- JS bundle <200KB
- CSS bundle <50KB

Created .github/workflows/lighthouse.yml:
- Runs on every push and PR
- Uploads results to temporary public storage
- Comments on PR with performance score

Next steps:
1. Commit and push workflow files
2. Open pull request to test Lighthouse CI
3. Review Lighthouse report in PR comment
```

### Example 2: Bundle Size Alert

**Input**:
```
User: Alert me if bundle size exceeds 200KB
```

**Output**:
```
Configured size-limit in package.json:
- JavaScript bundle limit: 200KB
- CSS bundle limit: 50KB
- Total bundle limit: 500KB

Created GitHub Action to check bundle size on PRs:
- Compares bundle size to limits
- Comments on PR if size exceeded
- Fails PR if over limit

Example PR comment:
❌ Bundle size exceeded!
  JavaScript: 215KB (limit: 200KB) +15KB
  CSS: 45KB (limit: 50KB) ✓
```

## Integration with Team Workflow

### Handoff from Build Engineer
- Build Engineer provides optimized bundles
- Performance Monitoring validates bundle sizes meet limits
- Lighthouse CI runs on every build

### Handoff to Quality Reviewer
- Performance Monitoring generates reports
- Quality Reviewer validates performance meets standards
- Critical performance issues block deployment

### Integration with CI/CD Pipeline
- Lighthouse CI integrated into GitHub Actions
- Performance budgets enforced before deployment
- Preview deployments include performance scores

## Success Criteria

Performance monitoring is successful when:
- Lighthouse CI runs automatically on every PR
- Performance budgets defined and enforced (LCP <2.5s, bundle <200KB)
- Core Web Vitals tracked in real-time (RUM)
- Bundle size alerts triggered when limits exceeded
- Performance dashboards accessible to team
- Performance score ≥90 maintained consistently
