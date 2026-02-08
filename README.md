# SlidesWorld

投影片製作與諮詢技能集合（Claude Code Skills）

## 簡介

SlidesWorld 是一個完整的投影片製作生態系統，包含投影片諮詢、製作工具、以及相關技能參考。專為使用 Claude Code 進行投影片設計和內容製作而設計。

## 📁 專案結構

```
SlidesWorld/
├── slide-consult/      投影片諮詢技能
│   ├── SKILL.md       技能定義
│   └── references/    參考資料
│
├── slide-maker/        投影片製作技能
│   ├── SKILL.md       技能定義
│   ├── agents/        代理定義
│   ├── assets/        資源檔案
│   ├── docs/          文件
│   ├── examples/      範例
│   ├── references/    參考資料
│   ├── rules/         規則定義
│   ├── scripts/       腳本工具
│   ├── skills/        子技能
│   └── templates/     模板
│
├── slide-references/   相關技能參考庫
│   ├── image-generation/  圖片生成工具
│   ├── mayo-skills/       MAYO 品牌相關
│   ├── slide-skills/      Slide 系列技能
│   └── other-dependencies/ 其他依賴
│
├── SLIDE-MAKER-PLAN.md    Slide Maker 規劃文件
└── README.md              本文件
```

## 🎯 核心技能

### 1. Slide Consult (投影片諮詢)

**用途**: 投影片設計諮詢、內容規劃、視覺建議

**適用場景**:
- 簡報內容規劃
- 視覺設計諮詢
- 品牌規範檢查（MAYO）
- 投影片結構優化

**使用方式**:
```bash
/slide-consult
```

### 2. Slide Maker (投影片製作)

**用途**: 實際製作投影片、生成 HTML/PDF、整合 AI 圖片

**適用場景**:
- HTML 投影片生成
- Reveal.js 簡報製作
- AI 圖片生成整合
- 投影片匯出（PDF/PPTX）

**使用方式**:
```bash
/slide-maker
```

### 3. Slide References (技能參考庫)

**用途**: 提供 slide-consult 和 slide-maker 所需的依賴技能

**包含內容**:
- `slide-export` - 投影片匯出
- `slide-image` - AI 圖片生成
- `slide-qa` - Q&A 問答準備
- `slide-research` - 內容研究
- `slide-reviewer` - 投影片審核
- `slide-script` - 演講逐字稿
- `slide-story` - 數據故事化
- `slide-template` - 簡報模板
- `slide-theme` - 主題樣式
- `mayo-slide-expert` - MAYO 品牌專家
- `Gemini-GenImage` - Gemini AI 生圖

## 🚀 安裝方式

### 方式一：全域安裝（建議）

```bash
# 安裝 slide-consult
ln -s ~/AgentProjects/SlidesWorld/slide-consult ~/.claude/skills/slide-consult

# 安裝 slide-maker
ln -s ~/AgentProjects/SlidesWorld/slide-maker ~/.claude/skills/slide-maker
```

### 方式二：專案內使用

```bash
# 複製到專案的 .claude/skills/
cp -r ~/AgentProjects/SlidesWorld/slide-consult /path/to/project/.claude/skills/
cp -r ~/AgentProjects/SlidesWorld/slide-maker /path/to/project/.claude/skills/
```

## 📖 使用流程

### 典型工作流程

1. **規劃階段** - 使用 `/slide-consult` 進行內容規劃和設計諮詢
2. **製作階段** - 使用 `/slide-maker` 實際製作投影片
3. **審核階段** - 使用 slide-reviewer 進行品質檢查
4. **匯出階段** - 使用 slide-export 匯出為 PDF/PPTX

### 範例場景

#### 場景 1: 製作 MAYO 品牌投影片

```
1. /slide-consult - 確認品牌規範和設計方向
2. /slide-maker - 製作 HTML 投影片
3. /slide-image - 生成 AI 圖片
4. /slide-export - 匯出為 PDF
```

#### 場景 2: 技術簡報製作

```
1. /slide-research - 研究技術內容和引用來源
2. /slide-consult - 規劃簡報結構
3. /slide-maker - 製作 Reveal.js 投影片
4. /slide-qa - 準備 Q&A 問答
```

## 🔧 技術規格

- **格式**: Reveal.js HTML 投影片
- **AI 圖片**: Gemini 2.5 Flash Image Generation
- **匯出**: HTML → PDF (透過 slide-export)
- **品牌**: MAYO HR Tech

## 📝 開發計畫

詳見 `SLIDE-MAKER-PLAN.md`

## 🔗 相關資源

- **Reveal.js**: https://revealjs.com/
- **Gemini AI**: https://ai.google.dev/
- **Claude Code**: https://claude.ai/code

## 📊 統計資訊

- **總技能數**: 2 個主要技能（slide-consult, slide-maker）
- **參考技能**: 11+ 個子技能
- **模板**: 多個 Reveal.js 模板
- **範例**: 多個完整投影片範例

## 授權

Private - 個人使用

## 維護者

Paul Huang (@pin0513)

---

**專案位置**: `/Users/paul_huang/AgentProjects/SlidesWorld`
**建立日期**: 2026-02-08
**整併來源**: slide-consult + slide-maker + slide-references
