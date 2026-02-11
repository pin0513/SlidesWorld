---
name: Chart Library Integration
description: Select and integrate JavaScript chart libraries (Chart.js, D3.js, ECharts, ApexCharts) for data visualization
---

# Chart Library Integration Skill

## Capability

Select appropriate JavaScript chart libraries for data visualization needs and provide integration code with configuration templates. Support Chart.js, D3.js, ECharts, and ApexCharts for various chart types and complexity levels.

## When to Use

- Web Chart Designer needs to implement interactive charts
- Decision needed on which chart library to use
- Configuration templates needed for specific chart types
- Integration guidance needed for embedding charts in slides

## Supported Chart Libraries

### Chart.js (Recommended for Simple Charts)
**Best for**: Common chart types (bar, line, pie, donut, radar)
**Pros**: Lightweight (60KB), simple API, good defaults, responsive
**Cons**: Limited customization, basic interactivity
**Use when**: Standard charts with minimal customization

**CDN**: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js`

### D3.js (Recommended for Custom Visualizations)
**Best for**: Highly customized, complex visualizations, network graphs
**Pros**: Maximum flexibility, powerful data transformations, rich ecosystem
**Cons**: Steep learning curve, verbose code, larger file size
**Use when**: Custom chart types or advanced interactions required

**CDN**: `https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js`

### ECharts (Recommended for Enterprise Dashboards)
**Best for**: Multiple chart types, complex multi-series charts, dashboards
**Pros**: Rich features, excellent docs, Chinese data support, built-in themes
**Cons**: Larger file size (300KB+), complex API
**Use when**: Complex dashboards or Chinese language requirements

**CDN**: `https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js`

### ApexCharts (Recommended for Modern Responsive Charts)
**Best for**: Modern, responsive charts with smooth animations
**Pros**: Beautiful defaults, responsive, easy config, good mobile support
**Cons**: Limited chart types compared to ECharts
**Use when**: Mobile-friendly charts with polished appearance

**CDN**: `https://cdn.jsdelivr.net/npm/apexcharts@3.45.0/dist/apexcharts.min.js`

## Chart Type Library Matrix

| Chart Type | Chart.js | D3.js | ECharts | ApexCharts |
|------------|----------|-------|---------|------------|
| Line Chart | ✅ Best | ✅ | ✅ | ✅ |
| Bar Chart | ✅ Best | ✅ | ✅ | ✅ |
| Pie/Donut | ✅ Best | ✅ | ✅ | ✅ |
| Scatter Plot | ✅ | ✅ Best | ✅ | ✅ |
| Area Chart | ✅ | ✅ | ✅ | ✅ Best |
| Radar Chart | ✅ Best | ✅ | ✅ | ✅ |
| Heatmap | ❌ | ✅ Best | ✅ | ✅ |
| Treemap | ❌ | ✅ Best | ✅ | ✅ |
| Network Graph | ❌ | ✅ Best | ✅ | ❌ |
| Sankey Diagram | ❌ | ✅ Best | ✅ | ❌ |
| Candlestick | ❌ | ✅ | ✅ Best | ✅ |
| Gauge | ❌ | ✅ | ✅ Best | ✅ |

## Integration Templates

### Chart.js - Bar Chart Example
```html
<!DOCTYPE html>
<html>
<head>
  <title>Chart.js Bar Chart</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
</head>
<body>
  <div style="width: 800px; height: 600px;">
    <canvas id="myChart"></canvas>
  </div>

  <script>
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Revenue (Millions)',
          data: [120, 145, 180, 210],
          backgroundColor: '#0033A0',
          borderColor: '#0033A0',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: 'Quarterly Revenue Growth',
            font: { size: 24, weight: 'bold' }
          },
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': $' +
                       context.parsed.y + 'M';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue (Millions USD)',
              font: { size: 16, weight: 'bold' }
            }
          }
        }
      }
    });
  </script>
</body>
</html>
```

### D3.js - Line Chart Example
```html
<!DOCTYPE html>
<html>
<head>
  <title>D3.js Line Chart</title>
  <script src="https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js"></script>
  <style>
    .line { fill: none; stroke: #0033A0; stroke-width: 3; }
    .axis { font-size: 14px; }
  </style>
</head>
<body>
  <div id="chart"></div>

  <script>
    const data = [
      { date: new Date(2024, 0, 1), value: 120 },
      { date: new Date(2024, 3, 1), value: 145 },
      { date: new Date(2024, 6, 1), value: 180 },
      { date: new Date(2024, 9, 1), value: 210 }
    ];

    const width = 800;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 50, left: 70 };

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%b %Y')));

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .text('Monthly Growth Trend');
  </script>
</body>
</html>
```

### ECharts - Pie Chart Example
```html
<!DOCTYPE html>
<html>
<head>
  <title>ECharts Pie Chart</title>
  <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
</head>
<body>
  <div id="chart" style="width: 800px; height: 600px;"></div>

  <script>
    const chartDom = document.getElementById('chart');
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Market Share Distribution',
        left: 'center',
        textStyle: { fontSize: 24, fontWeight: 'bold' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Market Share',
          type: 'pie',
          radius: '60%',
          data: [
            { value: 335, name: 'Product A' },
            { value: 310, name: 'Product B' },
            { value: 234, name: 'Product C' },
            { value: 135, name: 'Product D' },
            { value: 86, name: 'Product E' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            formatter: '{b}: {d}%'
          }
        }
      ]
    };

    myChart.setOption(option);

    // Responsive resize
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  </script>
</body>
</html>
```

### ApexCharts - Area Chart Example
```html
<!DOCTYPE html>
<html>
<head>
  <title>ApexCharts Area Chart</title>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.45.0/dist/apexcharts.min.js"></script>
</head>
<body>
  <div id="chart"></div>

  <script>
    const options = {
      series: [{
        name: 'Revenue',
        data: [120, 145, 180, 210, 245, 280]
      }],
      chart: {
        type: 'area',
        height: 600,
        zoom: { enabled: true },
        toolbar: { show: true }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      title: {
        text: 'Monthly Revenue Trend',
        align: 'center',
        style: { fontSize: '24px', fontWeight: 'bold' }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        title: { text: 'Month' }
      },
      yaxis: {
        title: { text: 'Revenue (Millions)' }
      },
      colors: ['#0033A0'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  </script>
</body>
</html>
```

## Library Selection Decision Tree

### Step 1: Identify Chart Complexity
- **Simple** (bar, line, pie, donut): → Chart.js or ApexCharts
- **Moderate** (multiple series, mixed types): → ECharts or ApexCharts
- **Complex** (custom layouts, network graphs): → D3.js

### Step 2: Consider Customization Needs
- **Minimal customization** (default styles sufficient): → Chart.js
- **Moderate customization** (colors, labels, themes): → ApexCharts or ECharts
- **Extensive customization** (full control over rendering): → D3.js

### Step 3: Evaluate Performance Requirements
- **Small dataset** (<100 points): → Any library
- **Medium dataset** (100-1000 points): → Chart.js, ApexCharts, ECharts
- **Large dataset** (1000+ points): → D3.js with Canvas or data sampling

### Step 4: Check Mobile/Responsive Needs
- **Mobile-first** design: → ApexCharts (best mobile support)
- **Responsive required**: → All libraries support responsive
- **Desktop only**: → Any library

### Step 5: Consider Team Skills
- **Beginner** (first time with charts): → Chart.js (easiest)
- **Intermediate** (some JS experience): → ApexCharts or ECharts
- **Advanced** (D3 experience): → D3.js

## Output Format

### Library Recommendation
```markdown
## Chart Library Recommendation: [Chart Name]

### Selected Library: [Chart.js / D3.js / ECharts / ApexCharts]

### Rationale
- **Chart Type**: [Bar / Line / Pie / Custom]
- **Complexity**: [Simple / Moderate / Complex]
- **Customization**: [Minimal / Moderate / Extensive]
- **Dataset Size**: [Number of data points]
- **Mobile Support**: [Required / Not required]

### Integration Code
[Provide complete HTML/JS integration code]

### Dependencies
- Library: [Name and version]
- CDN URL: [CDN link]
- Additional Libraries: [If any]

### Configuration Options
- Responsive: [Yes / No]
- Interactive: [Tooltips / Drill-down / Zoom / None]
- Animation: [Enabled / Disabled]

### Browser Compatibility
- Chrome: [Version+]
- Firefox: [Version+]
- Safari: [Version+]
- Edge: [Version+]

### Performance Notes
- Load time: [Estimated]
- Recommended max data points: [Number]

### Alternative Options
If this library doesn't fit:
- **Option 2**: [Alternative library and why]
- **Option 3**: [Another alternative]
```

## Common Chart Templates

### Grouped Bar Chart (Chart.js)
```javascript
{
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: '2023',
        data: [100, 120, 150, 180],
        backgroundColor: '#0033A0'
      },
      {
        label: '2024',
        data: [120, 145, 180, 210],
        backgroundColor: '#0091DA'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      x: { stacked: false },
      y: { stacked: false }
    }
  }
}
```

### Multi-Line Chart (D3.js)
```javascript
const series = ['Revenue', 'Expenses', 'Profit'];
const colorScale = d3.scaleOrdinal()
  .domain(series)
  .range(['#0033A0', '#53565A', '#0091DA']);

series.forEach(name => {
  svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', colorScale(name))
    .attr('stroke-width', 3)
    .attr('d', d3.line()
      .x(d => x(d.date))
      .y(d => y(d[name]))
    );
});
```

### Stacked Area Chart (ECharts)
```javascript
{
  series: [
    { name: 'Email', type: 'line', stack: 'Total', areaStyle: {}, data: [120, 132, 101, 134, 90] },
    { name: 'Union Ads', type: 'line', stack: 'Total', areaStyle: {}, data: [220, 182, 191, 234, 290] },
    { name: 'Video Ads', type: 'line', stack: 'Total', areaStyle: {}, data: [150, 232, 201, 154, 190] }
  ]
}
```

## Quality Standards

Integration code must include:
- [ ] Complete HTML structure with DOCTYPE
- [ ] CDN links for all required libraries
- [ ] Responsive configuration (chart resizes with window)
- [ ] Accessibility features (ARIA labels)
- [ ] Error handling (check if library loaded)
- [ ] Browser compatibility notes
- [ ] Performance optimization (lazy loading, data sampling)

## Related Skills

- `data-transformation` - Prepare data for chart libraries
- `mermaid-diagram` - Alternative for flowcharts and diagrams
- `browser-compatibility` - Test chart rendering across browsers

---

**Version**: 1.0 | **Created**: 2026-02-11
