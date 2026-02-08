# 投影片製作技術

## 概述

投影片的最終產出有多種技術路線可選。本文件涵蓋三種實作方案的選擇、Nano Banana Pro 工作流程、格式一致性協定、行動裝置相容性、視覺優先設計原則，以及 Web-based 投影片的技術需求。

---

## 三種實作方案

### 方案一：Nano Banana Pro PDF（推薦）

流程：Plan → Generate → Combine。輸出 PDF 檔案。

✅ 視覺品質最高、格式控制精確、跨平台顯示一致
❌ 無法嵌入動畫、產出後修改成本較高
💡 適用：正式提案、客戶簡報、技術分享

### 方案二：PowerPoint via PPTX

流程：Generate PPTX → 可後續編輯。輸出 .pptx 檔案。

✅ 使用者可自行修改、支援動畫轉場、企業環境最普遍
❌ 跨平台可能排版偏移、視覺精緻度受限於 PPT 引擎
💡 適用：需要後續編輯的草稿、企業內部使用

### 方案三：LaTeX Beamer

流程：Generate .tex → Compile → PDF。

✅ 數學公式排版完美、學術圈標準格式、版本控制友好
❌ 視覺設計彈性較低、需要 LaTeX 環境
💡 適用：學術研討會、論文報告、含大量數學公式的簡報

### 方案選擇決策樹

```
需要後續編輯？
  ├─ 是 → PowerPoint via PPTX
  └─ 否 → 有大量數學公式？
              ├─ 是 → LaTeX Beamer
              └─ 否 → Nano Banana Pro PDF ✅（推薦）
```

---

## Nano Banana Pro 工作流程

### Step 1: Plan（結構規劃）

```
輸入：簡報主題和目的、目標頁數、敘事結構（→ 05-storytelling.md）、主題配色（→ 06-visual-design.md）
輸出：每頁的 Layout 類型、核心訊息、圖片需求清單（→ 07-image-generation.md）

範例：
  Page 1: 封面頁 — 標題 + 副標題 + 主視覺
  Page 2: 問題頁 — 痛點描述 + 數據圖表
  Page 3: 解法頁 — 架構圖 + 重點說明
  Page 4: 成果頁 — Before/After 對比
  Page 5: 結尾頁 — Call to Action + 聯絡資訊
```

### Step 2: Generate（逐頁生成）

每一頁獨立生成為圖片或 HTML：套用主題 → 排版 Layout → 填入文字 → 嵌入圖片 → 輸出高解析度。

⚠️ 關鍵：每一頁都必須參考前一頁的格式，確保一致性

### Step 3: Combine（合併產出）

依序排列所有頁面 → 設定頁面尺寸（16:9 = 1920x1080）→ 嵌入字型 → 壓縮圖片 → 輸出 PDF。

---

## 格式一致性協定（Critical）

```
❌ 常見問題：第 1 頁標題 44pt 第 3 頁變 36pt、前半段左對齊後半段突然置中
✅ 解決方案：格式一致性協定三步驟
```

### Step 1: 定義格式目標

```json
{
  "title_font_size": "44pt",
  "body_font_size": "28pt",
  "title_alignment": "left",
  "margin_top": "60px",
  "margin_sides": "80px",
  "primary_color": "#0D47A1",
  "secondary_color": "#1976D2",
  "accent_color": "#00BCD4",
  "font_family": "Noto Sans TC, Inter",
  "line_height": "1.5"
}
```

### Step 2: 附帶前頁作為參考

```
生成第 N 頁時，必須附帶第 N-1 頁的成品作為視覺參考。

✅ "請生成第 3 頁，格式與附件中的第 2 頁保持一致"
❌ "請生成第 3 頁"（沒有參考，容易偏移）
```

⚠️ 這是最容易被忽略、也最影響品質的步驟

### Step 3: 附帶引用規格

每次生成都附帶完整的格式規格文件，不依賴 AI 的記憶。

```
✅ 每次都附上格式 JSON + 前頁截圖
❌ 只在第一頁附上格式，假設後續會自動沿用
```

---

## 行動裝置相容性

### Viewport 設定

```html
<meta name="viewport"
      content="width=device-width, initial-scale=1.0,
               maximum-scale=5.0, user-scalable=yes">
```

### 內容縮放規則

```
桌面（1920px+）：正常 16:9 顯示
平板（768-1919px）：等比縮放，維持可讀性
手機（< 768px）：可切換垂直滾動模式、單欄排版
```

### 字型最小尺寸

| 元素 | 桌面 | 平板 | 手機 |
|------|------|------|------|
| 主標題 | 44px | 36px | 24px |
| 副標題 | 32px | 28px | 20px |
| 內文 | 28px | 22px | 16px |
| 說明文字 | 20px | 18px | 14px |

⚠️ 手機上任何文字不得小於 14px

### 觸控友善設計

```
✅ 可點擊元素最小 44x44px、元素間距至少 8px
❌ 小於 30px 的按鈕、導航元素擠在角落
```

---

## 視覺優先設計原則

### 60-70% 視覺，30-40% 文字

```
✅ 正確：大面積圖表/視覺 + 精簡文字重點
❌ 錯誤：整頁密密麻麻的文字牆，圖片被擠在角落
```

### 一頁一訊息原則

```
✅ 每張投影片只傳達一個核心訊息
✅ 聽眾在 3 秒內就能抓到重點
💡 判斷方式：蓋住所有內容只看標題，標題能傳達核心訊息就合格
```

---

## Web-based 投影片技術需求

### HTML/CSS/JS 結構

```
slide-output/
├── index.html          ← 主入口
├── css/
│   ├── theme.css       ← 主題色彩、字型
│   ├── layout.css      ← Layout 系統
│   └── responsive.css  ← 響應式規則
├── js/
│   ├── navigation.js   ← 導航邏輯
│   └── scaling.js      ← 自動縮放
├── images/             ← AI 生成圖片
└── fonts/              ← 嵌入字型
```

### 導航系統（三種方式同時支援）

```javascript
// 1. 鍵盤導航
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'Escape') toggleOverview();
  if (e.key === 'f') toggleFullscreen();
});

// 2. 觸控導航：右滑上一頁、左滑下一頁
// 3. 點擊導航：右側區域下一頁、左側區域上一頁
```

### 響應式設計

```css
.slide-container {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  overflow: hidden;
}

@media (max-width: 768px) {
  .slide-container { aspect-ratio: auto; }
  .slide-body { font-size: max(16px, 2.5vw); }
}
```

### 自動縮放

```javascript
function autoScale() {
  const container = document.querySelector('.slide-container');
  const content = document.querySelector('.slide-content');
  const scale = Math.min(
    container.clientWidth / 1920,
    container.clientHeight / 1080
  );
  content.style.transform = `scale(${scale})`;
  content.style.transformOrigin = 'top left';
}
window.addEventListener('resize', autoScale);
```

### 必要功能

```
✅ 全螢幕模式（Fullscreen API）
✅ 鍵盤快捷鍵提示（按 ? 顯示）
✅ 頁碼顯示（目前 / 總頁數）
✅ 列印友善（@media print）

❌ 自動播放（除非明確要求）
❌ 過度動畫（分散注意力）
```

---

## 常用 Layout 類型

### 封面頁

```
┌─────────────────────────────────┐
│         [主視覺背景]             │
│    ┌───────────────────────┐    │
│    │  簡報標題（大字）       │    │
│    │  副標題 / 日期 / 講者   │    │
│    └───────────────────────┘    │
└─────────────────────────────────┘
```

### 內容頁（左圖右文）

```
┌─────────────────────────────────┐
│  標題                           │
│  ┌──────────┐  ┌──────────────┐ │
│  │  [圖片]  │  │ • 重點一     │ │
│  │          │  │ • 重點二     │ │
│  └──────────┘  └──────────────┘ │
└─────────────────────────────────┘
```

### 數據頁 / 引言頁

```
數據頁：標題 + 大圖表 + 一句話關鍵洞察
引言頁：大量留白 + 「一句有力量的話。」 + 引言作者
```

---

## 產出品質檢查清單

- [ ] 所有頁面格式一致（字型、色彩、間距）？
- [ ] 沒有錯字或排版錯誤？
- [ ] 圖片解析度足夠，不模糊？
- [ ] 在目標裝置上測試過（桌面 + 行動裝置）？
- [ ] 導航功能正常（鍵盤 + 觸控 + 點擊）？
- [ ] 檔案大小合理（PDF < 50MB，Web < 20MB）？字型正確載入？
