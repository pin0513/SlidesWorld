---
name: Web Research
description: Search and extract credible information from web sources to support slide content with proper citations
---

# Web Research Skill

## Capability

Search the web for credible, recent information to support presentation content. Extract key data points, statistics, and sources with proper citations. Prioritize authoritative sources and verify information accuracy.

## When to Use

- Content Researcher needs to gather data for presentation topics
- Story Designer requires supporting evidence for narrative points
- QA Specialist needs additional information to answer anticipated questions
- User requests updated or specific information not in existing materials

## Input Requirements

**Required**:
- Search topic or question
- Presentation context (what is the presentation about?)

**Optional**:
- Date range (e.g., "within past 2 years")
- Source preferences (academic, industry reports, news)
- Specific metrics or data types needed

## Process

### Step 1: Define Search Scope
- Clarify what information is needed
- Identify keywords and search terms
- Determine credibility requirements (academic, industry, news)

### Step 2: Conduct Web Search
- Use WebSearch tool with relevant queries
- Prioritize recent sources (within 2 years unless historical context)
- Search multiple angles if initial results insufficient

### Step 3: Evaluate Source Credibility
- Check source authority (academic, government, reputable publication)
- Verify publication date (recent and relevant)
- Cross-reference data across multiple sources when possible

### Step 4: Extract Key Information
- Extract specific statistics, data points, or insights
- Record exact numbers with units and context
- Note source name, publication date, and URL

### Step 5: Format Citations
- Provide source name and publication date
- Include URL for reference
- Note any limitations or caveats in data

## Output Format

```markdown
## Research Findings: [Topic]

### Key Statistic 1
- **Data**: [Number + context]
- **Source**: [Source name]
- **Date**: [Publication date]
- **URL**: [Link]
- **Context**: [Why this matters]

### Key Statistic 2
[Repeat format]

### Key Findings
- [Finding 1]
- [Finding 2]
- [Finding 3]

### Source Credibility Notes
- [Any notes about source reliability or data limitations]
```

## Example Usage

**Input**:
```
Topic: AI adoption in enterprises
Context: Presentation about enterprise AI trends
Date Range: 2024-2025
Metrics Needed: Adoption rates, ROI data, use cases
```

**Process**:
1. Search "enterprise AI adoption 2025"
2. Search "AI ROI enterprise statistics 2025"
3. Search "AI use cases enterprise 2025"
4. Evaluate sources (Gartner, McKinsey, Forrester prioritized)
5. Extract key statistics with citations

**Output**:
```markdown
## Research Findings: AI Adoption in Enterprises

### Adoption Rate
- **Data**: 68% of enterprises have adopted AI tools (up from 45% in 2024)
- **Source**: Gartner Enterprise AI Survey 2025
- **Date**: January 2025
- **URL**: https://example.com/gartner-ai-survey-2025
- **Context**: Shows rapid growth in enterprise AI adoption year-over-year

### ROI Data
- **Data**: 72% of companies report positive ROI from AI investments
- **Source**: McKinsey AI Report 2025
- **Date**: February 2025
- **URL**: https://example.com/mckinsey-ai-2025
- **Context**: Demonstrates business value of AI beyond experimentation

### Top Use Cases
- Customer service automation (58% of adopters)
- Predictive analytics (52% of adopters)
- Process automation (48% of adopters)
- **Source**: Forrester AI Adoption Study 2025
- **Date**: March 2025
- **URL**: https://example.com/forrester-ai-2025

### Source Credibility Notes
- All sources are reputable industry analysts (Tier 1)
- Data based on surveys of 1,000+ enterprise respondents
- Published within past 3 months (current and relevant)
```

## Quality Standards

### Source Credibility
- Prefer academic, government, or industry analyst sources
- Avoid blogs or unverified sources (unless expert opinion)
- Cross-reference data when possible

### Data Accuracy
- Record exact numbers (not rounded estimates)
- Include units and context (e.g., "42% increase YoY", not "42% increase")
- Note methodology if relevant (survey size, date range)

### Citation Completeness
- Include source name, date, and URL for every data point
- Provide enough context for others to verify

## Common Use Cases

1. **Statistical Evidence**: Finding data to support presentation claims
2. **Industry Trends**: Researching market trends or competitive landscape
3. **Case Studies**: Finding real-world examples or success stories
4. **Expert Quotes**: Sourcing authoritative opinions or insights
5. **Fact-Checking**: Verifying information or claims

## Limitations

- Search results may be limited to publicly available information
- Some sources may require subscriptions or paywalls
- Data may be incomplete or outdated for very recent topics
- Cannot access proprietary or confidential information

## Related Skills

- `content-analysis` - Analyzing and summarizing lengthy sources
- `fact-verification` - Cross-checking data accuracy
- `citation-formatting` - Formatting references in specific styles

---

**Version**: 1.0 | **Created**: 2026-02-11
