---
name: CI/CD Pipeline
description: Automate testing, building, and deployment with GitHub Actions workflows
---

# CI/CD Pipeline Skill

## Skill Purpose

Automate the continuous integration and continuous deployment (CI/CD) workflow for slide presentation projects. Configure GitHub Actions to automatically test, build, and deploy slides on every git push, pull request, or release. Separate development, staging, and production environments for safe deployment validation.

## When to Use This Skill

Activate when:
- Setting up automated workflows for slide project
- Configuring multi-environment deployments (dev, staging, production)
- Implementing automated testing before deployment
- Creating preview deployments for pull requests
- Integrating quality checks (linting, bundle size, performance)

## Workflow Templates

### Basic CI Workflow (Test + Build)

**.github/workflows/ci.yml**:
```yaml
name: CI - Test and Build

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
          retention-days: 7
```

### Deployment to Staging

**.github/workflows/deploy-staging.yml**:
```yaml
name: Deploy to Staging

on:
  push:
    branches: [develop]

jobs:
  deploy:
    name: Deploy Staging
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging-slides.example.com

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build for staging
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.STAGING_API_URL }}
          VITE_ANALYTICS_ID: ${{ secrets.STAGING_ANALYTICS_ID }}

      - name: Deploy to Vercel (Staging)
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--env staging'
          github-comment: true

      - name: Run smoke tests
        run: npm run test:e2e -- --url https://staging-slides.example.com
```

### Deployment to Production

**.github/workflows/deploy-production.yml**:
```yaml
name: Deploy to Production

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  deploy:
    name: Deploy Production
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://slides.example.com

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build for production
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.PRODUCTION_API_URL }}
          VITE_ANALYTICS_ID: ${{ secrets.PRODUCTION_ANALYTICS_ID }}

      - name: Check bundle size
        run: |
          MAX_SIZE_KB=200
          BUNDLE_SIZE=$(du -sk dist/assets/*.js | awk '{sum+=$1} END {print sum}')
          if [ $BUNDLE_SIZE -gt $MAX_SIZE_KB ]; then
            echo "Bundle size $BUNDLE_SIZE KB exceeds limit $MAX_SIZE_KB KB"
            exit 1
          fi

      - name: Deploy to Vercel (Production)
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false

      - name: Upload PDF to release
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./dist/slides.pdf
          asset_name: slides.pdf
          asset_content_type: application/pdf
```

### Preview Deployments (Pull Requests)

**.github/workflows/preview.yml**:
```yaml
name: Preview Deployment

on:
  pull_request:
    branches: [main]

jobs:
  preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build preview
        run: npm run build

      - name: Deploy to Vercel (Preview)
        uses: amondnet/vercel-action@v20
        id: vercel-deploy
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          github-comment: true
          alias-domains: |
            pr-${{ github.event.pull_request.number }}.slides.example.com

      - name: Comment PR with preview URL
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `🚀 Preview deployed: ${{ steps.vercel-deploy.outputs.preview-url }}`
            })
```

## Environment Configuration

### GitHub Environments

Configure environments in GitHub:
1. Go to repository → Settings → Environments
2. Create environments: `staging`, `production`
3. Add environment secrets
4. Configure protection rules (require approvals for production)

### Required Secrets

**Repository Secrets** (Settings → Secrets):
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
STAGING_API_URL
STAGING_ANALYTICS_ID
PRODUCTION_API_URL
PRODUCTION_ANALYTICS_ID
```

**How to get secrets**:
```bash
# Vercel token
vercel login
vercel --token

# Vercel org and project IDs
vercel link
# Check .vercel/project.json
```

## Quality Gates

### Pre-Deployment Checks

Add quality gates before deployment:

```yaml
      - name: Lint code
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Check bundle size
        run: npm run build -- --analyze
        # Fail if bundle exceeds 200KB

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://staging-slides.example.com
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### Performance Budgets

**.lighthouserc.json**:
```json
{
  "ci": {
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

## Deployment Triggers

### Deploy on Push to Main

```yaml
on:
  push:
    branches: [main]
```

### Deploy on Git Tag

```yaml
on:
  push:
    tags:
      - 'v*.*.*'
```

### Deploy on Pull Request

```yaml
on:
  pull_request:
    branches: [main]
```

### Manual Deployment

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        type: choice
        options:
          - staging
          - production
```

## Notification Integrations

### Slack Notification

```yaml
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Deployment to production ${{ job.status }}'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
```

### Email Notification

```yaml
      - name: Send email on failure
        uses: dawidd6/action-send-mail@v3
        if: failure()
        with:
          server_address: smtp.gmail.com
          server_port: 465
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: 'Deployment failed: ${{ github.repository }}'
          to: team@example.com
          from: CI/CD Bot
          body: 'Deployment to production failed. Check logs at ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}'
```

## Rollback Workflow

**.github/workflows/rollback.yml**:
```yaml
name: Rollback Production

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to rollback to (e.g., v1.0.1)'
        required: true

jobs:
  rollback:
    name: Rollback
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://slides.example.com

    steps:
      - name: Checkout specific version
        uses: actions/checkout@v3
        with:
          ref: ${{ github.event.inputs.version }}

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy (Rollback)
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

      - name: Notify rollback
        run: echo "Rolled back to ${{ github.event.inputs.version }}"
```

## Caching Optimization

Speed up workflows with caching:

```yaml
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
```

## Input/Output Examples

### Example 1: Basic CI/CD Setup

**Input**:
```
User: Set up CI/CD for my slide project with staging and production deployments
```

**Output**:
```
Created GitHub Actions workflows:
- .github/workflows/ci.yml (test and build on every push)
- .github/workflows/deploy-staging.yml (deploy to staging on develop branch)
- .github/workflows/deploy-production.yml (deploy to production on git tags)

Next steps:
1. Add secrets to GitHub repository (VERCEL_TOKEN, etc.)
2. Create staging and production environments in GitHub
3. Push to develop branch to test staging deployment
4. Create git tag (v1.0.0) to trigger production deployment
```

### Example 2: Preview Deployments

**Input**:
```
User: I want preview URLs for every pull request
```

**Output**:
```
Created .github/workflows/preview.yml

How it works:
1. Open pull request
2. GitHub Actions automatically builds and deploys preview
3. Comment added to PR with preview URL (e.g., https://pr-123.slides.example.com)
4. Preview updated on every commit to PR branch
5. Preview deleted when PR is merged/closed
```

## Integration with Team Workflow

### Handoff from Build Engineer
- Build Engineer provides build scripts (`npm run build`)
- CI/CD Pipeline executes build in GitHub Actions
- Build artifacts uploaded for deployment

### Handoff to Deployment Specialist
- CI/CD triggers deployment automatically
- Deployment Specialist configures platform-specific settings
- Rollback procedures executed via manual workflow

### Integration with Version Controller
- CI/CD detects git tags (v1.0.0) and triggers production deployment
- Version Controller creates tags after changelog update
- GitHub Release created automatically with deployment artifacts

## Success Criteria

CI/CD setup is successful when:
- Automated tests run on every push and pull request
- Staging deploys automatically on develop branch push
- Production deploys automatically on git tag creation
- Preview deployments created for pull requests
- Quality gates (bundle size, performance) enforced before deployment
- Rollback workflow tested and documented
- Team members understand how to trigger deployments (push to develop, create tag)
