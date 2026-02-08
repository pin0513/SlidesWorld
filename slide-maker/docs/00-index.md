# 知識庫索引

> Slide Maker 知識庫的導航中心。從這裡開始探索。

---

## 快速導航

### 按使用情境

| 你想做什麼？ | 參考文件 |
|-------------|----------|
| 快速做一份簡報 | [`QUICK-START.md`](../QUICK-START.md) |
| 了解完整流程 | [`01-workflow-overview.md`](01-workflow-overview.md) |
| 選擇簡報類型 | [`03-template-guide.md`](03-template-guide.md) |
| 搜集研究資料 | [`04-research-methods.md`](04-research-methods.md) |
| 設計故事線 | [`05-storytelling.md`](05-storytelling.md) |
| 選擇視覺風格 | [`06-visual-design.md`](06-visual-design.md) |
| 生成 AI 圖片 | [`07-image-generation.md`](07-image-generation.md) |
| 製作投影片 | [`08-slide-production.md`](08-slide-production.md) |
| 審核簡報品質 | [`09-quality-review.md`](09-quality-review.md) |
| 準備演講 | [`10-presentation-prep.md`](10-presentation-prep.md) |
| 匯出交付 | [`11-export-delivery.md`](11-export-delivery.md) |
| 整合外掛 | [`12-plugin-integration.md`](12-plugin-integration.md) |

### 按角色

| 角色 | 建議閱讀順序 |
|------|-------------|
| **AI Agent** | `SKILL.md` → `00-index` → 按需讀取 |
| **簡報製作者** | `QUICK-START` → `01` → `03` → `05` → `08` |
| **設計師** | `06` → `07` → `03` (模板) |
| **審核者** | `09` → `02` (技能目錄) |
| **演講者** | `10` → `05` (故事) |

---

## 完整工作流程

```
Phase 1: 需求釐清        → slide-consult
Phase 1.5: 模板選擇      → slide-template
Phase 2: 資料搜集        → slide-research
Phase 3: 大綱整理        → slide-consult
Phase 4: 故事設計        → slide-story
Phase 5.0: 生成底圖      → slide-image
Phase 5.1: 主題風格      → slide-theme
Phase 5.2: 圖片生成      → slide-image
Phase 5.3: 投影片製作    → slide-maker
Phase 6: 品質審核        → slide-reviewer
Phase 6.5: MAYO 審核     → mayo-slide-expert (可選)
Phase 6.6: 向上匯報審核  → exec-report-coach (可選)
Phase 7: 演講準備        → slide-script + slide-qa
Phase 8: 交付驗收        → slide-export
```

---

## 文件清單

| # | 文件 | 內容摘要 | 關聯技能 |
|---|------|----------|----------|
| 00 | **index.md** | 本索引 | - |
| 01 | **workflow-overview.md** | 8 階段完整流程 | slide-consult |
| 02 | **skill-catalog.md** | 11 個技能詳細說明 | 全部 |
| 03 | **template-guide.md** | 8 種簡報模板 | slide-template |
| 04 | **research-methods.md** | 資料搜集方法論 | slide-research |
| 05 | **storytelling.md** | 故事設計框架 | slide-story |
| 06 | **visual-design.md** | 視覺設計與主題 | slide-theme |
| 07 | **image-generation.md** | AI 圖片生成 | slide-image |
| 08 | **slide-production.md** | 製作技術 | slide-maker |
| 09 | **quality-review.md** | 6 維度品質審核 | slide-reviewer |
| 10 | **presentation-prep.md** | 講稿與 Q&A 準備 | slide-script, slide-qa |
| 11 | **export-delivery.md** | 匯出與交付 | slide-export |
| 12 | **plugin-integration.md** | 外掛整合機制 | 外部系統 |

---

## 核心概念速查

### 投影片設計原則

- **視覺優先**：60-70% 視覺，30-40% 文字
- **每頁一重點**：一個核心訊息
- **留白 40%+**：不要塞滿畫面
- **字體 ≥28pt**：確保可讀性

### 品質標準

| 等級 | 分數 | 說明 |
|------|------|------|
| 優秀 | 90-100 | 可直接使用 |
| 良好 | 80-89 | 小幅修改 |
| 及格 | 70-79 | 需要調整 |
| 不及格 | <70 | 重新製作 |

### 圖片生成優先級

```
AI 生成 (Gemini) > AI 搜圖 > 免費圖庫 > 網路搜集
```

---

## 常見問題

### Q: 從哪裡開始？
直接使用 `/slide-consult`，它會引導你完成整個流程。

### Q: 可以跳過某些階段嗎？
可以。如果你已有明確內容，可以直接用 `/slide-maker` 製作。但建議至少經過故事設計和品質審核。

### Q: 如何做 MAYO 品牌簡報？
在需求釐清時告知使用 MAYO 風格，系統會自動整合 `/mayo-slide-expert`。

### Q: 如何做向上匯報簡報？
系統會根據關鍵字自動識別。你也可以明確告知「這是向上報告」。

### Q: 圖片成本大約多少？
使用 Gemini 2.5 Flash Image，約 $0.008/張。一份 15 頁簡報預估 $0.05-$0.10。

---

**版本**: v1.0 | **建立日期**: 2026-02-05
