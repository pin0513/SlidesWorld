# 完整工作流程

> Slide Maker 的 8 階段投影片製作流程，從需求到交付的完整路線圖。

---

## 流程總覽

```
Phase 1        Phase 1.5       Phase 2        Phase 3
需求釐清 ──────→ 模板選擇 ──────→ 資料搜集 ──────→ 大綱整理
(consult)       (template)      (research)      (consult)
    │                                              │
    │           Phase 4         Phase 5.0-5.3      ↓
    │           故事設計 ──────→ 視覺設計與製作 ◄── 大綱確認
    │           (story)         (theme/image/maker)
    │                                  │
    │           Phase 6                ↓
    │      ┌─── 品質審核 ◄──── 投影片完成
    │      │    (reviewer)
    │      │       ├── [MAYO?] ──→ Phase 6.5 MAYO 審核
    │      │       └── [向上匯報?] → Phase 6.6 匯報審核
    │      │
    │      │    Phase 7              Phase 8
    │      └──→ 演講準備 ──────────→ 交付驗收
    │           (script + qa)        (export)
    │
    └──→ [已有內容?] ──→ Direct Flow: 直接跳到 Phase 5
```

---

## Phase 1: 需求釐清 (slide-consult)

釐清簡報的核心目標，確保後續所有工作方向正確。

**關鍵產出**: 簡報目的聲明、受眾分析、時長設定、場景定義、特殊需求識別

**必問清單**:

| # | 問題 | 為什麼重要 |
|---|------|-----------|
| 1 | 這份簡報的目的是什麼？ | 決定整體方向 |
| 2 | 聽眾是誰？ | 決定深度與用語 |
| 3 | 預計多長時間？ | 決定頁數與密度 |
| 4 | 聽完後希望聽眾做什麼？ | 決定 Call to Action |
| 5 | 有沒有必須包含的內容？ | 避免遺漏關鍵要求 |

**決策點**:
- 提到「MAYO」「公司風格」 → ✅ 啟用 MAYO 模式（整合 mayo-slide-expert）
- 提到「報告給主管」「向上匯報」 → ✅ 啟用向上匯報模式（整合 exec-report-coach）
- 提到「英文教材」「繪本」 → ✅ 啟用教育模式（整合 english-teaching-expert）

---

## Phase 1.5: 模板選擇 (slide-template)

從 8 種預設模板中選擇最適合的簡報結構。

| # | 模板 | 適用場景 |
|---|------|----------|
| 1 | Tech Talk | 技術分享、架構說明 |
| 2 | Business Proposal | 商務提案、合作邀約 |
| 3 | Executive Report | 主管月報、季度回顧 |
| 4 | Product Pitch | 產品發表、功能介紹 |
| 5 | Training Session | 內訓、工作坊 |
| 6 | Scientific Talk | 學術報告、研究發表 |
| 7 | Inspirational | 人生分享、畢業演講 |
| 8 | Creative Pitch | 創意提案、品牌企劃 |

💡 詳細模板說明請參考 [`03-template-guide.md`](03-template-guide.md)

---

## Phase 2: 資料搜集 (slide-research)

針對簡報主題進行系統性研究，同步搜集圖片素材。

⚠️ **同步搜集圖文** — 研究文字資料時，同步搜集相關圖片。不要事後回頭找圖。

| 層級 | 時間 | 適用 |
|------|------|------|
| Quick Survey | 5-10 min | 熟悉主題、僅需補充數據 |
| Standard | 15-30 min | 一般簡報、需要完整論述 |
| Deep Dive | 30-60 min | 學術報告、高階決策 |

**產出**: 結構化研究摘要、引用清單、圖片素材清單、關鍵數據

💡 詳細方法論請參考 [`04-research-methods.md`](04-research-methods.md)

---

## Phase 3: 大綱整理 (slide-consult)

將研究成果結構化為簡報大綱，確認內容完整性。

```
簡報大綱：[標題]
├── 開場（1-2 頁）— Hook + Agenda
├── 主體（8-12 頁）— Section 1~3，每個有明確核心訊息
├── 結尾（1-2 頁）— Summary + CTA
└── 附錄（選用）— 備用資料、參考來源
```

- ✅ 頁數符合時長限制（約 1 頁/分鐘）
- ✅ Section 之間有轉場邏輯
- ❌ 不要在大綱階段糾結視覺細節

---

## Phase 4: 故事設計 (slide-story)

為大綱注入敘事結構，設計情感節奏曲線。

| 框架 | 結構 | 適用 |
|------|------|------|
| 英雄旅程 | 困境 → 啟程 → 試煉 → 回歸 | Inspirational |
| 問題解決 | 痛點 → 原因 → 方案 → 成效 | Tech Talk, Product |
| SCQA | Situation → Complication → Question → Answer | Executive Report |
| 三幕劇 | 開場 → 衝突 → 解決 | Business Proposal |

```
情緒 高│     ●           ●
    中│───●───●───●───●───●──
    低│ ●                   ●
      └──────────────────────→ 時間
       Hook 問題 轉折 方案 CTA
```

---

## Phase 5: 視覺設計與製作

### 5.0 底圖生成 (slide-image)
生成簡報背景底圖，建立視覺基調。

### 5.1 主題風格 (slide-theme)
從 10 種視覺主題中選擇配色、字型、版面風格（Corporate / Startup / Academic / Creative / Minimal 等）。

### 5.2 圖片生成 (slide-image)
使用 Gemini API 生成插圖。每張約 $0.008，15 頁簡報預估 $0.04-$0.08。

### 5.3 投影片製作 (slide-maker)

| 輸出格式 | 技術 | 適用 |
|----------|------|------|
| PDF | Nano Banana Pro | 快速預覽、分享 |
| PPTX | PowerPoint | 需要後續編輯 |
| Beamer | LaTeX | 學術場合 |

---

## Phase 6: 品質審核 (slide-reviewer)

### 6 維度審核

| 維度 | 權重 | 審核重點 |
|------|------|----------|
| 內容邏輯 | 25% | 論述清晰、論點有據 |
| 視覺設計 | 20% | 配色統一、版面平衡 |
| 說服力 | 20% | 論述有力、CTA 明確 |
| 時間控制 | 15% | 頁數合理、節奏適當 |
| 受眾適配 | 10% | 用語程度、內容深度 |
| 行動裝置 | 10% | 字體大小、圖片清晰 |

| 分數 | 結果 | 處理 |
|------|------|------|
| 90-100 | ✅ 優秀 | 直接進入 Phase 7 |
| 80-89 | ⚠️ 良好 | 小幅修改後通過 |
| 70-79 | ⚠️ 及格 | 回到 Phase 5 調整 |
| <70 | ❌ 不及格 | 回到 Phase 4 重新設計 |

### Phase 6.5: MAYO 品牌審核（可選）
整合 `mayo-slide-expert`，額外檢查品牌色彩、Logo 使用、品牌調性。

### Phase 6.6: 向上匯報審核（可選）
整合 `exec-report-coach`，額外檢查結論前置、數據基準、行動建議、備用方案。

---

## Phase 7: 演講準備 (slide-script + slide-qa)

**講稿生成**: 逐頁講稿含開場語、轉場語、時間標記、互動點標記

**Q&A 準備**: PREP 框架（**P**oint → **R**eason → **E**xample → **P**oint 重述）

---

## Phase 8: 交付驗收 (slide-export)

```
delivery/
├── slides/          ← PDF + PPTX
├── scripts/         ← 講稿 + Q&A 準備
├── assets/          ← 圖片素材 + 參考來源
└── meta/            ← 審核報告 + 成本摘要
```

---

## Complete Flow vs Direct Flow

| 項目 | Complete Flow | Direct Flow |
|------|--------------|-------------|
| 階段 | Phase 1 → 8 全部 | Phase 5 → 6 → 7(選用) → 8 |
| 適用 | 從零開始、高品質要求 | 已有內容、時間緊迫 |
| 預估時間 | 26-74 min | 11-27 min |

⚠️ Direct Flow 仍建議至少經過 Phase 6（品質審核）

---

## 各階段預估時間

| Phase | 名稱 | 預估時間 | 備註 |
|-------|------|----------|------|
| 1 | 需求釐清 | 3-5 min | 與用戶對話 |
| 1.5 | 模板選擇 | 1-2 min | 自動推薦 + 確認 |
| 2 | 資料搜集 | 5-30 min | 視研究深度 |
| 3 | 大綱整理 | 3-5 min | 基於研究產出 |
| 4 | 故事設計 | 3-5 min | 加入敘事結構 |
| 5 | 視覺設計與製作 | 5-15 min | 含圖片生成 |
| 6 | 品質審核 | 2-5 min | 6 維度評分 |
| 7 | 演講準備 | 3-5 min | 講稿 + Q&A |
| 8 | 交付驗收 | 1-2 min | 匯出與打包 |
| | **總計** | **26-74 min** | |

---

## 回饋迴圈

```
Phase 6 審核不通過
  ├── 視覺問題 → 回到 Phase 5（重新製作）
  ├── 內容問題 → 回到 Phase 3（調整大綱）
  └── 方向問題 → 回到 Phase 1（重新釐清需求）

Phase 7 發現邏輯斷裂
  └── 回到 Phase 4（調整故事線）
```

⚠️ 回退不代表失敗，回退代表對品質的堅持。

---

**版本**: v1.0 | **建立日期**: 2026-02-05
