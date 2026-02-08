# 資料搜集方法論

> slide-research 的完整方法論，涵蓋文字研究、圖片搜集、引用管理。

---

## 核心原則

### 協作式研究

slide-research 不是「幫你查資料」的工具，而是「跟你一起研究」的夥伴。

```
❌ 傳統：「幫我查 AI 趨勢」→ AI 全部自己寫
✅ 協作：「我要做 AI 趨勢簡報」
   → AI：「聽眾是技術人還是管理層？要涵蓋哪些面向？你有什麼觀點？」
   → 用戶：「管理層，我覺得 AI Agent 會改變 SaaS」
   → AI：「收到，我來搜集 AI Agent 對 SaaS 的衝擊數據和你觀點的支撐證據。」
```

### Phase 0: 圖文同步搜集

⚠️ **最重要的原則**: 研究文字時，同步記錄有用的圖片。

```
❌ 錯誤：先搜集文字 → 寫完大綱 → 回頭找圖（已經忘了在哪看到好圖）
✅ 正確：搜尋主題 → 同時記錄文字重點 + 圖片 URL → 一起交給下游
```

---

## 研究深度層級

| 層級 | 時間 | 關鍵字數 | 來源數 | 適用 |
|------|------|---------|--------|------|
| Quick Survey | 5-10 min | 2-3 | 3-5 | 用戶熟悉主題，僅需補充數據 |
| Standard | 15-30 min | 5-8 | 8-15 | 一般簡報，需要完整論述 |
| Deep Dive | 30-60 min | 10+ | 15-30 | 學術報告、高階決策 |

**層級對應模板**:
- Quick Survey → Executive Report（補充比較基準）
- Standard → Tech Talk, Business Proposal, Product Pitch, Training
- Deep Dive → Scientific Talk, Executive Report（重大決策）

---

## 研究工具

### WebSearch — 廣泛搜尋

找到相關資源的入口。搜尋策略：

| 策略 | 範例 | 目的 |
|------|------|------|
| 主題搜尋 | "AI Agent SaaS market 2026" | 了解全貌 |
| 數據搜尋 | "AI Agent market size statistics" | 找具體數字 |
| 觀點搜尋 | "AI Agent impact analyst report" | 找專家看法 |
| 反面搜尋 | "AI Agent limitations criticism" | 找反對意見 |
| 圖片搜尋 | 注意搜尋結果中的圖表 | 找視覺素材 |

### WebFetch — 深入擷取

✅ 搜尋到好文章需要詳細內容 / 需要擷取數據表格 / 確認引用上下文
❌ 需要登入 / PDF 檔案 / 付費牆內容

### 學術資料庫

| 資料庫 | 搜尋方式 | 適用 |
|--------|---------|------|
| Google Scholar | site:scholar.google.com | 學術論文 |
| arXiv | site:arxiv.org | CS/AI 預印本 |
| PubMed | site:pubmed.ncbi.nlm.nih.gov | 生醫領域 |
| Statista | site:statista.com | 市場統計 |

---

## 圖片搜集

### 來源優先級

```
1. Wikimedia Commons (CC 授權) ← 最安全，搜尋: site:commons.wikimedia.org
2. 官方/權威新聞的圖表       ← Fair use，務必標註來源
3. 免費圖庫 (Unsplash/Pexels) ← 免費商用
4. AI 生成 (Gemini)           ← 無授權問題，Phase 5 處理
5. 網路搜尋                   ← ⚠️ 注意授權，僅內部使用
```

### 圖片記錄格式

```markdown
### 圖片 1
- 描述：AI 市場成長趨勢圖（2020-2026）
- 來源：Statista / URL: https://...
- 授權：引用標註
- 建議用途：第 3 頁，市場數據
```

---

## 引用管理

### 三種引用格式

**Inline（行內）** — 適用 Business Proposal, Product Pitch:
```
AI Agent 市場預計在 2028 年達到 $150B (Gartner, 2026)。
```

**Numbered（編號）** — 適用 Tech Talk, Executive Report:
```
AI Agent 市場預計達 $150B [1]。採用率已成長至 42% [2]。
---
[1] Gartner, "AI Agent Market Forecast", 2026
[2] McKinsey, "State of AI in Enterprise", 2026
```

**Footnote（腳註）** — 適用 Scientific Talk:
```
市場預計達 $150B¹。
─────
¹ Gartner. (2026). AI Agent Market Forecast. https://...
```

### 引用品質檢查

- ✅ 每個數據點都有來源
- ✅ 來源日期在 2 年內（除非經典文獻）
- ✅ 可信機構（Gartner, McKinsey, 學術期刊）
- ❌ 不以 Wikipedia 作為主要來源
- ❌ 不引用個人部落格作為數據來源

---

## 研究產出格式

```markdown
# 研究摘要：[主題]

## 研究範圍
- 關鍵字：[列出]
- 來源數：N 篇 | 深度：Standard | 日期：2026-02-05

## 核心發現
### 發現 1：[標題]
[2-3 句摘要] | 關鍵數據：[數字] | 來源：[引用]

### 發現 2：[標題]
...

## 對立觀點
[反面論點，確保平衡]

## 圖片素材清單
[描述、來源、授權、建議用途]

## 完整引用清單
[按編號列出]

## 建議大綱方向
[根據研究成果建議]
```

---

## 實戰範例：Tech Talk 研究流程

**場景**: 15 分鐘 Tech Talk「為什麼我們應該採用 AI Agent 架構」，聽眾為後端工程師

### Step 1: 確認研究範圍

深度: Standard / 核心問題: AI Agent 是什麼？vs 傳統 API 差異？效能數據？成功案例？踩坑經驗？

### Step 2: 搜尋（4 輪）

```
Round 1 — 廣泛搜尋
├── "AI Agent architecture pattern 2026"
├── "AI Agent vs traditional API integration"
└── 📸 同步記錄：架構對比圖

Round 2 — 數據搜尋
├── "AI Agent development productivity statistics"
├── "AI Agent adoption enterprise 2026 report"
└── 📸 同步記錄：採用率趨勢圖

Round 3 — 案例搜尋
├── "AI Agent production case study"
├── WebFetch: [案例文章詳細內容]
└── 📸 同步記錄：案例架構圖

Round 4 — 反面搜尋
├── "AI Agent limitations challenges production"
└── 📸 同步記錄：常見問題整理
```

### Step 3: 整理產出

```markdown
## 核心發現
### 發現 1：Agent 架構快速普及
42% 企業已使用 AI Agent，較 2024 年 15% 成長近 3 倍 [1]

### 發現 2：開發效率提升顯著
採用後功能開發週期平均縮短 35% [2]

### 發現 3：維運複雜度是主要挑戰
58% 團隊表示 Observability 是最大挑戰 [3]

## 圖片素材
1. Agent vs API 對比圖（Tech Blog X）
2. 採用率趨勢圖（Gartner）
3. 效率提升數據圖（GitHub）
```

### Step 4: 交付下游

研究摘要 → slide-consult (大綱) / 圖片清單 → slide-image / 引用清單 → slide-maker

---

## 常見錯誤

| ❌ 錯誤 | ✅ 正確 |
|--------|--------|
| 搜尋 "AI" 太廣泛 | 搜尋 "AI Agent architecture enterprise 2026" 聚焦 |
| 只找支持觀點的資料 | 也搜尋 limitations/challenges（承認限制更有說服力） |
| 引用 2022 年 AI 報告 | 優先 2025-2026 年數據（AI 變化太快） |
| 搜集完才找圖 | 每次開網頁同時記錄文字 + 圖片 |
| 不記錄來源 | 立刻記錄 "$150B (Gartner, 2026, URL: ...)" |

---

## 研究品質自我檢查

| # | 檢查項目 | ✅ 通過 | ❌ 需改進 |
|---|---------|--------|----------|
| 1 | 每個論點都有來源 | 2+ 獨立來源 | 有論點無來源 |
| 2 | 來源可信度 | 權威機構/期刊 | 只有部落格 |
| 3 | 時效性 | 2 年內 | 超過 3 年 |
| 4 | 平衡性 | 有正反觀點 | 只有一面 |
| 5 | 圖片搜集 | 5+ 張備選 | 0-2 張 |
| 6 | 引用格式 | 統一且完整 | 格式不一 |
| 7 | 與大綱對齊 | 每個 Section 有素材 | 有 Section 空白 |

💡 第 7 項沒通過，需要針對空白 Section 補充研究。

---

**版本**: v1.0 | **建立日期**: 2026-02-05
