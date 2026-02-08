# 匯出交付流程

## 概述

簡報製作完成、品質審核通過後，進入匯出交付階段。本流程將 Web 簡報打包成可攜式的完整交付物，包含 PDF、逐字稿、Q&A 手冊與背景資料。

---

## 四步驟工作流程

```
Step 1          Step 2          Step 3          Step 4
Web → PDF       演講稿生成       Q&A 準備         背景資料彙整
(必要)          (必要)          (選擇性)        (選擇性)
   │               │               │               │
   ↓               ↓               ↓               ↓
presentation.pdf  script.md     qa-handbook.md   background.md
slides/*.png                                     sources.md
```

---

## Step 1：Web → PDF 轉換

### 方法比較

| 方法 | 品質 | 自動化 | 適用場景 |
|------|------|--------|---------|
| Puppeteer (Node.js) | ✅ 最佳 | ✅ 可腳本化 | 推薦首選 |
| 瀏覽器列印 (Ctrl+P) | 🟡 尚可 | ❌ 手動 | 快速匯出 |
| 截圖拼接 | 🟡 中等 | ⚠️ 半自動 | 備用方案 |

### 方法一：Puppeteer（推薦）

```javascript
const puppeteer = require('puppeteer');

async function exportToPDF(url, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.pdf({
        path: outputPath,
        width: '1920px',
        height: '1080px',
        printBackground: true,
        preferCSSPageSize: true
    });
    await browser.close();
}
```

### 方法二：瀏覽器列印

```
1. Chrome 開啟簡報 → Ctrl+P (Cmd+P)
2. 目的地：儲存為 PDF
3. 版面配置：橫向 / 邊界：無
4. 勾選「背景圖形」→ 儲存
```

⚠️ 瀏覽器列印可能無法正確處理 CSS 動畫和部分排版。

### 方法三：逐頁截圖

```javascript
const puppeteer = require('puppeteer');

async function exportSlides(url, outputDir) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    const slideCount = await page.evaluate(() =>
        document.querySelectorAll('.slide').length
    );
    for (let i = 0; i < slideCount; i++) {
        await page.evaluate((idx) =>
            document.querySelectorAll('.slide')[idx].scrollIntoView(), i
        );
        await page.screenshot({
            path: `${outputDir}/slide-${String(i+1).padStart(2,'0')}.png`,
            clip: { x: 0, y: 0, width: 1920, height: 1080 }
        });
    }
    await browser.close();
}
```

---

## Step 2：演講稿生成

呼叫 `/slide-script` skill，輸入簡報路徑、時長、受眾、語氣風格。

- ✅ 逐字稿必須與投影片頁數一一對應
- ✅ 每頁標記預計時間 `[HH:MM]`
- ✅ 包含所有演講標記（[PAUSE]、[CLICK] 等）
- ❌ 不要只寫大綱，要寫到可以直接照念的程度

格式參考 [10-presentation-prep.md](./10-presentation-prep.md) Part A。

---

## Step 3：Q&A 準備（選擇性）

呼叫 `/slide-qa` skill，格式參考 [10-presentation-prep.md](./10-presentation-prep.md) Part B。

| 場景 | 是否需要 |
|------|---------|
| 向高管提案 / 客戶簡報 | ✅ 必要 |
| 內部技術分享 / 教育訓練 | 🟡 建議 |
| 資訊傳達（無互動） | ❌ 不需要 |

---

## Step 4：背景資料彙整（選擇性）

### sources.md 格式

```markdown
# 引用來源

## 數據來源
| 頁碼 | 引用內容 | 來源 | 日期 |
|------|---------|------|------|
| P3 | 「73% 員工認為會議浪費時間」 | Atlassian Report | 2025 |
| P8 | 「導入後效率提升 40%」 | 內部 POC 報告 | 2026-01 |

## 圖片來源
| 頁碼 | 圖片描述 | 來源 | 授權 |
|------|---------|------|------|
| P1 | 封面背景圖 | Unsplash | Free |
| P10 | AI 生成圖 | Gemini GenImage | Generated |
```

---

## 完整輸出套件結構

```
output/
├── presentation.pdf          # 完整 PDF（必要）
├── slides/                   # 逐頁 PNG（建議）
│   ├── slide-01.png
│   └── ...
├── script.md                 # 演講逐字稿（必要）
├── qa-handbook.md            # Q&A 手冊（選擇性）
├── background.md             # 背景說明（選擇性）
├── sources.md                # 引用來源（建議）
└── README.md                 # 套件說明（必要）
```

---

## 套件 README 格式

```markdown
# [簡報名稱] - 交付套件

## 基本資訊
| 項目 | 內容 |
|------|------|
| 簡報名稱 | Q4 營運策略報告 |
| 版本 | v1.2 |
| 頁數 | 22 頁 / 演講時長 20 分鐘 |
| 品質評分 | 85/100 🟡 |

## 套件內容
| 檔案 | 說明 | 狀態 |
|------|------|------|
| presentation.pdf | 完整投影片 PDF | ✅ |
| slides/ | 逐頁 PNG (22 張) | ✅ |
| script.md | 演講逐字稿 | ✅ |
| qa-handbook.md | Q&A 手冊 (15 題) | ✅ |
| sources.md | 引用來源 (8 筆) | ✅ |

## 使用說明
1. 演講前閱讀 `script.md`，跟著 5 階段練習計畫準備
2. 熟讀 `qa-handbook.md` 中的 🔴 高機率問題
3. 上台時用 `presentation.pdf` 或原始 Web 版本
4. 會後需要提供資料時，引用 `sources.md`
```

---

## 自動化批次匯出腳本

```bash
#!/bin/bash
# export-all.sh — 用法: ./export-all.sh <URL> <輸出目錄>
set -e
URL=${1:-"http://localhost:3000"}
OUTPUT_DIR=${2:-"./output"}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "=== 簡報匯出工具 ==="
mkdir -p "$OUTPUT_DIR/slides"

echo "[1/4] 匯出 PDF..."
node export-pdf.js "$URL" "$OUTPUT_DIR/presentation.pdf"

echo "[1b] 匯出逐頁 PNG..."
node export-slides.js "$URL" "$OUTPUT_DIR/slides"

echo "[2/4] ⚠️ 請手動執行 /slide-script 生成 script.md"
echo "[3/4] ⚠️ 請手動執行 /slide-qa 生成 qa-handbook.md"

echo "[4/4] 打包..."
cd "$OUTPUT_DIR" && zip -r "../presentation_${TIMESTAMP}.zip" . && cd ..
echo "=== 匯出完成 ==="
```

---

## 發佈方式

| 方式 | 適用場景 | 說明 |
|------|---------|------|
| ZIP 壓縮包 | Email、內部分享、離線使用 | `zip -r presentation.zip output/` |
| Web URL | 需要互動功能 | 部署至 Vercel / Netlify / GitHub Pages |
| 混合模式 | 對外 PDF + 對內 Web URL | 同時提供兩種格式 |

⚠️ 包含公司機密資訊的簡報，禁止部署到公開平台。

---

## 匯出前檢查清單

### 必要檢查

- [ ] PDF 開啟正常，所有頁面完整
- [ ] 圖片在 PDF 中清晰可辨
- [ ] 字體正確顯示（未替換為預設字體）
- [ ] 逐字稿頁數與投影片頁數一致
- [ ] README 資訊正確

### 建議檢查

- [ ] 逐頁 PNG 品質確認
- [ ] sources.md 所有連結可存取
- [ ] Q&A 手冊涵蓋高機率問題
- [ ] ZIP 壓縮檔可正常解壓

💡 交付前用另一台電腦開啟 PDF 確認一次，避免字體或排版問題。
