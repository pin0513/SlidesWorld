---
name: Deployment Protocol
description: Define deployment checklist, rollback procedures, staging validation, and production approval process
---

# Deployment Protocol

## Rule Purpose

Ensure safe and reliable deployments of slide presentations to production environments. Define pre-deployment checklists, staging validation requirements, production deployment approval process, and rollback procedures to minimize deployment risks.

## Deployment Checklist

### Pre-Deployment Checklist (Staging)

**Must complete before deploying to staging**:
- [ ] Build completes without errors (`npm run build`)
- [ ] Bundle sizes meet limits (JS <200KB, CSS <50KB, Total <500KB)
- [ ] All tests pass (`npm test`)
- [ ] Visual regression tests pass (Percy/Chromatic/BackstopJS)
- [ ] Cross-browser tests pass (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility tests pass (axe-core, Pa11y)
- [ ] Performance score ≥90 (Lighthouse CI)
- [ ] No security vulnerabilities (`npm audit --production`)
- [ ] No hardcoded secrets or API keys in code
- [ ] Environment variables configured for staging

**Violation**: Deploying to staging without passing all checklist items

### Staging Validation Checklist

**Must validate after deploying to staging**:
- [ ] Staging URL loads correctly (https://)
- [ ] All assets load without 404 errors
- [ ] Interactive features work (charts, animations, tooltips)
- [ ] Mobile responsiveness verified (test on real device or emulator)
- [ ] Cross-browser compatibility verified (Chrome, Safari, Firefox)
- [ ] Performance meets targets (LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] Accessibility meets WCAG AA standards (color contrast, alt text, keyboard nav)
- [ ] No console errors in browser DevTools
- [ ] Analytics tracking enabled and working

**Violation**: Proceeding to production without validating staging deployment

### Pre-Production Checklist

**Must complete before deploying to production**:
- [ ] Staging deployment validated (all staging checklist items passed)
- [ ] User or stakeholder approval obtained (if required)
- [ ] Production environment variables configured
- [ ] CDN cache invalidation prepared (if needed)
- [ ] Rollback procedure documented and tested
- [ ] Team notified of pending deployment
- [ ] Deployment scheduled (avoid peak traffic times if applicable)
- [ ] Monitoring and alerting enabled

**Violation**: Deploying to production without staging validation or approval

### Post-Deployment Checklist

**Must validate after deploying to production**:
- [ ] Production URL loads correctly (https://)
- [ ] All assets delivered via CDN with correct cache headers
- [ ] SSL certificate valid and HTTPS working
- [ ] Environment variables correct (API endpoints, analytics IDs)
- [ ] Performance meets targets (LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] Analytics tracking enabled and reporting data
- [ ] Error monitoring active (Sentry, LogRocket, etc.)
- [ ] No console errors or warnings
- [ ] User or stakeholder notified of successful deployment

**Violation**: Deployment considered complete without post-deployment validation

## Staging Validation Requirements

### Functional Testing

**Required tests on staging**:
1. **Homepage loads**: Navigate to staging URL, verify content renders
2. **Slide navigation**: Test next/previous slide navigation
3. **Interactive charts**: Hover, click, zoom interactions work correctly
4. **Responsive layout**: Test on mobile (375px), tablet (768px), desktop (1920px)
5. **Keyboard navigation**: Tab through interactive elements, verify focus states
6. **External links**: Verify all external links open correctly

**Violation**: Skipping functional testing on staging

### Performance Testing

**Required metrics on staging**:
- **Lighthouse Performance Score**: ≥90
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **Total Blocking Time**: <300ms

**Measurement**:
```bash
# Run Lighthouse CI on staging
lhci autorun --collect.url=https://staging-slides.example.com
```

**Violation**: Proceeding to production with performance score <90 or metrics exceeding targets

### Browser Testing

**Required browsers to test on staging**:
- **Desktop Chrome** (latest version)
- **Desktop Firefox** (latest version)
- **Desktop Safari** (latest version, macOS)
- **Mobile Safari** (iOS, iPhone or simulator)
- **Mobile Chrome** (Android, real device or emulator)

**Test procedure**:
1. Load staging URL in each browser
2. Verify slides render correctly (no layout issues)
3. Test interactive features (charts, animations, tooltips)
4. Check for console errors (open DevTools)

**Violation**: Proceeding to production without testing all required browsers

### Accessibility Testing

**Required accessibility checks on staging**:
- **Color Contrast**: WCAG AA (4.5:1 for normal text, 3:1 for large text)
- **Alt Text**: All images have descriptive alt text
- **Keyboard Navigation**: All interactive elements reachable via Tab key
- **Screen Reader**: Test with NVDA (Windows) or VoiceOver (macOS)
- **ARIA Labels**: Interactive charts have appropriate ARIA labels

**Automated testing**:
```bash
# Run axe-core accessibility tests
npx playwright test tests/accessibility.spec.js --grep staging
```

**Violation**: Proceeding to production with accessibility violations

## Production Deployment Approval

### Approval Requirements

**Production deployment requires approval from**:
- **User/Stakeholder**: Approves content and design (if applicable)
- **Production Director**: Validates all quality gates passed
- **Quality Reviewer**: Confirms staging validation complete

**Approval Format**:
```markdown
## Production Deployment Approval

**Date**: 2026-02-11
**Version**: v1.1.0
**Staging URL**: https://staging-slides.example.com

**Checklist**:
- [x] Staging validation complete (all tests passed)
- [x] Performance score ≥90
- [x] Accessibility tests passed
- [x] Cross-browser testing complete
- [x] Rollback procedure documented

**Approvers**:
- [x] User/Stakeholder: Jane Doe (approved)
- [x] Production Director: (validated)
- [x] Quality Reviewer: (confirmed)

**Approved for production deployment**: Yes
```

**Violation**: Deploying to production without required approvals

### Approval Bypass

**Production deployment may proceed without user approval if**:
- User explicitly delegated approval authority to Production Director
- Hotfix deployment (critical bug fix) requires immediate deployment
- User is unavailable and deployment is time-sensitive (document decision)

**Documentation Required**: Note user approval bypass reason in deployment log

## Rollback Procedures

### Rollback Triggers

**Trigger immediate rollback if**:
- Site is completely broken (500 errors, blank page)
- Critical JavaScript error affecting all users (prevents core functionality)
- Performance degradation >50% (e.g., LCP 2s → 4s)
- Security vulnerability discovered in deployed code
- Data accuracy issue (incorrect data displayed in charts)

**Do NOT rollback for**:
- Minor visual issues (fix forward instead with hotfix)
- Analytics not tracking (non-critical, fix forward)
- Single browser compatibility issue (fix forward)
- User changes mind on content (redeploy new version)

### Rollback Procedure (Vercel)

**Step 1: List deployments**:
```bash
vercel ls
```

**Step 2: Identify previous working deployment**:
```
Production Deployments:
- bld_xyz789 (current, v1.1.0) ❌ Broken
- bld_abc123 (previous, v1.0.1) ✅ Working
```

**Step 3: Rollback to previous deployment**:
```bash
vercel rollback bld_abc123
```

**Step 4: Validate rollback**:
- [ ] Production URL loads correctly
- [ ] Core functionality works
- [ ] No console errors

**Step 5: Notify team**:
```markdown
## Rollback Executed

**Date**: 2026-02-11 14:45 UTC
**Reason**: Critical JavaScript error in v1.1.0 preventing slide navigation
**Rollback From**: v1.1.0 (bld_xyz789)
**Rollback To**: v1.0.1 (bld_abc123)
**Status**: Rollback complete, site functional
**Next Steps**: Fix JavaScript error, redeploy as v1.1.1
```

### Rollback Procedure (Netlify)

**Step 1: Go to Netlify Dashboard → Deploys**

**Step 2: Locate previous working deployment**

**Step 3: Click "Published deploy" dropdown → Select previous deployment**

**Step 4: Click "Publish deploy"**

**Step 5: Validate rollback** (same as Vercel)

### Rollback Procedure (GitHub Pages)

**Option 1: Revert commit**:
```bash
git revert HEAD
git push origin main
# GitHub Actions automatically redeploys
```

**Option 2: Force push previous commit** (use with caution):
```bash
git reset --hard v1.0.1
git push --force origin main
```

**Step 3: Validate rollback**

### Rollback Procedure (AWS S3 + CloudFront)

**Step 1: List object versions** (if versioning enabled):
```bash
aws s3api list-object-versions --bucket slides-production
```

**Step 2: Restore previous version**:
```bash
aws s3api restore-object --bucket slides-production --key index.html --version-id [VERSION_ID]
```

**Step 3: Invalidate CloudFront cache**:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

**Step 4: Validate rollback**

### Post-Rollback Actions

**After rollback**:
1. Identify root cause of deployment failure
2. Fix issue in codebase
3. Test fix on staging
4. Create new version (v1.1.1 if rolled back from v1.1.0)
5. Redeploy to production with fix
6. Document rollback in CHANGELOG.md

## Deployment Environments

### Development Environment

**Purpose**: Local development and testing
**URL**: http://localhost:3000
**Deployment**: Manual (`npm run dev`)
**Environment Variables**: .env.development

### Staging Environment

**Purpose**: Pre-production validation and stakeholder review
**URL**: https://staging-slides.example.com
**Deployment**: Automatic (push to `develop` branch)
**Environment Variables**: .env.staging or platform secrets

### Production Environment

**Purpose**: Live presentation delivery
**URL**: https://slides.example.com
**Deployment**: Manual or automatic (git tag `v*.*.*`)
**Environment Variables**: .env.production or platform secrets

## Deployment Timing

### Avoid Peak Traffic Times

**If applicable** (for public-facing presentations):
- Avoid deployments during business hours (9am-5pm user timezone)
- Schedule deployments during low-traffic windows (e.g., evenings, weekends)
- Coordinate with stakeholders for maintenance windows

**Exception**: Hotfix deployments may proceed during peak times if critical

### Deployment Windows

**Recommended deployment windows**:
- **Staging**: Anytime (low risk)
- **Production (non-critical)**: Off-peak hours (evenings, weekends)
- **Production (critical)**: With stakeholder approval and team availability for rollback

## Deployment Notifications

### Pre-Deployment Notification

**Send to team before production deployment**:
```markdown
## Production Deployment Scheduled

**Deployment Time**: 2026-02-11 18:00 UTC
**Version**: v1.1.0
**Deployment Window**: 30 minutes
**Expected Downtime**: None (zero-downtime deployment)

**Changes**:
- Added 5 new slides (market analysis)
- Updated revenue chart with Q4 data
- Fixed typo on slide 5

**Rollback Plan**: Rollback to v1.0.1 if issues detected
**Team Availability**: Production Director on standby for 1 hour post-deployment
```

### Post-Deployment Notification

**Send to team after successful deployment**:
```markdown
## Production Deployment Complete

**Deployment Time**: 2026-02-11 18:15 UTC (completed 15 minutes early)
**Version**: v1.1.0
**Status**: ✅ Successful
**Production URL**: https://slides.example.com

**Validation**:
- [x] Site loads correctly
- [x] Performance score: 95/100
- [x] No console errors
- [x] Analytics tracking confirmed

**Next Steps**: Monitor for 24 hours, review analytics for errors
```

## Enforcement

### Deployment Specialist Responsibilities
- Execute deployment checklist before deploying
- Validate staging deployment before proceeding to production
- Obtain required approvals for production deployment
- Execute rollback immediately if triggers detected
- Document all deployments and rollbacks

### Production Director Responsibilities
- Enforce deployment protocol at Phase 9.3 and 9.4 quality gates
- Approve production deployments after staging validation
- Escalate to user if deployment issues cannot be resolved
- Coordinate rollback decisions if triggers detected

### Quality Reviewer Responsibilities
- Validate staging deployment meets quality standards
- Confirm all tests passed before production approval
- Review deployment checklist for completeness

## Violation Severity

### Critical Violations (Deployment Blocked)
- Deploying to production without staging validation
- Deploying to production without required approvals
- Skipping pre-deployment checklist (tests not run)
- Deploying with failing tests or build errors
- No rollback procedure documented

### Minor Violations (Warning, Non-Blocking)
- Deploying during peak traffic times (if avoidable)
- Incomplete post-deployment validation
- Missing deployment notifications to team

## Related Rules

- See `build-standards.md` for build quality requirements
- See `phase-gate-protocol.md` for overall phase transition standards

---

**Version**: 1.0 | **Created**: 2026-02-11
