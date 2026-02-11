---
name: Data Transformation
description: Transform raw data from Excel, CSV, JSON, or APIs into visualization-ready formats for charts
---

# Data Transformation Skill

## Capability

Convert raw data from various sources (Excel, CSV, JSON, APIs) into clean, structured formats optimized for chart libraries. Perform data cleaning, aggregation, normalization, and restructuring to prepare data for visualization.

## When to Use

- Data Transformer needs to process raw data for charts
- Data format conversion required (Excel → JSON, CSV → structured data)
- Data cleaning needed (missing values, outliers, duplicates)
- Data aggregation required (group by, sum, average, time-based)
- Data restructuring for specific chart types (labels + datasets)

## Input Data Sources

### Excel Files (.xlsx, .xls)
**Common Structure**:
```
| Quarter | Revenue | Expenses | Profit |
|---------|---------|----------|--------|
| Q1 2024 | 120     | 80       | 40     |
| Q2 2024 | 145     | 95       | 50     |
| Q3 2024 | 180     | 110      | 70     |
| Q4 2024 | 210     | 125      | 85     |
```

**Transformation**:
- Parse columns and rows
- Extract headers as labels
- Convert to JSON or CSV
- Handle multiple sheets

### CSV Files
**Common Structure**:
```csv
Date,Category,Value
2024-01-01,Sales,120
2024-01-01,Marketing,30
2024-02-01,Sales,145
2024-02-01,Marketing,35
```

**Transformation**:
- Parse CSV with correct delimiter (comma, semicolon, tab)
- Handle quoted values
- Detect data types
- Group or pivot data

### JSON Data
**Common Structure**:
```json
{
  "data": [
    { "month": "Jan", "revenue": 120, "expenses": 80 },
    { "month": "Feb", "revenue": 145, "expenses": 95 }
  ]
}
```

**Transformation**:
- Flatten nested structures
- Extract relevant fields
- Restructure for chart format
- Handle arrays and objects

### API Responses
**Common Structure**:
```json
{
  "results": [
    { "id": 1, "name": "Product A", "sales": 335 },
    { "id": 2, "name": "Product B", "sales": 310 }
  ],
  "total": 2,
  "page": 1
}
```

**Transformation**:
- Extract data from response wrapper
- Handle pagination
- Filter relevant fields
- Normalize structure

## Transformation Patterns

### Pattern 1: Tabular Data → Chart.js Format
**Input (CSV/Excel)**:
```
Quarter,Revenue,Expenses
Q1,120,80
Q2,145,95
Q3,180,110
Q4,210,125
```

**Output (JSON)**:
```json
{
  "labels": ["Q1", "Q2", "Q3", "Q4"],
  "datasets": [
    {
      "label": "Revenue",
      "data": [120, 145, 180, 210]
    },
    {
      "label": "Expenses",
      "data": [80, 95, 110, 125]
    }
  ]
}
```

**Transformation Code**:
```javascript
function transformToChartJS(csvData) {
  const rows = csvData.split('\n').map(row => row.split(','));
  const headers = rows[0];
  const data = rows.slice(1);

  return {
    labels: data.map(row => row[0]),
    datasets: headers.slice(1).map((header, index) => ({
      label: header,
      data: data.map(row => parseFloat(row[index + 1]))
    }))
  };
}
```

### Pattern 2: Flat Data → Grouped Data
**Input**:
```json
[
  { "date": "2024-01-05", "category": "Sales", "value": 10 },
  { "date": "2024-01-05", "category": "Marketing", "value": 5 },
  { "date": "2024-01-12", "category": "Sales", "value": 15 },
  { "date": "2024-01-12", "category": "Marketing", "value": 7 }
]
```

**Output (Grouped by Category)**:
```json
{
  "Sales": [
    { "date": "2024-01-05", "value": 10 },
    { "date": "2024-01-12", "value": 15 }
  ],
  "Marketing": [
    { "date": "2024-01-05", "value": 5 },
    { "date": "2024-01-12", "value": 7 }
  ]
}
```

**Transformation Code**:
```javascript
function groupByCategory(data) {
  return data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push({
      date: item.date,
      value: item.value
    });
    return acc;
  }, {});
}
```

### Pattern 3: Daily Data → Monthly Aggregation
**Input (365 daily records)**:
```json
[
  { "date": "2024-01-01", "value": 10 },
  { "date": "2024-01-02", "value": 12 },
  ...
  { "date": "2024-12-31", "value": 25 }
]
```

**Output (12 monthly aggregates)**:
```json
[
  { "month": "2024-01", "average": 11.5, "total": 345 },
  { "month": "2024-02", "average": 13.2, "total": 382 },
  ...
  { "month": "2024-12", "average": 24.8, "total": 769 }
]
```

**Transformation Code**:
```javascript
function aggregateByMonth(data) {
  const grouped = data.reduce((acc, item) => {
    const month = item.date.substring(0, 7); // Extract YYYY-MM
    if (!acc[month]) {
      acc[month] = { values: [], count: 0 };
    }
    acc[month].values.push(item.value);
    acc[month].count++;
    return acc;
  }, {});

  return Object.entries(grouped).map(([month, stats]) => ({
    month: month,
    average: stats.values.reduce((a, b) => a + b, 0) / stats.count,
    total: stats.values.reduce((a, b) => a + b, 0)
  }));
}
```

### Pattern 4: Wide Data → Long Data (Pivot)
**Input (Wide Format)**:
```
Product,Jan,Feb,Mar
A,100,120,150
B,80,90,110
```

**Output (Long Format)**:
```json
[
  { "product": "A", "month": "Jan", "value": 100 },
  { "product": "A", "month": "Feb", "value": 120 },
  { "product": "A", "month": "Mar", "value": 150 },
  { "product": "B", "month": "Jan", "value": 80 },
  { "product": "B", "month": "Feb", "value": 90 },
  { "product": "B", "month": "Mar", "value": 110 }
]
```

**Transformation Code**:
```javascript
function pivotToLong(data) {
  const result = [];
  data.forEach(row => {
    const product = row.Product;
    Object.keys(row).filter(k => k !== 'Product').forEach(month => {
      result.push({
        product: product,
        month: month,
        value: row[month]
      });
    });
  });
  return result;
}
```

## Data Cleaning Techniques

### Missing Value Handling
```javascript
// Option 1: Remove rows with null values
function removeNulls(data, field) {
  return data.filter(row => row[field] !== null && row[field] !== undefined);
}

// Option 2: Impute with mean
function imputeWithMean(data, field) {
  const values = data.filter(d => d[field] !== null).map(d => d[field]);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;

  return data.map(row => ({
    ...row,
    [field]: row[field] !== null ? row[field] : mean
  }));
}

// Option 3: Forward fill (use previous value)
function forwardFill(data, field) {
  let lastValidValue = null;

  return data.map(row => {
    if (row[field] !== null) {
      lastValidValue = row[field];
      return row;
    } else {
      return { ...row, [field]: lastValidValue };
    }
  });
}
```

### Outlier Detection and Handling
```javascript
function detectOutliers(data, field) {
  const values = data.map(d => d[field]).sort((a, b) => a - b);
  const q1 = values[Math.floor(values.length * 0.25)];
  const q3 = values[Math.floor(values.length * 0.75)];
  const iqr = q3 - q1;

  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  return data.map(row => ({
    ...row,
    isOutlier: row[field] < lowerBound || row[field] > upperBound
  }));
}

function removeOutliers(data, field) {
  const withFlags = detectOutliers(data, field);
  return withFlags.filter(row => !row.isOutlier);
}
```

### Duplicate Removal
```javascript
function removeDuplicates(data, keyField) {
  const seen = new Set();
  return data.filter(row => {
    const key = row[keyField];
    if (seen.has(key)) {
      return false;
    } else {
      seen.add(key);
      return true;
    }
  });
}
```

### Date Normalization
```javascript
function normalizeDate(dateString) {
  const formats = [
    { regex: /^\d{4}-\d{2}-\d{2}$/, format: 'YYYY-MM-DD' },
    { regex: /^\d{2}\/\d{2}\/\d{4}$/, format: 'MM/DD/YYYY' },
    { regex: /^\d{2}-\d{2}-\d{4}$/, format: 'DD-MM-YYYY' }
  ];

  for (let f of formats) {
    if (f.regex.test(dateString)) {
      // Parse and convert to ISO 8601 (YYYY-MM-DD)
      // Use moment.js or date-fns for production code
      return parseDate(dateString, f.format).toISOString().split('T')[0];
    }
  }

  throw new Error(`Unable to parse date: ${dateString}`);
}

function normalizeDates(data, dateField) {
  return data.map(row => ({
    ...row,
    [dateField]: normalizeDate(row[dateField])
  }));
}
```

## Aggregation Functions

### Group By and Sum
```javascript
function groupByAndSum(data, groupField, sumField) {
  return Object.values(
    data.reduce((acc, row) => {
      const key = row[groupField];
      if (!acc[key]) {
        acc[key] = { [groupField]: key, [sumField]: 0 };
      }
      acc[key][sumField] += row[sumField];
      return acc;
    }, {})
  );
}

// Example:
// groupByAndSum(sales, 'category', 'amount')
// Input:  [{ category: 'A', amount: 10 }, { category: 'A', amount: 20 }]
// Output: [{ category: 'A', amount: 30 }]
```

### Calculate Growth Rates
```javascript
function calculateGrowthRates(data, valueField) {
  return data.map((row, index) => {
    if (index === 0) {
      return { ...row, growthRate: null };
    }

    const currentValue = row[valueField];
    const previousValue = data[index - 1][valueField];
    const growthRate = ((currentValue - previousValue) / previousValue) * 100;

    return {
      ...row,
      growthRate: growthRate.toFixed(2) + '%'
    };
  });
}
```

### Rolling Average (Moving Average)
```javascript
function rollingAverage(data, valueField, windowSize = 3) {
  return data.map((row, index) => {
    const start = Math.max(0, index - windowSize + 1);
    const window = data.slice(start, index + 1);
    const average = window.reduce((sum, r) => sum + r[valueField], 0) / window.length;

    return {
      ...row,
      [`${valueField}_avg`]: average.toFixed(2)
    };
  });
}
```

## Output Format

### Data Transformation Result
```markdown
## Data Transformation: [Chart Name]

### Source Data
- **Format**: [Excel / CSV / JSON / API]
- **File**: [Filename or endpoint]
- **Records**: [Original row count]
- **Columns**: [List of columns]

### Transformation Steps Applied

1. **Data Validation**
   - Missing values: [Count and percentage]
   - Duplicates found: [Count]
   - Outliers detected: [Count using IQR method]
   - Date format issues: [Count]

2. **Data Cleaning**
   - Removed [X] duplicate rows
   - Imputed [Y] missing values with mean
   - Normalized [Z] date formats to ISO 8601
   - Removed [N] outliers exceeding 1.5 * IQR

3. **Data Aggregation**
   - Grouped by: [Category / Time period]
   - Calculation: [Sum / Average / Count]
   - Derived fields: [Growth rate, percentage, ratio]

4. **Data Restructuring**
   - Converted from [Wide / Long / Nested] format
   - Restructured for [Chart.js / D3.js / ECharts] library
   - Optimized from [Original count] to [Final count] records

### Output Data File

**Filename**: `chart-data-[name].json`

```json
{
  "labels": ["Q1", "Q2", "Q3", "Q4"],
  "datasets": [
    {
      "label": "Revenue",
      "data": [120, 145, 180, 210]
    }
  ],
  "metadata": {
    "source": "Finance Q4 2024 Report",
    "unit": "Millions USD",
    "lastUpdated": "2024-12-31",
    "dataQuality": {
      "originalRows": 1000,
      "cleanedRows": 950,
      "missingValues": 30,
      "outliers": 20
    }
  }
}
```

### Data Quality Notes
- [Note 1: Q4 data is preliminary, final numbers due Jan 15]
- [Note 2: Outlier in March (500% spike) verified with finance team]
- [Note 3: Missing February data interpolated using linear method]

### Sample Data Preview
```
Labels: Q1, Q2, Q3, Q4
Revenue: 120, 145, 180, 210
Expenses: 80, 95, 110, 125
```
```

## Quality Checklist

Transformed data must:
- [ ] Have all missing values handled (removed, imputed, or flagged)
- [ ] Have duplicates removed
- [ ] Have outliers detected and addressed
- [ ] Have consistent data types (numbers not strings)
- [ ] Have normalized date formats (ISO 8601)
- [ ] Have clear field names (no spaces, special characters)
- [ ] Include metadata (source, units, update date)
- [ ] Match target chart library format
- [ ] Include data quality notes
- [ ] Provide sample preview for validation

## Common Use Cases

### Use Case 1: Excel Sales Data → Bar Chart
```javascript
// Input: Excel with columns [Product, Q1, Q2, Q3, Q4]
// Output: Chart.js format with labels and datasets

function excelToBarChart(excelData) {
  return {
    labels: excelData.map(row => row.Product),
    datasets: ['Q1', 'Q2', 'Q3', 'Q4'].map(quarter => ({
      label: quarter,
      data: excelData.map(row => row[quarter])
    }))
  };
}
```

### Use Case 2: API Time-Series → Line Chart
```javascript
// Input: API response with daily data
// Output: Monthly aggregated data for line chart

async function apiToLineChart(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();

  const monthlyData = aggregateByMonth(data.results);

  return {
    labels: monthlyData.map(d => d.month),
    datasets: [{
      label: 'Monthly Average',
      data: monthlyData.map(d => d.average)
    }]
  };
}
```

### Use Case 3: CSV Multi-Category → Grouped Bar Chart
```javascript
// Input: CSV with [Date, Category, Value]
// Output: Grouped data for multi-series bar chart

function csvToGroupedBar(csvData) {
  const categories = [...new Set(csvData.map(d => d.Category))];

  return {
    labels: [...new Set(csvData.map(d => d.Date))],
    datasets: categories.map(cat => ({
      label: cat,
      data: csvData
        .filter(d => d.Category === cat)
        .map(d => d.Value)
    }))
  };
}
```

## Error Handling

```javascript
function safeTransform(data, transformFn) {
  try {
    const result = transformFn(data);

    // Validate output
    if (!result || !result.labels || !result.datasets) {
      throw new Error('Invalid output format');
    }

    return {
      success: true,
      data: result,
      errors: []
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      errors: [error.message]
    };
  }
}
```

## Related Skills

- `chart-library-integration` - Use transformed data in chart libraries
- `web-research` - Find external data sources
- `mermaid-diagram` - Alternative for non-numerical data visualization

---

**Version**: 1.0 | **Created**: 2026-02-11
