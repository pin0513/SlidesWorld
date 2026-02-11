---
name: Phase Gate Protocol
description: Mandatory quality gates between production phases to prevent downstream rework
---

# Phase Gate Protocol

## Rule Purpose

Prevent downstream rework by enforcing quality gates at each phase transition. Production Director must validate phase completion before proceeding to next phase.

## Phase Transition Gates

### Phase 1 → Phase 1.5 (Requirements → Template)
**Gate Criteria**:
- User requirements documented (purpose, audience, length, tone)
- Specialized modes identified (MAYO, Exec, Teaching)
- Requirement Analyst confirms completeness
- **User approval required**: Yes (requirements summary)

**Violation**: Proceeding without documented requirements or user approval

---

### Phase 1.5 → Phase 2 (Template → Research)
**Gate Criteria**:
- Template selected and approved
- Visual theme direction established
- Template Advisor confirms suitability
- **User approval required**: Yes (template selection)

**Violation**: Proceeding without approved template

---

### Phase 2 → Phase 3 (Research → Outline)
**Gate Criteria**:
- Content sources gathered and vetted (credible, recent)
- Key data points extracted with sources
- Content Researcher confirms sufficient material
- **User approval required**: Optional (unless significant gaps or conflicts)

**Violation**: Proceeding with incomplete or uncredible research

---

### Phase 3 → Phase 4 (Outline → Story)
**Gate Criteria**:
- Slide outline structured with clear sections
- Main narrative flow defined
- **User approval required**: Yes (outline structure)

**Violation**: Proceeding without approved outline

---

### Phase 4 → Phase 5 (Story → Visual)
**Gate Criteria**:
- Story arc finalized (beginning, middle, end)
- Key messages identified for each slide
- Story Designer confirms narrative coherence
- **User approval required**: Yes (slide-by-slide outline)

**Violation**: Proceeding without finalized story structure

---

### Phase 5 → Phase 6 (Visual → Review)
**Gate Criteria**:
- All slides built in target format
- Visual theme applied consistently
- Images generated or sourced for all required slides
- Slide Builder confirms production completion
- **User approval required**: Optional (Production Director can proceed to review)

**Violation**: Proceeding with incomplete slide deck

---

### Phase 6 → Phase 7 (Review → Speech Prep)
**Gate Criteria**:
- Quality review completed with no critical issues
- All user feedback incorporated
- Quality Reviewer approves for delivery
- **User approval required**: Yes (if critical issues found and fixed)

**Violation**: Proceeding with unresolved critical issues

---

### Phase 7 → Phase 8 (Speech Prep → Export)
**Gate Criteria**:
- Speech script finalized and timed
- Q&A preparation document created
- Speech Coach confirms readiness
- **User approval required**: Optional (unless script requires significant content changes)

**Violation**: Proceeding without completed speech materials

---

### Phase 8 → Delivery
**Gate Criteria**:
- Slides exported in requested formats
- All supporting documents packaged
- Export Specialist confirms delivery completeness
- **User approval required**: Yes (final delivery package)

**Violation**: Delivering incomplete or untested package

## Enforcement

### Production Director Responsibilities
- Validate gate criteria before allowing phase transition
- Request user approval when required
- Document gate passage in progress updates
- Escalate blockers preventing gate passage

### Agent Responsibilities
- Do not begin work until previous phase gate is passed
- Confirm gate criteria with Production Director before starting
- Flag missing gate criteria immediately

### User Responsibilities
- Provide approval when requested (do not delay unnecessarily)
- Review gate deliverables promptly
- Communicate feedback clearly for rework

## Violation Examples

### Example 1: Skipping User Approval
**Scenario**: Production Director proceeds from Phase 4 (Story) to Phase 5 (Visual) without user approving slide-by-slide outline.

**Issue**: User may reject story structure after visual design is complete, requiring rework.

**Consequence**: Wasted effort in Phase 5, potential schedule delays.

**Correction**: Pause Phase 5, get user approval on outline, then resume.

---

### Example 2: Incomplete Research
**Scenario**: Content Researcher proceeds to Phase 3 with only 2 sources (insufficient for 15-slide deck).

**Issue**: Story Designer will lack sufficient content to populate outline.

**Consequence**: Outline will be vague or require additional research mid-process.

**Correction**: Content Researcher gathers more sources before gate passage.

---

### Example 3: Unresolved Critical Issues
**Scenario**: Quality Reviewer finds 3 critical issues (broken images, incorrect data, brand violation), but Production Director proceeds to Phase 7.

**Issue**: Speech script will reference flawed slides, requiring rework.

**Consequence**: Speech Coach may write script based on incorrect content.

**Correction**: Pause Phase 7, fix critical issues, re-review, then proceed.

## Exceptions

### User Explicitly Approves Skip
If user explicitly approves skipping a gate (e.g., "Proceed without my approval on template selection"), Production Director may skip that gate.

**Documentation Required**: Note user's explicit approval in progress log.

### Minor Issues (Non-Blocking)
If Quality Reviewer identifies only minor issues (no critical issues), Production Director may proceed to Phase 7 while minor issues are fixed in parallel.

**Criteria**: Minor issues must not affect content accuracy, brand compliance, or slide functionality.

## Benefits of Phase Gates

1. **Prevent Rework**: Catch issues early before downstream work begins
2. **User Alignment**: Ensure user is involved at critical decision points
3. **Quality Assurance**: Validate deliverables meet standards before proceeding
4. **Risk Mitigation**: Identify blockers or gaps before they cascade
5. **Efficiency**: Avoid wasted effort on work that will be rejected

## Related Rules

- See `workflow-discipline.md` for overall workflow standards
- See `user-feedback-protocol.md` for feedback handling

---

**Version**: 1.0 | **Created**: 2026-02-11
