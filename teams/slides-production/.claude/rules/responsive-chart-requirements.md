---
name: Responsive Chart Requirements
description: Standards for responsive design breakpoints, touch interactions, and cross-device compatibility of charts
---

# Responsive Chart Requirements

## Rule Purpose

Ensure all web-based charts and diagrams render correctly and provide optimal user experience across desktop, tablet, and mobile devices. All agents involved in data visualization must adhere to responsive design standards.

## Breakpoint Standards

### Required Breakpoints

**Rule 1: Support Three Standard Breakpoints**
- **Mobile (Portrait)**: 320px - 767px (target: 375px, 414px)
- **Tablet (Portrait/Landscape)**: 768px - 1023px (target: 768px, 1024px)
- **Desktop**: 1024px+ (target: 1920px, 2560px)
- **Violation**: Chart has no responsive breakpoints (single fixed width)

**Rule 2: Test at Specific Device Resolutions**
- **Mobile**: iPhone 14 (390x844), iPhone SE (375x667), Samsung Galaxy S23 (360x800)
- **Tablet**: iPad (768x1024), iPad Pro (1024x1366)
- **Desktop**: 1920x1080 (Full HD), 2560x1440 (2K), 3840x2160 (4K)
- **Violation**: Chart tested at only one resolution

### Breakpoint Implementation

**CSS Media Queries (Required)**:
```css
/* Mobile (Portrait) */
@media (max-width: 767px) {
  .chart-container {
    width: 100%;
    height: 400px;
  }
  .chart-title { font-size: 18px; }
  .chart-legend { position: bottom; }
}

/* Tablet (Portrait) */
@media (min-width: 768px) and (max-width: 1023px) {
  .chart-container {
    width: 100%;
    height: 500px;
  }
  .chart-title { font-size: 22px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .chart-container {
    width: 100%;
    height: 600px;
  }
  .chart-title { font-size: 24px; }
}
```

**Violation**: No media queries (chart does not adapt to screen size)

## Font Size Requirements

### Minimum Readable Sizes

**Rule 1: Font Sizes Must Meet Minimum Standards**
- **Mobile**: Chart title 18px, Axis labels 12px, Legend 12px
- **Tablet**: Chart title 22px, Axis labels 14px, Legend 14px
- **Desktop**: Chart title 24px, Axis labels 16px, Legend 16px
- **Violation**: Font size below 12px on mobile (unreadable)

**Rule 2: Font Sizes Must Scale Proportionally**
- Font sizes should scale with screen size (responsive typography)
- Use `rem` or `em` units (not fixed `px`) for better scalability
- **Example**: `font-size: 1.5rem;` scales with root font size
- **Violation**: Fixed pixel fonts that don't scale

### Implementation
```css
/* Responsive font sizing with rem */
html { font-size: 16px; } /* Base size */

@media (max-width: 767px) {
  html { font-size: 14px; } /* Mobile: smaller base */
}

@media (min-width: 1440px) {
  html { font-size: 18px; } /* Large desktop: larger base */
}

.chart-title { font-size: 1.5rem; } /* Scales: 21px mobile, 24px desktop, 27px large */
.chart-label { font-size: 0.875rem; } /* Scales: 12.25px mobile, 14px desktop, 15.75px large */
```

## Chart Dimension Requirements

### Aspect Ratio Standards

**Rule 1: Maintain 16:9 Aspect Ratio on Desktop**
- Desktop charts should use 16:9 aspect ratio (e.g., 1600x900)
- Matches presentation slide dimensions
- **Violation**: Chart with random aspect ratio (e.g., 800x800 on desktop)

**Rule 2: Use Square or Vertical Aspect on Mobile**
- Mobile charts should use 1:1 (square) or 3:4 (vertical) aspect ratio
- Optimizes vertical screen space
- **Example**: 375x375 (square) or 375x500 (vertical)
- **Violation**: 16:9 chart on mobile (wastes vertical space)

### Height Constraints

**Rule 1: Limit Chart Height on Mobile**
- Mobile chart max height: 500px (ensures chart fits in viewport)
- Use scrollable container if chart must be taller
- **Violation**: 1000px tall chart on mobile (user must scroll excessively)

**Rule 2: Chart Must Fit in Viewport Without Horizontal Scroll**
- Chart width: 100% of container (never fixed width)
- Use `max-width` to prevent excessive width
- **Violation**: Chart requires horizontal scrolling

## Touch Interaction Requirements

### Touch Target Sizes

**Rule 1: Interactive Elements Must Be 44x44px Minimum**
- All tappable elements (legend items, buttons, interactive data points) must be at least 44x44px
- **Rationale**: Apple HIG and Material Design guidelines
- **Test**: Use Chrome DevTools device mode to test tap targets
- **Violation**: 20x20px touch target (too small for fingers)

**Rule 2: Increase Data Point Sizes on Mobile**
- Scatter plot points, line chart markers: Minimum 8px radius on mobile
- Desktop: 4-6px radius
- **Violation**: 2px markers on mobile (impossible to tap)

### Touch Event Handling

**Rule 1: Support Touch and Mouse Events**
- Charts must respond to both touch (mobile) and mouse (desktop) events
- Use touch events (`touchstart`, `touchmove`, `touchend`) on mobile
- Use mouse events (`mouseenter`, `mousemove`, `mouseleave`) on desktop
- **Violation**: Only mouse events implemented (doesn't work on mobile)

**Rule 2: Prevent Accidental Gestures**
- Disable pinch-zoom on chart (use chart's built-in zoom instead)
- Disable text selection when dragging on chart
- **CSS**: `touch-action: pan-y;` (allow vertical scroll, prevent zoom)
- **Violation**: Chart interferes with normal scrolling

### Tooltip Behavior on Mobile

**Rule 1: Tooltips Must Appear on Tap (Not Hover)**
- On mobile, tooltips should appear when user taps data point
- Tooltip should dismiss when user taps elsewhere
- **Violation**: Hover-only tooltips (don't work on mobile)

**Rule 2: Tooltips Must Not Cover Chart**
- Position tooltip above or below chart (not center)
- Ensure tooltip doesn't block other data points
- **Violation**: Tooltip covers half the chart

## Chart Element Adjustments

### Legend Position

**Rule 1: Move Legend to Bottom on Mobile**
- **Desktop**: Legend at top or right (horizontal space available)
- **Mobile**: Legend at bottom (vertical layout saves width)
- **Violation**: Right-side legend on mobile (chart too narrow)

### Axis Labels

**Rule 1: Reduce Axis Label Frequency on Mobile**
- **Desktop**: Show all axis labels (e.g., 12 months)
- **Mobile**: Show every other label or key labels only (e.g., Jan, Mar, May)
- **Violation**: Overlapping labels on mobile (unreadable)

**Rule 2: Rotate Axis Labels If Necessary**
- On mobile, rotate x-axis labels 45° or 90° if labels are long
- **Violation**: Long labels cramped horizontally (text overlaps)

### Chart Simplification on Mobile

**Rule 1: Reduce Data Density on Small Screens**
- **Desktop**: Display full dataset (e.g., 365 daily data points)
- **Mobile**: Aggregate or sample data (e.g., 52 weekly points)
- **Rationale**: Mobile screens cannot display high-density data clearly
- **Violation**: Cramming 100+ data points on mobile (illegible)

**Rule 2: Remove Non-Essential Elements on Mobile**
- Remove decorative grid lines (keep only major grid lines)
- Simplify backgrounds (solid colors, no gradients)
- **Violation**: Cluttered mobile chart with all desktop elements

## Performance Requirements

### Load Time Standards

**Rule 1: Chart Must Load in <2 Seconds on Mobile**
- Mobile networks are slower, charts must optimize for performance
- **Test**: Chrome DevTools throttling (Slow 3G, Fast 3G)
- **Violation**: 5+ second load time on mobile

**Rule 2: Chart Must Render in <500ms on Device**
- Chart rendering (after data loaded) must complete within 500ms
- Includes initial draw and animations
- **Test**: Chrome DevTools Performance tab on mobile device
- **Violation**: 2+ second rendering time (laggy experience)

### Animation Performance

**Rule 1: Maintain 60 FPS on Mobile**
- Chart animations must run at 60 frames per second
- **Test**: Chrome DevTools Performance monitor
- **Violation**: Animation drops to 30 FPS (choppy)

**Rule 2: Disable Animations on Low-Performance Devices**
- Detect low-performance devices and disable animations
- Use `navigator.hardwareConcurrency` or `navigator.deviceMemory` to detect
- **Violation**: Forcing animations on old devices (poor UX)

### Data Handling on Mobile

**Rule 1: Sample Large Datasets for Mobile**
- Datasets with 100+ points should be sampled to 50-100 points on mobile
- **Example**: Daily data (365 points) → Weekly data (52 points)
- **Violation**: Rendering 1000+ points on mobile (slow, unreadable)

**Rule 2: Use Canvas Renderer for Large Datasets**
- SVG is slow for large datasets, use Canvas renderer
- Chart.js: Use `type: 'bar'` with Canvas (default)
- D3.js: Use Canvas instead of SVG for 500+ points
- **Violation**: Using SVG for 1000+ points (slow rendering)

## Browser Compatibility

### Mobile Browser Support

**Rule 1: Support Latest 2 Versions of Mobile Browsers**
- **Chrome Mobile** (Android): Latest 2 versions
- **Safari iOS** (iPhone/iPad): Latest 2 versions
- **Samsung Internet** (Samsung devices): Latest version
- **Violation**: Chart doesn't work on Safari iOS (Apple users affected)

**Rule 2: Test on Real Devices**
- Test on real iPhone (Safari) and Android device (Chrome)
- Emulators may not catch all issues (touch, performance, rendering)
- **Violation**: Only tested on desktop browser device mode

### Touch API Compatibility

**Rule 1: Use Touch Events for Mobile**
- Detect touch support: `'ontouchstart' in window`
- Use `touchstart`, `touchmove`, `touchend` for touch devices
- Fallback to mouse events for desktop
- **Violation**: No touch event handling (chart doesn't respond to taps)

**Rule 2: Support Pointer Events (Modern Approach)**
- Use Pointer Events API for unified touch/mouse handling
- `pointerdown`, `pointermove`, `pointerup` work for both touch and mouse
- **Browser Support**: Chrome 55+, Firefox 59+, Safari 13+, Edge 12+
- **Violation**: Using outdated touch/mouse event separation

## Testing Requirements

### Breakpoint Testing

**Rule 1: Test at All Standard Breakpoints**
- Test at 375px (mobile), 768px (tablet), 1920px (desktop)
- Verify chart renders correctly and is readable
- **Violation**: Only tested at desktop resolution

**Rule 2: Test Orientation Changes**
- Test mobile in portrait and landscape
- Test tablet in portrait and landscape
- Chart should re-render correctly on orientation change
- **Violation**: Chart breaks when device rotated

### Device Testing

**Rule 1: Test on Real Mobile Devices**
- Test on iPhone (Safari iOS)
- Test on Android device (Chrome Mobile)
- **Minimum**: iPhone SE (small screen), iPhone 14 (standard), Android flagship
- **Violation**: Only tested on desktop emulator

**Rule 2: Test Touch Interactions**
- Tap data points to trigger tooltips
- Tap legend items to toggle series
- Pinch/zoom if chart supports zooming
- **Violation**: Touch interactions not tested

### Performance Testing

**Rule 1: Test Load Time on Slow Connection**
- Use Chrome DevTools Network throttling (Slow 3G, Fast 3G)
- Chart must load in <2 seconds
- **Violation**: No performance testing on mobile network

**Rule 2: Test Rendering Performance**
- Use Chrome DevTools Performance tab
- Record chart rendering and animation
- Verify 60 FPS during animations
- **Violation**: No FPS testing

## Enforcement

### Web Chart Designer Responsibilities
- Implement responsive breakpoints (mobile, tablet, desktop)
- Scale font sizes appropriately for each breakpoint
- Adjust chart dimensions and aspect ratios for mobile
- Simplify chart on mobile (reduce data density, legend position)

### Responsive Specialist Responsibilities
- Validate responsive breakpoints work correctly
- Test touch interactions on real devices
- Verify font sizes meet minimum readability standards
- Test performance on mobile networks and devices
- Provide optimization recommendations

### Quality Reviewer Responsibilities
- Verify chart renders correctly on mobile, tablet, desktop
- Test touch interactions and tooltip behavior
- Check font sizes are readable on all devices
- Validate performance meets standards (load time, FPS)

### Production Director Responsibilities
- Enforce responsive chart requirements at Phase 5.4.3 quality gate
- Do not proceed to Phase 6 if charts fail responsive tests
- Escalate to user if charts cannot meet mobile requirements

## Violation Severity

### Critical Violations (Must Fix Before Delivery)
- Chart doesn't render on mobile (broken layout)
- Font size below 12px on mobile (unreadable)
- Touch targets below 44x44px (unusable on mobile)
- Load time exceeds 5 seconds on mobile (unacceptable UX)
- Chart requires horizontal scrolling (poor mobile UX)

### Minor Violations (Should Fix, Non-Blocking)
- Legend position not optimized for mobile
- Axis labels slightly overlapping
- Animation performance 50 FPS (not 60 FPS)
- Chart aspect ratio not optimal for mobile

### Recommendations (Nice to Have)
- Use Canvas renderer for better performance
- Add pinch-zoom functionality for mobile
- Implement lazy loading for charts below fold

## Related Rules

- See `data-visualization-standards.md` for chart quality standards
- See `visual-quality-standards.md` for overall visual standards
- See `phase-gate-protocol.md` for quality gate enforcement

---

**Version**: 1.0 | **Created**: 2026-02-11
