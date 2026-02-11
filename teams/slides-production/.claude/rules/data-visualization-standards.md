---
name: Data Visualization Standards
description: Standards for chart type selection, color usage, interactivity, and performance in data visualizations
---

# Data Visualization Standards

## Rule Purpose

Ensure all data visualizations (charts, diagrams, dashboards) follow best practices for clarity, accuracy, accessibility, and performance. All agents involved in data visualization must adhere to these standards.

## Chart Type Selection Standards

### Chart Type Decision Rules

**Rule 1: Use Line Charts for Trends Over Time**
- **When**: Showing how values change over time (sales growth, user adoption, stock prices)
- **Requirement**: X-axis must be time-based (dates, months, quarters)
- **Maximum Series**: 5 lines (more creates clutter)
- **Violation**: Using line chart for categorical comparisons (use bar chart instead)

**Rule 2: Use Bar Charts for Comparisons**
- **When**: Comparing values across categories (quarterly revenue, product sales)
- **Requirement**: Bars must start at zero (no truncated y-axis)
- **Maximum Categories**: 12 bars (use horizontal bar if more)
- **Violation**: Using bar chart for trends over time (use line chart instead)

**Rule 3: Use Pie Charts for Proportions (Sparingly)**
- **When**: Showing parts of a whole (market share, budget allocation)
- **Requirement**: Maximum 5-6 segments (more creates confusion)
- **Requirement**: Segments must sum to 100%
- **Violation**: Using pie chart for comparisons (use bar chart instead)
- **Violation**: Multiple pie charts for comparison (use stacked bar instead)

**Rule 4: Use Scatter Plots for Correlations**
- **When**: Showing relationship between two variables (price vs demand, age vs income)
- **Requirement**: At least 20 data points for meaningful pattern
- **Violation**: Using scatter plot for categorical data (use bar chart)

**Rule 5: Use Heatmaps for Large Datasets**
- **When**: Showing patterns in large matrices (user activity by hour/day, correlation matrix)
- **Requirement**: Color scale must be sequential (light to dark) or diverging (negative to positive)
- **Violation**: Using random colors (confuses interpretation)

## Color Usage Standards

### Color Palette Requirements

**Rule 1: Use Brand Colors as Primary Palette**
- All charts must use colors from visual design palette
- Primary color for main data series
- Secondary/accent colors for additional series
- **Violation**: Using random colors not in brand palette

**Rule 2: Use Colorblind-Friendly Palettes**
- Colors must be distinguishable for colorblind users (8% of males)
- Use distinct hues (blue, orange, green, purple) not similar shades
- **Test**: Use Coblis colorblind simulator
- **Violation**: Using red/green combinations only (deuteranopia cannot distinguish)

**Recommended Colorblind-Friendly Palette**:
```
#004488 (Blue)
#BB5566 (Pink)
#DDAA33 (Yellow)
#000000 (Black)
#77AADD (Light Blue)
#EE8866 (Orange)
#EEDD88 (Light Yellow)
#99DDFF (Cyan)
```

**Rule 3: Use Color AND Pattern for Redundancy**
- Do not rely on color alone to convey information
- Add labels, patterns, or icons for clarity
- **Example**: Bar chart with colored bars MUST have value labels
- **Violation**: Chart where color is the only differentiator

**Rule 4: Limit Color Count to 7**
- Maximum 7 distinct colors in a single chart
- More than 7 colors creates cognitive overload
- **Solution**: Group categories or use faceted charts
- **Violation**: Chart with 10+ colors

### Semantic Color Rules

**Rule 1: Use Red for Negative/Danger/High Risk**
- Red indicates decrease, loss, error, danger
- Examples: Revenue decline, system errors, high risk

**Rule 2: Use Green for Positive/Success/Low Risk**
- Green indicates increase, profit, success, safety
- Examples: Revenue growth, completed tasks, low risk

**Rule 3: Use Yellow/Orange for Warning/Caution**
- Yellow/orange indicates warning, attention needed
- Examples: Moderate risk, approaching threshold

**Rule 4: Use Blue for Neutral/Information**
- Blue is neutral, safe for primary data
- Examples: General data, informational charts

**Violation**: Using green for negative data (confuses interpretation)

## Interactivity Standards

### Interactive Feature Requirements

**Rule 1: Hover Tooltips for Exact Values**
- All interactive charts must show exact values on hover
- Tooltip format: `[Series Name]: [Value] [Unit]`
- **Example**: Revenue: $145.2M
- **Violation**: No tooltips (user cannot see exact values)

**Rule 2: Click Interactions Must Provide Value**
- Click actions must reveal additional information (drill-down, detail view)
- Do not add click interactions just for decoration
- **Example**: Click bar to see breakdown by product
- **Violation**: Click that does nothing

**Rule 3: Zoom/Pan for Large Datasets**
- Charts with 50+ data points must allow zoom or filter
- Provide reset zoom button
- **Violation**: Cramming 100 data points without zoom

**Rule 4: Interactive Features Must Work on Mobile**
- Hover tooltips must work as touch tooltips
- Click interactions must have touch-friendly targets (44x44px minimum)
- **Violation**: Tooltips that don't work on mobile

### Animation Standards

**Rule 1: Animate Chart Entrance (Optional)**
- Entrance animations should be subtle (fade-in, grow-in)
- Duration: 500-1000ms (not too slow)
- **Violation**: Excessive animation (3+ seconds, distracting)

**Rule 2: Animate Data Updates**
- When data changes, animate transition (smooth, not sudden)
- Duration: 300-500ms
- **Violation**: Data changes without transition (jarring)

**Rule 3: Respect prefers-reduced-motion**
- Detect prefers-reduced-motion setting
- Disable animations for users who prefer less motion
- **Violation**: Ignoring accessibility preference

## Accessibility Standards

### WCAG Compliance Requirements

**Rule 1: Color Contrast Must Meet WCAG AA (4.5:1)**
- Text on charts must have 4.5:1 contrast ratio
- Large text (18pt+) must have 3:1 contrast
- **Test**: Use WebAIM Contrast Checker
- **Violation**: Gray text on light gray background (insufficient contrast)

**Rule 2: All Charts Must Have Alt Text**
- Alt text describes chart type, data, and key insight
- Format: `[Chart Type] showing [Data] with key insight [Insight]`
- **Example**: "Bar chart showing quarterly revenue with 75% growth in Q4"
- **Violation**: No alt text or generic "chart image"

**Rule 3: Charts Must Be Keyboard Accessible**
- Interactive elements must be reachable via Tab key
- Enter/Space must activate interactions
- **Violation**: Chart only works with mouse

**Rule 4: Screen Reader Compatibility**
- Charts must have ARIA labels and roles
- Data tables should be provided as alternative
- **Violation**: Screen reader announces "image" with no context

## Performance Standards

### Load Time Requirements

**Rule 1: Chart Must Load in <2 Seconds**
- Initial chart render must complete within 2 seconds
- Includes data loading and rendering
- **Test**: Chrome DevTools Performance tab
- **Violation**: Chart takes 5+ seconds to load

**Rule 2: Animation Must Maintain 60 FPS**
- Chart animations must run at 60 frames per second
- No stuttering or lag
- **Test**: Chrome DevTools Performance monitor
- **Violation**: Animation drops to 30 FPS or lower

### Data Handling Requirements

**Rule 1: Sample Data for Large Datasets on Mobile**
- Mobile charts should display max 100 data points
- Larger datasets should be sampled or aggregated
- **Violation**: Rendering 1000+ points on mobile (slow, unreadable)

**Rule 2: Use Canvas for Large Datasets**
- Datasets with 500+ points should use Canvas renderer (faster than SVG)
- **Violation**: Using SVG for 1000+ points (slow rendering)

**Rule 3: Lazy Load Charts**
- Charts below the fold should lazy load (Intersection Observer)
- Only render charts when visible
- **Violation**: Rendering all charts on page load (slow initial load)

## Chart Quality Standards

### Chart Clarity Requirements

**Rule 1: One Message Per Chart**
- Each chart must convey one clear insight
- Highlight key data point with annotation or color
- **Violation**: Chart with no clear message (just raw data)

**Rule 2: Clear Labels on All Axes**
- X-axis and Y-axis must have descriptive labels
- Include units (Millions USD, %, kg, etc.)
- **Violation**: Unlabeled axes (user guesses meaning)

**Rule 3: Include Legend for Multi-Series Charts**
- Charts with 2+ series must have legend
- Legend labels must be descriptive (not "Series 1, Series 2")
- **Violation**: Multi-series chart with no legend

**Rule 4: Source Citation on All Charts**
- Every chart must cite data source
- Format: `Source: [Organization, Report, Date]`
- Position: Bottom-left corner (8-10pt font)
- **Violation**: No source citation (credibility issue)

### Chart Simplicity Requirements

**Rule 1: Minimize Grid Lines**
- Use light gray grid lines (not black)
- Only horizontal grid lines for bar/line charts (no vertical)
- **Violation**: Heavy black grid lines (distracts from data)

**Rule 2: No 3D Effects**
- Use flat, 2D charts only
- 3D distorts data perception (misleading)
- **Violation**: 3D pie chart or 3D bar chart

**Rule 3: No Decorative Elements**
- Remove chart junk (unnecessary borders, backgrounds, shadows)
- Focus on data, not decoration
- **Violation**: Chart with gradient fills, drop shadows, textures

## Data Accuracy Standards

### Data Validation Requirements

**Rule 1: Data Must Match Source**
- Chart data must exactly match source data
- Verify calculations (totals, averages, percentages)
- **Violation**: Chart shows 72% but source says 68%

**Rule 2: Y-Axis Must Start at Zero (for Bar Charts)**
- Bar charts must start y-axis at zero (avoid misleading)
- Exception: Line charts with narrow range can use non-zero start
- **Violation**: Bar chart with y-axis starting at 50 (exaggerates differences)

**Rule 3: No Misleading Scales**
- Linear scales for linear data
- Logarithmic scales only when appropriate (clearly labeled)
- **Violation**: Manipulating scale to exaggerate trend

**Rule 4: Source Citations Must Be Accurate**
- Source citation must reference exact document and date
- Verify source is credible and recent (within 2 years)
- **Violation**: Citing "Internal Data" with no specifics

## Enforcement

### Web Chart Designer Responsibilities
- Select appropriate chart type based on data characteristics
- Apply brand color palette consistently
- Implement interactivity standards (tooltips, zoom, animations)
- Ensure charts meet performance targets
- Cite data sources accurately

### Data Transformer Responsibilities
- Validate data accuracy against source
- Flag data quality issues (missing values, outliers)
- Ensure data structure matches chart requirements
- Document data transformations and calculations

### Responsive Specialist Responsibilities
- Verify charts meet accessibility standards (WCAG AA)
- Test charts in target browsers
- Optimize charts for mobile/tablet/desktop
- Ensure interactive features work on touch devices

### Quality Reviewer Responsibilities
- Validate chart type selection
- Check color palette and accessibility
- Verify data accuracy and source citations
- Test interactive features and performance
- Ensure charts support slide narrative

### Production Director Responsibilities
- Enforce data visualization standards at Phase 5.4 quality gate
- Do not proceed to Phase 6 if charts do not meet standards
- Escalate to user if data or source issues found

## Violation Severity

### Critical Violations (Must Fix Before Delivery)
- Incorrect data or calculations
- Missing source citations
- Color contrast fails WCAG AA (unreadable)
- Chart type inappropriate for data (misleading)
- Y-axis does not start at zero (bar chart)
- No alt text for accessibility

### Minor Violations (Should Fix, Non-Blocking)
- Legend labels could be clearer
- Grid lines too prominent
- Animation duration too long
- Color palette not perfectly colorblind-friendly (but distinguishable)

### Recommendations (Nice to Have)
- Add annotations to highlight insights
- Simplify chart by removing decorative elements
- Use alternative chart type for clearer message

## Related Rules

- See `visual-quality-standards.md` for overall visual standards
- See `responsive-chart-requirements.md` for responsive design standards
- See `phase-gate-protocol.md` for quality gate enforcement

---

**Version**: 1.0 | **Created**: 2026-02-11
