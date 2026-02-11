# SlidesWorld Production Team

## Overview

A professional slide production team following a 9-phase workflow from requirements clarification to final production deployment. Built on A-Team architecture standards with flat coordination structure.

**Team Name**: slides-production
**Deployment Mode**: Subagent (sequential workflow with Production Director coordination)
**Total Agents**: 21 (1 coordinator + 20 specialists)
**Workflow Phases**: 9 phases with quality gates (Phase 5.4: data visualization, Phase 9: production pipeline)
**Specialized Modes**: MAYO Brand, Executive Reporting, English Teaching
**Data Visualization**: Interactive charts (Chart.js, D3.js, ECharts, ApexCharts), Mermaid diagrams, responsive design
**Production Pipeline**: Automated build, asset optimization, CI/CD, deployment, version control

---

## Team Structure

### Coordinator
- **Production Director** (`production-director.md`) - Orchestrates 9-phase workflow, manages task delegation, enforces quality gates

### Planning Agents (Phase 1-2)
- **Requirement Analyst** (`planning/requirement-analyst.md`) - Clarifies requirements, detects specialized modes
- **Template Advisor** (`planning/template-advisor.md`) - Selects templates, establishes visual direction
- **Content Researcher** (`planning/content-researcher.md`) - Gathers credible sources and data

### Design Agents (Phase 3-5)
- **Story Designer** (`design/story-designer.md`) - Structures narrative arc and slide-by-slide outline
- **Visual Designer** (`design/visual-designer.md`) - Designs color palette, typography, layouts
- **Image Specialist** (`design/image-specialist.md`) - Generates AI images and sources stock photos
- **Web Chart Designer** (`design/web-chart-designer.md`) - Creates interactive charts and diagrams using JavaScript libraries
- **Data Transformer** (`design/data-transformer.md`) - Transforms raw data (Excel, CSV, JSON) into visualization-ready formats
- **Responsive Specialist** (`design/responsive-specialist.md`) - Ensures charts render correctly on mobile, tablet, desktop

### Production Agents (Phase 5-6, 9)
- **Slide Builder** (`production/slide-builder.md`) - Builds slides in Google Slides format
- **Quality Reviewer** (`production/quality-reviewer.md`) - Conducts comprehensive quality review and production validation
- **Build Engineer** (`production/build-engineer.md`) - Configures build pipeline, bundles assets, optimizes performance
- **Asset Optimizer** (`production/asset-optimizer.md`) - Optimizes images, SVGs, and fonts for minimal file size
- **Deployment Specialist** (`production/deployment-specialist.md`) - Deploys to hosting platforms, configures CDN and caching
- **Version Controller** (`production/version-controller.md`) - Manages git versioning, changelog generation, release tagging

### Delivery Agents (Phase 7-8)
- **Speech Coach** (`delivery/speech-coach.md`) - Writes presentation script with timing
- **QA Specialist** (`delivery/qa-specialist.md`) - Prepares anticipated questions and answers
- **Export Specialist** (`delivery/export-specialist.md`) - Exports slides and packages deliverables

### Specialized Agents (Mode-Specific)
- **MAYO Brand Expert** (`specialized/mayo-brand-expert.md`) - Enforces MAYO Clinic brand guidelines
- **Exec Report Coach** (`specialized/exec-report-coach.md`) - Structures for C-level executives

---

## 9-Phase Workflow

### Phase 1: Requirement Clarification
**Agent**: Requirement Analyst
**Deliverable**: Requirements document (purpose, audience, length, tone, constraints)
**Quality Gate**: User approves requirements summary

### Phase 1.5: Template Selection
**Agent**: Template Advisor
**Deliverable**: Template selection with visual theme direction
**Quality Gate**: User approves template

### Phase 2: Content Research
**Agent**: Content Researcher
**Deliverable**: Content research library with sources, statistics, findings
**Quality Gate**: Sufficient credible content gathered

### Phase 3: Outline Structuring
**Agent**: Story Designer
**Deliverable**: High-level slide outline with main sections
**Quality Gate**: User approves outline structure

### Phase 4: Story Design
**Agent**: Story Designer
**Deliverable**: Detailed slide-by-slide outline with narrative flow
**Quality Gate**: User approves slide-by-slide outline

### Phase 5: Visual Design and Production
**Sub-phases**:
- 5.0: Visual theme (Visual Designer)
- 5.1: Visual design specs (Visual Designer)
- 5.2: Image generation (Image Specialist)
- 5.3: Slide building (Slide Builder)
- 5.4: Data visualization (if data present)
  - 5.4.1: Data transformation (Data Transformer)
  - 5.4.2: Chart design and implementation (Web Chart Designer)
  - 5.4.3: Responsive compatibility validation (Responsive Specialist)

**Deliverable**: Complete slide deck in Google Slides (with interactive charts if applicable)
**Quality Gate**: All slides built, theme applied, images inserted, charts validated

### Phase 6: Quality Review
**Agent**: Quality Reviewer
**Deliverable**: Quality review report with issues and approval status
**Quality Gate**: No critical issues, user approves deck

### Phase 7: Speech Preparation
**Agents**: Speech Coach, QA Specialist
**Deliverable**: Speech script with timing, Q&A preparation guide
**Quality Gate**: Script finalized, Q&A guide complete

### Phase 8: Export and Delivery
**Agent**: Export Specialist
**Deliverable**: Final package (PDF, PPTX, Google Slides link, speech script, Q&A guide)
**Quality Gate**: User approves delivery package

### Phase 9: Production & Deployment (Optional)
**When to Activate**: User requests web-based presentation deployment with interactive charts or custom domain hosting

#### Phase 9.1: Build & Optimization
**Agents**: Build Engineer, Asset Optimizer (parallel)
**Deliverable**: Production bundles (JS <200KB, CSS <50KB), optimized assets
**Quality Gate**: Build completes without errors, bundle sizes within limits

#### Phase 9.2: Quality Assurance
**Skill**: QA Automation
**Deliverable**: Test reports (visual regression, cross-browser, accessibility, performance ≥90)
**Quality Gate**: All automated tests pass

#### Phase 9.3: Staging Deployment
**Agent**: Deployment Specialist
**Deliverable**: Staging deployment (https://staging-slides.example.com)
**Quality Gate**: Staging validated (functional, performance, cross-browser)

#### Phase 9.4: Production Deployment
**Agent**: Deployment Specialist
**Deliverable**: Production deployment (https://slides.example.com)
**Quality Gate**: Production successful, performance targets met (LCP <2.5s, FID <100ms, CLS <0.1)

#### Phase 9.5: Version Tagging
**Agent**: Version Controller
**Deliverable**: Git tag (e.g., v1.0.0), CHANGELOG.md, GitHub release
**Quality Gate**: Version tagged, changelog updated, release created

---

## Specialized Modes

### MAYO Brand Mode
**Trigger**: User mentions "MAYO" or "Mayo Clinic"
**Activated Agent**: MAYO Brand Expert
**Constraints**:
- MAYO color palette (Blue #0033A0, Gray #53565A)
- Helvetica Neue or Arial typography
- MAYO logo on all slides
- Patient-first messaging

### Executive Reporting Mode
**Trigger**: User mentions "executive", "C-level", "board"
**Activated Agent**: Exec Report Coach
**Structure**:
- Executive summary upfront (Slide 2)
- Insights before details
- Clear recommendations and decisions
- Business impact focus

### English Teaching Mode
**Trigger**: User mentions "English teaching", "ESL"
**Integration**: english-teaching-expert skill
**Features**:
- Vocabulary difficulty leveling
- Pronunciation guides
- Example sentences
- Cultural context

---

## Rules

### Phase Gate Protocol (`rules/phase-gate-protocol.md`)
- Mandatory quality gates between phases (Phases 1-9)
- User approval required at key transitions
- Prevents downstream rework

### Visual Quality Standards (`rules/visual-quality-standards.md`)
- Font size minimums (18pt body, 28pt titles)
- Color contrast standards (WCAG AA 4.5:1)
- Text density limits (6 bullets max, 10 words each)
- Image quality requirements (1920x1080 full-bleed)

### Data Visualization Standards (`rules/data-visualization-standards.md`)
- Chart type selection rules (line for trends, bar for comparisons, pie for proportions)
- Colorblind-friendly palettes (distinct hues, pattern redundancy)
- Interactivity standards (tooltips, zoom, animations)
- Performance requirements (load time <2s, 60 FPS animations)
- Data accuracy and source citation requirements

### Responsive Chart Requirements (`rules/responsive-chart-requirements.md`)
- Breakpoint standards (mobile 320-767px, tablet 768-1023px, desktop 1024px+)
- Touch interaction requirements (44x44px minimum touch targets)
- Font size scaling (min 12px on mobile, 16px on desktop)
- Performance on mobile (load time <2s, maintain 60 FPS)

### Build Standards (`rules/build-standards.md`)
- Bundle size limits (JS <200KB, CSS <50KB, Total <500KB gzipped)
- Build time limits (development <10s, production <2min)
- Browser compatibility (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Asset optimization requirements

### Deployment Protocol (`rules/deployment-protocol.md`)
- Deployment checklist (pre-deployment, staging validation, production approval)
- Rollback procedures (Vercel, Netlify, GitHub Pages, AWS S3)
- Staging validation requirements (functional, performance, cross-browser)
- Production readiness criteria

---

## Skills

### Content & Design Skills
- **Web Research** (`skills/web-research/SKILL.md`) - Search and extract credible information from web sources with proper citations
- **Image Generation** (`skills/image-generation/SKILL.md`) - Generate custom images using DALL-E 3 with precise prompts
- **Slide Formatting** (`skills/slide-formatting/SKILL.md`) - Apply consistent visual formatting (fonts, colors, spacing, alignment)

### Data Visualization Skills
- **Chart Library Integration** (`skills/chart-library-integration/SKILL.md`) - Select and integrate JavaScript chart libraries (Chart.js, D3.js, ECharts, ApexCharts) with configuration templates
- **Data Transformation** (`skills/data-transformation/SKILL.md`) - Transform raw data from Excel, CSV, JSON, or APIs into visualization-ready formats with cleaning and aggregation
- **Mermaid Diagram Generation** (`skills/mermaid-diagram/SKILL.md`) - Create technical diagrams using Mermaid syntax (flowcharts, sequence diagrams, class diagrams, ER diagrams, Gantt charts)
- **Browser Compatibility Check** (`skills/browser-compatibility/SKILL.md`) - Verify web chart compatibility across browsers and recommend polyfills using Can I Use database

### Production Pipeline Skills
- **CI/CD Pipeline** (`skills/ci-cd-pipeline/SKILL.md`) - Automate testing, building, and deployment with GitHub Actions workflows (staging, production, preview deployments)
- **Performance Monitoring** (`skills/performance-monitoring/SKILL.md`) - Track Core Web Vitals (LCP, FID, CLS), bundle size, and performance metrics with Lighthouse CI
- **QA Automation** (`skills/qa-automation/SKILL.md`) - Automate visual regression (Percy, Chromatic), cross-browser (Playwright, BrowserStack), and accessibility testing (axe-core, Pa11y)

---

## Agent Invocation Flow

```
User Request
    ↓
Production Director
    ↓
Phase 1: Requirement Analyst → [MAYO Expert / Exec Coach if detected]
    ↓
Phase 1.5: Template Advisor
    ↓
Phase 2: Content Researcher
    ↓
Phase 3-4: Story Designer
    ↓
Phase 5.0-5.3: Visual Designer → Image Specialist → Slide Builder
    ↓
Phase 5.4 (if data visualization needed): Data Transformer → Web Chart Designer → Responsive Specialist
    ↓
Phase 6: Quality Reviewer
    ↓
Phase 7: Speech Coach + QA Specialist (parallel)
    ↓
Phase 8: Export Specialist
    ↓
    ├─→ [Skip Phase 9] → Final Delivery to User (if no web deployment)
    │
    └─→ [Phase 9 Activated] (if web-based presentation requested)
        ↓
    Phase 9.1: Build Engineer + Asset Optimizer (parallel)
        ↓
    Phase 9.2: QA Automation (visual regression, cross-browser, accessibility)
        ↓
    Phase 9.3: Deployment Specialist (staging deployment)
        ↓
    Phase 9.4: Deployment Specialist + Quality Reviewer (production deployment)
        ↓
    Phase 9.5: Version Controller (git tag, changelog, release)
        ↓
    Final Delivery to User (web-based presentation deployed)
```

---

## Quality Gates Summary

| Phase Transition | Gate Criteria | User Approval |
|------------------|---------------|---------------|
| 1 → 1.5 | Requirements documented | ✅ Yes |
| 1.5 → 2 | Template selected | ✅ Yes |
| 2 → 3 | Content gathered | Optional |
| 3 → 4 | Outline structured | ✅ Yes |
| 4 → 5 | Story finalized | ✅ Yes |
| 5.3 → 5.4 | Slides built, data viz needs identified | Optional |
| 5.4 → 6 | Charts validated (accuracy, responsiveness, performance) | Optional |
| 6 → 7 | No critical issues | If issues fixed |
| 7 → 8 | Speech ready | Optional |
| 8 → 9 or Delivery | Package complete | ✅ Yes |
| 9.1 → 9.2 | Build completes, bundle sizes within limits | No |
| 9.2 → 9.3 | All automated tests pass | No |
| 9.3 → 9.4 | Staging validated | ✅ Yes |
| 9.4 → 9.5 | Production successful, performance targets met | No |
| 9.5 → Delivery | Version tagged, changelog updated | No |

---

## Deliverables

### Phase Deliverables
- **Phase 1**: Requirements document
- **Phase 1.5**: Template selection document
- **Phase 2**: Content research library
- **Phase 3**: High-level outline
- **Phase 4**: Slide-by-slide outline
- **Phase 5**: Complete slide deck (Google Slides)
- **Phase 6**: Quality review report
- **Phase 7**: Speech script + Q&A guide
- **Phase 8**: Final package (PDF, PPTX, Google Slides link)
- **Phase 9.1**: Production bundles (dist/ directory, optimized assets)
- **Phase 9.2**: Test reports (visual regression, cross-browser, accessibility, performance)
- **Phase 9.3**: Staging deployment URL + validation report
- **Phase 9.4**: Production deployment URL + performance validation
- **Phase 9.5**: Git tag, CHANGELOG.md, GitHub release

### Final Package Contents
```
[Project-Name]_Slide-Deck_[Date]/
├── README.md
├── 01_Slide-Deck/
│   ├── [Project]_Slides.pdf
│   ├── [Project]_Slides.pptx
│   └── Google-Slides-Link.txt
├── 02_Speech-Script/
│   └── [Project]_Speech-Script.pdf
├── 03_QA-Guide/
│   └── [Project]_QA-Guide.pdf
├── 04_Supporting-Materials/
│   └── Image-Library/
└── 05_Source-Files/ (optional)
```

---

## Usage Instructions

### For Users
1. Provide requirements to Production Director
2. Approve deliverables at quality gates
3. Provide feedback for revisions
4. Approve final delivery package

### For Developers
1. Deploy to `/Users/paul_huang/AgentProjects/SlidesWorld/teams/slides-production/`
2. Invoke Production Director for new projects
3. Specialized modes activate automatically based on keywords
4. Quality gates enforce user approvals

---

## Architecture Compliance

This team structure follows A-Team standards:

✅ **Coordinator Mandate**: Production Director is sole coordinator, does not execute
✅ **Flat Architecture**: No sub-coordinators, all agents report to Production Director
✅ **Output Structure**: Follows `teams/{team-name}/.claude/` directory convention
✅ **YAML Frontmatter**: All .md files have required frontmatter
✅ **Writing Quality**: Imperative tone, no vague words, length limits respected
✅ **Naming Conventions**: All kebab-case, no spaces or underscores
✅ **CLAUDE.md**: Team-wide instructions at root level
✅ **Deployment Mode**: Subagent mode specified in CLAUDE.md

---

## Version

**Version**: 3.0
**Last Updated**: 2026-02-11
**Architecture**: A-Team Standard
**Total Files**: 36 (.md files)
**Upgrades**:
- v2.0: Added data visualization capabilities (Phase 5.4 with 3 new agents, 4 new skills, 2 new rules)
- v3.0: Added production pipeline (Phase 9 with 4 new agents, 3 new skills, 2 new rules)

---

## Contact

For issues or enhancements, contact the team architect or refer to A-Team documentation.
