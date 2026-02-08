---
name: slide-image
description: |
  積極使用 Gemini AI 生成圖片。預設使用 Gemini 2.5 Flash Image，快速迭代。
  溝通效果優先：能讓觀眾理解、有視覺衝擊力的圖片就是好圖片。
  不限於向量圖，寫實風格、插畫風格、概念圖都可以。勇敢嘗試！
license: MIT
metadata:
  last_verified: "2026-01-30"
---

# Image Generation Skill

Generate and edit images using Gemini Native Image Generation.

## 🚀 核心原則：勇敢生圖！

> **溝通效果優先** - 能讓觀眾理解、有視覺衝擊力的圖片就是好圖片。
>
> 不要猶豫，直接生成！快速迭代比完美規劃更重要。

### 預設行為
- **預設模型**: `gemini-2.5-flash-image` (快速、便宜、夠用)
- **預設風格**: 不限！寫實、插畫、概念圖、資訊圖表都可以
- **預設態度**: 先生成再說，不滿意再調整

## ⚠️ Critical: SDK Migration Required

**IMPORTANT**: The `@google/generative-ai` package is deprecated as of November 30, 2025. All new projects must use `@google/genai`.

**Migration Required**:
```typescript
// ❌ OLD (deprecated, support ended Nov 30, 2025)
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(API_KEY);

// ✅ NEW (required)
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: API_KEY });
```

**Source**: [GitHub Repository Migration Notice](https://github.com/google-gemini/deprecated-generative-ai-js)

## Models

| Model | ID | Status | Best For |
|-------|-----|--------|----------|
| **Gemini 3 Pro Image** | `gemini-3-pro-image-preview` | Preview (Nov 20, 2025) | 4K, complex prompts, text |
| **Gemini 2.5 Flash Image** | `gemini-2.5-flash-image` | GA (Oct 2, 2025) | Fast iteration, general use |
| **Imagen 4.0** | `imagen-4.0-generate-001` | GA (Aug 14, 2025) | Alternative platform |

**Deprecated Models** (do not use):
- `gemini-2.0-flash-exp-image-generation` - Shut down Nov 11, 2025
- `gemini-2.0-flash-preview-image-generation` - Shut down Nov 11, 2025
- `gemini-2.5-flash-image-preview` - Scheduled shutdown Jan 15, 2026

**Source**: [Google AI Changelog](https://ai.google.dev/gemini-api/docs/changelog)

## Capabilities

| Feature | Supported |
|---------|-----------|
| Generate from text | ✅ |
| Edit existing images | ✅ |
| Change aspect ratio | ✅ |
| Widen/extend images | ✅ |
| Style transfer | ✅ |
| Change colours | ✅ |
| Add/remove elements | ✅ |
| Text in images | ✅ (legible!) |
| Multiple reference images | ✅ (up to 14: max 5 humans, 9 objects) |
| 4K resolution | ✅ (Pro only) |

**Note**: Exceeding 5 human reference images causes unpredictable character consistency. Keep human images ≤ 5 for reliable results.

## Aspect Ratios

```
1:1   | 2:3  | 3:2  | 3:4  | 4:3
4:5   | 5:4  | 9:16 | 16:9 | 21:9
```

## Resolutions (Pro only)

| Size | 1:1 | 16:9 | 4:3 |
|------|-----|------|-----|
| 1K | 1024x1024 | 1376x768 | 1184x880 |
| 2K | 2048x2048 | 2752x1536 | 2368x1760 |
| 4K | 4096x4096 | 5504x3072 | 4736x3520 |

## Quick Start

```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generate new image
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-image",
  contents: "A professional plumber in hi-vis working in modern Australian home",
  config: {
    responseModalities: ["TEXT", "IMAGE"],  // BOTH required - cannot use ["IMAGE"] alone
    imageGenerationConfig: {
      aspectRatio: "16:9",
    },
  },
});

// Extract image
for (const part of response.candidates[0].content.parts) {
  if (part.inlineData) {
    const buffer = Buffer.from(part.inlineData.data, "base64");
    fs.writeFileSync("hero.png", buffer);
  }
}
```

**Important**: `responseModalities` must include both `["TEXT", "IMAGE"]`. Using `["IMAGE"]` alone may fail or produce unexpected results.

## Model Selection

### 🎯 預設：Gemini 2.5 Flash Image

**90% 的場景用 2.5 Flash 就夠了！**

| 場景 | 模型 | 原因 |
|------|------|------|
| **一般圖片生成** | `gemini-2.5-flash-image` ⭐ | 快、便宜、品質夠用 |
| **快速迭代測試** | `gemini-2.5-flash-image` ⭐ | ~$0.008/張 |
| **簡報配圖** | `gemini-2.5-flash-image` ⭐ | 溝通效果優先 |
| **概念示意圖** | `gemini-2.5-flash-image` ⭐ | 重點是傳達概念 |
| 需要 4K 高解析度 | `gemini-3-pro-image-preview` | 印刷品質 |
| 圖片中有大量文字 | `gemini-3-pro-image-preview` | 94% 文字清晰度 |

### 迭代流程

```
1. 先用 2.5 Flash 快速生成 → 看效果
2. 滿意 → 完成！
3. 不滿意 → 調整 prompt 再生成
4. 需要更高品質 → 換 3 Pro 重新生成
```

**Text Rendering Benchmarks** (4K resolution):
- Gemini 3 Pro Image: 94% legible text
- Gemini 2.5 Flash Image: ~70% legible text (夠用於標題)
- DALL-E 3: 78% legible text

## 🎯 宏觀圖片規劃（簡報專用）

> **在規劃大綱階段就設想圖片需求，而非事後補圖！**

### 圖片類型清單

在規劃簡報時，應系統性地考慮以下圖片類型：

| 類型 | 說明 | 範例 |
|------|------|------|
| **背景圖** | 深色科技風/抽象圖案，適合疊加文字 | 神經網路紋理、粒子流動 |
| **封面圖** | 主視覺，傳達簡報核心概念 | AI 賦能人類的概念圖 |
| **架構圖** | 系統/流程的視覺化呈現 | 三位一體架構、SDLC 流程 |
| **概念圖** | 抽象概念的具象化 | 「放大戰力」的槓桿隱喻 |
| **示意圖** | 特定功能或場景的說明 | Team Lead 賦能圖 |
| **對比圖** | Before/After、A vs B 的視覺對比 | 人力 vs AI 力工時 |
| **情境圖** | 每頁投影片的情境視覺（可選） | 根據該頁內容生成 |

### 規劃流程

```
1. 大綱規劃階段
   └─→ 列出每頁投影片
   └─→ 標註需要圖片的頁面
   └─→ 決定圖片類型（背景/封面/架構/概念/示意）

2. 圖片清單整理
   └─→ 彙整所有需要生成的圖片
   └─→ 為每張圖片撰寫 Prompt 描述
   └─→ 確定風格一致性（色調、風格）

3. 批次生成
   └─→ 一次呼叫 API 生成所有圖片
   └─→ 檢視效果、調整 Prompt
   └─→ 重新生成不滿意的圖片

4. 整合到投影片
   └─→ 將圖片嵌入對應頁面
   └─→ 調整透明度、大小、位置
```

### 範例：簡報圖片規劃表

| 頁次 | 頁面標題 | 圖片類型 | Prompt 重點 |
|------|----------|----------|-------------|
| 1 | 封面 | 背景圖 + 封面圖 | 深色科技風、AI 賦能概念 |
| 2 | 核心理念 | 概念圖 | 放大團隊戰力的視覺隱喻 |
| 3 | 核心架構 | 架構圖 | 三系統連結的視覺化 |
| 4 | SDLC 流程 | 流程圖 | PM→架構師→開發→QA |
| 6 | Team Lead 賦能 | 示意圖 | 9 大能力輻射圖 |
| 7 | 估時量化 | 對比圖 | 人力 vs AI 力 |
| 10 | 行動呼籲 | 背景圖 | 與封面呼應 |

### 風格一致性

**同一份簡報的所有圖片應保持：**
- 相同色調（如：深色底 + 藍紫漸層）
- 相同風格（如：現代科技風）
- 相同元素語言（如：發光節點、流動粒子）

**Prompt 模板（統一風格）：**
```
Style: Modern tech aesthetic, dark background (#0a0a0a to #1e293b),
accent colors in blue (#60a5fa) and purple (#a78bfa).
Clean, professional, suitable for executive presentation.
Aspect ratio: 16:9
```

---

## When to Use

### ✅ 積極使用！（預設行為）

**直接生成，不用問：**
- 簡報需要視覺化概念 → 直接生成
- 需要 Hero Banner / 封面圖 → 直接生成
- 想要資訊圖表 / 流程圖 → 直接生成
- 需要情境示意圖 → 直接生成
- 任何「用圖片說明更清楚」的場景 → 直接生成

**風格不限：**
- 寫實照片風格 ✅
- 扁平插畫風格 ✅
- 3D 渲染風格 ✅
- 手繪草圖風格 ✅
- 資訊圖表風格 ✅
- 概念藝術風格 ✅

### ⚠️ 謹慎使用的場景

- 需要真實人物照片（可能有肖像權問題）
- 特定產品照片（應使用真實產品）
- 法律/合規文件中的圖片

## Known Issues Prevention

This skill prevents **5** documented issues:

### Issue #1: Resolution Parameter Case Sensitivity
**Error**: Request fails with invalid parameter error
**Source**: [Google AI Image Generation Docs](https://ai.google.dev/gemini-api/docs/image-generation)
**Why It Happens**: Resolution values are case-sensitive and must use uppercase 'K'.
**Prevention**: Always use `"4K"`, `"2K"`, `"1K"` - never lowercase `"4k"`.

```typescript
// ❌ WRONG - causes request failure
config: { imageGenerationConfig: { resolution: "4k" } }

// ✅ CORRECT - uppercase required
config: { imageGenerationConfig: { resolution: "4K" } }
```

### Issue #2: Aspect Ratio May Be Ignored (Sept 2025+)
**Error**: Returns 1:1 square image despite requesting 16:9 or other ratios
**Source**: [Google Support Thread](https://support.google.com/gemini/thread/371311134/)
**Why It Happens**: Backend update in September 2025 affected Gemini 2.5 Flash Image model's aspect ratio handling.
**Prevention**: Use Gemini 3 Pro Image Preview for reliable aspect ratio control, or generate 1:1 and use multi-turn editing to extend.

```typescript
// May ignore aspectRatio on Gemini 2.5 Flash Image
model: "gemini-2.5-flash-image",
config: { imageGenerationConfig: { aspectRatio: "16:9" } }

// More reliable for aspect ratio control
model: "gemini-3-pro-image-preview",
config: { imageGenerationConfig: { aspectRatio: "16:9" } }
```

**Status**: Google confirmed working on fix (Sept 2025).

### Issue #3: Exceeding 5 Human Reference Images
**Error**: Unpredictable character consistency in generated images
**Source**: [Google AI Image Generation Docs](https://ai.google.dev/gemini-api/docs/image-generation)
**Why It Happens**: Gemini 3 Pro Image supports up to 14 reference images total, but only 5 can be human images for character consistency.
**Prevention**: Limit human images to 5 or fewer. Use remaining slots (up to 14 total) for objects/scenes.

```typescript
// ❌ WRONG - 7 human images exceeds limit
const humanImages = [img1, img2, img3, img4, img5, img6, img7];
const prompt = [
  { text: "Generate consistent characters" },
  ...humanImages.map(img => ({ inlineData: { data: img, mimeType: "image/png" }})),
];

// ✅ CORRECT - max 5 human images
const humanImages = images.slice(0, 5);  // Limit to 5
const objectImages = images.slice(5, 14);  // Up to 9 more for objects
const prompt = [
  { text: "Generate consistent characters" },
  ...humanImages.map(img => ({ inlineData: { data: img, mimeType: "image/png" }})),
  ...objectImages.map(img => ({ inlineData: { data: img, mimeType: "image/png" }})),
];
```

### Issue #4: SynthID Watermark Cannot Be Disabled
**Error**: N/A (documented limitation)
**Source**: [Google AI Image Generation Docs](https://ai.google.dev/gemini-api/docs/image-generation)
**Why It Happens**: All generated images automatically include a SynthID watermark for content authenticity tracking.
**Prevention**: Be aware of this limitation for commercial use cases. Watermark cannot be disabled by developers.

### Issue #5: Google Search Grounding Excludes Image Results
**Error**: Generated images don't reflect visual search results, only text
**Source**: [Google AI Image Generation Docs](https://ai.google.dev/gemini-api/docs/image-generation)
**Why It Happens**: When using Google Search tool with image generation, "image-based search results are not passed to the generation model."
**Prevention**: Only text-based search results inform the visual output. Don't expect the model to reference images from search results.

```typescript
// Google Search tool enabled
const response = await ai.models.generateContent({
  model: "gemini-3-pro-image-preview",
  contents: "Generate image of latest iPhone design",
  tools: [{ googleSearch: {} }],
  config: { responseModalities: ["TEXT", "IMAGE"] },
});
// Result: Only text search results used, not image results from web search
```

## Pricing

**Current Pricing** (as of November 2025):
- **Gemini 2.5 Flash Image**: ~$0.008 per image
  - Input: 258 tokens per image
  - Output: 1290 tokens per image
  - Rate: $30.00 per 1M output tokens

**Note**: The `generateImages` API (Imagen models) does not return `usageMetadata` in responses. Track costs manually based on pricing above.

**Source**: [Google Developers Blog - Gemini 2.5 Flash Image](https://developers.googleblog.com/introducing-gemini-2-5-flash-image/)

## Post-Processing: Watermark Removal

**IMPORTANT**: All AI-generated images should go through watermark removal before final use.

### Tool Location
```
~/ai-tools/GeminiWatermarkTool
```

### Usage

**Single Image**:
```bash
# In-place edit (overwrites original)
~/ai-tools/GeminiWatermarkTool image.png

# Preserve original
~/ai-tools/GeminiWatermarkTool -i input.png -o output.png
```

**Batch Processing**:
```bash
# Process entire directory
~/ai-tools/GeminiWatermarkTool -i ./generated/ -o ./cleaned/
```

### Workflow Integration

```
[Generate Image] → [Save to temp] → [Remove Watermark] → [Final Output]
```

**Example Script**:
```bash
#!/bin/bash
# generate-and-clean.sh

INPUT_DIR="./generated"
OUTPUT_DIR="./final"

mkdir -p "$OUTPUT_DIR"

# Remove watermarks from all generated images
~/ai-tools/GeminiWatermarkTool -i "$INPUT_DIR" -o "$OUTPUT_DIR"

echo "Processed $(ls $OUTPUT_DIR | wc -l) images"
```

### What It Removes

| Watermark Type | Removable |
|----------------|-----------|
| Visible Gemini logo (48×48) | ✅ Yes |
| Visible Gemini logo (96×96) | ✅ Yes |
| SynthID (invisible) | ❌ No |

**Note**: SynthID is embedded in the image generation process itself and cannot be removed without destroying image quality. This is by design for content authenticity.

### Source
- **Repository**: https://github.com/allenk/GeminiWatermarkTool
- **Method**: Reverse alpha blending (mathematically accurate, not AI inpainting)

---

## 快速生成：使用 Gemini-GenImage Skill

**優先使用獨立的 Gemini-GenImage skill 進行圖片生成：**

```bash
# 單張生成
GEMINI_API_KEY="your-key" ~/.claude/skills/Gemini-GenImage/scripts/gemini-image-gen.sh \
  "Your prompt here" output.png

# 批次生成
~/.claude/skills/Gemini-GenImage/scripts/batch-generate.sh config.json output_dir/
```

**Config.json 範例：**
```json
{
  "images": [
    {"filename": "hero-bg.png", "prompt": "Dark tech background..."},
    {"filename": "arch.png", "prompt": "Architecture diagram..."}
  ]
}
```

> **注意**：本 skill (slide-image) 提供進階 Prompt 指引與編輯技巧；
> 實際生成請使用 `/Gemini-GenImage` skill 的腳本。

---

## Reference Files

- `references/prompting.md` - Effective prompt patterns
- `references/website-images.md` - Hero, service, background templates
- `references/editing.md` - Multi-turn editing patterns
- `references/local-imagery.md` - Australian-specific details
- `references/integration.md` - API code examples

---

**Last verified**: 2026-01-30 | **Skill version**: 3.1.0 | **Changes**: 整合 Gemini-GenImage skill，提供快速生成腳本入口。
