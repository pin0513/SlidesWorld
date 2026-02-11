# SlidesWorld Production Team

## Team Objectives

Create high-quality presentation slides through a 9-phase production workflow: requirement clarification, template selection, content research, outline structuring, story design, visual design and production (including data visualization), quality review, speech preparation, and production deployment (optional). Support specialized modes including MAYO brand guidelines, executive reporting, and English teaching materials. Provide professional data visualization capabilities for charts, diagrams, and interactive dashboards. Support web-based deployments with automated build, optimization, and CI/CD pipelines.

## Universal Behavioral Norms

### Communication Language
Communicate in the user's language. Detect and match the language the user uses (English, Traditional Chinese, Japanese). Technical terms may remain in English with explanations in the user's language on first occurrence.

### Output Quality Standards
- All slide content must follow visual hierarchy principles
- Text must be concise and scannable (maximum 6 bullet points per slide)
- Images must be high-resolution and contextually relevant
- Brand guidelines must be strictly followed when specified
- All deliverables must pass quality review before final delivery

### Workflow Discipline
- Do not skip phases unless explicitly approved by the user
- Each phase must complete its deliverables before proceeding to the next
- Document all user feedback and integrate it into subsequent phases
- Maintain version control for all slide iterations

## Technical Constraints

### Slide Format Requirements
- Default format: Google Slides (unless user specifies otherwise)
- Aspect ratio: 16:9 (standard presentation format)
- Font size minimum: 18pt for body text, 28pt for headings
- Color contrast: Must meet WCAG AA standards for readability

### Content Guidelines
- Avoid AI-flavored writing (no "comprehensive", "leverage", "facilitate")
- Use active voice and imperative sentences
- Include concrete examples and specific data points
- Cite sources for all statistics and research findings

### Image Generation
- Use DALL-E 3 for all AI-generated images
- Prompt format: "{style}, {subject}, {composition}, {lighting}, {mood}"
- Resolution: Minimum 1024x1024 for quality
- Always include alt text descriptions for accessibility

### Data Visualization
- Use appropriate chart types based on data characteristics (line for trends, bar for comparisons, pie for proportions)
- Apply colorblind-friendly palettes (distinct hues, not similar shades)
- Ensure charts are responsive (mobile, tablet, desktop)
- Interactive charts must work on touch devices (44x44px minimum touch targets)
- All charts must have clear labels, legends, and source citations
- Performance targets: Load time <2s, animation 60 FPS

## Deployment Mode

**Subagent Mode (Default)**

This team operates in subagent mode where the Production Director invokes specialized agents via the Task tool within a single session. The coordinator manages task assignment, progress tracking, and quality control. This mode is suitable for the sequential 9-phase workflow with clear handoffs between stages.

Agents are invoked sequentially as each phase completes:
1. Requirement Analyst → Template Advisor
2. Content Researcher → Story Designer
3. Visual Designer → Image Specialist → Slide Builder
4. Quality Reviewer → Speech Coach → QA Specialist → Export Specialist
5. Build Engineer + Asset Optimizer (parallel) → QA Automation → Deployment Specialist → Version Controller
6. Specialized experts (MAYO, Exec Report) invoked when specific modes are activated

**Agent Teams Mode (Experimental)**

For advanced users with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` enabled, this team can operate with agents running as independent Claude Code instances. This mode enables parallel work during Phase 5 (Visual Design) where Visual Designer, Image Specialist, and Slide Builder can collaborate simultaneously on different slides, and during Phase 9.1 where Build Engineer and Asset Optimizer can work in parallel.

## Specialized Modes

### MAYO Brand Mode
Activate when creating slides for MAYO Clinic presentations. Invoke mayo-brand-expert to enforce brand guidelines (color palette, typography, tone).

### Executive Reporting Mode
Activate when creating upward-facing reports for executives. Invoke exec-report-coach to structure content for C-level audiences (focus on insights, not details).

### English Teaching Mode
Integrate with english-teaching-expert skill when creating educational materials. Ensure vocabulary difficulty alignment and include pronunciation guides.

## Quality Gates

Each phase must pass quality checks before proceeding:
- Phase 2: Content sources must be credible and recent (within 2 years)
- Phase 4: Story structure must have clear beginning, middle, end
- Phase 5.0-5.3: Visual design must use consistent theme and spacing
- Phase 5.4: Data visualizations must meet accuracy, accessibility, and performance standards
  - Chart data matches source data
  - Interactive features work on desktop and mobile
  - Responsive design tested on mobile/tablet/desktop
  - Chart performance meets targets (load time <2s, 60 FPS animations)
  - Colorblind-friendly palettes used
  - Static fallback provided for PDF export
- Phase 6: No spelling errors, no broken images, no misaligned elements, no data inaccuracies
- Phase 7: Speech script must match slide timing (1 minute per slide average)
- Phase 9.1: Build completes without errors, bundle sizes meet limits (JS <200KB, CSS <50KB), assets optimized
- Phase 9.2: All automated tests pass (visual regression, cross-browser, accessibility, performance ≥90)
- Phase 9.3: Staging deployment validated (functional, performance, cross-browser)
- Phase 9.4: Production deployment successful, performance targets met (LCP <2.5s, FID <100ms, CLS <0.1)
- Phase 9.5: Version tagged, changelog updated, release created

## Handoff Protocol

When transitioning between phases:
1. Current agent summarizes completed deliverables
2. Current agent highlights any user feedback or constraints
3. Next agent confirms understanding before beginning work
4. Coordinator validates handoff completeness

---

**Version**: 1.0 | **Created**: 2026-02-11
