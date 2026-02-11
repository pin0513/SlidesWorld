---
name: Browser Compatibility Check
description: Verify web chart compatibility across browsers and recommend polyfills using Can I Use database
---

# Browser Compatibility Check Skill

## Capability

Check browser compatibility for web-based charts and interactive visualizations. Query Can I Use database for feature support, recommend polyfills for unsupported features, and provide fallback strategies for older browsers.

## When to Use

- Responsive Specialist needs to validate browser compatibility
- Chart uses modern JavaScript features (ES6+, Fetch API, SVG 2.0)
- Decision needed on polyfill requirements
- Fallback strategy needed for older browsers
- Cross-browser testing checklist required

## Browser Support Targets

### Primary Browsers (Must Support)
- **Chrome**: Latest 2 versions (currently 120+)
- **Firefox**: Latest 2 versions (currently 121+)
- **Safari**: Latest 2 versions (currently 17+)
- **Edge**: Latest 2 versions (currently 120+)

### Secondary Browsers (Should Support)
- **Chrome Mobile**: Latest version (Android)
- **Safari iOS**: Latest 2 versions (iPhone/iPad)
- **Samsung Internet**: Latest version (Samsung devices)

### Legacy Browsers (Optional/Conditional)
- **IE11**: End of life (not recommended, requires extensive polyfills)
- **Safari 12-14**: Partial support, may need polyfills

## Feature Compatibility Checks

### JavaScript Features

#### ES6+ Features
| Feature | Chrome | Firefox | Safari | Edge | Polyfill |
|---------|--------|---------|--------|------|----------|
| Arrow Functions | 45+ | 22+ | 10+ | 12+ | Babel |
| Classes | 49+ | 45+ | 9+ | 13+ | Babel |
| Template Literals | 41+ | 34+ | 9+ | 12+ | Babel |
| Promises | 32+ | 29+ | 8+ | 12+ | core-js |
| async/await | 55+ | 52+ | 11+ | 15+ | Babel + core-js |
| Fetch API | 42+ | 39+ | 10.1+ | 14+ | whatwg-fetch |
| ES Modules | 61+ | 60+ | 11+ | 79+ | SystemJS |

#### DOM APIs
| Feature | Chrome | Firefox | Safari | Edge | Polyfill |
|---------|--------|---------|--------|------|----------|
| querySelector | All | All | All | All | - |
| classList | 8+ | 3.6+ | 5.1+ | 10+ | classList.js |
| dataset | 7+ | 6+ | 5.1+ | 11+ | - |
| Intersection Observer | 51+ | 55+ | 12.1+ | 15+ | intersection-observer |
| ResizeObserver | 64+ | 69+ | 13.1+ | 79+ | resize-observer-polyfill |
| MutationObserver | 18+ | 14+ | 6+ | 11+ | mutation-observer |

#### Canvas & SVG
| Feature | Chrome | Firefox | Safari | Edge | Polyfill |
|---------|--------|---------|--------|------|----------|
| Canvas 2D | All | All | All | All | - |
| SVG | All | All | All | All | - |
| SVG 2.0 | 56+ | 51+ | Partial | 79+ | - |
| Canvas toBlob | 50+ | 19+ | 11+ | 79+ | blueimp-canvas-to-blob |

### Chart Library Compatibility

#### Chart.js 4.x
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **IE11**: ❌ Not supported
- **Polyfills needed**: None for modern browsers

#### D3.js 7.x
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **IE11**: ❌ Not supported
- **Polyfills needed**: Fetch API (if using d3.json)

#### ECharts 5.x
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **IE11**: ⚠️ Use ECharts 4.x with polyfills
- **Polyfills needed**: Promise, Fetch API for IE11

#### ApexCharts 3.x
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **IE11**: ❌ Not supported
- **Polyfills needed**: None for modern browsers

## Polyfill Recommendations

### Core Polyfills (For Older Browsers)

#### core-js (ES6+ Features)
```html
<!-- Polyfills Promise, Symbol, Iterator, etc. -->
<script src="https://cdn.jsdelivr.net/npm/core-js-bundle@3.30.0/minified.js"></script>
```

**Use when**: Supporting IE11 or Safari <10
**Size**: ~100KB (minified)
**Features**: All ES6+ features

#### Babel Polyfill (ES6+ Syntax)
```html
<!-- Transpile ES6+ syntax to ES5 -->
<!-- Use Babel build tools, not runtime polyfill -->
```

**Use when**: Supporting IE11
**Note**: Use during build process, not at runtime

### API Polyfills

#### Fetch API
```html
<!-- Polyfill for Fetch API -->
<script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.js"></script>
```

**Use when**: Supporting IE11, Safari <10.1, older Android browsers
**Size**: ~5KB
**Provides**: fetch(), Headers, Request, Response

#### Intersection Observer
```html
<!-- Polyfill for lazy loading charts -->
<script src="https://cdn.jsdelivr.net/npm/intersection-observer@0.12.2/intersection-observer.js"></script>
```

**Use when**: Supporting Safari <12.1, IE11, older Chrome/Firefox
**Size**: ~6KB
**Use case**: Lazy loading charts when visible

#### ResizeObserver
```html
<!-- Polyfill for responsive charts -->
<script src="https://cdn.jsdelivr.net/npm/resize-observer-polyfill@1.5.1/dist/ResizeObserver.js"></script>
```

**Use when**: Supporting Safari <13.1, IE11, older browsers
**Size**: ~4KB
**Use case**: Detecting container resize for responsive charts

### Canvas & SVG Polyfills

#### Canvas toBlob
```html
<!-- Polyfill for canvas.toBlob() -->
<script src="https://cdn.jsdelivr.net/npm/blueimp-canvas-to-blob@3.29.0/js/canvas-to-blob.min.js"></script>
```

**Use when**: Supporting Safari <11, IE11
**Size**: ~2KB
**Use case**: Exporting charts as images

## Compatibility Check Process

### Step 1: Identify Used Features
```javascript
// Example: List features used in chart
const features = [
  'Fetch API',           // For loading data
  'Promises',            // For async operations
  'Arrow Functions',     // In chart configuration
  'Template Literals',   // In tooltip formatting
  'Canvas 2D',           // For Chart.js rendering
  'ResizeObserver'       // For responsive charts
];
```

### Step 2: Check Browser Support
Use Can I Use database or MDN compatibility tables:
- Fetch API: Chrome 42+, Firefox 39+, Safari 10.1+, Edge 14+
- Promises: Chrome 32+, Firefox 29+, Safari 8+, Edge 12+
- Canvas 2D: All browsers
- ResizeObserver: Chrome 64+, Firefox 69+, Safari 13.1+, Edge 79+

### Step 3: Identify Polyfill Needs
```javascript
// Check if polyfill needed
const needsPolyfill = {
  fetch: typeof fetch === 'undefined',
  promise: typeof Promise === 'undefined',
  resizeObserver: typeof ResizeObserver === 'undefined'
};

// Load polyfills conditionally
if (needsPolyfill.fetch) {
  loadScript('https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.js');
}
```

### Step 4: Test in Target Browsers
- Chrome DevTools Device Mode (mobile testing)
- Firefox Responsive Design Mode
- Safari Web Inspector (macOS/iOS testing)
- BrowserStack or LambdaTest (cross-browser testing)

## Fallback Strategies

### Progressive Enhancement
```javascript
// Check for feature support, provide fallback
if (window.ResizeObserver) {
  // Use ResizeObserver for responsive charts
  const observer = new ResizeObserver(() => {
    chart.resize();
  });
  observer.observe(chartContainer);
} else {
  // Fallback: Resize on window resize
  window.addEventListener('resize', () => {
    chart.resize();
  });
}
```

### Graceful Degradation
```javascript
// Provide static image fallback for unsupported browsers
if (!supportsCanvas()) {
  chartContainer.innerHTML = '<img src="chart-fallback.png" alt="Chart">';
} else {
  renderChart(chartContainer);
}

function supportsCanvas() {
  const elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}
```

### Feature Detection
```javascript
// Use Modernizr or custom detection
const features = {
  canvas: !!document.createElement('canvas').getContext,
  svg: !!document.createElementNS &&
       !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect,
  fetch: typeof fetch !== 'undefined',
  promises: typeof Promise !== 'undefined'
};

if (!features.fetch) {
  // Load polyfill or use XMLHttpRequest fallback
}
```

## Output Format

### Browser Compatibility Report
```markdown
## Browser Compatibility Report - [Chart Name]

### Features Used
- Fetch API (loading chart data)
- Promises (async data processing)
- ResizeObserver (responsive chart resizing)
- Canvas 2D (chart rendering via Chart.js)
- ES6 Arrow Functions (chart configuration)

### Browser Support Matrix

| Browser | Version | Status | Issues | Polyfills Needed |
|---------|---------|--------|--------|------------------|
| Chrome | 120+ | ✅ Full Support | None | None |
| Firefox | 121+ | ✅ Full Support | None | None |
| Safari | 17+ | ✅ Full Support | None | None |
| Edge | 120+ | ✅ Full Support | None | None |
| Safari 14-16 | 14-16 | ⚠️ Partial | ResizeObserver unsupported | resize-observer-polyfill |
| IE11 | 11 | ❌ No Support | All features unsupported | core-js, whatwg-fetch, resize-observer-polyfill |

### Recommended Polyfills

For Safari 14-16:
```html
<script src="https://cdn.jsdelivr.net/npm/resize-observer-polyfill@1.5.1/dist/ResizeObserver.js"></script>
```

For IE11 (if required):
```html
<script src="https://cdn.jsdelivr.net/npm/core-js-bundle@3.30.0/minified.js"></script>
<script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/resize-observer-polyfill@1.5.1/dist/ResizeObserver.js"></script>
```

### Fallback Strategy
- **Primary**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Secondary**: Polyfills for Safari 12-14 (ResizeObserver)
- **Tertiary**: Static image fallback for IE11 (PDF export only)

### Testing Checklist
- [ ] Tested in Chrome 120+ (Desktop)
- [ ] Tested in Firefox 121+ (Desktop)
- [ ] Tested in Safari 17+ (macOS)
- [ ] Tested in Edge 120+ (Desktop)
- [ ] Tested in Chrome Mobile (Android)
- [ ] Tested in Safari iOS 17+ (iPhone)
- [ ] Verified polyfills load correctly in older browsers
- [ ] Verified static fallback works in IE11

### Approval Status
- ✅ Approved for production
- ⚠️ Approved with polyfills
- ❌ Requires fixes before deployment

### Notes
[Any additional browser-specific issues or recommendations]
```

## Common Issues and Solutions

### Issue 1: SVG Not Rendering in IE11
**Problem**: SVG 2.0 features not supported
**Solution**: Use SVG 1.1 features only, or provide PNG fallback

### Issue 2: Fetch API Fails in Safari <10.1
**Problem**: Fetch API not available
**Solution**: Include whatwg-fetch polyfill

### Issue 3: Chart Doesn't Resize in Safari <13.1
**Problem**: ResizeObserver not supported
**Solution**: Include resize-observer-polyfill

### Issue 4: ES6 Syntax Error in IE11
**Problem**: Arrow functions, template literals not supported
**Solution**: Transpile with Babel during build process

## Quality Checklist

Before completing compatibility check, verify:
- [ ] All JavaScript features identified
- [ ] Browser support confirmed for each feature
- [ ] Polyfills identified for unsupported features
- [ ] Fallback strategy defined
- [ ] Testing checklist created
- [ ] Polyfill CDN links provided
- [ ] Static image fallback created (if needed)
- [ ] Performance impact of polyfills assessed
- [ ] User has approved browser support targets

## Related Skills

- `chart-library-integration` - Select libraries with appropriate browser support
- `mermaid-diagram` - Alternative for simple diagrams (SVG-based, better compatibility)

---

**Version**: 1.0 | **Created**: 2026-02-11
