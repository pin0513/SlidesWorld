# 視覺設計原則

## 概述

視覺設計是簡報的第一印象。本文件定義了 10 組預設主題、設計原則、字型規範、色彩運用規則，以及自訂主題的生成方式。

---

## 預設主題一覽

### 1. Ocean Depths - 深藍海洋

Primary: `#0D47A1` / Secondary: `#1976D2` / Accent: `#00BCD4` / BG: `#E3F2FD`
字型：Noto Sans TC / Inter
✅ 企業報告、技術簡報、金融分析 ❌ 創意提案

### 2. Sunset Boulevard - 夕陽大道

Primary: `#E65100` / Secondary: `#FF8F00` / Accent: `#FFD600` / BG: `#FFF8E1`
字型：Noto Serif TC / Playfair Display
✅ 品牌發表、行銷提案 ❌ 嚴肅財務報告

### 3. Forest Canopy - 森林華蓋

Primary: `#1B5E20` / Secondary: `#4CAF50` / Accent: `#CDDC39` / BG: `#F1F8E9`
字型：Noto Sans TC / Source Sans Pro
✅ ESG 報告、環保議題、健康產業 ❌ 科技業產品發表

### 4. Modern Minimalist - 現代極簡

Primary: `#212121` / Secondary: `#757575` / Accent: `#FF5722` / BG: `#FAFAFA`
字型：Noto Sans TC / Helvetica Neue
✅ 幾乎所有場景 💡 不確定用什麼就用這個

### 5. Golden Hour - 黃金時刻

Primary: `#F57F17` / Secondary: `#FFB300` / Accent: `#D84315` / BG: `#FFFDE7`
字型：Noto Serif TC / Georgia
✅ 餐飲業、奢侈品牌、年度頒獎 ❌ 醫療、科技報告

### 6. Arctic Frost - 北極霜

Primary: `#546E7A` / Secondary: `#90A4AE` / Accent: `#00ACC1` / BG: `#ECEFF1`
字型：Noto Sans TC / Roboto
✅ 數據分析、研究報告、醫療 ❌ 派對活動

### 7. Desert Rose - 沙漠玫瑰

Primary: `#AD1457` / Secondary: `#E91E63` / Accent: `#FF6F00` / BG: `#FCE4EC`
字型：Noto Serif TC / Lora
✅ 時尚產業、女性議題 ❌ 工程技術報告

### 8. Tech Innovation - 科技創新

Primary: `#1A237E` / Secondary: `#283593` / Accent: `#00E676` / BG: `#0A0E27`
字型：Noto Sans TC / JetBrains Mono
✅ 產品發表、技術 Demo、Startup Pitch ⚠️ 深色背景注意場地亮度

### 9. Botanical Garden - 植物園

Primary: `#33691E` / Secondary: `#689F38` / Accent: `#F9A825` / BG: `#F9FBE7`
字型：Noto Sans TC / Open Sans
✅ 農業、食品、教育、自然科學 ❌ 金融、法律

### 10. Midnight Galaxy - 午夜銀河

Primary: `#4A148C` / Secondary: `#7B1FA2` / Accent: `#E040FB` / BG: `#12001A`
字型：Noto Sans TC / Poppins
✅ 創意產業、遊戲、娛樂 ⚠️ 深色背景，列印效果差

---

## 主題選擇速查表

| 場景 | 首選主題 | 備選 |
|------|---------|------|
| 不確定用什麼 | Modern Minimalist | Arctic Frost |
| 企業年度報告 | Ocean Depths | Arctic Frost |
| Startup Pitch | Tech Innovation | Midnight Galaxy |
| 技術架構分享 | Modern Minimalist | Ocean Depths |
| 行銷提案 | Sunset Boulevard | Golden Hour |
| ESG / 永續報告 | Forest Canopy | Botanical Garden |
| 數據分析報告 | Arctic Frost | Modern Minimalist |

---

## 設計原則

### 視覺層次（Visual Hierarchy）

```
層級 1: 標題 — 最大、最醒目
層級 2: 關鍵數據 / 主視覺 — 第二視覺焦點
層級 3: 說明文字 — 輔助理解
層級 4: 來源 / 頁碼 — 最不顯眼

✅ 每張投影片只有 1 個層級 1 元素
❌ 3 個元素都一樣大 → 聽眾不知道看哪裡
```

### 對比（Contrast）

```
✅ 深色背景 + 淺色文字（或反過來）
✅ 大標題 + 小副標題、彩色重點 + 灰色次要元素
❌ 淺灰文字在白色背景上、所有文字同一大小同一顏色
```

💡 對比度檢查：WCAG AA 標準要求至少 4.5:1 的對比比

### 留白（Whitespace）

```
✅ 留白佔投影片面積 40% 以上
✅ 元素之間有呼吸空間、邊距至少佔寬度的 5%
❌ 每寸空間都塞滿內容、文字貼著邊框
```

⚠️ 留白不是浪費空間，是引導注意力的工具

### 一致性（Consistency）

```
✅ 同類型投影片使用相同 Layout、全簡報統一字型色彩間距
❌ 第 3 頁用藍色標題第 7 頁突然變紅色、前半段圓角後半段直角
```

---

## 字型規範

### 最小字級

| 元素 | 最小字級 | 建議字級 |
|------|---------|---------|
| 主標題 | 36pt | 44-60pt |
| 副標題 | 28pt | 30-36pt |
| 內文 | 28pt | 28-32pt |
| 說明文字 | 20pt | 22-24pt |
| 來源/註腳 | 14pt | 16-18pt |

⚠️ 如果會場很大或聽眾在後排，再往上加 20%

### 字型搭配原則

```
✅ 標題用無襯線（Noto Sans TC），內文用無襯線
✅ 標題用襯線（Noto Serif TC），內文用無襯線
❌ 超過 3 種字型、藝術字型用在內文
```

### 推薦字型組合

| 風格 | 中文標題 | 中文內文 | 英文 |
|------|---------|---------|------|
| 專業穩重 | Noto Sans TC Bold | Noto Sans TC Regular | Inter |
| 優雅文藝 | Noto Serif TC Bold | Noto Sans TC Regular | Playfair Display |
| 科技現代 | Noto Sans TC Black | Noto Sans TC Light | JetBrains Mono |

---

## 色彩運用

### 60-30-10 法則

```
60% — Primary Color（主色）→ 背景、大面積區塊
30% — Secondary Color（輔色）→ 次要區塊、卡片背景
10% — Accent Color（強調色）→ CTA 按鈕、關鍵數字
```

### 色彩語義

```
✅ 正面/成功：綠色系 (#4CAF50)
❌ 負面/錯誤：紅色系 (#F44336)
⚠️ 警告/注意：黃色/橘色系 (#FF9800)
💡 資訊/提示：藍色系 (#2196F3)

不要違反直覺：
❌ 用紅色標記「收入成長」
❌ 用綠色標記「虧損金額」
```

---

## 自訂主題生成

當預設 10 組主題都不適合時，可以自訂：

### 輸入參數

```
必要：品牌主色（HEX 色碼）、使用場景描述、亮色/暗色偏好
選填：品牌字型、參考風格圖片、產業類型
```

### 生成流程

```
Step 1: 從品牌主色推導色彩系統（明度變化 → 互補色 → Accent 色）
Step 2: 根據產業和場景配對字型組合
Step 3: 套用色彩和字型到標準 Layout 範本
Step 4: 產出主題設定檔（含所有色碼、字型、間距定義）
```

💡 自訂主題務必做對比度檢測，確保文字在背景上清晰可讀

---

## 主題與 Template 的對應

| Template 類型 | 推薦主題風格 | 原因 |
|--------------|-------------|------|
| 封面頁 | 深色/高對比 | 第一印象要強烈 |
| 數據頁 | 淺色/低彩度 | 圖表需要清楚的背景 |
| 引言頁 | 深色/大留白 | 突顯文字力量 |
| 比較頁 | 中性色 | 不偏袒任何一方 |
| 結尾頁 | 與封面呼應 | 首尾一致 |

---

## 快速檢查清單

設計前：

- [ ] 選定主題（預設或自訂）
- [ ] 確認色彩在目標裝置上的效果（投影機 vs 螢幕）

設計後：

- [ ] 60-30-10 色彩比例是否遵守？
- [ ] 最小字級是否符合規範（內文 28pt+）？
- [ ] 留白是否達到 40%+？
- [ ] 全簡報視覺風格是否一致？
