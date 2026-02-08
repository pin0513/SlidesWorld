# 外掛整合機制

## 概述

slide-maker 採用外掛（Plugin）架構擴展功能。核心流程負責標準簡報製作，外掛則處理特定領域需求（品牌規範、教學內容、AI 生圖等）。

---

## 整合架構

```
                ┌─────────────────┐
                │  slide-consult  │
                │ （需求諮詢入口） │
                └────────┬────────┘
                         │
                ┌────────↓────────┐
                │ 需求分析 & 路由  │
                └────────┬────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
   ┌──────↓──────┐ ┌────↓────┐ ┌──────↓──────┐
   │ 標準流程     │ │ 外掛 A  │ │ 外掛 B      │
   │ slide-producer│ │         │ │             │
   └──────────────┘ └─────────┘ └─────────────┘
          │              │              │
          └──────────────┼──────────────┘
                         │
                ┌────────↓────────┐
                │ slide-reviewer  │ → slide-export
                └─────────────────┘
```

### 外掛觸發流程

```
用戶需求進入 slide-consult → 分析關鍵字
  ├─「英文教學」→ english-teaching-expert
  ├─「MAYO」→ mayo-slide-expert
  ├─「向上報告」→ exec-report-coach
  ├─「互動式網頁」→ web-produce-consult
  ├─「AI 生圖」→ Gemini-GenImage
  └─ 無特殊需求 → 標準流程
```

---

## 外掛一覽

### 1. english-teaching-expert — 英文教育繪本整合

**觸發條件：** 偵測到英文教學、英語教材、繪本、兒童英語等關鍵字

**整合方式：** 分派至 english-teaching-expert 團隊，執行故事腳本設計、角色場景設定、互動式繪本頁面製作、教學元素嵌入。

**輸出特徵：**
- ✅ 互動式故事投影片（點擊角色會說話）
- ✅ 嵌入單字卡與發音提示
- ✅ 適合兒童的視覺風格（大字體、鮮豔色彩）
- ✅ 包含互動練習題

**範例：** 「幫我做一份國小三年級的英文教材，主題是動物」→ 產出動物主題互動繪本

---

### 2. mayo-slide-expert — MAYO 品牌規範

**觸發條件：** 用戶明確要求 MAYO 風格、MAYO 品牌、或從 MAYO 相關專案發起

**整合方式：** 載入品牌規範（色彩、字體、Logo、版型）→ 執行標準製作流程 → 品牌合規審核

**品牌合規審核項目：**

| 項目 | ✅ 合格 | ❌ 不合格 |
|------|--------|----------|
| Logo 使用 | 正確版本、最小尺寸、安全區域 | 拉伸、變色、裁切 |
| 品牌色 | 使用指定色票 | 自行調色、近似色 |
| 字體 | 指定品牌字體 | 替換為其他字體 |
| 語氣 | 符合品牌 Tone of Voice | 過於隨意或過於生硬 |

---

### 3. exec-report-coach — 向上報告教練

**觸發條件：** 偵測到「向上報告」「跟老闆報告」「對高管簡報」「Executive Report」

**整合方式：** 載入五維度審核框架，逐頁審核後產出優化建議。

| 維度 | 檢查問題 |
|------|---------|
| Purpose | 這頁為什麼存在？ |
| Appeal | 高管會在意嗎？ |
| Action | 看完要做什麼？ |
| Data | 有沒有佐證？ |
| Clarity | 30 秒能看懂嗎？ |

**向上報告特有原則：**
- ✅ 第一頁就講結論
- ✅ 每頁都要有「So What?」
- ✅ 數字用比較呈現（YoY、vs Target）
- ❌ 不要超過 15 頁、不要放技術細節

---

### 4. web-produce-consult — 互動式網頁簡報

**觸發條件：** 需要互動式網頁簡報、動態效果、嵌入式元素

**整合方式：** 需求確認 → 技術選型（Reveal.js / Swiper / 自定義）→ 開發製作 → 互動測試 → 部署交付

**支援的互動類型：** 動態圖表、步驟展開、嵌入影片、即時投票、動畫轉場

---

### 5. Gemini-GenImage — AI 圖片生成

**觸發條件：** 需要 AI 生成圖片、找不到合適素材圖

**整合方式：** 撰寫 Prompt → 呼叫 Gemini API → 圖片品質審核 → 嵌入投影片

**Prompt 撰寫原則：**

| 原則 | ✅ 好的 Prompt | ❌ 差的 Prompt |
|------|---------------|---------------|
| 具體描述 | 「穿白袍的女性醫生在明亮診間看電腦」 | 「醫生」 |
| 指定風格 | 「flat design, 簡潔商務風」 | 不指定風格 |
| 指定色調 | 「以藍色和白色為主色調」 | 不指定顏色 |
| 排除不要的 | 「no text, no watermark」 | 不排除 |

**成本：** ~$0.008 / 張，一份簡報平均 3-5 張 ($0.024 - $0.040)

---

## 外掛介面規格

每個外掛必須實作以下介面：

```yaml
# 外掛基本資訊
name: mayo-slide-expert
version: 1.0.0
trigger_keywords: ["MAYO", "品牌", "mayo"]
priority: 8  # 1-10，越高越優先

# 四個必要能力
canHandle:           # 觸發判斷 → Boolean
enhanceRequirements: # 在原始需求上加入外掛特有要求
getProductionGuidelines:  # 回傳製作規範（色彩、字體、版型）
review:              # 審核報告（標準格式 + 外掛特有維度）
```

### 完整範例

```yaml
name: mayo-slide-expert
version: 1.0.0
trigger_keywords: ["MAYO", "mayo", "品牌簡報"]
priority: 8

enhanceRequirements:
  additions:
    - "必須使用 MAYO 品牌色票"
    - "Logo 需放置於右下角，最小尺寸 120px"
    - "字體使用 Noto Sans TC"

getProductionGuidelines:
  colors: { primary: "#0066CC", secondary: "#00AA55", accent: "#FF6600" }
  fonts: { heading: "Noto Sans TC Bold", body: "Noto Sans TC Regular" }
  logo: { position: "bottom-right", min_size: "120px" }

review:
  extra_dimensions:
    - name: "Brand Compliance"
      weight: 15
      checks: ["Logo 使用正確", "色彩在品牌範圍內", "字體符合規範"]
```

---

## 如何建立新外掛

### Step 1：定義外掛規格

確定名稱、觸發關鍵字、增強需求內容、製作指引、額外審核維度。

### Step 2：建立外掛文件

```
plugins/my-new-plugin/
├── spec.yaml          # 外掛規格定義
├── guidelines.md      # 製作指引文件
├── review-criteria.md # 審核標準
└── examples/          # 範例作品
```

### Step 3：註冊外掛

在 slide-consult 路由邏輯中加入觸發條件：

| 外掛 | 觸發關鍵字 | 優先級 |
|------|-----------|--------|
| english-teaching-expert | 英文教學, 繪本 | 7 |
| mayo-slide-expert | MAYO, 品牌 | 8 |
| exec-report-coach | 向上報告, 高管簡報 | 6 |
| web-produce-consult | 互動式, 網頁簡報 | 5 |
| Gemini-GenImage | AI 生圖, 生成圖片 | 3 |

### Step 4：測試

- ✅ 觸發條件正確（該觸發時觸發，不該觸發時不觸發）
- ✅ 增強需求不與核心流程衝突
- ✅ 審核維度的評分權重合理
- ✅ 用範例作品驗證完整流程

---

## 知識庫交叉引用

| 引用位置 | 參考文件 |
|---------|---------|
| 品質審核 | [09-quality-review.md](./09-quality-review.md) |
| 演講稿 / Q&A | [10-presentation-prep.md](./10-presentation-prep.md) |
| 匯出交付 | [11-export-delivery.md](./11-export-delivery.md) |

外掛知識庫獨立維護，透過觸發條件建立連結，不直接複製內容。

---

## 外掛衝突處理

### 多外掛同時觸發時

```
1. 比較 priority（數字越高越優先）
2. 同優先級時，問用戶選擇
3. 部分外掛可以組合使用
```

### 可組合的外掛

| 組合 | 場景 |
|------|------|
| MAYO + 向上報告 | MAYO 公司內部高管簡報 |
| MAYO + AI 生圖 | MAYO 簡報需要生成圖片 |
| 向上報告 + AI 生圖 | 高管簡報需要圖片 |

### 不可組合的外掛

| 組合 | 原因 |
|------|------|
| 英文教學 + 向上報告 | 目標受眾完全不同 |
| 網頁簡報 + PDF 匯出優先 | 技術路線衝突 |

💡 如果不確定外掛是否可以組合，預設是不組合，先問用戶。
