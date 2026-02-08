# Slide-Maker & English-Teaching-Expert 整理計畫

> **狀態**: 待執行
> **預估 Token**: 120-150K
> **預估時間**: 6-8 小時
> **建立日期**: 2026-02-05

---

## 📋 任務目標

1. **整理 slide-maker 知識庫**
   - 位置：`~/AgentProjects/slide-maker/`
   - 整合 11 個 slide-* 技能
   - 建立完整的學習路徑與相互參考

2. **抽出 english-teaching-expert**
   - 位置：`~/AgentProjects/english-teaching-expert/`
   - 獨立的英文教育繪本專家模組
   - 可作為外掛整合到 slide-maker 流程

3. **建立跨技能參考機制**
   - 每個技能說明中清楚標示相依關係
   - 提供整合使用範例
   - 建立學習順序與最佳實踐

---

## 🗂️ 現有資源

### Slide 相關技能（11 個）
位於 `~/.claude/skills/` 下：
- slide-consult（主顧問）
- slide-template（模板選擇）
- slide-research（資料搜集）
- slide-story（故事設計）
- slide-theme（主題風格）
- slide-image（圖片生成）
- slide-maker（投影片製作）
- slide-reviewer（品質審核）
- slide-script（演講稿）
- slide-qa（Q&A 準備）
- slide-export（匯出交付）

### English-Teaching 團隊
- 位置：`~/.claude/skills/teams/english-teaching-consult/`
- 包含：12 個 agents、多個 skills、rules

### 參考範例
- `~/slides/sword-in-stone/`（石中劍繪本）

---

## 📂 目標架構

### slide-maker/
```
slide-maker/
├── README.md                          # 專案總覽
├── SKILL.md                           # Agent 入口點
├── QUICK-START.md                     # 5 分鐘快速入門
├── docs/
│   ├── 00-index.md                    # 知識庫索引
│   ├── 01-workflow-overview.md        # 完整工作流程
│   ├── 02-skill-catalog.md            # 11 個技能目錄
│   ├── 03-template-guide.md           # 8 種簡報模板
│   ├── 04-research-methods.md         # 資料搜集方法
│   ├── 05-storytelling.md             # 故事設計框架
│   ├── 06-visual-design.md            # 視覺設計原則
│   ├── 07-image-generation.md         # 圖片生成流程
│   ├── 08-slide-production.md         # 投影片製作技術
│   ├── 09-quality-review.md           # 品質審核框架
│   ├── 10-presentation-prep.md        # 演講準備
│   ├── 11-export-delivery.md          # 匯出交付
│   └── 12-plugin-integration.md       # 外掛整合機制
├── skills/
│   ├── coordinator/
│   │   └── slide-consult.md
│   ├── planning/
│   │   ├── slide-template.md
│   │   └── slide-research.md
│   ├── design/
│   │   ├── slide-story.md
│   │   ├── slide-theme.md
│   │   └── slide-image.md
│   ├── production/
│   │   └── slide-maker.md
│   ├── review/
│   │   └── slide-reviewer.md
│   ├── delivery/
│   │   ├── slide-script.md
│   │   ├── slide-qa.md
│   │   └── slide-export.md
│   └── shared/
│       └── quality-standards.md
├── references/                         # 深度參考資料
│   ├── design/
│   ├── themes/
│   ├── image-gen/
│   ├── templates/
│   └── production/
├── scripts/                            # 工具腳本
├── assets/                             # 模板素材
├── agents/                             # Agent 定義
├── rules/                              # 規則定義
└── examples/
    └── sword-in-stone/
```

### english-teaching-expert/
```
english-teaching-expert/
├── README.md
├── SKILL.md
├── QUICK-START.md
├── docs/
│   ├── 00-index.md
│   ├── 01-workflow-overview.md
│   ├── 02-role-catalog.md
│   ├── 03-story-creation.md
│   ├── 04-visual-production.md
│   ├── 05-audio-production.md
│   ├── 06-quality-standards.md
│   └── 07-integration-guide.md
├── agents/
│   ├── production-manager.md
│   ├── planning/（4 個）
│   ├── creation/（2 個）
│   ├── visual/（4 個）
│   ├── audio/（3 個）
│   └── quality/（1 個）
├── skills/
│   ├── shared/
│   └── specialized/
├── rules/
├── examples/
│   └── sword-in-stone/
└── plugins/                           # 整合外掛
    ├── slide-maker-plugin.md
    ├── web-produce-plugin.md
    └── app-produce-plugin.md
```

---

## 🚀 執行計畫（46 步驟）

### Phase 1: 建立基礎結構（步驟 1-4）
- 創建兩個專案的目錄結構
- 撰寫 README.md

### Phase 2: slide-maker 知識庫文件（步驟 5-17）
- 撰寫 `docs/` 目錄下的 12 個文件
- 從現有 skills 提取內容並重組

### Phase 3: 遷移技能檔案（步驟 18-24）
- 將 11 個 slide-* skills 遷移到新結構
- 清理重複內容，建立交叉參考

### Phase 4: 參考資料與素材（步驟 25-29）
- 複製 references、scripts、assets
- 創建範例參考

### Phase 5: english-teaching-expert（步驟 30-37）
- 撰寫知識庫文件
- 複製 agents、skills、rules
- 建立外掛介面

### Phase 6: 交叉參考與整合（步驟 38-42）
- 撰寫 QUICK-START.md
- 撰寫 SKILL.md
- 建立外掛整合機制

### Phase 7: 驗證與清理（步驟 43-46）
- 建立驗證檢查清單
- 撰寫遷移文件
- 執行完整性檢查

---

## 📝 詳細執行步驟

請參考完整計畫：已由 planner agent (ID: aa79267) 產出。

---

## ✅ 成功標準

- [ ] `~/AgentProjects/slide-maker/` 包含所有 11 個技能
- [ ] `~/AgentProjects/english-teaching-expert/` 是獨立完整的模組
- [ ] Agent 可透過 `docs/00-index.md` 快速導航
- [ ] 交叉參考正確解析
- [ ] 石中劍作為完整案例研究
- [ ] QUICK-START.md 提供 5 分鐘入門
- [ ] 無內容遺失
- [ ] 舊檔案保留（記錄於 MIGRATION.md）

---

## 🎯 下次對話啟動指令

```
請讀取 ~/AgentProjects/SLIDE-MAKER-PLAN.md，
並執行完整的 slide-maker 和 english-teaching-expert 整理計畫。

參考成功案例：~/AgentProjects/a-team-maker/
```

---

**建立者**: Claude Sonnet 4.5
**Planner Agent ID**: aa79267（可恢復）
