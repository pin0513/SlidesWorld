# 技能目錄

> Slide Maker 生態系統中 11 個 slide-* 技能的完整參考手冊。

---

## 技能總覽

```
                    ┌──────────────────┐
                    │   slide-consult  │ ← 總顧問（入口點）
                    └────────┬─────────┘
              ┌──────────────┼──────────────┐
     ┌────────▼────────┐ ┌──▼───────┐ ┌───▼────────┐
     │   Planning      │ │  Design  │ │  Delivery  │
     │ ├ template      │ │ ├ story  │ │ ├ script   │
     │ └ research      │ │ ├ theme  │ │ ├ qa       │
     └─────────────────┘ │ └ image  │ │ └ export   │
                         └────┬─────┘ └────────────┘
                    ┌─────────▼────────┐
                    │   slide-maker    │ ← Production
                    └─────────┬────────┘
                    ┌─────────▼────────┐
                    │  slide-reviewer  │ ← Review
                    └──────────────────┘
```

| 分類 | 技能 | 一句話說明 |
|------|------|-----------|
| 協調 | slide-consult | 入口點，協調整個製作流程 |
| 規劃 | slide-template | 從 8 種模板選擇最適合的 |
| 規劃 | slide-research | 研究搜集資料與圖片 |
| 設計 | slide-story | 設計故事線與情感節奏 |
| 設計 | slide-theme | 設定視覺主題風格 |
| 設計 | slide-image | 用 Gemini AI 生成圖片 |
| 製作 | slide-maker | 實際產出投影片檔案 |
| 審核 | slide-reviewer | 6 維度品質審核 |
| 交付 | slide-script | 生成演講逐字稿 |
| 交付 | slide-qa | 準備 Q&A 問答 |
| 交付 | slide-export | PDF 匯出與完整打包 |

---

## slide-consult — 總顧問

**角色**: 流程協調者，所有製作任務的入口點

- Phase 1: 釐清簡報需求（目的、受眾、時長）
- Phase 3: 將研究成果整理為結構化大綱
- 識別特殊模式（MAYO / 向上匯報 / 教育）

**輸入**: 用戶的簡報需求、各階段產出物
**輸出**: 需求規格書、結構化大綱、各技能執行指令
**上游**: 用戶 | **下游**: 所有其他技能

- ✅ 引導式提問，挖掘用戶真正需求
- ✅ 監控流程進度，處理回退決策
- ❌ 不直接製作投影片或生成圖片

---

## slide-template — 模板選擇

**角色**: 簡報結構設計師

**輸入**: 需求規格書（目的、受眾、時長）
**輸出**: 選定模板、頁面結構建議、時間分配建議
**上游**: slide-consult | **下游**: slide-research, slide-consult (Phase 3)

| # | 模板 | 核心結構 |
|---|------|---------|
| 1 | Tech Talk | 問題 → 架構 → Demo → 總結 |
| 2 | Business Proposal | 市場 → 價值 → 方案 → ROI |
| 3 | Executive Report | 摘要 → 數據 → 分析 → 建議 |
| 4 | Product Pitch | 痛點 → 方案 → 功能 → 定價 |
| 5 | Training Session | 概念 → 示範 → 練習 → 回顧 |
| 6 | Scientific Talk | 背景 → 方法 → 結果 → 討論 |
| 7 | Inspirational | 故事 → 轉折 → 啟示 → 行動 |
| 8 | Creative Pitch | 衝擊 → 概念 → 展示 → 邀請 |

💡 詳細指南請參考 [`03-template-guide.md`](03-template-guide.md)

---

## slide-research — 資料搜集

**角色**: 研究員 + 圖片採集員

**輸入**: 模板與頁面結構、需要研究的主題清單
**輸出**: 結構化研究摘要、引用清單、圖片素材清單、關鍵數據
**上游**: slide-template | **下游**: slide-consult (Phase 3)

- ✅ 使用 WebSearch / WebFetch 搜尋最新資料
- ✅ 同步搜集圖文（Phase 0 圖片搜集）
- ✅ 三種引用格式：inline / numbered / footnote
- ✅ 圖片來源優先級：Wikimedia CC → 權威新聞 → 免費圖庫 → 網路

💡 詳細方法論請參考 [`04-research-methods.md`](04-research-methods.md)

---

## slide-story — 故事設計

**角色**: 故事架構師

**輸入**: 結構化大綱、受眾分析結果
**輸出**: 敘事框架、情感節奏圖、Hook 設計、轉場語句、CTA 設計
**上游**: slide-consult (Phase 3) | **下游**: slide-theme, slide-maker

| 框架 | 適用 | 結構 |
|------|------|------|
| 英雄旅程 | Inspirational | 日常 → 召喚 → 試煉 → 歸來 |
| 問題解決 | Tech / Product | 痛點 → 根因 → 方案 → 成效 |
| SCQA | Executive Report | 情境 → 複雜化 → 提問 → 回答 |
| 三幕劇 | Business Proposal | 建立 → 對抗 → 解決 |
| Before-After-Bridge | Product Pitch | 之前 → 之後 → 橋梁 |
| 金字塔原理 | Any | 結論先行 → 論點 → 論據 |

- ✅ 根據模板自動推薦敘事框架
- ✅ 每頁標記情緒值（1-5 分）
- ❌ 不處理視覺層面

---

## slide-theme — 主題風格

**角色**: 視覺風格設計師

**輸入**: 模板類型、故事設計的情感基調、用戶偏好
**輸出**: 配色方案、字型組合、版面規則
**上游**: slide-story | **下游**: slide-image, slide-maker

| # | 主題 | 風格 | 配色方向 |
|---|------|------|---------|
| 1 | Corporate | 專業穩重 | 深藍 + 灰 + 白 |
| 2 | Startup | 活潑大膽 | 亮色系 + 漸層 |
| 3 | Academic | 嚴謹清晰 | 白底 + 深色字 |
| 4 | Creative | 不規則撞色 | 大膽對比色 |
| 5 | Minimal | 極簡留白 | 黑白 + 單一點綴 |
| 6 | Dark Mode | 暗色專業 | 深底 + 亮色重點 |
| 7 | Nature | 自然有機 | 綠色系 + 大地色 |
| 8 | Tech/Cyber | 科技未來 | 藍紫漸層 + 螢光 |
| 9 | Warm | 溫暖親和 | 暖色系 + 柔和 |
| 10 | MAYO Brand | 品牌專屬 | MAYO CI 標準色 |

---

## slide-image — 圖片生成

**角色**: AI 圖片設計師

**輸入**: 視覺主題設定、每頁圖片需求、風格關鍵字
**輸出**: 生成的圖片檔案、使用建議
**上游**: slide-theme, slide-research | **下游**: slide-maker

- ✅ Phase 5.0: 生成簡報底圖/背景圖
- ✅ Phase 5.2: 生成內容插圖、圖表視覺化
- ✅ 成本控管（Gemini 2.5 Flash Image，每張約 $0.008）

**圖片來源優先級**: AI 生成 > AI 搜圖 > 免費圖庫 > Wikimedia > 網路搜集

---

## slide-maker — 投影片製作

**角色**: 投影片工程師

**輸入**: 大綱、視覺主題、圖片素材、情感節奏標記
**輸出**: PDF / PPTX / Beamer 投影片
**上游**: slide-story, slide-theme, slide-image | **下游**: slide-reviewer

| 引擎 | 格式 | 特點 |
|------|------|------|
| Nano Banana Pro | PDF | 快速、輕量 |
| PowerPoint | PPTX | 可編輯、相容性佳 |
| LaTeX Beamer | PDF | 數學公式支援 |

- ✅ 響應式版面、自動圖文排版、中英文混排
- ✅ 字體大小自動調整（最小 28pt）
- ❌ 不負責內容品質（那是 reviewer 的工作）

---

## slide-reviewer — 品質審核

**角色**: 品質控管師

**輸入**: 投影片檔案、需求規格書、受眾分析
**輸出**: 6 維度評分、改善建議、通過/回退決策
**上游**: slide-maker | **下游**: 通過→slide-script / 不通過→回退

| 維度 | 權重 | 審核重點 |
|------|------|---------|
| 內容邏輯 | 25% | 論述有理有據、結構清晰 |
| 視覺設計 | 20% | 配色統一、留白足夠 |
| 說服力 | 20% | CTA 明確、論述有力 |
| 時間控制 | 15% | 頁數時長匹配 |
| 受眾適配 | 10% | 深度與用語適合聽眾 |
| 行動裝置 | 10% | 手機/平板可讀 |

**可選擴展**: Phase 6.5 MAYO 審核 / Phase 6.6 向上匯報審核

---

## slide-script — 演講稿生成

**角色**: 演講稿撰寫師

**輸入**: 審核通過的投影片、情感節奏、時長限制
**輸出**: 逐頁講稿、時間標記、轉場語句、互動提示
**上游**: slide-reviewer | **下游**: slide-qa, slide-export

**講稿格式範例**:
```
## 第 3 頁：[標題]  ⏱️ 累計 4:30
[講稿內容...]
🔄 轉場：「說完現狀，接下來看解決方案。」
💡 互動：此處可問聽眾「有沒有人遇過這個問題？」
```

---

## slide-qa — Q&A 問答準備

**角色**: Q&A 策略師

**輸入**: 投影片內容、受眾分析、講稿
**輸出**: 預期問題清單（10-15 題）、PREP 回答、應對策略
**上游**: slide-script | **下游**: slide-export

**PREP 框架**: **P**oint（觀點） → **R**eason（理由） → **E**xample（案例） → **P**oint（重述）

| 問題類型 | 策略 |
|---------|------|
| ✅ 友善型 | 詳細回答，展現專業 |
| ⚠️ 挑戰型 | 承認合理性，補充證據 |
| ❌ 陷阱型 | 重構問題，回到主軸 |

---

## slide-export — 匯出交付

**角色**: 交付管理員

**輸入**: 所有最終產出物
**輸出**: 完整交付套件 + 成本摘要
**上游**: slide-reviewer, slide-script, slide-qa | **下游**: 用戶

```
delivery/
├── slides/      ← PDF + PPTX
├── scripts/     ← 講稿 + Q&A
├── assets/      ← 圖片 + 參考來源
└── meta/        ← 審核報告 + 成本摘要
```

---

## 技能協作流

```
consult → template → research → consult(大綱) → story
                                                  │
                         theme ← ─────────────────┘
                           │
                         image
                           │
                         maker → reviewer → script → qa → export
```

---

**版本**: v1.0 | **建立日期**: 2026-02-05
