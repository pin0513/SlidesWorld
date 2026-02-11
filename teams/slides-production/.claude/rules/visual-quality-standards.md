---
name: Visual Quality Standards
description: Mandatory visual quality requirements for all slide decks including readability, accessibility, and consistency
---

# Visual Quality Standards

## Rule Purpose

Ensure all slide decks meet minimum visual quality standards for readability, accessibility, and professional appearance. All agents involved in visual production must adhere to these standards.

## Readability Standards

### Font Size Minimums
- **Slide Titles**: Minimum 28pt (recommended 36pt)
- **Body Text**: Minimum 18pt (recommended 20-24pt)
- **Supporting Text**: Minimum 14pt (captions, sources)

**Violation**: Any text smaller than minimum size (except source citations at 10-12pt)

### Text Density Limits
- **Maximum Bullet Points**: 6 per slide
- **Maximum Words Per Bullet**: 10 words
- **Maximum Total Words**: 75 words per slide (excluding title)

**Violation**: Slides exceeding density limits (must split into multiple slides)

### Line Length
- **Maximum Characters**: 60 characters per line (for readability)
- **Alignment**: Left-aligned for body text (not justified)

**Violation**: Text blocks exceeding 60 characters per line

## Accessibility Standards

### Color Contrast
- **Text-to-Background Ratio**: Minimum 4.5:1 (WCAG AA standard)
- **Large Text (18pt+)**: Minimum 3:1
- **Data Visualization**: Colors must be distinguishable for colorblind users

**Testing**: Use WCAG contrast checker tools (e.g., WebAIM Contrast Checker)

**Violation**: Any text failing contrast ratio standards

### Alt Text Requirements
- **All Images**: Must have descriptive alt text
- **Charts**: Must have descriptive legends and axis labels
- **Decorative Images**: Mark as decorative (no alt text needed)

**Violation**: Images without alt text (except decorative)

### Visual Accessibility
- **No Color-Only Information**: Do not rely on color alone to convey meaning (use labels, patterns, icons)
- **Clear Visual Hierarchy**: Size, weight, and position create hierarchy (not color alone)

**Example**:
- ❌ "Red bars show risk, green bars show safety" (colorblind users cannot distinguish)
- ✅ "Bars labeled 'Risk' and 'Safety' with distinct patterns" (labels + color)

## Consistency Standards

### Color Palette
- **Consistent Colors**: Use defined color palette across all slides
- **No Random Colors**: Every color must be from approved palette

**Violation**: Using colors outside defined palette

### Typography
- **Consistent Fonts**: Use same font family throughout
- **Consistent Sizes**: Slide titles same size, body text same size
- **Consistent Weights**: Headings bold, body regular (consistent)

**Violation**: Inconsistent font usage across slides

### Spacing and Alignment
- **Consistent Margins**: Same margins on all slides
- **Consistent Spacing**: Same spacing between elements across slides
- **Aligned Elements**: All elements aligned to grid (not random placement)

**Violation**: Inconsistent spacing or misaligned elements

### Logo and Branding
- **Logo Placement**: Same position on all slides (typically top-right)
- **Logo Size**: Consistent size across slides
- **Brand Elements**: Consistent footer, slide numbers, branding

**Violation**: Logo position or size varies across slides

## Image Quality Standards

### Resolution Requirements
- **Full-Bleed Backgrounds**: Minimum 1920x1080 (16:9 aspect ratio)
- **Supporting Images**: Minimum 1024x1024 or 1600x900
- **Icons**: Minimum 512x512 (vector preferred)

**Violation**: Pixelated or low-resolution images

### Image Treatment
- **No Distortion**: Images must maintain aspect ratio (no stretching)
- **No Pixelation**: All images must be sharp and clear
- **Consistent Style**: All images match visual theme (realistic, illustration, abstract)

**Violation**: Distorted, pixelated, or stylistically inconsistent images

## Chart Quality Standards

### Chart Clarity
- **One Message Per Chart**: Each chart conveys one key insight
- **Clear Labels**: Axis labels, units, and legends present
- **Highlighted Insights**: Key data points emphasized with color or annotation

**Violation**: Charts without labels or unclear messaging

### Chart Simplicity
- **Minimal Grid Lines**: Light gray, not distracting
- **No 3D Effects**: Flat, 2D charts only (3D distorts data perception)
- **Limited Colors**: Use data visualization palette (5-7 colors max)

**Violation**: Overly complex or decorative charts

### Chart Accuracy
- **Accurate Data**: Charts match research data exactly
- **Source Citations**: Every chart includes source
- **No Misleading Scales**: Y-axis starts at zero (unless explicitly noted)

**Violation**: Charts with incorrect data or misleading scales

## Layout Standards

### Slide Balance
- **Visual Balance**: 60% visual, 40% text (ideal ratio)
- **White Space**: Generous use of white space (not cluttered)
- **Element Distribution**: Elements distributed evenly (not clustered)

**Violation**: Text-heavy slides with no visuals or excessive clutter

### Safe Area
- **5% Margin**: No critical text or elements within 5% of slide edges
- **Projector-Safe**: Content visible on projectors (not cut off)

**Violation**: Text or images in outer 5% margin

## Professional Appearance

### No Amateurish Elements
- **No Clip Art**: Use professional images or icons
- **No Comic Sans**: Use professional fonts only
- **No Excessive Animations**: Minimal, professional transitions only
- **No Watermarks**: Remove stock photo watermarks

**Violation**: Unprofessional visual elements

### Consistent Professionalism
- **Clean Design**: No clutter or unnecessary elements
- **Polished Appearance**: All elements intentionally placed
- **Attention to Detail**: No orphaned words, no typos, no misalignment

**Violation**: Sloppy or unpolished visual execution

## Enforcement

### Visual Designer Responsibilities
- Define color palette, typography, and layout standards
- Document visual specifications in design guide
- Ensure standards are clear and achievable

### Slide Builder Responsibilities
- Implement visual standards exactly as specified
- Flag any deviations with rationale
- Verify all slides meet quality standards before handoff

### Quality Reviewer Responsibilities
- Check all slides against visual quality standards
- Flag violations (critical vs. minor)
- Reject slides not meeting standards

### Production Director Responsibilities
- Enforce visual quality standards at Phase 5 → Phase 6 gate
- Do not proceed to Phase 7 if visual standards not met
- Escalate to user if standards conflict with requirements

## Violation Severity

### Critical Violations (Must Fix Before Delivery)
- Color contrast fails WCAG AA (unreadable text)
- Font size below minimum (illegible on screens)
- Pixelated or broken images
- Incorrect data in charts
- Brand guideline violations (MAYO mode)

### Minor Violations (Should Fix, Non-Blocking)
- Inconsistent spacing (off by a few pixels)
- Minor typography inconsistencies (font size off by 2pt)
- Orphaned words (single word on a line)
- Slightly unbalanced layout

### Recommendations (Nice to Have)
- Additional white space for cleaner appearance
- Better image choice for visual impact
- Enhanced color choices within palette

## Testing Checklist

Before approving visual production, verify:
- [ ] All text meets font size minimums
- [ ] All text passes color contrast ratio (4.5:1)
- [ ] No slides exceed text density limits (6 bullets, 10 words each)
- [ ] All images are high-resolution (no pixelation)
- [ ] Color palette applied consistently
- [ ] Typography consistent across slides
- [ ] Spacing and alignment consistent
- [ ] Logo placement consistent
- [ ] Charts are clear, labeled, and accurate
- [ ] All images have alt text
- [ ] No amateurish elements (clip art, Comic Sans, etc.)

## Related Rules

- See `phase-gate-protocol.md` for quality gate enforcement
- See `accessibility-requirements.md` for detailed accessibility standards (if exists)

---

**Version**: 1.0 | **Created**: 2026-02-11
