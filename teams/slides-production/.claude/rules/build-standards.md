---
name: Build Standards
description: Enforce bundle size limits, build time limits, and browser compatibility requirements
---

# Build Standards

## Rule Purpose

Ensure all slide project builds meet performance and quality standards including bundle size limits, build time limits, asset optimization requirements, and browser compatibility targets. Prevent deployment of builds that exceed these standards.

## Bundle Size Limits

### Maximum Bundle Sizes (Gzipped)

**JavaScript Bundle**:
- **Maximum**: 200KB (gzipped)
- **Measurement**: Total size of all .js files in dist/assets/
- **Violation**: Build fails if JavaScript bundle exceeds 200KB

**CSS Bundle**:
- **Maximum**: 50KB (gzipped)
- **Measurement**: Total size of all .css files in dist/assets/
- **Violation**: Build fails if CSS bundle exceeds 50KB

**Total Initial Load**:
- **Maximum**: 500KB (gzipped)
- **Measurement**: Total size of all assets loaded on initial page load (HTML + JS + CSS + critical images)
- **Violation**: Build fails if total initial load exceeds 500KB

### Bundle Size Validation

**Automated Check (GitHub Actions)**:
```yaml
      - name: Check bundle size
        run: |
          MAX_JS_KB=200
          MAX_CSS_KB=50
          MAX_TOTAL_KB=500

          JS_SIZE=$(find dist/assets -name "*.js" -exec du -k {} + | awk '{sum+=$1} END {print sum}')
          CSS_SIZE=$(find dist/assets -name "*.css" -exec du -k {} + | awk '{sum+=$1} END {print sum}')
          TOTAL_SIZE=$(du -sk dist | awk '{print $1}')

          echo "JS Bundle: ${JS_SIZE}KB (limit: ${MAX_JS_KB}KB)"
          echo "CSS Bundle: ${CSS_SIZE}KB (limit: ${MAX_CSS_KB}KB)"
          echo "Total: ${TOTAL_SIZE}KB (limit: ${MAX_TOTAL_KB}KB)"

          if [ $JS_SIZE -gt $MAX_JS_KB ]; then
            echo "❌ JavaScript bundle exceeds limit!"
            exit 1
          fi

          if [ $CSS_SIZE -gt $MAX_CSS_KB ]; then
            echo "❌ CSS bundle exceeds limit!"
            exit 1
          fi

          if [ $TOTAL_SIZE -gt $MAX_TOTAL_KB ]; then
            echo "❌ Total bundle exceeds limit!"
            exit 1
          fi
```

**size-limit Configuration**:
```json
{
  "size-limit": [
    {
      "name": "JavaScript bundle",
      "path": "dist/assets/*.js",
      "limit": "200 KB",
      "gzip": true
    },
    {
      "name": "CSS bundle",
      "path": "dist/assets/*.css",
      "limit": "50 KB",
      "gzip": true
    },
    {
      "name": "Total bundle",
      "path": "dist/**/*",
      "limit": "500 KB",
      "gzip": true
    }
  ]
}
```

### Bundle Size Remediation

**If JavaScript bundle exceeds 200KB**:
1. Analyze bundle composition (`webpack-bundle-analyzer` or `vite-bundle-visualizer`)
2. Identify large dependencies (Chart.js, D3.js, React)
3. Implement code splitting to defer non-critical code
4. Replace large libraries with lighter alternatives
5. Remove unused dependencies (`npm prune`)

**If CSS bundle exceeds 50KB**:
1. Remove unused CSS (`purgecss` or built-in Tailwind purge)
2. Extract critical CSS, defer non-critical CSS
3. Minify CSS (cssnano)
4. Avoid CSS frameworks if not needed

## Build Time Limits

### Maximum Build Times

**Development Build**:
- **Maximum**: 10 seconds
- **Measurement**: Time from `npm run dev` to server ready
- **Violation**: Warning if development build exceeds 10 seconds (not blocking)

**Production Build**:
- **Maximum**: 2 minutes (120 seconds)
- **Measurement**: Time from `npm run build` start to completion
- **Violation**: Build fails if production build exceeds 2 minutes

### Build Time Validation

**Automated Check (GitHub Actions)**:
```yaml
      - name: Build with timeout
        run: |
          timeout 120 npm run build || {
            echo "❌ Build exceeded 2 minute limit!"
            exit 1
          }
```

**Measure Build Time**:
```bash
# Measure production build time
time npm run build

# Output example:
# real    0m45.234s  ✅ Under 2 minutes
# user    1m23.456s
# sys     0m5.678s
```

### Build Time Optimization

**If build time exceeds 2 minutes**:
1. Enable build caching (Webpack cache, Vite cache)
2. Use faster minifiers (esbuild, SWC instead of Terser, Babel)
3. Reduce source map generation (use `cheap-module-source-map` in dev)
4. Parallelize build tasks (`thread-loader`, native Vite parallelization)
5. Remove unnecessary build steps

## Asset Optimization Requirements

### Image Optimization

**Required Optimizations**:
- All JPEG images compressed to 80-85% quality
- All PNG images reduced to 8-bit color depth (if possible)
- All images converted to WebP format (with JPEG/PNG fallback)
- Responsive image variants generated (mobile, tablet, desktop)
- Images below the fold lazy loaded (`loading="lazy"`)

**Violation**: Build fails if images exceed size limits or not optimized

### SVG Optimization

**Required Optimizations**:
- All SVG files minified with SVGO
- Unnecessary elements removed (comments, metadata, hidden layers)
- Paths simplified for smaller file size
- Critical SVGs inlined, large SVGs externalized

**Violation**: Build fails if SVG files exceed 50KB or not minified

### Font Optimization

**Required Optimizations**:
- Fonts subset to only used characters
- Fonts converted to WOFF2 format
- Unused font weights and styles removed
- Critical font glyphs inlined for faster rendering

**Violation**: Build fails if font files exceed 100KB or not subset

## Browser Compatibility Requirements

### Target Browsers

**Support browsers matching**:
```
> 0.5%
last 2 versions
not dead
```

**Specific Browser Versions**:
- **Chrome**: 90+ (Windows, macOS, Linux, Android)
- **Firefox**: 88+ (Windows, macOS, Linux)
- **Safari**: 14+ (macOS, iOS)
- **Edge**: 90+ (Windows, macOS)

**Violation**: Build fails if transpilation target excludes supported browsers

### Browserslist Configuration

**.browserslistrc**:
```
> 0.5%
last 2 versions
not dead
not IE 11
```

**Validation**:
```bash
# Check target browsers
npx browserslist

# Example output:
# chrome 110
# chrome 109
# safari 16.3
# safari 16.2
# firefox 110
# firefox 109
# edge 110
# edge 109
```

### Polyfills and Transpilation

**Required**:
- ES6+ syntax transpiled to ES5 (if needed for older browsers)
- Missing browser features polyfilled (Intersection Observer, ResizeObserver)
- Modern CSS features autoprefixed (Flexbox, Grid)

**babel.config.js**:
```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
      targets: {
        browsers: [
          '> 0.5%',
          'last 2 versions',
          'not dead'
        ]
      }
    }]
  ]
};
```

## Build Output Validation

### Required Files

**Must be present in dist/ after build**:
- `index.html` (entry point)
- `assets/*.js` (JavaScript bundles with content hash)
- `assets/*.css` (CSS bundles with content hash)
- `assets/images/*` (optimized images)
- `manifest.json` or equivalent (for PWA if applicable)

**Violation**: Build fails if required files missing

### File Naming Convention

**Required**:
- JavaScript files: `[name].[contenthash].js`
- CSS files: `[name].[contenthash].css`
- Image files: `[name].[hash].[ext]`

**Purpose**: Content hashing enables long-term caching (cache-busting)

**Violation**: Build fails if files not content-hashed

### Build Artifacts Structure

**Expected structure**:
```
dist/
├── index.html
├── assets/
│   ├── index.a3b2c1d4.js
│   ├── index.e5f6g7h8.css
│   ├── vendor.i9j0k1l2.js
│   └── images/
│       ├── hero.m3n4o5p6.webp
│       └── logo.q7r8s9t0.png
└── manifest.json
```

## Source Maps

### Development Mode

**Required**:
- Source maps enabled for debugging
- Map type: `eval-source-map` (Webpack) or default (Vite)

**Violation**: Warning if development source maps missing (not blocking)

### Production Mode

**Required**:
- Source maps disabled for security (or external for error tracking)
- No inline source maps in production bundles

**Violation**: Build fails if inline source maps present in production

**Configuration (Webpack)**:
```javascript
module.exports = {
  mode: 'production',
  devtool: false, // No source maps in production
};
```

**Configuration (Vite)**:
```javascript
export default {
  build: {
    sourcemap: false, // Disable source maps in production
  }
};
```

## Error Handling

### Build Errors (Critical)

**Build must fail if**:
- Syntax errors in JavaScript or CSS
- TypeScript type errors (if using TypeScript)
- Missing dependencies (`npm install` required)
- Bundle size exceeds limits
- Build time exceeds 2 minutes

**Violation**: Build continues despite errors (must be blocking)

### Build Warnings (Non-Blocking)

**Build may succeed with warnings**:
- Deprecated dependency warnings
- Unused exports (tree-shaking candidates)
- Large image file warnings (not exceeding limits)

**Action**: Log warnings, do not fail build

### Linter Errors

**Required**:
- ESLint configured and passing
- Prettier configured for consistent formatting
- No linter errors in production build

**Violation**: Build fails if linter errors present

**Configuration (package.json)**:
```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,md}\"",
    "prebuild": "npm run lint"
  }
}
```

## CI/CD Integration

### Pre-Build Checks

**Must pass before build**:
- [ ] All dependencies installed (`npm ci`)
- [ ] No security vulnerabilities (`npm audit --production`)
- [ ] Linter passes (`npm run lint`)
- [ ] Tests pass (`npm test`)

### Post-Build Checks

**Must pass after build**:
- [ ] Build completes without errors
- [ ] Bundle size within limits (JS <200KB, CSS <50KB)
- [ ] Build time under 2 minutes
- [ ] All expected files generated in `dist/`
- [ ] No console errors when loading built site

### Build Failure Handling

**If build fails**:
1. Read error message carefully (file path, line number)
2. Check syntax errors in source code
3. Verify dependencies are installed (`npm ci`)
4. Clear cache and rebuild (`rm -rf node_modules/.cache`)
5. Escalate to Production Director if issue persists

## Enforcement

### Build Engineer Responsibilities
- Configure build tools to enforce standards
- Validate bundle sizes meet limits
- Optimize build time to under 2 minutes
- Ensure browser compatibility targets configured

### CI/CD Pipeline Responsibilities
- Run automated bundle size checks
- Measure build time and fail if exceeds 2 minutes
- Validate build output structure
- Block deployment if build standards not met

### Production Director Responsibilities
- Enforce build standards at Phase 9.1 quality gate
- Do not proceed to Phase 9.2 if build fails
- Escalate to user if build standards cannot be met

## Violation Severity

### Critical Violations (Build Fails)
- Bundle size exceeds limits (JS >200KB, CSS >50KB, Total >500KB)
- Build time exceeds 2 minutes
- Syntax errors or build errors
- Required files missing from dist/
- Linter errors present

### Minor Violations (Warning, Non-Blocking)
- Development build time exceeds 10 seconds
- Deprecation warnings in dependencies
- Large image files (but within limits)
- Development source maps missing

## Related Rules

- See `deployment-protocol.md` for deployment quality gates
- See `phase-gate-protocol.md` for overall phase transition standards

---

**Version**: 1.0 | **Created**: 2026-02-11
