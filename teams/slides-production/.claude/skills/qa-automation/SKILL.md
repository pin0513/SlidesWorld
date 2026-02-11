---
name: Quality Assurance Automation
description: Automate visual regression, cross-browser, and accessibility testing for slide presentations
---

# Quality Assurance Automation Skill

## Skill Purpose

Automate quality assurance testing for slide presentations including visual regression testing (Percy, Chromatic), cross-browser compatibility testing (BrowserStack, Sauce Labs), and accessibility testing (axe-core, Pa11y). Catch visual bugs, browser compatibility issues, and accessibility violations before deployment.

## When to Use This Skill

Activate when:
- Setting up automated QA testing for slide project
- Configuring visual regression testing to detect UI changes
- Validating cross-browser compatibility (Chrome, Safari, Firefox, Edge)
- Running accessibility audits (WCAG AA compliance)
- Integrating automated testing into CI/CD pipeline

## Visual Regression Testing

### Percy (Recommended)

**Setup Percy**:
```bash
# Install Percy CLI
npm install --save-dev @percy/cli @percy/playwright

# Sign up at percy.io and get project token
export PERCY_TOKEN=your_percy_token
```

**Playwright + Percy Integration**:
```javascript
// tests/visual-regression.spec.js
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Visual Regression Tests', () => {
  test('Homepage snapshot', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await percySnapshot(page, 'Homepage');
  });

  test('Slide 1 snapshot', async ({ page }) => {
    await page.goto('http://localhost:3000/slide/1');
    await percySnapshot(page, 'Slide 1');
  });

  test('Interactive chart snapshot', async ({ page }) => {
    await page.goto('http://localhost:3000/slide/5');
    // Wait for chart to render
    await page.waitForSelector('.chart-container');
    await percySnapshot(page, 'Slide 5 - Chart');
  });

  test('Mobile view snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    await percySnapshot(page, 'Homepage - Mobile');
  });
});
```

**GitHub Actions Integration**:
```yaml
# .github/workflows/visual-regression.yml
name: Visual Regression Testing

on:
  pull_request:
    branches: [main]

jobs:
  percy:
    name: Percy Visual Tests
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

      - name: Run Percy tests
        run: npx percy exec -- npx playwright test tests/visual-regression.spec.js
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

### Chromatic (Alternative)

**Setup Chromatic** (for Storybook projects):
```bash
# Install Chromatic
npm install --save-dev chromatic

# Run Chromatic
npx chromatic --project-token=your_chromatic_token
```

**GitHub Actions Integration**:
```yaml
      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

### BackstopJS (Self-Hosted)

**Setup BackstopJS**:
```bash
# Install BackstopJS
npm install --save-dev backstopjs

# Initialize
npx backstop init
```

**backstop.json**:
```json
{
  "id": "slides_visual_regression",
  "viewports": [
    {
      "label": "desktop",
      "width": 1920,
      "height": 1080
    },
    {
      "label": "tablet",
      "width": 768,
      "height": 1024
    },
    {
      "label": "mobile",
      "width": 375,
      "height": 667
    }
  ],
  "scenarios": [
    {
      "label": "Homepage",
      "url": "http://localhost:3000",
      "delay": 1000
    },
    {
      "label": "Slide 1",
      "url": "http://localhost:3000/slide/1",
      "delay": 1000
    },
    {
      "label": "Slide with Chart",
      "url": "http://localhost:3000/slide/5",
      "delay": 2000,
      "readySelector": ".chart-container"
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "html_report": "backstop_data/html_report"
  }
}
```

**Run BackstopJS**:
```bash
# Create reference screenshots
npx backstop reference

# Run visual regression tests
npx backstop test

# Approve changes (update reference)
npx backstop approve
```

## Cross-Browser Testing

### Playwright (Multi-Browser)

**playwright.config.js**:
```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Cross-Browser Test**:
```javascript
// tests/cross-browser.spec.js
import { test, expect } from '@playwright/test';

test('Slide renders correctly', async ({ page }) => {
  await page.goto('/slide/1');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.slide-content')).toBeVisible();
});

test('Interactive chart works', async ({ page }) => {
  await page.goto('/slide/5');
  await page.waitForSelector('.chart-container');

  // Test tooltip on hover
  await page.hover('.chart-bar');
  await expect(page.locator('.tooltip')).toBeVisible();

  // Test click interaction
  await page.click('.chart-legend-item');
  await expect(page.locator('.chart-series-hidden')).toBeVisible();
});

test('Responsive layout', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  // Mobile menu should be visible
  await expect(page.locator('.mobile-menu')).toBeVisible();

  // Desktop navigation should be hidden
  await expect(page.locator('.desktop-nav')).toBeHidden();
});
```

**Run Tests**:
```bash
# Run all browsers
npx playwright test

# Run specific browser
npx playwright test --project=firefox

# Run in headed mode (see browser)
npx playwright test --headed

# Generate report
npx playwright show-report
```

### BrowserStack (Cloud Testing)

**Setup BrowserStack**:
```bash
# Install BrowserStack Local
npm install --save-dev browserstack-local

# Set credentials
export BROWSERSTACK_USERNAME=your_username
export BROWSERSTACK_ACCESS_KEY=your_access_key
```

**browserstack.yml**:
```yaml
auth:
  username: ${BROWSERSTACK_USERNAME}
  access_key: ${BROWSERSTACK_ACCESS_KEY}

browsers:
  - os: Windows
    osVersion: 10
    browserName: Chrome
    browserVersion: latest
  - os: OS X
    osVersion: Monterey
    browserName: Safari
    browserVersion: 15.0
  - os: Windows
    osVersion: 10
    browserName: Firefox
    browserVersion: latest
  - os: Windows
    osVersion: 10
    browserName: Edge
    browserVersion: latest

run_settings:
  cypress_proj_dir: /
  project_name: Slides QA
  build_name: Build #${BUILD_NUMBER}
  parallels: 5
```

**GitHub Actions Integration**:
```yaml
      - name: BrowserStack Env Setup
        uses: browserstack/github-actions/setup-env@master
        with:
          username: ${{ secrets.BROWSERSTACK_USERNAME }}
          access-key: ${{ secrets.BROWSERSTACK_ACCESS_KEY }}

      - name: Run tests on BrowserStack
        run: npx browserstack-cypress run
```

## Accessibility Testing

### axe-core (Automated A11y Testing)

**Install axe-core**:
```bash
npm install --save-dev @axe-core/playwright
```

**Accessibility Test**:
```javascript
// tests/accessibility.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('Homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Slide has no accessibility violations', async ({ page }) => {
    await page.goto('/slide/1');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Interactive chart is accessible', async ({ page }) => {
    await page.goto('/slide/5');
    await page.waitForSelector('.chart-container');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.chart-container')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

### Pa11y (Alternative)

**Install Pa11y**:
```bash
npm install --save-dev pa11y pa11y-ci
```

**.pa11yci.json**:
```json
{
  "defaults": {
    "timeout": 10000,
    "wait": 1000,
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"]
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/slide/1",
    "http://localhost:3000/slide/5"
  ]
}
```

**Run Pa11y**:
```bash
# Single URL
npx pa11y http://localhost:3000

# Multiple URLs
npx pa11y-ci
```

**GitHub Actions Integration**:
```yaml
      - name: Run Pa11y accessibility tests
        run: npx pa11y-ci
```

### Lighthouse Accessibility Audit

**.lighthouserc.json**:
```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "color-contrast": "error",
        "image-alt": "error",
        "label": "error",
        "meta-viewport": "error",
        "heading-order": "error"
      }
    }
  }
}
```

## Automated Testing Workflow

### Complete QA Workflow

**.github/workflows/qa-automation.yml**:
```yaml
name: QA Automation

on:
  pull_request:
    branches: [main]

jobs:
  qa:
    name: Quality Assurance Tests
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

      # Visual Regression Testing
      - name: Run Percy visual tests
        run: npx percy exec -- npx playwright test tests/visual-regression.spec.js
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}

      # Cross-Browser Testing
      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests (all browsers)
        run: npx playwright test

      - name: Upload Playwright report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

      # Accessibility Testing
      - name: Run accessibility tests
        run: npx playwright test tests/accessibility.spec.js

      - name: Run Pa11y CI
        run: npx pa11y-ci

      # Lighthouse CI
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/slide/1
          uploadArtifacts: true
          temporaryPublicStorage: true

      # Comment PR with results
      - name: Comment PR with QA results
        uses: actions/github-script@v6
        if: github.event_name == 'pull_request'
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `✅ QA Automation Complete
              - Visual Regression: Passed
              - Cross-Browser Tests: Passed
              - Accessibility Tests: Passed
              - Lighthouse Score: 95/100

              View detailed reports in Actions artifacts.`
            })
```

## Quality Checklist

### Visual Regression Checklist
- [ ] All slides captured as baseline screenshots
- [ ] Mobile and desktop viewports tested
- [ ] Interactive states captured (hover, click)
- [ ] Charts and animations rendered correctly
- [ ] Visual changes reviewed and approved

### Cross-Browser Checklist
- [ ] Chrome (latest) tested
- [ ] Firefox (latest) tested
- [ ] Safari (latest) tested
- [ ] Edge (latest) tested
- [ ] Mobile Chrome tested (Android)
- [ ] Mobile Safari tested (iOS)

### Accessibility Checklist
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] Screen reader compatible (ARIA labels)
- [ ] No accessibility violations (axe-core)
- [ ] Lighthouse accessibility score ≥90

## Input/Output Examples

### Example 1: Setup Visual Regression Testing

**Input**:
```
User: Set up visual regression testing to catch UI bugs
```

**Output**:
```
Configured Percy for visual regression testing:

Created tests/visual-regression.spec.js:
- Captures snapshots of all slides
- Tests mobile and desktop views
- Waits for interactive charts to render

Created GitHub Action:
- Runs on every pull request
- Uploads snapshots to Percy
- Comments on PR with visual diff links

Next steps:
1. Sign up at percy.io and get project token
2. Add PERCY_TOKEN to GitHub secrets
3. Open PR to create baseline snapshots
4. Future PRs will compare against baseline
```

### Example 2: Cross-Browser Testing

**Input**:
```
User: Test slides on Safari, Chrome, Firefox, and mobile browsers
```

**Output**:
```
Configured Playwright multi-browser testing:

Browsers tested:
- Desktop Chrome (Windows, macOS, Linux)
- Desktop Firefox (Windows, macOS, Linux)
- Desktop Safari (macOS)
- Mobile Chrome (Android - Pixel 5)
- Mobile Safari (iOS - iPhone 12)

Tests included:
- Slide rendering
- Interactive chart functionality
- Responsive layout (mobile vs desktop)
- Touch interactions (mobile)

GitHub Action runs tests on all browsers automatically.
HTML report uploaded as artifact.
```

### Example 3: Accessibility Testing

**Input**:
```
User: Ensure slides meet WCAG AA accessibility standards
```

**Output**:
```
Configured axe-core and Pa11y accessibility testing:

Tests check for:
- Color contrast (4.5:1 ratio)
- Alt text on all images
- Heading hierarchy
- Keyboard navigation
- ARIA labels for interactive elements

GitHub Action:
- Runs on every PR
- Fails if accessibility violations found
- Reports violations in PR comment

Example violation report:
❌ Accessibility Issues Found (2)
1. Color contrast insufficient: #777 on #fff (3.2:1)
   Location: .slide-subtitle
   Fix: Use darker color (#555 or darker)

2. Image missing alt text
   Location: img[src="chart.png"]
   Fix: Add alt="Revenue chart Q1-Q4"
```

## Integration with Team Workflow

### Handoff from Quality Reviewer
- Quality Reviewer defines quality standards
- QA Automation enforces standards automatically
- Critical violations block PR merge

### Handoff to Deployment Specialist
- QA tests pass before deployment allowed
- Deployment Specialist deploys only passing builds
- Failed QA tests trigger rollback

### Integration with CI/CD Pipeline
- QA tests run automatically on every PR
- Test results commented on PR
- PR merge blocked if tests fail

## Success Criteria

QA automation is successful when:
- Visual regression tests catch UI changes automatically
- Cross-browser tests validate compatibility (Chrome, Safari, Firefox, Edge)
- Accessibility tests ensure WCAG AA compliance
- All tests integrated into GitHub Actions
- PR merge blocked if QA tests fail
- Test reports accessible to team in PR comments and artifacts
