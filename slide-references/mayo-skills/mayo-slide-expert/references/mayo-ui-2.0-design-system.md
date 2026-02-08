# MAYO UI 2.0 Design System Reference

> **來源**: `/Users/paul_huang/DEV/mayo-design-guide-line/design-rule.md`
> **適用**: Slide、Web、React 元件設計
> **技術棧**: shadcn/ui + Tailwind CSS + 8pt Grid

---

## Quick Reference Card

### 🎨 品牌色彩

| 用途 | 色碼 | Tailwind | CSS Variable |
|------|------|----------|--------------|
| **主色 Primary** | `#26abe3` | `bg-[#26abe3]` | `--mayo-primary` |
| **輔助色 Secondary** | `#353d45` | `bg-[#353d45]` | `--mayo-secondary` |
| **成功 Success** | `#059669` | `bg-emerald-600` | `--mayo-success` |
| **錯誤 Error** | `#DC2626` | `bg-red-600` | `--mayo-error` |
| **警告 Warning** | `#FABF13` | `bg-[#FABF13]` | `--mayo-warning` |

### 📝 中性色 (Neutral)

| 用途 | 色碼 | 說明 |
|------|------|------|
| 標題/內文 | `#353d45` | 主要文字色 |
| 框線/分隔線 | `#C8D4D9` | Border & Divider |
| 背景底色 | `#F6F8F9` | Page Background |

### ⚠️ 禁止使用

- ❌ 純黑 `#000000`
- ❌ 預設藍色
- ❌ 任何非規範色彩

---

## Typography 字型規範

### 字型家族

```css
font-family: "Noto Sans", sans-serif;
```

### 字級對照表

| 等級 | 用途 | Size | Line Height | Weight | Tailwind |
|------|------|------|-------------|--------|----------|
| H1 | HTTP Status | 30px | 38px | 500 (Medium) | `text-[30px] leading-[38px] font-medium` |
| H2 | Page Title | 24px | 32px | 500 (Medium) | `text-2xl leading-8 font-medium` |
| H3 | Title | 18px | 26px | 500 (Medium) | `text-lg leading-[26px] font-medium` |
| H4 | Subtitle | 16px | 24px | 400 (Regular) | `text-base leading-6 font-normal` |
| P | Default | 14px | 22px | 400 (Regular) | `text-sm leading-[22px] font-normal` |
| Label | Description | 12px | 20px | 400 (Regular) | `text-xs leading-5 font-normal` |

### ⚠️ 禁止的字級

- ❌ 13px, 15px, 20px 或其他非規範字級
- 請修正為最接近的規範等級

---

## Spacing 間距系統

### 基準單位: 8px

| Tailwind | 數值 | 用途範例 |
|----------|------|----------|
| `p-1`, `m-1` | 4px | 微小間距 |
| `p-2`, `m-2` | 8px | 元素內間距 |
| `p-4`, `m-4` | 16px | 小卡片內距 |
| `p-6`, `m-6` | 24px | 容器內距 |
| `p-8`, `m-8` | 32px | 區塊間距 |
| `p-12`, `m-12` | 48px | 大區塊間距 |
| `p-16`, `m-16` | 64px | 頁面級間距 |

### ⚠️ 禁止的間距

- ❌ 自定義數值如 `p-[13px]`, `m-[21px]`
- 請修正為 4 的倍數

---

## Border Radius 圓角

| 類型 | 數值 | Tailwind | 用途 |
|------|------|----------|------|
| Standard | 8px | `rounded-lg` | Button, Card, Modal, Input |
| Large | 16px | `rounded-2xl` | 大型 Container |

### ⚠️ 禁止

- ❌ 尖角 (0px)
- ❌ 不統一的圓角數值

---

## Shadow 陰影

| Level | 效果 | 用途 |
|-------|------|------|
| Level 1 | `0 4px 8px rgba(53,61,69,0.2)` | Toast, 小元件 |
| Level 2 | `0 0 16px rgba(53,61,69,0.3)` | Modal 彈窗 |

```css
/* Tailwind custom */
.shadow-mayo-1 { box-shadow: 0 4px 8px rgba(53,61,69,0.2); }
.shadow-mayo-2 { box-shadow: 0 0 16px rgba(53,61,69,0.3); }
```

### ⚠️ 禁止

- ❌ 過重、過黑的 box-shadow
- 品牌強調「輕盈感」

---

## Component Specs 元件規格

### Button 按鈕

| Size | Height | Padding X | Font Weight |
|------|--------|-----------|-------------|
| Small | 28px | 12px | 500 (Medium) |
| Default | 36px | 20px | 500 (Medium) |
| Large | 46px | 28px | 500 (Medium) |

**互動狀態:**

| State | 效果 |
|-------|------|
| Hover | 亮度 +10% (tint) |
| Active | 亮度 -10% (shade) |
| Disabled | 透明度 30% + `cursor: not-allowed` |

### Input 輸入框

| 屬性 | 數值 |
|------|------|
| Height | 36px (同 Default Button) |
| Border | `#C8D4D9` |
| Border Radius | 8px |
| Background | `#FFFFFF` |

**互動狀態:**

| State | 效果 |
|-------|------|
| Hover | Border → `#26abe3` |
| Focus | Border → `#26abe3` + `box-shadow: 0 0 4px rgba(38,171,227,0.3)` |
| Error | Border → Red + 12px 紅色提示文字 |
| Disabled | Background → `#F6F8F9`, 透明度 30% |
| Placeholder | `#353d45` 50% 透明度 |

### Card & Container

| 屬性 | 數值 |
|------|------|
| Border Radius | 8px 或 16px |
| Background | 純白或 `#F6F8F9` |
| Shadow | 無 (禁止自定義) |
| Padding | 24px (一般) / 16px (小卡片) |

### Icon & Tag

**Icon:**
- 尺寸: 16x16px
- 觸發範圍: 24x24px
- 顏色: 跟隨文字或主色

**Tag/Badge:**
- 字體: 12px (Label)
- 圓角: Pill-shaped 或 8px

---

## Tailwind CSS Variables

```css
:root {
  /* Brand Colors */
  --mayo-primary: #26abe3;
  --mayo-secondary: #353d45;

  /* Semantic Colors */
  --mayo-success: #059669;
  --mayo-error: #DC2626;
  --mayo-warning: #FABF13;

  /* Neutral Colors */
  --mayo-text: #353d45;
  --mayo-border: #C8D4D9;
  --mayo-bg: #F6F8F9;
}
```

### Tailwind Config Extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        mayo: {
          primary: '#26abe3',
          secondary: '#353d45',
          success: '#059669',
          error: '#DC2626',
          warning: '#FABF13',
          text: '#353d45',
          border: '#C8D4D9',
          bg: '#F6F8F9',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'sans-serif'],
      },
      borderRadius: {
        'mayo': '8px',
        'mayo-lg': '16px',
      },
      boxShadow: {
        'mayo-1': '0 4px 8px rgba(53,61,69,0.2)',
        'mayo-2': '0 0 16px rgba(53,61,69,0.3)',
      }
    }
  }
}
```

---

## Checklist 快速檢核

### 色彩檢核

- [ ] 無使用純黑 `#000`
- [ ] 無使用預設藍色
- [ ] 主要強調使用 `#26abe3`
- [ ] 文字使用 `#353d45`

### 字型檢核

- [ ] 字體為 Noto Sans
- [ ] 無非規範字級 (13px, 15px, 20px...)
- [ ] 標題使用 font-weight: 500
- [ ] 內文使用 font-weight: 400

### 間距檢核

- [ ] 所有間距為 4 的倍數
- [ ] 無自定義非標準間距

### 元件檢核

- [ ] 圓角統一 (8px 或 16px)
- [ ] 陰影使用規範值
- [ ] 按鈕高度正確 (28/36/46px)
- [ ] 輸入框高度 36px

---

## 使用時機

當用戶說以下關鍵字時，自動套用此規範：

- "MAYO Style"
- "mayo-slide"
- "MAYO 風格"
- "MAYO UI"
- "MAYO 品牌"

---

*版本：v1.0 | 來源：MAYO UI 2.0 POC Critical Checklist | 更新：2026-02-04*
