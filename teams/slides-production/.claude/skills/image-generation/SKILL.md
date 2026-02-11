---
name: Image Generation
description: Generate custom images using DALL-E 3 with precise prompts aligned to slide visual theme and narrative
---

# Image Generation Skill

## Capability

Create custom AI-generated images using DALL-E 3 to support slide narratives. Craft precise prompts specifying style, subject, composition, lighting, and mood. Ensure generated images align with visual design theme and presentation tone.

## When to Use

- Image Specialist needs custom images for slides (not available in stock photos)
- Conceptual or abstract imagery needed (innovation, growth, collaboration)
- Brand-specific imagery required (MAYO settings, specific scenarios)
- Stock photos are too generic or off-brand
- User wants unique, on-brand visuals

## Input Requirements

**Required**:
- Image purpose (what slide is this for?)
- Subject (what should be in the image?)
- Visual design theme (colors, style from Visual Designer)

**Optional**:
- Specific composition (centered, rule of thirds, wide shot)
- Lighting preferences (natural, dramatic, soft)
- Mood (professional, energetic, calm, innovative)
- Brand guidelines (MAYO blue accents, specific settings)

## Prompt Structure

### Format
```
{style}, {subject}, {composition}, {lighting}, {mood}
```

### Components

**Style**:
- Photorealistic
- Flat illustration
- Minimalist
- Abstract
- 3D render
- Corporate professional

**Subject**:
- Specific description of main focus (people, objects, concepts)
- Include details (age, ethnicity, clothing, setting)

**Composition**:
- Perspective (wide shot, close-up, bird's eye)
- Framing (centered, rule of thirds, symmetrical)
- Background (solid color, blurred, detailed)

**Lighting**:
- Natural light, golden hour, soft light
- Studio lighting, dramatic shadows

**Mood**:
- Professional, friendly, serious, energetic
- Calm, inspiring, innovative, confident

## Process

### Step 1: Understand Image Purpose
- What slide is this for?
- What message does it support?
- What visual theme from Visual Designer?

### Step 2: Craft Prompt
- Use prompt structure (style, subject, composition, lighting, mood)
- Include visual design theme colors if applicable
- Be specific (avoid vague descriptions)

### Step 3: Generate Image
- Use DALL-E 3 image generation
- Review generated image for alignment with purpose

### Step 4: Iterate if Needed
- If image doesn't match requirements, refine prompt
- Adjust style, composition, or mood
- Generate again until satisfactory

### Step 5: Deliver Image with Metadata
- Provide image file
- Include alt text description
- Document prompt used (for future reference)
- Note any usage guidelines

## Output Format

```markdown
## Generated Image: [Slide Number] - [Slide Title]

### Image Details
- **File**: `slide-[number]-[description].png`
- **Resolution**: 1024x1024 (or 1920x1080 for full-bleed)
- **Purpose**: [What slide is this for?]
- **Visual Theme Alignment**: [How it matches design specs]

### DALL-E Prompt
```
[Exact prompt used]
```

### Alt Text
[Descriptive alt text for accessibility]

### Usage Notes
- [Placement guidance, overlay recommendations, etc.]

### Iteration Notes (if applicable)
- Iteration 1: [Initial prompt] - [Issue with result]
- Iteration 2: [Refined prompt] - [Successful result]
```

## Example Usage

**Input**:
```
Slide: Slide 2 (Opening Hook)
Purpose: Capture attention, illustrate innovation theme
Visual Theme: Modern, minimalist, MAYO blue accents
Subject: Abstract representation of AI/innovation
Mood: Futuristic, inspiring, professional
```

**Prompt Crafting**:
```
Minimalist illustration, abstract glowing neural network with interconnected nodes, centered composition with MAYO blue (#0033A0) and white color palette, soft gradient lighting, futuristic and innovative mood
```

**Output**:
```markdown
## Generated Image: Slide 2 - Innovation in Healthcare

### Image Details
- **File**: `slide-02-ai-innovation.png`
- **Resolution**: 1920x1080 (full-bleed background)
- **Purpose**: Opening hook to illustrate AI/innovation theme
- **Visual Theme Alignment**: Uses MAYO blue (#0033A0), minimalist style matches design specs

### DALL-E Prompt
```
Minimalist illustration, abstract glowing neural network with interconnected nodes, centered composition with MAYO blue (#0033A0) and white color palette, soft gradient lighting, futuristic and innovative mood
```

### Alt Text
Abstract illustration of glowing blue neural network nodes interconnected on white background, representing artificial intelligence and innovation in healthcare

### Usage Notes
- Use as full-bleed background for Slide 2
- Apply 30% dark overlay for white text readability
- Aligns with MAYO blue brand color
```

## Example Prompts by Use Case

### Business/Corporate
```
Photorealistic, diverse team of five professionals collaborating around whiteboard in modern office with glass walls, wide shot with natural window lighting, confident and focused mood, professional style
```

### Technology/Innovation
```
3D render, abstract data visualization with rising glowing charts and flowing data streams, dark navy background with blue accent lighting, futuristic and innovative mood
```

### Healthcare (MAYO)
```
Photorealistic, compassionate female doctor consulting with senior patient in bright modern medical office, natural soft lighting from windows, reassuring and professional mood, MAYO blue color accents in background
```

### Education/Teaching
```
Flat illustration style, teacher at front of diverse classroom with engaged students, warm color palette with yellow and orange tones, friendly and approachable mood
```

### Abstract Concepts
```
Minimalist illustration, mountain peak emerging from clouds representing challenge and achievement, centered composition with gradient sky (blue to white), inspiring and aspirational mood
```

## Quality Standards

### Image Quality
- Minimum resolution: 1024x1024 for supporting images, 1920x1080 for full-bleed
- Clear, sharp image (not blurry or distorted)
- Matches requested style and mood

### Alignment with Design
- Colors align with visual design palette
- Style matches presentation theme (realistic, minimalist, abstract)
- Mood matches presentation tone (professional, casual, energetic)

### Appropriateness
- Image supports slide narrative (not decorative only)
- Culturally appropriate and inclusive
- Professional and brand-appropriate

## Common Use Cases

1. **Hero Images**: Full-bleed backgrounds for impact slides
2. **Conceptual Imagery**: Abstract representations of ideas (innovation, growth, collaboration)
3. **Brand-Specific Scenes**: Settings matching brand (MAYO medical facilities, corporate offices)
4. **Data Visualization Support**: Illustrative graphics accompanying charts
5. **Metaphorical Images**: Visual metaphors (mountain for challenge, bridge for connection)

## Limitations

- DALL-E cannot generate text reliably (use slide text instead)
- Cannot generate specific brand logos (must use provided logo files)
- Cannot generate exact likenesses of real people
- May require multiple iterations to achieve desired result

## Related Skills

- `stock-photo-search` - Finding professional stock photos as alternatives
- `image-editing` - Cropping, resizing, or adjusting generated images
- `visual-theme-application` - Ensuring images align with overall design

---

**Version**: 1.0 | **Created**: 2026-02-11
