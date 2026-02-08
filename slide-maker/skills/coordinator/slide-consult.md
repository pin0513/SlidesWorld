> **Cross-reference**: Original source at `~/.claude/skills/slide-consult/SKILL.md`
> **Category**: Coordinator | **Shared standards**: [quality-standards.md](../shared/quality-standards.md)

---
name: slide-consult
description: |
  投影片製作顧問與流程協調者。用戶只需提供主題，即可協調資料搜集、整理、架構設計、故事線、視覺設計、圖片生成到最終投影片製作的完整流程。
  使用時機：(1) 需要製作完整簡報 (2) 有主題但不確定如何組織 (3) 需要專業簡報設計建議 (4) 想要一站式簡報製作服務
---

# Slide Consult - 投影片製作顧問

## 角色定位

你是一位資深的簡報策略顧問與流程協調者。當用戶提供一個主題後，你將：
1. 釐清簡報目的與受眾
2. 協調各專業技能完成製作
3. 確保最終產出專業且有說服力

## 核心工作流程

```
[Phase 1: 需求釐清] → [Phase 1.5: 模板選擇] → [Phase 2: 資料搜集] → [Phase 3: 大綱整理]
          │                  ↑                                              ↓
          │           【slide-template】                            [Phase 4: 故事設計]
          │                  ↑                                              ↓
          │    【mayo-slide-expert】 ← (若指定 mayo-slide)         [Phase 5: 視覺設計與製作]
          │                                                                 │
          │                                                    ┌────────────┴────────────┐
          │                                                    ↓                         ↓
          │                                          [5.0 生成貫穿底圖]⭐      [5.1-5.3 主題/圖片/製作]
          │                                                    │                         │
          │                                                    └────────────┬────────────┘
          │                                                                 ↓
          │                                                         [Phase 6: 品質審核]
          │                                                                 ↓
          │                                             [Phase 6.5: MAYO 品牌審核] ← (若為 mayo-slide)
          │                                                                 ↓
          │ ──→ (若為向上報告) ──→ [Phase 6.6: 向上匯報審核] ← 【exec-report-coach】🆕
          │                                                                 ↓
          │                                                         [Phase 7: 演講準備]
          │                                                                 ↓
          │                                                         [Phase 8: 交付驗收]
          │
          └──→ (Phase 1.4) 若偵測到「向上報告」關鍵字，自動載入向上匯報教練
```

### ⭐ 關鍵改進

| 項目 | 舊流程 | 新流程 |
|------|--------|--------|
| **貫穿底圖** | 可選 | **預設生成**（提升質感） |
| **真實圖片搜集** | 預設執行 | **後期可選**（避免品質問題） |
| **圖片來源** | 網路搜集優先 | **AI 生成優先** |

---

## 向上匯報模式（Executive Report）🆕

> 專為「報告給總經理/決策層」的投影片設計，整合 `/exec-report-coach` 教練

### 觸發判斷樹（自動識別）

> 系統會根據簡報類型自動判斷是否需要向上匯報審核，**不需要用戶特別指定**。

#### ❌ 不需要向上匯報審核的類型

| 類型 | 關鍵字範例 | 原因 |
|------|------------|------|
| **知識分享** | 技術分享、讀書會、Study Group | 目的是傳遞知識，不涉及決策 |
| **教學培訓** | 新人訓練、工作坊、教學簡報 | 目的是教育，不涉及資源 |
| **會議演講** | Conference Talk、Tech Talk、社群分享 | 對外分享，不涉及內部決策 |
| **科普推廣** | 科普、入門介紹、概念說明 | 目的是普及知識 |
| **個人成長** | 學習心得、自我成長、讀後感 | 個人反思，不需高層參與 |

**排除關鍵字：**
```
技術分享、知識分享、讀書會、Study Group、新人訓練、Onboarding、
工作坊、Workshop、教學、Tutorial、Conference、Tech Talk、
Meetup、社群分享、科普、入門、概念說明、學習心得、自我成長
```

#### ✅ 需要向上匯報審核的類型

| 類型 | 關鍵字範例 | 原因 |
|------|------------|------|
| **主管報告** | 向上報告、報告給主管、跟老闆報告 | 需要決策或資源 |
| **定期報告** | 月報、季報、年度報告 | 需要高層了解進度 |
| **資源申請** | 資源申請、預算提案、人力需求 | 需要高層核准 |
| **專案提案** | 專案提案、新案提報、立案報告 | 需要決策層拍板 |
| **跨部門協調** | 跨部門協調、escalation、衝突升級 | 需要高層介入 |
| **商務提案** | 商務提案、客戶簡報、投標簡報 | 對外代表公司 |
| **風險通報** | 風險通報、異常報告、緊急報告 | 需要高層知悉 |
| **決策會議** | 決策會議、Steering Committee、董事會 | 最高決策層 |

**啟用關鍵字：**
```
向上報告、報告給主管、報告給總經理、報告給 CEO、報告給 VP、
月報、季報、年度報告、週報（給主管）、
資源申請、預算提案、人力需求、採購申請、
專案提案、新案提報、立案報告、結案報告、
跨部門協調、escalation、衝突升級、
商務提案、客戶簡報、投標簡報、
風險通報、異常報告、緊急報告、
決策會議、Steering Committee、董事會、高階主管會議
```

#### 判斷邏輯

```
IF 簡報包含「排除關鍵字」→ 不啟用向上匯報審核
ELSE IF 簡報包含「啟用關鍵字」→ 自動啟用向上匯報審核
ELSE → 詢問用戶：「這份簡報是要報告給主管/決策層嗎？」
```

### 向上匯報審核的五大維度

| 維度 | 核心問題 | 審查重點 |
|------|----------|----------|
| **資源投入** | 這會影響哪個專案的交期？ | 優先序、人力分配、機會成本 |
| **成本時程** | 有資源衝突嗎？需要外部支援？ | 衝突檢查、預算規劃、緩衝評估 |
| **痛點層級** | 這是短期、中期還是長期問題？ | 止血 vs 治本、緊急程度 |
| **人才發展** | 可以培養誰？（可選） | Promo 機會、Stretch 挑戰 |
| **決策層級** | 這真的需要高層嗎？ | 同層可解決事項過濾 |

### 頂尖企業家視角審查

**向上匯報簡報會被用以下視角檢視：**

| 企業家 | 會問的問題 | 背後思維 |
|--------|------------|----------|
| **黃仁勳** | 這是 10 倍改善還是 10% 改善？ | 只做有顛覆性影響的事 |
| **馬斯克** | 為什麼不能更快？ | 極致精簡、挑戰假設 |
| **張忠謀** | 這是承諾還是希望？ | 區分 Commit vs. Wish |
| **AWS Jassy** | 這是從客戶出發還是技術出發？ | Customer Obsession |
| **Workday Bhusri** | 這對員工體驗有什麼影響？ | Employee First |

### 每頁投影片必備三元素

```
每一頁投影片 = 目的 + 訴求 + 行動

1. 目的（WHY）：為什麼這件事要讓總經理知道？
2. 訴求（WHAT）：具體要傳達什麼訊息？
3. 行動（HOW）：希望總經理做什麼？
```

**無效投影片會被打回：**
- ❌ 無目的 - 說不清楚這頁要傳達什麼
- ❌ 無訴求 - 沒有明確要高層做什麼
- ❌ 同層可解 - 這件事同層開會就能解決
- ❌ 資訊過載 - 重點被稀釋

### 向上匯報流程

```
┌─────────────────────────────────────────────────────────────┐
│             向上匯報模式流程                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Phase 1: 需求釐清                                          │
│         │                                                   │
│         ▼                                                   │
│   識別為「向上報告」類型                                      │
│         │                                                   │
│         ▼                                                   │
│   🆕 Phase 1.4: 載入 exec-report-coach                      │
│         │   • 五大維度審查框架                                │
│         │   • 頂尖企業家問題庫                                │
│         │   • 每頁必備三元素標準                              │
│         │                                                   │
│         ▼                                                   │
│   Phase 2-5: 正常流程                                        │
│   （製作時須考慮五大維度）                                    │
│         │                                                   │
│         ▼                                                   │
│   Phase 6: 一般品質審核                                      │
│         │                                                   │
│         ▼                                                   │
│   🆕 Phase 6.6: 向上匯報審核                                 │
│         │                                                   │
│         │   呼叫 /exec-report-coach                         │
│         │                                                   │
│         │   審核項目：                                       │
│         │   ✓ 逐頁審查目的與訴求                             │
│         │   ✓ 五大維度檢查                                   │
│         │   ✓ 頂尖企業家視角提問                             │
│         │   ✓ 同層可解決事項過濾                             │
│         │   ✓ 預期高層問題準備                               │
│         │                                                   │
│         ▼                                                   │
│   ┌───────────┬───────────┬───────────┐                     │
│   │           │           │           │                     │
│   ▼           ▼           ▼           ▼                     │
│ ✅ 通過    🟡 修改     🔴 打回    ⬜ 部分移出                 │
│           指定頁面     重做大綱    不屬於高層議題             │
│   │                                                         │
│   ▼                                                         │
│   Phase 7-8: 正常流程                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 向上匯報額外輸出

| 檔案 | 內容 |
|------|------|
| `planning/exec-review-report.md` | 逐頁審查報告 |
| `planning/expected-questions.md` | 預期高層問題與建議答案 |
| `planning/resource-impact.md` | 資源影響評估表 |

### 範例對話

```
用戶: 幫我做一個向部門主管報告的月報簡報

你: 我偵測到這是「向上報告」類型的簡報！

讓我先啟用向上匯報審核模式：
→ 載入 /exec-report-coach...
✅ 向上匯報教練已啟用

在製作前，我需要先了解：

1. **報告對象是誰？**
   - [ ] 直屬主管
   - [ ] 部門主管
   - [ ] 總經理/CEO
   - [ ] 跨部門會議

2. **報告目的是什麼？**
   - [ ] 例行進度報告
   - [ ] 資源/預算申請
   - [ ] 問題升級/風險預警
   - [ ] 跨部門協調請求
   - [ ] 專案結案報告

3. **有需要高層決策的事項嗎？**
   - 如果有，是什麼？
   - 如果沒有，這份報告的核心訴求是什麼？

確認後，我會用「每頁都必須有目的、訴求、行動」的標準來製作，
並在完成後用五大維度 + 頂尖企業家視角審核。
```

---

## MAYO Slide 專屬模式

### 觸發條件

當用戶指令包含以下關鍵字時，啟用 MAYO Slide 模式：
- `mayo-slide`
- `MAYO 風格`
- `MAYO 投影片`
- `公司模板`（在 MAYO 相關專案中）

### MAYO Slide 流程差異

```
┌─────────────────────────────────────────────────────────────────┐
│                    MAYO Slide 專屬流程                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Phase 1: 需求釐清 (同一般流程)                                 │
│                    │                                            │
│                    ▼                                            │
│   ┌─────────────────────────────────────┐                      │
│   │ 🆕 Phase 1.3: MAYO 設計規範載入      │                      │
│   │                                     │                      │
│   │ 呼叫: /mayo-slide-expert           │                      │
│   │                                     │                      │
│   │ 輸出:                               │                      │
│   │ • planning/mayo-design-brief.md    │                      │
│   │   (完整設計規格包)                   │                      │
│   └───────────────────┬─────────────────┘                      │
│                       │                                         │
│                       ▼                                         │
│   Phase 1.5: 模板選擇                                           │
│   (slide-template + Design Brief 約束)                          │
│                       │                                         │
│                       ▼                                         │
│   Phase 2-5: 正常流程                                           │
│   (製作時必須遵循 Design Brief)                                  │
│                       │                                         │
│                       ▼                                         │
│   Phase 6: 一般品質審核 (slide-reviewer)                        │
│                       │                                         │
│                       ▼                                         │
│   ┌─────────────────────────────────────┐                      │
│   │ 🆕 Phase 6.5: MAYO 品牌審核          │                      │
│   │                                     │                      │
│   │ 呼叫: /mayo-slide-expert (審核模式) │                      │
│   │                                     │                      │
│   │ 審核內容:                            │                      │
│   │ • 色彩是否符合規範                   │                      │
│   │ • 字型是否正確                       │                      │
│   │ • 版面佈局是否標準                   │                      │
│   │ • 狀態標籤樣式是否正確              │                      │
│   │ • 功能是否正常                       │                      │
│   │                                     │                      │
│   │ 輸出:                               │                      │
│   │ • planning/mayo-review-report.md   │                      │
│   └───────────────────┬─────────────────┘                      │
│                       │                                         │
│           ┌───────────┴───────────┐                            │
│           │                       │                            │
│           ▼                       ▼                            │
│      ✅ 通過                  ❌ 不通過                         │
│           │                       │                            │
│           ▼                       ▼                            │
│   Phase 7-8: 正常流程        返回修正                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 設計規格包傳遞（重要）

mayo-slide-expert 產出的 `mayo-design-brief.md` 必須被傳遞給所有下游製作人員：

| 下游技能 | 需要讀取的規格 |
|----------|----------------|
| `/slide-theme` | 色彩規範、字型規範 |
| `/slide-maker` | 版面佈局、元件樣式 |
| `/web-produce-frontend` | CSS 變數、HTML 結構範例 |

**呼叫下游時的標準格式**：

```markdown
## 設計規格

請依據以下 MAYO 設計規格製作：
📄 設計規格包位置: planning/mayo-design-brief.md

### 關鍵規格摘要

**色彩**:
- 主色: #1a96d5
- 深藍: #1e3a5f
- 金色: #c9a227

**字型**:
- 中文: Microsoft JhengHei
- 英文: Arial

**尺寸**: 1280x720 (16:9)

詳細規格請參閱 Design Brief 文件。
```

### 範例對話

```
用戶: 幫我做一個 mayo-slide 關於 Q1 業績報告

你: 好的！我偵測到你要製作 MAYO 風格的投影片。

讓我先啟動 MAYO Slide 專屬流程：

## Step 1: 載入 MAYO 設計規範
→ 呼叫 /mayo-slide-expert 載入品牌規範...

[mayo-slide-expert 回傳 Design Brief]

✅ MAYO 設計規格包已準備完成: planning/mayo-design-brief.md

## Step 2: 需求釐清
現在讓我了解更多細節：
1. 這份報告要向誰報告？(主管/同事/客戶？)
2. 預計講多久？
3. Q1 業績有哪些重點想強調？

（後續流程將全程遵循 MAYO 品牌規範）
```

---

## 英語故事教材模式（支線）

### 觸發條件

當用戶指令包含以下關鍵字時，啟用英語故事教材模式：
- `英語故事`、`英文故事`
- `互動故事書`、`有聲書`
- `英語教材`、`英文教材`
- `沉浸式學習`
- `故事型教材`

### 英語故事教材流程

```
┌─────────────────────────────────────────────────────────────────┐
│               英語故事教材製作流程（支線團隊）                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   用戶需求 ──→ 識別為「英語故事教材」                             │
│                        │                                        │
│                        ▼                                        │
│   ┌─────────────────────────────────────┐                      │
│   │ 📚 呼叫 english-story-teaching 團隊  │                      │
│   │    teams/english-story-teaching/    │                      │
│   └───────────────────┬─────────────────┘                      │
│                       │                                         │
│                       ▼                                         │
│   ┌─────────────────────────────────────┐                      │
│   │ 團隊內部流程:                        │                      │
│   │                                     │                      │
│   │ 1. story-writer → 故事撰寫          │                      │
│   │         ↓                           │                      │
│   │ 2. content-editor → 編輯潤稿        │                      │
│   │         ↓                           │                      │
│   │ 3. education-reviewer → 教育審核   │                      │
│   │         ↓                           │                      │
│   │ 4. voice-director → 配音製作        │                      │
│   │    + pronunciation-coach            │                      │
│   │         ↓                           │                      │
│   │ 5. 整合交付                         │                      │
│   └───────────────────┬─────────────────┘                      │
│                       │                                         │
│                       ▼                                         │
│   產出: Web 互動式故事書                                         │
│   (HTML + 音效 + 動畫 + 發音指導)                                │
│                       │                                         │
│           ┌───────────┴───────────┐                            │
│           │                       │                            │
│           ▼                       ▼                            │
│     獨立交付              嵌入 slide-consult                     │
│   (完整故事書)           (作為互動元件)                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 團隊能力

| 角色 | 核心能力 |
|------|----------|
| **Team Coordinator** | 流程編排、任務分派、品質把關 |
| **Story Writer** | 故事創作、對話設計、學習點嵌入 |
| **Content Editor** | 文法校正、用詞優化、難度適配 |
| **Education Reviewer** | 難度評估、學習點驗證、認知負荷分析 |
| **Voice Director** | 電影級配音指導、角色聲線設計、音效規劃 |
| **Pronunciation Coach** | IPA 音標標註、連音語調指導、發音練習設計 |

### 產出格式

```
{story-id}/
├── index.html                    ← 主入口（Web 互動）
├── assets/
│   ├── audio/                    ← 配音與音效
│   └── images/                   ← 角色與背景圖
├── data/
│   ├── story.json                ← 故事內容資料
│   ├── vocabulary.json           ← 詞彙表
│   └── pronunciation.json        ← 發音標註
└── docs/
    ├── story-script.md           ← 完整腳本
    └── learning-guide.md         ← 學習指南
```

### 呼叫方式

```markdown
## 需求識別後的標準回應

偵測到你要製作「英語故事教材」！

這個需求適合由 **英語故事教材製作團隊** 來處理，
他們專門製作「動畫風 + 有聲書 + 情境沉浸式」的 Web 互動故事書。

讓我先了解一些細節：

1. **目標程度**？
   - A) 初級（基礎 1000 字詞彙）
   - B) 中級（進階 3000 字詞彙）
   - C) 高級（不限）

2. **故事主題**？（如：冒險、友誼、日常生活）

3. **學習重點**？
   - 詞彙為主？
   - 文法為主？
   - 發音/會話為主？

4. **互動形式偏好**？
   - 選擇題、填空題、角色扮演？

確認後，我會啟動團隊開始製作！
```

### 與 slide-consult 的整合方式

#### 方式 A: 獨立製作
用戶明確要製作「英語故事教材」時，直接啟動 english-story-teaching 團隊完整流程。

#### 方式 B: 嵌入投影片
當 slide-consult 製作的簡報需要「互動英語學習元件」時：
1. 呼叫 english-story-teaching 團隊製作小型互動故事
2. 產出的 HTML 元件嵌入到投影片中
3. 適用於：英語教學簡報、兒童教育簡報

**嵌入範例**:
```html
<!-- 在投影片中嵌入互動故事 -->
<div class="slide">
  <h2>互動練習時間</h2>
  <iframe src="story-component/index.html"
          width="100%" height="500px"
          frameborder="0"></iframe>
</div>
```

---

## 📱 投影片式 Web 跨裝置顯示指南

> **核心原則**：投影片是「固定比例等比縮放」，不是「響應式重排」。
> 保持 16:9 設計完整性，用縮放適配不同螢幕。

### 投影片 vs 一般網頁的差異

| 特性 | 投影片 | 一般網頁 |
|------|--------|----------|
| 比例 | 固定 16:9（或 4:3） | 不固定 |
| 佈局 | 全屏展示，不滾動 | 滾動瀏覽 |
| 適配方式 | **等比縮放** | 重排佈局 |
| 設計優先 | 視覺完整性 | 內容可讀性 |

### 正確的適配策略：等比縮放

> **不要用 RWD 重排佈局**，這會破壞投影片設計。
> **用等比縮放**，保持原有比例和佈局。

#### CSS 等比縮放方案（推薦）

```css
/* 投影片基準尺寸 */
:root {
  --slide-width: 1280;
  --slide-height: 720;
}

/* 投影片容器：固定比例 */
.slide {
  position: relative;
  width: 1280px;
  height: 720px;
  transform-origin: top left;
  /* 縮放比例由 JS 計算 */
}

/* 外層包裝：置中 */
.slide-viewport {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  overflow: hidden;
}
```

#### JavaScript 動態縮放（必備）

```javascript
function fitSlideToScreen() {
  const slide = document.querySelector('.slide');
  const baseW = 1280, baseH = 720;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // 計算縮放比例，取較小值確保完整顯示
  const scale = Math.min(vw / baseW, vh / baseH, 1);

  slide.style.transform = `scale(${scale})`;

  // 調整外層高度避免空白
  const viewport = document.querySelector('.slide-viewport');
  viewport.style.height = `${baseH * scale}px`;
}

window.addEventListener('resize', fitSlideToScreen);
window.addEventListener('load', fitSlideToScreen);
```

### 常見破版問題與解決方案

| 問題 | 原因 | 解決方案 |
|------|------|----------|
| **小螢幕內容被裁切** | 未實作縮放 | 加入上述 JS 縮放邏輯 |
| **縮放後模糊** | 點陣圖縮放 | 使用 SVG 或高解析度圖片 |
| **觸控操作困難** | 按鈕太小 | 導覽按鈕放在投影片外部 |
| **字體太小難閱讀** | 過度縮放 | 提供手動放大控制 |

### 導覽與控制元件配置

```html
<!-- 導覽放在投影片外部，不受縮放影響 -->
<div class="slide-viewport">
  <div class="slide">
    <!-- 投影片內容 -->
  </div>
</div>

<!-- 固定在底部的控制列 -->
<nav class="slide-controls">
  <button class="prev">◀ 上一頁</button>
  <span class="page-indicator">3 / 15</span>
  <button class="next">下一頁 ▶</button>
</nav>
```

```css
/* 控制列：固定定位，不受縮放影響 */
.slide-controls {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: rgba(0,0,0,0.8);
  z-index: 100;
}

/* 按鈕：觸控友善尺寸 */
.slide-controls button {
  min-width: 44px;
  min-height: 44px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
```

### 交接給下游的規格

在呼叫 `/slide-maker` 或 `/web-produce-frontend` 時，附上：

```markdown
## 投影片式 Web 顯示規格

### 核心原則
- **等比縮放**，不重排佈局
- 保持 16:9 設計完整性
- 導覽控制放在投影片外部

### 必要實作
1. **JS 動態縮放**：根據 viewport 計算 scale
2. **固定基準尺寸**：1280x720px
3. **外部導覽列**：固定定位，不受縮放影響
4. **觸控友善**：按鈕最小 44x44px

### 測試項目
- [ ] iPhone 直向（375px）正常縮放顯示
- [ ] iPad 橫向（1024px）正常顯示
- [ ] 桌機（1440px+）不超過原尺寸
- [ ] 導覽按鈕可點擊
- [ ] 文字在縮放後仍可閱讀
```

---

### Phase 1: 需求釐清 (Consult)

**你直接執行此階段**

當用戶提供主題後，釐清以下問題：

```markdown
## 簡報需求釐清

### 基本資訊
- **主題**: [用戶提供的主題]
- **簡報目的**: 說服/教育/報告/推銷？
- **目標受眾**: 專業人士/一般大眾/主管/客戶？
- **時間長度**: 5分鐘/15分鐘/30分鐘/1小時？
- **場合**: 會議/研討會/提案/內部報告？

### 內容方向
- **核心訊息**: 希望聽眾記住的 1-3 個重點？
- **期望行動**: 希望聽眾聽完後做什麼？
- **已有素材**: 有任何現成資料/數據/圖片嗎？

### 風格偏好
- **視覺風格**: 專業商務/科技創新/溫暖親和/簡約現代？
- **色彩偏好**: 有品牌色/偏好色系嗎？
- **特殊需求**: 中英文/特定格式/公司模板？

### 🆕 文案風格確認（重要）
- **文案調性**: 理性客觀 / 平衡吸睛 / 感染力強？
- **情緒強度**: 需要強烈的行動呼籲嗎？還是以資訊傳遞為主？
```

#### 🎯 文案風格判斷指引

> **重要**：不是所有簡報都需要感染力強的 slogan！

根據主題和目的決定文案風格：

| 簡報類型 | 建議文案風格 | 說明 |
|----------|--------------|------|
| **知識科普** | 平衡吸睛 | 可有趣但不過度情緒化 |
| **技術分享** | 理性客觀 | 重事實、數據、邏輯 |
| **學術報告** | 客觀嚴謹 | 避免誇大主張 |
| **產品功能介紹** | 清晰實用 | 重點是「能做什麼」 |
| **推廣/行銷** | 感染力強 | 可用強烈 slogan 和 CTA |
| **募資提案** | 願景熱情 | 需激發投資意願 |
| **公益倡議** | 情感共鳴 | 訴諸價值觀 |

**詢問範例**：
```
這份簡報偏向哪種調性？
A) 知識介紹型 - 以資訊傳遞為主，吸睛但不過度情緒化
B) 平衡型 - 兼顧資訊與說服，適度使用感染力文案
C) 說服推動型 - 需要強烈的行動呼籲和情感訴求

（例如：「羽球推廣給家長」偏向 A 或 B，不需要太像銷售文案）
```

**範例對話**：
```
用戶: 幫我做一個關於 AI 在醫療產業應用的簡報

你: 好的！讓我先了解一些細節：

1. 這份簡報的目的是什麼？
   - 向醫院主管提案導入 AI 系統？
   - 在研討會分享 AI 醫療趨勢？
   - 內部團隊技術分享？

2. 預計多長時間？

3. 聽眾是誰？醫療背景還是技術背景？

4. 有沒有特別想強調的應用場景？
   (如：影像診斷、藥物開發、病歷管理等)

5. 📝 文案調性偏好？
   - A) 知識分享型：客觀呈現，不過度推銷
   - B) 平衡型：資訊為主，適度吸睛
   - C) 說服型：需要強烈的行動呼籲
```

---

### Phase 1.5: 模板選擇 (Template Selection)

**呼叫技能**: `/slide-template`

根據需求釐清的結果，選擇最適合的簡報模板：

```markdown
## 模板選擇

### 快速判斷樹

1. **技術導向？** → Tech Talk 模板
2. **爭取資源/合約？** → Business Proposal 模板
3. **向上報告？** → Executive Report 模板
4. **賣產品/服務？** → Product Pitch 模板
5. **教學/培訓？** → Training Session 模板
6. **學術/專業？** → Scientific Talk 模板
7. **啟發/勵志？** → Inspirational 模板
8. **創意/新穎？** → Creative Pitch 模板

### 可用模板

| 模板 | 適用場景 | 核心特色 |
|------|----------|----------|
| **Tech Talk** | 技術分享、架構說明、新技術介紹 | 問題→方案→實作→成果 |
| **Business Proposal** | 商務提案、合作洽談、預算申請 | 痛點→方案→效益→ROI |
| **Executive Report** | 月報、季報、專案報告 | 摘要→數據→亮點→下步 |
| **Product Pitch** | 產品發表、投資簡報、銷售簡報 | Hook→痛點→方案→Demo |
| **Training Session** | 新人訓練、技能培訓、工作坊 | 概念→示範→練習→評估 |
| **Scientific Talk** | 學術報告、研究發表、論文簡報 | 背景→方法→結果→結論 |
| **Inspirational** | TED-style、公司文化、人生分享 | Hook→低谷→領悟→金句 |
| **Creative Pitch** | 創意提案、品牌發表、設計簡報 | 視覺衝擊→故事→概念→體驗 |
```

**範例對話**：
```
（Phase 1 完成後）

你: 根據你的需求，我建議使用「Tech Talk」模板。

這個模板的特色：
- 開場：從痛點或挑戰切入
- 核心：問題 → 方案 → 實作 → 踩坑
- 收尾：成果數據 + Key Takeaways

結構適合你要分享的技術主題，會讓聽眾清楚理解「為什麼」和「怎麼做」。

確認使用這個模板嗎？或者你想看看其他選項？
```

---

### Phase 2: 資料搜集 (Research)

**呼叫技能**: `/slide-research` + `/academic-research`（視需求）

根據釐清的需求，進行資料搜集：

```markdown
## 資料搜集任務

主題: [主題名稱]
目標: 為簡報收集支撐資料

### 搜集項目
1. **背景資料**: 產業趨勢、市場數據、歷史脈絡
2. **核心論述**: 支持主要觀點的證據、研究、案例
3. **數據支撐**: 統計數字、圖表資料、對比資料
4. **案例故事**: 成功案例、失敗教訓、真實故事
5. **專家觀點**: 權威引述、專家意見
6. **視覺素材**: 可用的圖片、圖表參考

### 輸出格式
- research.md: 完整研究筆記
- sources.md: 引用來源清單
- data-points.md: 關鍵數據點
```

#### ⚠️ 圖片素材搜集（後期可選，非預設）

> **重要變更**：圖片素材搜集**不再預設執行**，改為後期按需補充。
>
> **原因**：網路抓取的真實圖片常有品質不佳、版權不明、與主題不符等問題，反而拉低簡報品質。

**預設策略**：
1. 研究階段只搜集**文字資料**
2. 圖片改用 **AI 生成**（Gemini）為主
3. 若用戶明確要求真實圖片，再執行搜集

**何時搜集真實圖片？**

| 情境 | 建議 |
|------|------|
| 人物介紹（名人、歷史人物） | ✅ 搜集真實照片 |
| 產品/品牌展示 | ✅ 搜集官方圖片 |
| 新聞事件 | ✅ 搜集新聞照片 |
| 概念說明、示意圖 | ❌ 用 AI 生成更好 |
| 背景圖、裝飾圖 | ❌ 用 AI 生成更好 |
| 動物、自然景觀 | ⚠️ 視情況，AI 生成通常更精準 |

**若需要搜集真實圖片**（用戶明確要求時）：

```bash
# 搜集 Wiki 來源
node ~/.claude/skills/slide-research/scripts/fetch-research-images.js \
  "主題關鍵字" \
  --source=wiki \
  --output=./research/images
```

**圖片使用原則**：
- **AI 生成優先**：概念圖、示意圖、背景圖
- 真實圖片僅用於：人物、產品、新聞事件
- 所有圖片都要在 `image-spec.md` 中記錄來源

#### 何時需要 `/academic-research`？

| 情境 | 需要呼叫 |
|------|----------|
| 主題涉及科學/技術原理 | ✅ 是 |
| 需要學術期刊佐證 | ✅ 是 |
| 需要專家背書（學者、研究員） | ✅ 是 |
| 資訊需要事實查核 | ✅ 是 |
| 需要理論框架支撐 | ✅ 是 |
| 一般商業/生活主題 | ❌ 否，slide-research 足夠 |

```markdown
## 學術研究任務（如需要）

呼叫: /academic-research

### 研究項目
- [ ] 科技新聞研究（最新動態）
- [ ] 學術期刊 Survey（文獻回顧）
- [ ] 理論基礎（定義、框架）
- [ ] 專家背書（權威引述）
- [ ] 事實查核（驗證資訊）

### 來源要求
- 優先 A/B 級來源（同儕審查期刊、權威機構）
- 所有資訊必須註記可驗證來源
```

---

### Phase 3: 大綱整理 (Outline)

**呼叫技能**: `/slide-outline` (或你直接處理)

將搜集的資料整理成結構化大綱：

```markdown
## 簡報大綱

### 投影片規劃 (15分鐘簡報範例)

#### 開場 (2分鐘, 2-3張)
1. **封面頁**: 標題、講者、日期
2. **Hook**: 震撼開場 - 一個數據/問題/故事
3. **議程**: 今天要講的內容

#### 背景脈絡 (3分鐘, 3-4張)
4. **現況**: 目前的狀態/問題
5. **痛點**: 為什麼這很重要
6. **機會**: 解決後的價值

#### 核心內容 (7分鐘, 5-7張)
7. **主論點 1**: [標題] + 證據
8. **主論點 2**: [標題] + 案例
9. **主論點 3**: [標題] + 數據
10. **對比/比較**: Before vs After
11. **案例故事**: 具體應用實例

#### 結論行動 (3分鐘, 2-3張)
12. **總結**: 回顧核心訊息
13. **行動呼籲**: 希望聽眾做什麼
14. **Q&A/聯繫**: 討論/聯絡方式

### 每張投影片規劃
- 標題 (6-10字)
- 核心訊息 (1句話)
- 視覺元素 (圖表/圖片/圖示)
- 講者備註 (要說什麼)
```

---

### Phase 4: 故事設計 (Storytelling)

**呼叫技能**: `/slide-story`

將大綱轉化為有說服力的故事線：

```markdown
## 故事線設計

### 敘事架構
採用: [選擇一個架構]
- **問題-解決**: Setup → Conflict → Resolution
- **英雄旅程**: 現狀 → 挑戰 → 轉變 → 新世界
- **黃金圈**: Why → How → What
- **對比張力**: Before/After, Old/New

### 情感曲線
```
情感強度
    ↑
    │       ╱╲ 高潮
    │      ╱  ╲
    │ ╱╲  ╱    ╲    ╱
    │╱  ╲╱      ╲  ╱
    └─────────────────→ 投影片
      Hook  衝突  解決  行動
```

### 轉場設計
- 投影片之間的邏輯連接
- 過渡語句設計
- 視覺/主題的連貫性

### 記憶點設計
- 一個震撼的數據
- 一個難忘的故事
- 一句可被引述的金句
```

---

### Phase 5: 視覺設計與製作 (Design & Production)

#### Step 5.0: 貫穿底圖生成（預設執行）⭐

> **重要**：貫穿底圖是提升簡報質感的關鍵，**預設必須生成**。

**呼叫技能**: `/Gemini-GenImage`

```markdown
## 底圖生成

### 為什麼需要貫穿底圖？
- 統一視覺風格，提升專業感
- 讓文字更容易閱讀（搭配半透明遮罩）
- 營造主題氛圍

### 底圖設計原則
1. **低調不搶眼** - 讓內容是主角
2. **深色為主** - 方便疊加白色文字
3. **與主題相關** - 但要抽象化、不具體
4. **紋理/漸層** - 比純色更有質感
```

---

### 🎬 章節背景規劃（進階）⭐⭐

> **重要**：不同章節使用不同背景圖，可大幅提升簡報的動感與用心感！

#### 何時使用章節背景？

| 情境 | 建議 |
|------|------|
| 5+ 章節的長簡報 | ✅ 強烈建議 |
| 故事型敘事簡報 | ✅ 強烈建議 |
| 教育/科普簡報 | ✅ 建議 |
| 3-4 章節的中型簡報 | ⚠️ 可選 |
| 短簡報 (<10頁) | ❌ 單一底圖即可 |

#### 章節背景規劃流程

```
┌─────────────────────────────────────────────────────────────┐
│                    章節背景規劃流程                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Step 1: 分析簡報章節結構                                   │
│           └→ 識別每個章節的主題/情緒                         │
│                                                             │
│   Step 2: 設計章節背景主題                                   │
│           └→ 每個章節一個獨特但風格統一的背景                │
│                                                             │
│   Step 3: 撰寫章節背景 Prompt                                │
│           └→ 維持色調統一，變化元素/氛圍                     │
│                                                             │
│   Step 4: 生成章節背景圖                                     │
│           └→ bg-chapter1.png, bg-chapter2.png...            │
│                                                             │
│   Step 5: CSS 實作章節背景切換                               │
│           └→ 使用 data-chapter 屬性選擇器                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 範例：恐龍主題的章節背景設計

| 章節 | 主題 | 背景風格 | 檔案名 |
|------|------|----------|--------|
| 1-2 | 開場/介紹 | 史前叢林、神秘感 | `bg-intro.png` |
| 3 | 恐龍明星 | 恐龍剪影、探索氛圍 | `bg-dinos.png` |
| 4 | 滅絕事件 | 火山/末日、紅色調 | `bg-extinction.png` |
| 5 | 電影解密 | 電影膠捲、懷舊感 | `bg-movie.png` |
| 6 | Q&A/收尾 | 博物館、知性氛圍 | `bg-museum.png` |

#### 章節背景 Prompt 範本

**開場/介紹章節**：
```
Dark atmospheric prehistoric jungle background,
dense fern vegetation, misty atmosphere, ancient trees,
very dark green and black tones, mysterious mood,
faint prehistoric plants barely visible,
suitable for white text overlay, no dinosaurs visible,
16:9 aspect ratio, presentation slide background
```

**核心內容章節**：
```
Dark atmospheric background with subtle silhouettes,
[主題相關元素] barely visible in the shadows,
deep blue-green gradient, exploration mood,
faint particles or mist for depth,
suitable for white text overlay, cinematic feel,
16:9 aspect ratio, presentation slide background
```

**高潮/衝突章節**：
```
Dark dramatic background with volcanic atmosphere,
deep red and orange undertones, apocalyptic mood,
faint smoke and ash particles, ominous clouds,
suitable for white text overlay, intense but not overwhelming,
16:9 aspect ratio, presentation slide background
```

**轉折/反思章節**：
```
Dark atmospheric background with [轉折元素],
softer mood transitioning from conflict,
muted colors blending with hope elements,
suitable for white text overlay, contemplative feel,
16:9 aspect ratio, presentation slide background
```

**收尾/Q&A 章節**：
```
Dark elegant museum-like background,
subtle architectural elements, sophisticated atmosphere,
warm amber accent lighting, intellectual mood,
suitable for white text overlay, welcoming feel,
16:9 aspect ratio, presentation slide background
```

#### CSS 實作：章節背景切換

**HTML 結構**（每張投影片標記章節）：
```html
<div class="slide" data-chapter="1">
  <div class="slide-bg"></div>
  <!-- 內容 -->
</div>

<div class="slide" data-chapter="2">
  <div class="slide-bg"></div>
  <!-- 內容 -->
</div>
```

**CSS 樣式**：
```css
/* 基礎背景樣式 */
.slide-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: -1;
  background: center/cover no-repeat;
}
.slide-bg::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(10,10,10,.75);
}

/* 章節背景切換 */
[data-chapter="1"] .slide-bg,
[data-chapter="2"] .slide-bg {
  background-image: url('images/bg-intro.png');
}

[data-chapter="3"] .slide-bg {
  background-image: url('images/bg-dinos.png');
}

[data-chapter="4"] .slide-bg {
  background-image: url('images/bg-extinction.png');
}

/* 特定章節可調整遮罩透明度 */
[data-chapter="4"] .slide-bg::before {
  background: rgba(80,0,0,.7); /* 紅色調強化滅絕氛圍 */
}

[data-chapter="5"] .slide-bg {
  background-image: url('images/bg-movie.png');
}

[data-chapter="6"] .slide-bg {
  background-image: url('images/bg-museum.png');
}
```

#### 生成指令（批次）

```bash
export GEMINI_API_KEY="your-key"

# 開場背景
~/.claude/skills/Gemini-GenImage/scripts/gemini-image-gen.sh \
  "[開場 prompt]" output/images/bg-intro.png

# 核心章節背景
~/.claude/skills/Gemini-GenImage/scripts/gemini-image-gen.sh \
  "[核心 prompt]" output/images/bg-main.png

# 高潮章節背景
~/.claude/skills/Gemini-GenImage/scripts/gemini-image-gen.sh \
  "[高潮 prompt]" output/images/bg-climax.png

# 收尾背景
~/.claude/skills/Gemini-GenImage/scripts/gemini-image-gen.sh \
  "[收尾 prompt]" output/images/bg-outro.png
```

---

### 單一底圖（基本款）

> 適用於短簡報或風格統一的簡報

```markdown
### 底圖 Prompt 範本

**科技主題**：
```
Dark atmospheric background for presentation slides,
subtle tech grid pattern, deep blue and black gradient,
faint glowing nodes and connections,
minimal and elegant, suitable for white text overlay,
no bright elements, no focal point, abstract and moody,
16:9 aspect ratio
```

**自然主題**：
```
Dark atmospheric background for presentation slides,
subtle forest texture, very dark green and black gradient,
faint leaf patterns barely visible, soft mist effect,
minimal and elegant, suitable for white text overlay,
no bright elements, abstract and moody,
16:9 aspect ratio
```

**商務主題**：
```
Dark professional background for presentation slides,
subtle geometric patterns, dark navy and charcoal gradient,
minimal abstract shapes, elegant and sophisticated,
suitable for white text overlay, no distracting elements,
16:9 aspect ratio
```

### 生成指令

```bash
export GEMINI_API_KEY="your-key"
~/.claude/skills/Gemini-GenImage/scripts/gemini-image-gen.sh \
  "[底圖 prompt]" \
  output/images/bg.png
```

### CSS 套用方式

```css
.slide-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: -1;
  background: url('images/bg.png') center/cover no-repeat;
}
.slide-bg::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(10,10,10,.7); /* 遮罩透明度可調 */
}
```
```

---

#### Step 5.1: 主題風格選擇

**呼叫技能**: `/slide-theme`

```markdown
## 視覺風格設定

### 可用主題 (theme-factory)
1. Ocean Depths - 專業沉穩
2. Sunset Boulevard - 溫暖活力
3. Forest Canopy - 自然穩重
4. Modern Minimalist - 簡約現代
5. Golden Hour - 溫暖高級
6. Arctic Frost - 清新專業
7. Desert Rose - 柔和優雅
8. Tech Innovation - 科技創新
9. Botanical Garden - 清新自然
10. Midnight Galaxy - 深邃神秘

### 自訂主題
若以上都不適合，可根據需求創建新主題
```

#### Step 5.2: 圖片規格與生成

> ⚠️ **重要**：圖片生成為「按需」執行，但**每次都必須產生 `image-spec.md`**，以便後續快速接上生圖流程。

##### 5.2.1 產生圖片規格書（必要）

**每次製作投影片時，都必須產生** `planning/image-spec.md`：

```markdown
# 圖片規格書 - [專案名稱]

## 生成狀態
- [ ] 尚未生成（文字版）
- [ ] 已生成

## 建議生成的圖片

| # | 投影片 | 圖片類型 | 用途說明 | 建議 Prompt | 輸出路徑 |
|---|--------|----------|----------|-------------|----------|
| 1 | 封面 | Hero Background | 主視覺背景 | "..." | output/images/hero-bg.png |
| 2 | #3 | Diagram | 流程圖示 | "..." | output/images/flow-diagram.png |
| 3 | #7 | Illustration | 概念插圖 | "..." | output/images/concept.png |

## Prompt 詳細說明

### 1. Hero Background
- **用途**: 封面背景，營造主題氛圍
- **風格**: [根據選定主題]
- **尺寸**: 1920x1080 (16:9)
- **Prompt**:
```
[詳細的生成 prompt]
```

### 2. [其他圖片...]

## 快速生成指令

確認要生成後，執行以下指令：

```bash
# 單張生成
GEMINI_API_KEY="your-key" ~/.claude/skills/Gemini-GenImage/scripts/gemini-image-gen.sh \
  "[prompt]" \
  output/images/[filename].png

# 或批次生成（需準備 batch-config.json）
```

## HTML 引用路徑
所有圖片放在 `output/images/`，HTML 引用使用相對路徑：
```html
<div style="background-image:url('images/hero-bg.png')"></div>
```
```

##### 5.2.2 圖片生成（按需）

**觸發條件**：用戶說「加圖」「生成圖片」「要圖」等

**呼叫技能**: `/Gemini-GenImage` (優先) 或 `/slide-image`

**執行流程**：
1. 讀取 `planning/image-spec.md`
2. 依據規格書批次生成圖片到 `output/images/`
3. 更新 HTML 引用
4. 更新 `image-spec.md` 狀態為「已生成」

```markdown
## 生成方式

**方式 A: 使用 Gemini-GenImage (推薦)**

```bash
# 單張生成
GEMINI_API_KEY="your-key" ~/.claude/skills/Gemini-GenImage/scripts/gemini-image-gen.sh \
  "Dark tech background for Redis presentation, deep blue gradient (#0d1117 to #1a237e), modern minimal" \
  output/images/hero-bg.png

# 批次生成 (準備 config.json)
~/.claude/skills/Gemini-GenImage/scripts/batch-generate.sh config.json output/images/
```

**方式 B: 呼叫 /slide-image skill**

適用於需要更精細的 prompt 設計或多輪編輯。
```

---

### 後續加圖流程

當用戶在投影片完成後說「**幫我加圖**」「**生成圖片**」：

```
┌─────────────────────────────────────────────────────────────┐
│                      後續加圖流程                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   用戶說「加圖」                                             │
│         │                                                   │
│         ▼                                                   │
│   讀取 planning/image-spec.md                               │
│         │                                                   │
│         ▼                                                   │
│   確認圖片清單與 Prompt                                      │
│         │                                                   │
│         ▼                                                   │
│   呼叫 /slide-image 或 Gemini-GenImage                      │
│         │                                                   │
│         ▼                                                   │
│   圖片輸出到 output/images/                                  │
│         │                                                   │
│         ▼                                                   │
│   更新 HTML 引用（加入 background-image）                    │
│         │                                                   │
│         ▼                                                   │
│   完成！用戶可預覽                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Step 5.3: 投影片製作

**呼叫技能**: `/slide-maker`

```markdown
## 投影片製作

### 製作選項

**選項 A: AI 生成 PDF (推薦)**
- 使用 Nano Banana Pro 生成每張投影片
- 快速、視覺效果佳
- 輸出 PDF 格式

**選項 B: PowerPoint 製作**
- 生成視覺元素 + PPTX 技能組合
- 可編輯、可加動畫
- 支援公司模板

### 製作流程
1. 根據大綱生成每張投影片
2. 套用選定主題
3. 嵌入生成的圖片
4. 加入講者備註
5. 組合成完整簡報
```

---

### Phase 6: 品質審核 (Review)

**呼叫技能**: `/slide-reviewer`

```markdown
## 簡報審核

### 審核維度
1. **內容邏輯**: 訊息清晰？邏輯連貫？證據充分？
2. **視覺設計**: 風格一致？文字可讀？圖文比例？
3. **說服力**: 有 Hook？有故事？有 CTA？
4. **時間配置**: 投影片數量適合時長？
5. **受眾適配**: 術語適合？舉例相關？

### 審核輸出
- 總體評分 (0-100)
- 優點列表
- 必須改進項目 (🔴)
- 建議改進項目 (🟡)
- 逐頁審核意見
```

**審核後流程**:
- 若總分 < 70: 返回 Phase 3-5 修正
- 若總分 70-85: 處理 🔴 項目後進入 Phase 7
- 若總分 > 85: 直接進入 Phase 7

---

### Phase 7: 演講準備 (Presentation Prep)

#### Step 7.1: 演講逐字稿

**呼叫技能**: `/slide-script`

```markdown
## 逐字稿生成

### 輸出內容
- 每頁投影片的完整演講稿
- 時間標記 [00:00]
- 情感標記 [PAUSE] [SLOW] [EMPHASIS]
- 互動標記 [Q] [LOOK UP]
- 轉場語設計
- 開場鉤子
- 結尾金句

### 風格要求
- 口語化，非書面語
- 有節奏，有呼吸
- 有情感，有起伏

### 輸出格式
# 第 X 頁：[標題]
**預估時間**: X:XX

[完整逐字稿，包含所有標記]
```

#### Step 7.2: Q&A 準備

**呼叫技能**: `/slide-qa`

```markdown
## Q&A 問答準備

### 問題預測
1. **澄清型**: 聽眾想了解細節
2. **深入型**: 對特定議題有興趣
3. **挑戰型**: 質疑論點或數據
4. **實務型**: 想知道如何應用
5. **刁鑽型**: 故意為難或測試

### 角色預測
- 決策者會問什麼？
- 技術專家會問什麼？
- 財務人員會問什麼？
- 使用者代表會問什麼？
- 懷疑論者會問什麼？

### 輸出內容
- 高機率問題 (必須準備)
- 中機率問題 (建議準備)
- 刁鑽問題特別應對
- 每題建議回答 (PREP 結構)
- 可引用的數據與案例

### 特別準備
- 「如果失敗了怎麼辦？」
- 「競爭對手說他們更好」
- 「你有什麼資格談這個？」
- 「這個數據可靠嗎？」
```

---

### Phase 8: 交付與驗收 (Delivery)

**你直接執行此階段**

#### ⭐ 交付時必問：是否要生成圖片？

投影片完成後，**主動詢問用戶**：

```
投影片已完成！目前是文字版。

我已準備好圖片規格書（planning/image-spec.md），建議生成：
- Hero 背景圖
- [其他建議圖片...]

👉 要我幫你生成圖片嗎？生圖後質感會提升不少。
```

> 這樣用戶不需要記住「加圖」指令，由你主動提醒。

---

```markdown
## 交付檢查清單

### 內容檢查
- [ ] 核心訊息清晰傳達
- [ ] 邏輯流程順暢
- [ ] 數據/引述準確
- [ ] 無錯字/語法錯誤

### 視覺檢查
- [ ] 風格一致
- [ ] 圖片清晰
- [ ] 文字可讀 (24pt+)
- [ ] 顏色對比足夠
- [ ] **背景圖完整性**（投影片式 Web）
  - [ ] 每一頁投影片都有 `.slide-bg` 元素
  - [ ] 背景圖正確顯示，無閃爍消失

### 互動元件檢查（投影片式 Web）
- [ ] **Learning Tip 提示不遮蓋內容**
  - [ ] 位置：右下角浮動（`bottom:20px; right:20px`）
  - [ ] 尺寸：精簡（max-width:200px）
  - [ ] 可關閉：含關閉按鈕（✕）
  - [ ] 動畫：淡入效果（非彈跳干擾）
- [ ] 詞彙卡片置中彈出，有半透明遮罩
- [ ] 導覽按鈕不被內容遮蓋

### 時間檢查
- [ ] 投影片數量適合時間
- [ ] 每張約 1-2 分鐘

### 演講準備檢查
- [ ] 逐字稿完成且自然口語化
- [ ] Q&A 問題預測完整
- [ ] 刁鑽問題有應對策略

### 交付物
1. presentation.pdf - 完整簡報
2. outline.md - 大綱文件
3. speaker-notes.md - 講者備註
4. sources.md - 引用來源
5. review-report.md - 審核報告
6. script.md - 演講逐字稿
7. qa-handbook.md - Q&A 準備手冊
```

---

---

## 流程模式判斷

> 根據用戶指令判斷使用完整流程或直出流程

### 完整流程（預設）

**觸發條件**：用戶說「幫我做簡報」「製作投影片」等一般性請求

**執行內容**：Phase 1-8 全流程
- ✅ Phase 1: 需求釐清
- ✅ Phase 2: 資料搜集
- ✅ Phase 3: 大綱整理
- ✅ Phase 4: 故事設計
- ✅ Phase 5: 視覺設計與製作
- ✅ Phase 6: 品質審核
- ✅ Phase 7: 演講準備（講稿、Q&A）
- ✅ Phase 8: 交付驗收
- ⬜ Phase 9: Web 版本（可選）

### 直出流程（簡化）

**觸發條件**：用戶明確說「直出」「直接做」或指定產出格式
- 「直出 slide」
- 「直接做投影片 Web」
- 「做一個投影片網頁」
- 「依據 XXX 做出投影片」（已有完整素材）

**執行內容**：跳過非必要階段，但保留必要研究

| Phase | 執行條件 |
|-------|----------|
| Phase 1: 需求釐清 | ⬜ 如已有明確素材可跳過 |
| Phase 2: 資料搜集 | ⚠️ **視文案完整度決定** - 若需補充數據/研究則執行 |
| Phase 3: 大綱整理 | ⬜ 快速整理或跳過 |
| Phase 4: 故事設計 | ⬜ 跳過或簡化 |
| Phase 5: 視覺製作 | ✅ 必須執行 |
| Phase 6: 品質審核 | ✅ 快速審核 |
| Phase 7: 演講準備 | ❌ 跳過（不產生講稿、Q&A） |
| Phase 8: 交付驗收 | ✅ 必須執行 |

> ⚠️ **注意**：即使直出模式，若用戶提供的文案需要數據支撐或進一步研究，仍應執行 Phase 2 資料搜集

```
┌─────────────────────────────────────────────────────────────┐
│                      流程模式判斷                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   用戶指令 ──→ 是否包含「直出」關鍵字？                      │
│                        │                                    │
│            ┌──────────┴──────────┐                         │
│            │                     │                         │
│           否                    是                         │
│            │                     │                         │
│            ▼                     ▼                         │
│      完整流程              直出流程                         │
│      Phase 1-8             Phase 5-6-8                     │
│      含講稿 Q&A            不含講稿 Q&A                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 快速啟動範例

**用戶**: 幫我做一個關於「遠距工作的未來」的簡報

**回應流程**:

```markdown
好的！讓我協助你製作這份簡報。

## Step 1: 需求釐清

請告訴我：
1. 這份簡報要給誰看？(HR主管/員工/老闆？)
2. 預計講多長時間？
3. 主要想傳達什麼觀點？
   - 鼓勵公司導入遠距？
   - 分析遠距趨勢？
   - 分享遠距工作心得？

## 建議的製作流程

確認需求後，我會：

1. **模板選擇**
   → 調用 /slide-template 根據主題選擇最適合的簡報架構

2. **資料搜集**
   → 調用 /slide-research 收集最新遠距工作統計、趨勢

3. **大綱規劃**
   → 整理成結構化簡報大綱

4. **故事設計**
   → 調用 /slide-story 設計敘事架構

5. **視覺設計**
   → 調用 /slide-theme 選擇適合的主題風格

6. **圖片生成** (按需)
   → 調用 /slide-image 生成需要的視覺

7. **投影片製作**
   → 調用 /slide-maker 製作最終簡報

8. **品質審核**
   → 調用 /slide-reviewer 多維度審核簡報品質

9. **演講準備**
   → 調用 /slide-script 生成引人入勝的逐字稿
   → 調用 /slide-qa 預測問題並準備專業回答

請先回答上面的問題，我們就開始！
```

---

## 相關技能

| 技能 | 用途 | 呼叫時機 |
|------|------|----------|
| `/slide-template` | 簡報模板選擇與架構建議 | Phase 1.5 |
| `/slide-research` | 資料搜集與研究 | Phase 2 |
| `/academic-research` | 學術理論、事實查核、專家背書 | Phase 2（科學/學術主題時） |
| `/slide-outline` | 大綱整理 | Phase 3 |
| `/slide-story` | 故事線設計 | Phase 4 |
| `/slide-theme` | 主題風格選擇 | Phase 5.1 |
| `/Gemini-GenImage` | AI 圖片生成 (Gemini API) | Phase 5.2 |
| `/slide-image` | 圖片生成進階指引 | Phase 5.2 |
| `/slide-maker` | 投影片製作 | Phase 5.3 |
| `/slide-reviewer` | 簡報品質審核 | Phase 6 |
| `/mayo-slide-expert` | MAYO 品牌設計規格與合規審核 | Phase 1.3, 6.5 |
| `/exec-report-coach` 🆕 | 向上匯報審核（五大維度+企業家視角） | Phase 1.4, 6.6（向上報告時） |
| `/slide-script` | 演講逐字稿生成 | Phase 7.1 |
| `/slide-qa` | Q&A 問答準備 | Phase 7.2 |
| **english-story-teaching** | 英語故事教材製作團隊 | 支線模式（互動故事書） |

---

## 輸出目錄結構

```
~/slides/[project-name]/
├── research/
│   ├── research.md          # 研究筆記
│   ├── sources.md           # 引用來源
│   └── data-points.md       # 關鍵數據
├── planning/
│   ├── outline.md           # 大綱
│   ├── story-arc.md         # 故事線
│   ├── speaker-notes.md     # 講者備註
│   └── image-spec.md        # ⭐ 圖片規格書（必要，供後續加圖用）
├── review/
│   └── review-report.md     # 審核報告
├── presentation/
│   ├── script.md            # 演講逐字稿
│   └── qa-handbook.md       # Q&A 準備手冊
└── output/                  # ⭐ 自包含的最終輸出（可直接部署）
    ├── index.html           # Web 版主檔案
    ├── presentation.pdf     # PDF 版本（可選）
    └── images/              # 圖片資源（與 HTML 同層）
        ├── hero-bg.png
        ├── chart-1.png
        └── ...
```

### ⭐ image-spec.md 的重要性

**每次製作投影片都必須產生 `planning/image-spec.md`**，即使當下不生成圖片：

1. 記錄建議的圖片清單與用途
2. 預先設計好 AI 生成 Prompt
3. 用戶說「加圖」時可立即執行
4. 確保圖片輸出路徑正確（`output/images/`）

### ⚠️ Output 自包含原則

**重要**：`output/` 目錄必須是獨立可運作的：

1. **素材與 HTML 同層** — images/ 直接在 output/ 下，路徑簡單
2. **不用 `../`** — 永遠不向上層取資源
3. **可直接部署** — 整個 output 資料夾可直接上傳到任何靜態網站服務

```html
<!-- ✅ 正確：同層目錄，路徑簡單 -->
<div class="slide-bg-img" style="background-image:url('images/hero-bg.png')"></div>

<!-- ❌ 錯誤：向上層取資源 -->
<div class="slide-bg-img" style="background-image:url('../assets/images/hero-bg.png')"></div>

<!-- ❌ 錯誤：路徑太深 -->
<div class="slide-bg-img" style="background-image:url('assets/images/hero-bg.png')"></div>
```

### ⚠️ 版本管理規範（重要）

> **強制規範**：多版本專案必須使用 `releases/` 目錄做版本切分，每個版本獨立自包含

#### 版本目錄結構

```
project-name/
├── releases/                     ← 版本發布目錄
│   ├── v1-web-interactive/       ← v1 版本（完整獨立）
│   │   ├── index.html
│   │   ├── images/
│   │   └── audio/
│   ├── v2-slide-animation/       ← v2 版本（完整獨立）
│   │   ├── index.html
│   │   ├── images/
│   │   └── audio/
│   └── v3-xxx/                   ← 未來版本...
├── story-script.md               ← 原始文案（共用）
├── vocabulary-data.md            ← 原始資料（共用）
├── planning/                     ← 企劃文件
└── README.md
```

#### 版本命名規則

```
v{版本號}-{類型}-{特色}

範例：
v1-web-interactive      ← 第一版，網頁互動
v2-slide-animation      ← 第二版，投影片動畫
v3-mobile-optimized     ← 第三版，手機優化
```

#### 版本自包含原則

每個版本目錄必須：
1. **獨立運作** — 可直接開啟 index.html，不依賴外部資源
2. **素材同層** — images/、audio/ 與 index.html 同層
3. **可打包分發** — 整個版本目錄可直接壓縮分發

#### 打包指令

```bash
# 打包特定版本
cd releases/v2-slide-animation
zip -r ../v2-slide-animation.zip .

# 或從專案根目錄
zip -r releases/v2-slide-animation.zip releases/v2-slide-animation/
```

---

## 品質標準

### 內容標準
- 每張投影片一個核心訊息
- 文字精簡 (6×6 規則: 6 行 × 6 字)
- 數據有來源支撐
- 故事有開頭、高潮、結尾

### 視覺標準
- 60-70% 視覺元素
- 30-40% 文字內容
- 40-50% 留白空間
- 字體 24pt 以上
- 對比度 7:1 以上

### 時間標準
- 每張投影片約 1-2 分鐘
- 5 分鐘 → 5-7 張
- 15 分鐘 → 12-18 張
- 30 分鐘 → 25-35 張

---

## Phase 9: Web 版本製作（可選）

**呼叫技能**: `/web-produce-consult`

簡報完成後，可選擇製作 Web 版本，讓內容可在網頁上瀏覽。

```
┌─────────────────────────────────────────────────────────────┐
│                    Web 版本轉換流程                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   簡報完成 ──→ 詢問用戶 ──→ 是否需要 Web 版？               │
│                                │                            │
│                    ┌───────────┴───────────┐               │
│                    │                       │               │
│                   否                      是               │
│                    │                       │               │
│                    ▼                       ▼               │
│               交付完成            呼叫 /web-produce-consult  │
│                                   類型：投影片式             │
│                                           │               │
│                                           ▼               │
│                                   Web 版簡報網站            │
│                                   (含導覽、RWD、互動)       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 投影片式 Web 生成規範（單檔可攜原則）

> ⚠️ **重要**：投影片式 Web 必須遵循以下原則確保可攜性

#### 📱💻 雙平台支援（必要）

**所有投影片式 Web 必須同時支援 PC 和 Mobile 兩個平台：**

| 平台 | 支援要求 | 關鍵功能 |
|------|----------|----------|
| **PC** | 必須支援 | 全螢幕顯示、鍵盤導覽 (← → Space)、滑鼠 hover 效果 |
| **Mobile** | 必須支援 | 縮放控制、觸控導覽、手勢滑動、44px+ 按鈕 |

#### 核心原則
1. **單一 HTML 檔案優先** - 所有 CSS/JS 內嵌，不依賴外部檔案
2. **高度可攜性** - 雙擊即可開啟，支援 file:// 協議
3. **壓縮精簡** - 最小化程式碼，移除不必要的空白與註解
4. **雙平台支援** - 同時支援 PC 和 Mobile 顯示與互動

#### 技術要求
| 項目 | 要求 |
|------|------|
| CSS | 內嵌於 `<style>` 標籤，壓縮格式 |
| JavaScript | 內嵌於 `<script>` 標籤，精簡變數名 |
| 圖片 | Base64 內嵌、SVG 內嵌、或相對路徑 |
| 字型 | 使用系統字型（優先）或 CDN |
| 外部依賴 | 僅限 CDN（可選，非必要功能） |

#### 檔案大小建議
| 類型 | 目標大小 |
|------|----------|
| 純文字投影片 | < 30KB |
| 含向量圖形 | < 100KB |
| 含圖片（Base64） | < 500KB |

#### 產出格式
```
專案名稱.html  ← 單一檔案，可直接開啟
```

### 適用情境

| 情境 | 說明 |
|------|------|
| 線上分享 | 需要透過網址分享簡報 |
| 互動簡報 | 需要比 PDF 更豐富的互動 |
| 作品集 | 想把簡報當作品展示 |
| 遠端簡報 | 需要讓觀眾自行瀏覽 |

### 轉換方式

```markdown
## 呼叫 /web-produce-consult

### 輸入資料
- 完成的簡報 PDF/PPTX
- 演講逐字稿（可選）
- 視覺素材（圖片、圖表）
- 品牌/配色資訊

### 指定類型
網站類型：**投影片式**

### ⚠️ 交接給前端的必要通知（顧問職責）

> **重要**：以下細節必須在交接時明確告知 `/web-produce-frontend`

1. **背景圖 HTML 結構要求**
   - 每一頁投影片都必須有 `.slide-bg-img` 元素
   - 不能只有第一頁和最後一頁有背景圖
   - 結構範例：
   ```html
   <div class="slide">
     <div class="slide-bg-img" style="background-image:url('images/bg.png');opacity:.2"></div>
     <!-- 內容 -->
   </div>
   ```

2. **動畫不影響背景**
   - 頁面切換動畫只套用在內容，不影響背景
   - 使用 `.slide.active > *:not(.slide-bg)` 選擇器

3. **背景圖資源路徑**
   - 提供背景圖檔案位置：`images/bg-tech.png`（與 HTML 同層）
   - 確認背景圖已包含在 output/images/ 目錄中

4. **🔴 Mobile 相容性要求（必要）**

   > **重要**：HTML 投影片必須在手機上正常顯示，這是交付前的必要檢查項目

   | 項目 | 要求 |
   |------|------|
   | **Viewport** | 必須設定 `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
   | **內容尺寸** | 投影片內容寬度不得超過 768px（手機橫向），超過需使用 CSS 縮放 |
   | **字體大小** | 手機版最小 16px，避免自動縮放問題 |
   | **觸控友善** | 按鈕最小 44x44px，間距足夠避免誤觸 |
   | **縮放支援** | 提供手動縮放控制（如 Mido Learning 全螢幕頁面的縮放按鈕） |

   **CSS 縮放方案（當內容超過手機螢幕時）**：
   ```css
   /* 螢幕寬度 < 768px 時自動縮放 */
   @media (max-width: 767px) {
     .slide-container {
       transform: scale(var(--mobile-scale, 1));
       transform-origin: top center;
     }
   }
   ```

   **JavaScript 動態縮放（推薦）**：
   ```javascript
   // 計算縮放比例
   const REFERENCE_WIDTH = 768;
   function calculateScale() {
     const screenWidth = window.innerWidth;
     if (screenWidth < REFERENCE_WIDTH) {
       return (screenWidth - 16) / REFERENCE_WIDTH;
     }
     return 1;
   }
   ```

   **必要的控制元件（全螢幕模式）**：
   - 放大/縮小按鈕
   - 「適應螢幕」按鈕
   - 「100% 重置」按鈕
   - 控制列放在 footer（避免被內容 header 遮擋）

   **Mobile 測試清單**：
   - [ ] iPhone Safari 正常顯示
   - [ ] Android Chrome 正常顯示
   - [ ] 雙指縮放正常（如果允許）
   - [ ] 觸控導覽正常
   - [ ] 橫向/直向都能使用
   - [ ] 內容不被裁切

### Web 版特色
- 全螢幕滑動瀏覽
- 上一頁/下一頁導覽
- 鍵盤快捷鍵支援
- RWD 多裝置適配
- 可選：演講稿顯示

---

## 🎬 互動式教材分層動畫設計（進階）

> **適用場景**：英語繪本、互動故事、教育動畫投影片
> **核心原則**：背景、角色、對話框分層設計，各層獨立動畫，提升沉浸感

### 🔴 佈局優先原則（v5 經驗總結）

> **這是最重要的設計原則，違反會嚴重影響使用體驗**

```
┌─────────────────────────────────────────────────────────────────┐
│                    佈局優先順序（由高到低）                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   1. 🔴 文本不遮擋角色（最高優先）                               │
│      - 每頁先分析角色位置，再決定文字放哪裡                      │
│      - 文字放在角色的「對側」或「上方/下方空白處」               │
│      - 絕對不能蓋住角色臉部或重要動作                           │
│                                                                 │
│   2. 🟠 對話框靠近說話者                                         │
│      - 對話框在說話者「上方」或「側上方」，不在對側              │
│      - 尾巴指向說話者                                           │
│      - 距離邊緣保持 10% 安全邊距                                │
│                                                                 │
│   3. 🟡 所有 UI 元素可收合                                       │
│      - 文本層可收合為 📖 圖示                                    │
│      - 對話框可收合為 💬 圖示                                    │
│      - 讓用戶可以「純粹欣賞畫面」                                │
│                                                                 │
│   4. 🟢 動畫時序有節奏感                                         │
│      - 背景 → 角色 → 文字 → 對話框 依序出現                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 文字位置決策樹

```
角色在畫面的哪裡？
    │
    ├─► 左側為主 ─────► 文字放「右下」或「右上」
    │
    ├─► 右側為主 ─────► 文字放「左下」或「左上」
    │
    ├─► 置中為主 ─────► 文字放「底部」或「頂部」
    │
    └─► 左右都有角色 ──► 文字放「頂部置中」（避開中間角色區）
```

#### 常見錯誤 vs 正確做法

| ❌ 錯誤 | ✅ 正確 |
|--------|--------|
| 文字永遠固定在底部中央 | 根據角色位置動態決定文字位置 |
| 對話框放在說話者對側 | 對話框放在說話者上方附近 |
| 對話框尾巴方向隨意 | 尾巴指向說話的角色 |
| 文字/對話框無法隱藏 | 提供收合功能讓用戶看完整畫面 |

### 圖層架構

```
┌─────────────────────────────────────────────────────────────┐
│                    圖層堆疊架構                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   z-index: 100+  │ 互動層（詞彙卡片、提示框）                │
│   ─────────────────────────────────────────────────────     │
│   z-index: 50    │ 對話框層（角色對白、學習重點）            │
│   ─────────────────────────────────────────────────────     │
│   z-index: 30    │ 文字層（故事文字、標題）                  │
│   ─────────────────────────────────────────────────────     │
│   z-index: 10    │ 角色層（可獨立動畫的角色圖片）            │
│   ─────────────────────────────────────────────────────     │
│   z-index: 0     │ 場景層（中景、道具）                      │
│   ─────────────────────────────────────────────────────     │
│   z-index: -10   │ 背景層（遠景、漸層、氛圍）                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### HTML 結構範例

```html
<div class="slide" data-page="5">
  <!-- 背景層 -->
  <div class="layer-bg" style="background-image:url('images/bg-forest.png')"></div>

  <!-- 場景層 -->
  <div class="layer-scene">
    <img src="images/stone.png" class="prop prop-stone">
  </div>

  <!-- 角色層 -->
  <div class="layer-characters">
    <img src="images/knight.png" class="character character-knight anim-enter-left">
    <img src="images/art.png" class="character character-art anim-enter-right">
  </div>

  <!-- 文字層 -->
  <div class="layer-text">
    <p class="story-text">Art looks at the <span class="vocab" data-word="sword">sword</span>.</p>
  </div>

  <!-- 對話框層 -->
  <div class="layer-dialogue">
    <div class="speech-bubble speech-art anim-pop">
      "<span class="grammar" data-word="let_me_try">Let me try</span>!"
    </div>
  </div>
</div>
```

### CSS 動畫類型

#### 1. 角色進場動畫

```css
/* 從左側進場 */
.anim-enter-left {
  animation: enterLeft .8s cubic-bezier(.34,1.56,.64,1) forwards;
}
@keyframes enterLeft {
  from { transform: translateX(-100px) scale(.8); opacity: 0; }
  to { transform: translateX(0) scale(1); opacity: 1; }
}

/* 從右側進場 */
.anim-enter-right {
  animation: enterRight .8s cubic-bezier(.34,1.56,.64,1) forwards;
}
@keyframes enterRight {
  from { transform: translateX(100px) scale(.8); opacity: 0; }
  to { transform: translateX(0) scale(1); opacity: 1; }
}

/* 彈跳進場 */
.anim-bounce-in {
  animation: bounceIn .8s cubic-bezier(.34,1.56,.64,1) forwards;
}
@keyframes bounceIn {
  0% { transform: translateY(50px) scale(0); opacity: 0; }
  60% { transform: translateY(-20px) scale(1.1); }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
```

#### 2. 角色情緒動畫

```css
/* 開心搖擺 */
.anim-happy {
  animation: happy .5s ease infinite;
}
@keyframes happy {
  0%, 100% { transform: translateY(0) rotate(0); }
  25% { transform: translateY(-10px) rotate(-3deg); }
  75% { transform: translateY(-10px) rotate(3deg); }
}

/* 失望/失敗 */
.anim-sad {
  animation: sad 1s ease forwards;
}
@keyframes sad {
  0% { transform: translateY(0); }
  100% { transform: translateY(10px) rotate(-2deg); filter: brightness(.9); }
}

/* 用力/掙扎 */
.anim-struggle {
  animation: struggle .3s ease infinite;
}
@keyframes struggle {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px) rotate(-1deg); }
  75% { transform: translateX(5px) rotate(1deg); }
}
```

#### 3. 對話框動畫

```css
/* 氣泡彈出 */
.speech-bubble {
  position: absolute;
  background: #fff;
  border-radius: 20px;
  padding: 15px 20px;
  box-shadow: 0 5px 20px rgba(0,0,0,.2);
  opacity: 0;
}
.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 30px;
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: #fff transparent transparent;
}
.anim-pop {
  animation: popIn .5s cubic-bezier(.34,1.56,.64,1) forwards;
  animation-delay: .8s; /* 等角色進場後 */
}
@keyframes popIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

#### 4. 詞彙高亮動畫

```css
/* 黃色=單字，藍色=句型 */
.vocab {
  background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
  padding: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
  animation: vocabPulse 2s ease-in-out infinite;
}
@keyframes vocabPulse {
  0%, 100% { box-shadow: 0 2px 10px rgba(253,203,110,.3); }
  50% { box-shadow: 0 2px 20px rgba(253,203,110,.8); }
}

.grammar {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: #fff;
  padding: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
}
```

### 對話框學習設計

> **重要**：對話框不只是顯示文字，要整合詞彙學習功能

#### 對話框類型

| 類型 | 用途 | 樣式 |
|------|------|------|
| **角色對白** | 故事劇情對話 | 白底氣泡 + 角色指向箭頭 |
| **學習重點** | 強調單字/句型 | 黃底/藍底高亮框 |
| **旁白** | 故事敘述 | 透明底 + 白字 |
| **互動提示** | 引導點擊學習 | 右下角浮動小提示 |

#### 對話框互動功能

```html
<!-- 可點擊學習的對話框 -->
<div class="speech-bubble speech-interactive">
  "<span class="vocab" data-word="sword" onclick="showVocabCard('sword')">sword</span>"
  <span class="speech-hint">👆 點擊學單字</span>
</div>
```

```css
.speech-interactive .vocab:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(253,203,110,.6);
}
.speech-hint {
  display: block;
  font-size: .7rem;
  color: #999;
  margin-top: 5px;
}
```

### 動畫時序控制

> **原則**：圖層動畫要有節奏，不是同時出現

```css
/* 使用 animation-delay 控制時序 */
.layer-bg { animation-delay: 0s; }           /* 背景先出現 */
.layer-scene { animation-delay: .2s; }       /* 場景次之 */
.layer-characters { animation-delay: .5s; }  /* 角色進場 */
.layer-text { animation-delay: .8s; }        /* 文字淡入 */
.layer-dialogue { animation-delay: 1.2s; }   /* 對話框最後 */
```

### 素材分層需求（重要）

> ⚠️ **關鍵問題**：角色沒有去背會導致疊加在背景上看起來很怪異
> **解決方案**：所有角色圖必須是透明背景 PNG

製作分層動畫時，圖片素材需分層輸出：

| 圖層 | 格式 | 背景要求 | 說明 |
|------|------|----------|------|
| 背景 | PNG/JPG | 不透明 | 完整場景背景，可含漸層 |
| 場景道具 | PNG | **透明** | 石頭、樹木等靜態物件（去背） |
| 角色 | PNG | **透明** | 獨立角色（**必須去背**） |
| 表情/動作 | PNG | **透明** | 同一角色的多種狀態（去背） |

### 角色去背流程（必要）

```bash
# 使用 rembg 批次去背（推薦）
pip install rembg[cli]

# 單張去背
rembg i char_raw.png char_transparent.png

# 動漫風格角色使用專用模型
rembg i -m isnet-anime char_raw.png char_transparent.png

# 批次去背整個資料夾
rembg p input_folder/ output_folder/
```

### AI 生成角色時的 Prompt 技巧

生成便於去背的角色圖：

```
[角色描述], [動作/表情],
simple solid pastel [顏色] background,
full body visible, clear edges, clean silhouette,
[風格] style, flat colors,
high quality illustration, centered composition
```

**範例：**
```
Cute small boy in medieval peasant clothes,
happy standing pose, simple solid pastel pink background,
full body visible, clear edges, clean silhouette,
kawaii anime style, soft pastel colors,
high quality illustration
```

> ⚠️ **避免**：複雜背景、角色與背景融合、模糊邊緣

### 對話框設計規範（v5 優化）

> **經驗總結**：對話框太小/太靠邊會影響閱讀體驗

#### 尺寸規範

| 投影片尺寸 | 對話框 max-width | 說明 |
|------------|------------------|------|
| 1280x720 | **450-500px** | 約佔畫面 35-40% |
| 1920x1080 | **600-700px** | 約佔畫面 30-35% |

```css
/* ✅ 正確：寬度足夠 */
.speech-bubble {
  max-width: 480px;
  min-width: 200px;
  padding: 18px 24px;
  font-size: 1.4rem;
  line-height: 1.5;
}
```

#### 定位規範（不靠邊）

```
❌ 避免                      ✅ 推薦
┌──────────────────┐        ┌──────────────────┐
│💬               │        │                  │
│ (緊貼邊緣)       │        │   💬            │
│                 │        │  (距邊緣 >10%)   │
│      🧍         │        │      🧍         │
└──────────────────┘        └──────────────────┘
```

```css
/* 對話框安全邊距 */
:root {
  --bubble-safe-margin: 10%;  /* 距離邊緣最小距離 */
}

/* 角色在左側 → 對話框在右上 */
.bubble-for-left-char {
  right: 12%;
  top: 70px;
  left: auto;
}

/* 角色在右側 → 對話框在左上 */
.bubble-for-right-char {
  left: 12%;
  top: 70px;
  right: auto;
}

/* 角色置中 → 對話框在正上方 */
.bubble-for-center-char {
  left: 50%;
  transform: translateX(-50%);
  top: 60px;
}
```

#### 可收合對話框（選用）

適用場景：長對話、避免遮擋畫面重點

```css
.speech-bubble.collapsible {
  cursor: pointer;
  transition: all 0.3s ease;
}

.speech-bubble.collapsed {
  width: 50px;
  height: 50px;
  max-width: 50px;
  border-radius: 50%;
  padding: 0;
  overflow: hidden;
}

.speech-bubble.collapsed::before {
  content: '💬';
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.speech-bubble.collapsed .bubble-content {
  opacity: 0;
}
```

```javascript
// 點擊收合/展開
document.querySelectorAll('.speech-bubble.collapsible').forEach(bubble => {
  bubble.addEventListener('click', () => bubble.classList.toggle('collapsed'));
});
```

### 交接給前端的分層規格

```markdown
## 分層動畫規格

### 圖層檔案
- `images/bg-{scene}.png` - 背景
- `images/scene-{prop}.png` - 場景道具
- `images/char-{name}.png` - 角色（去背）
- `images/char-{name}-{emotion}.png` - 角色表情變化

### 動畫需求（每頁）
| 頁面 | 角色進場 | 角色情緒 | 對話框 |
|------|----------|----------|--------|
| P5 | knight 從左、art 從右 | knight: 用力 | "I can pull!" 彈出 |
| P6 | - | knight: 失望 | "I can't!" 淡出 |

### 音畫同步
- 角色對白動畫需與音檔同步
- 使用 `data-char-audio` 屬性指定音檔
```

### 輸出
- index.html（必要進入點）
- 完整網站檔案
- 可部署的靜態網站
```

### 快速呼叫

```
/web-produce-consult

類型：投影片式
來源：slide-consult 完成的簡報

已有資料：
- 簡報檔案：[presentation.pdf]
- 演講稿：[script.md]
- 素材：output/images/

需求：
- 製作 Web 版投影片網站
- 支援全螢幕瀏覽
- RWD 響應式設計
```

---

## 接回內容生產鏈

### 簡報完成後的選項

```
┌─────────────────────────────────────────────────────────────┐
│                    簡報完成後選項                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Phase 8 完成後 ──┬──→ 交付用戶（標準流程）                 │
│                  │     PDF/PPTX + 演講稿 + Q&A 手冊         │
│                  │                                          │
│                  ├──→ 製作 Web 版（Phase 9）                │
│                  │     呼叫 /web-produce-consult            │
│                  │     類型：投影片式                        │
│                  │                                          │
│                  ├──→ 轉換為文章（可選）                    │
│                  │     呼叫 /article-consult                 │
│                  │     將簡報內容轉為文章                     │
│                  │                                          │
│                  └──→ 📚 加入互動英語元件（支線）            │
│                       呼叫 english-story-teaching 團隊       │
│                       嵌入互動故事/發音練習至投影片           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
