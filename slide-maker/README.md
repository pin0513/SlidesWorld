# Slide Maker - 投影片製作知識庫

> 整合 11 個 slide-* 技能的完整簡報製作系統

---

## 這是什麼

Slide Maker 是一套 AI 驅動的投影片製作生態系統，從需求釐清到最終交付，涵蓋簡報製作的完整生命週期。

```
需求 → 研究 → 架構 → 故事 → 設計 → 製作 → 審核 → 交付
```

---

## 核心架構

```
                    ┌──────────────────┐
                    │   slide-consult  │ ← 總顧問（入口點）
                    │   流程協調者     │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼───────┐ ┌───▼────────┐ ┌───▼────────┐
     │   Planning      │ │  Design     │ │  Delivery   │
     │ ├ template     │ │ ├ story    │ │ ├ script   │
     │ └ research     │ │ ├ theme    │ │ ├ qa       │
     │                │ │ └ image    │ │ └ export   │
     └────────────────┘ └────┬───────┘ └────────────┘
                             │
                    ┌────────▼─────────┐
                    │   Production     │
                    │   slide-maker    │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   Review         │
                    │   slide-reviewer │
                    └──────────────────┘
```

---

## 11 個技能一覽

| 分類 | 技能 | 職責 | 路徑 |
|------|------|------|------|
| **協調** | slide-consult | 流程協調、需求釐清 | `skills/coordinator/` |
| **規劃** | slide-template | 8 種簡報模板選擇 | `skills/planning/` |
| **規劃** | slide-research | 資料搜集與引用管理 | `skills/planning/` |
| **設計** | slide-story | 故事設計與敘事框架 | `skills/design/` |
| **設計** | slide-theme | 10 種視覺主題風格 | `skills/design/` |
| **設計** | slide-image | AI 圖片生成 (Gemini) | `skills/design/` |
| **製作** | slide-maker | 投影片實際製作 | `skills/production/` |
| **審核** | slide-reviewer | 6 維度品質審核 | `skills/review/` |
| **交付** | slide-script | 演講逐字稿生成 | `skills/delivery/` |
| **交付** | slide-qa | Q&A 問答準備 | `skills/delivery/` |
| **交付** | slide-export | PDF 匯出與完整交付 | `skills/delivery/` |

---

## 快速開始

**5 分鐘入門** → [`QUICK-START.md`](QUICK-START.md)

**完整技能入口** → [`SKILL.md`](SKILL.md)

**知識庫索引** → [`docs/00-index.md`](docs/00-index.md)

---

## 文件導覽

### 核心文件

| 文件 | 用途 | 建議閱讀順序 |
|------|------|-------------|
| `README.md` | 專案總覽 | 1st |
| `QUICK-START.md` | 5 分鐘快速入門 | 2nd |
| `SKILL.md` | Agent 入口點定義 | 3rd |
| `docs/00-index.md` | 知識庫完整索引 | Reference |

### 知識庫文件 (docs/)

| 文件 | 內容 |
|------|------|
| `00-index.md` | 索引與導航 |
| `01-workflow-overview.md` | 完整 8 階段工作流程 |
| `02-skill-catalog.md` | 11 個技能詳細目錄 |
| `03-template-guide.md` | 8 種簡報模板指南 |
| `04-research-methods.md` | 資料搜集方法論 |
| `05-storytelling.md` | 故事設計框架 |
| `06-visual-design.md` | 視覺設計原則 |
| `07-image-generation.md` | AI 圖片生成流程 |
| `08-slide-production.md` | 投影片製作技術 |
| `09-quality-review.md` | 品質審核框架 |
| `10-presentation-prep.md` | 演講準備（講稿 + Q&A）|
| `11-export-delivery.md` | 匯出交付流程 |
| `12-plugin-integration.md` | 外掛整合機制 |

### 技能檔案 (skills/)

```
skills/
├── coordinator/slide-consult.md      ← 總顧問
├── planning/
│   ├── slide-template.md             ← 模板選擇
│   └── slide-research.md             ← 資料搜集
├── design/
│   ├── slide-story.md                ← 故事設計
│   ├── slide-theme.md                ← 主題風格
│   └── slide-image.md                ← 圖片生成
├── production/slide-maker.md         ← 投影片製作
├── review/slide-reviewer.md          ← 品質審核
├── delivery/
│   ├── slide-script.md               ← 演講稿
│   ├── slide-qa.md                   ← Q&A 準備
│   └── slide-export.md               ← 匯出交付
└── shared/quality-standards.md       ← 共用品質標準
```

---

## 特殊模式

Slide Maker 支援三種特殊模式：

| 模式 | 觸發條件 | 額外整合 |
|------|----------|----------|
| **MAYO 品牌** | 用戶要求 MAYO 風格 | `/mayo-slide-expert` |
| **向上匯報** | 「報告給主管」等關鍵字 | `/exec-report-coach` |
| **英文教材** | 英文教學相關需求 | `english-teaching-expert` |

---

## 外掛整合

本知識庫可與以下系統整合：

- **english-teaching-expert** - 英文教育繪本製作
- **web-produce-consult** - 網站型投影片製作
- **exec-report-coach** - 向上匯報教練
- **mayo-slide-expert** - MAYO 品牌審核

詳見 [`docs/12-plugin-integration.md`](docs/12-plugin-integration.md)

---

## 範例

- `examples/sword-in-stone/` - 石中劍英文繪本（完整案例研究）

---

**版本**: v1.0 | **建立日期**: 2026-02-05
