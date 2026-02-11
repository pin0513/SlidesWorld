# 數據視覺化指南

> 記錄 SlidesWorld 支援的數據視覺化技術

---

## 📊 支援的圖表技術

### 1. Chart.js - 互動式圖表

**適用場景**：數據報表、統計分析、儀表板

**優點**：
- ✅ 互動式（hover 顯示數據）
- ✅ 動畫效果
- ✅ 響應式設計
- ✅ 豐富的圖表類型

**支援的圖表類型**：
- 條形圖 (Bar Chart)
- 折線圖 (Line Chart)
- 圓餅圖 / 甜甜圈圖 (Pie / Doughnut)
- 雷達圖 (Radar Chart)
- 散點圖 (Scatter Plot)
- 氣泡圖 (Bubble Chart)

**使用方式**：

```html
<!-- CDN 載入 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!-- HTML -->
<div class="chart-container">
  <canvas id="myChart"></canvas>
</div>

<!-- JavaScript -->
<script>
const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['A', 'B', 'C'],
    datasets: [{
      label: '數據',
      data: [12, 19, 3],
      backgroundColor: ['rgba(14,165,233,0.8)', 'rgba(16,185,129,0.8)', 'rgba(245,158,11,0.8)']
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});
</script>
```

**範例參考**：`examples/data-report-demo/output/index.html`
- 條形圖：第 2 頁（學生成績）
- 雷達圖：第 3 頁（科目能力）
- 圓餅圖：第 5 頁（財產分佈）

---

### 2. SVG - 向量圖形

**適用場景**：流程圖、架構圖、自訂圖表

**優點**：
- ✅ 完全自訂
- ✅ 無外部依賴
- ✅ 縮放不失真
- ✅ 可控性高

**適用時機**：
- Mermaid 無法正常載入時
- 需要精確控制佈局
- 特殊圖形需求

**SVG 基礎元素**：

```html
<!-- 矩形 -->
<rect x="50" y="50" width="100" height="50" rx="8"
      fill="#0ea5e9" stroke="#fff" stroke-width="2"/>

<!-- 文字 -->
<text x="100" y="80" font-size="16" fill="#fff"
      text-anchor="middle" font-weight="bold">
  節點名稱
</text>

<!-- 線條 -->
<line x1="100" y1="100" x2="200" y2="100"
      stroke="#fff" stroke-width="2"/>

<!-- 曲線路徑 -->
<path d="M 100 100 Q 150 150, 200 100"
      stroke="#fff" stroke-width="2" fill="none"/>

<!-- 箭頭標記 -->
<defs>
  <marker id="arrow" markerWidth="10" markerHeight="10"
          refX="9" refY="3" orient="auto">
    <polygon points="0 0, 10 3, 0 6" fill="#fff"/>
  </marker>
</defs>
<line x1="100" y1="100" x2="200" y2="100"
      stroke="#fff" stroke-width="2"
      marker-end="url(#arrow)"/>
```

**流程圖範例**：

```html
<svg width="800" height="350" viewBox="0 0 800 350">
  <!-- 節點 A -->
  <rect x="50" y="140" width="120" height="70" rx="8"
        fill="#0ea5e9" stroke="#fff" stroke-width="3"/>
  <text x="110" y="180" font-size="20" fill="#fff"
        text-anchor="middle" font-weight="bold">
    節點 A
  </text>

  <!-- 節點 B -->
  <rect x="250" y="140" width="120" height="70" rx="8"
        fill="#10b981" stroke="#fff" stroke-width="3"/>
  <text x="310" y="180" font-size="20" fill="#fff"
        text-anchor="middle" font-weight="bold">
    節點 B
  </text>

  <!-- 箭頭 A -> B -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10"
            refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#fff"/>
    </marker>
  </defs>
  <line x1="170" y1="175" x2="245" y2="175"
        stroke="#fff" stroke-width="3"
        marker-end="url(#arrowhead)"/>
</svg>
```

**架構圖範例**（分層架構）：

```html
<svg width="850" height="400" viewBox="0 0 850 400">
  <!-- 前端層（虛線框） -->
  <rect x="50" y="20" width="250" height="120" rx="8"
        fill="rgba(97,218,251,0.2)" stroke="#61dafb"
        stroke-width="2" stroke-dasharray="5,5"/>
  <text x="175" y="40" font-size="16" fill="#61dafb"
        text-anchor="middle" font-weight="bold">
    前端層
  </text>

  <!-- 組件 -->
  <rect x="70" y="60" width="100" height="50" rx="6"
        fill="#61dafb" stroke="#fff" stroke-width="2"/>
  <text x="120" y="90" font-size="14" fill="#000"
        text-anchor="middle" font-weight="bold">
    React UI
  </text>

  <!-- 箭頭連接 -->
  <defs>
    <marker id="arrow2" markerWidth="10" markerHeight="10"
            refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#10b981"/>
    </marker>
  </defs>
  <line x1="120" y1="110" x2="120" y2="195"
        stroke="#10b981" stroke-width="3"
        marker-end="url(#arrow2)"/>
</svg>
```

**範例參考**：`examples/data-report-demo/output/index.html`
- 流程圖：第 4 頁（A → B1 → C → D → A 循環）
- 架構圖：第 6 頁（前後端、雲端/地端）

---

## 🎨 配色建議

### 專業數據風格

```css
:root {
  --primary: #1e3a8a;    /* 深藍 */
  --secondary: #0ea5e9;  /* 亮藍 */
  --accent: #10b981;     /* 綠色 */
  --warning: #f59e0b;    /* 橘色 */
  --danger: #ef4444;     /* 紅色 */
  --purple: #8b5cf6;     /* 紫色 */
}
```

### Chart.js 色彩組合

```javascript
// 彩虹組合
backgroundColor: [
  'rgba(14,165,233,0.8)',   // 藍
  'rgba(16,185,129,0.8)',   // 綠
  'rgba(245,158,11,0.8)',   // 橘
  'rgba(139,92,246,0.8)',   // 紫
  'rgba(236,72,153,0.8)'    // 粉
]

// 單色漸層（藍）
backgroundColor: [
  'rgba(14,165,233,0.9)',
  'rgba(14,165,233,0.7)',
  'rgba(14,165,233,0.5)',
  'rgba(14,165,233,0.3)'
]
```

---

## 🔧 技術選擇指南

| 需求 | 推薦技術 | 原因 |
|------|----------|------|
| 統計數據展示 | Chart.js | 互動式、美觀 |
| 流程圖 | SVG（或 Mermaid） | 自訂佈局 |
| 系統架構圖 | SVG（或 Mermaid） | 分層清晰 |
| 組織架構圖 | SVG | 樹狀結構 |
| 甘特圖 | Chart.js（或專門函式庫） | 時間軸 |
| 網路拓樸圖 | SVG | 複雜連線 |

---

## 📦 完整範例

參考 `examples/data-report-demo/` 獲得完整的實作範例：

```
examples/data-report-demo/
├── output/
│   └── index.html      ← 完整示範（13KB）
└── README.md           ← 詳細說明
```

**包含**：
- ✅ Chart.js 條形圖、雷達圖、圓餅圖
- ✅ SVG 流程圖（循環結構）
- ✅ SVG 系統架構圖（分層架構）
- ✅ 響應式設計
- ✅ 深色主題
- ✅ 鍵盤導覽

---

## 🚀 快速啟動模板

### Chart.js 模板

```html
<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
.chart-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 450px;
  margin: 0 auto;
}
</style>
</head>
<body>
<div class="chart-container">
  <canvas id="myChart"></canvas>
</div>

<script>
const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['項目A', '項目B', '項目C'],
    datasets: [{
      label: '數值',
      data: [65, 59, 80],
      backgroundColor: 'rgba(14,165,233,0.8)'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});
</script>
</body>
</html>
```

### SVG 流程圖模板

```html
<!DOCTYPE html>
<html>
<head>
<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0f172a;
  margin: 0;
}
</style>
</head>
<body>
<svg width="600" height="300" viewBox="0 0 600 300">
  <!-- 起點 -->
  <rect x="50" y="100" width="100" height="60" rx="8"
        fill="#0ea5e9" stroke="#fff" stroke-width="2"/>
  <text x="100" y="135" font-size="16" fill="#fff"
        text-anchor="middle" font-weight="bold">
    開始
  </text>

  <!-- 處理 -->
  <rect x="250" y="100" width="100" height="60" rx="8"
        fill="#10b981" stroke="#fff" stroke-width="2"/>
  <text x="300" y="135" font-size="16" fill="#fff"
        text-anchor="middle" font-weight="bold">
    處理
  </text>

  <!-- 結束 -->
  <rect x="450" y="100" width="100" height="60" rx="8"
        fill="#8b5cf6" stroke="#fff" stroke-width="2"/>
  <text x="500" y="135" font-size="16" fill="#fff"
        text-anchor="middle" font-weight="bold">
    結束
  </text>

  <!-- 箭頭 -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10"
            refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#fff"/>
    </marker>
  </defs>
  <line x1="150" y1="130" x2="245" y2="130"
        stroke="#fff" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="350" y1="130" x2="445" y2="130"
        stroke="#fff" stroke-width="2" marker-end="url(#arrow)"/>
</svg>
</body>
</html>
```

---

**版本**: v1.0
**最後更新**: 2026-02-12
**範例**: examples/data-report-demo/
