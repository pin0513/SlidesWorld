---
name: Mermaid Diagram Generation
description: Create technical diagrams using Mermaid syntax (flowcharts, sequence diagrams, class diagrams, ER diagrams, Gantt charts)
---

# Mermaid Diagram Generation Skill

## Capability

Generate technical diagrams using Mermaid markdown syntax for flowcharts, sequence diagrams, class diagrams, ER diagrams, state diagrams, and Gantt charts. Render diagrams as SVG or PNG for embedding in slides.

## When to Use

- Web Chart Designer needs to create technical diagrams
- Process flows, system architecture, or workflow visualization required
- Database schema or entity relationships need visualization
- Project timelines or dependencies need Gantt chart representation
- Sequence of system interactions needs illustration

## Supported Diagram Types

### 1. Flowchart
**Use for**: Process steps, decision trees, workflow diagrams
**Syntax**: `graph TD` (top-down), `graph LR` (left-right)

### 2. Sequence Diagram
**Use for**: System interactions over time, API call flows, user journeys
**Syntax**: `sequenceDiagram`

### 3. Class Diagram
**Use for**: Object-oriented structures, system components, relationships
**Syntax**: `classDiagram`

### 4. Entity-Relationship Diagram
**Use for**: Database schema, data models, entity relationships
**Syntax**: `erDiagram`

### 5. State Diagram
**Use for**: State machines, workflow states, system states
**Syntax**: `stateDiagram-v2`

### 6. Gantt Chart
**Use for**: Project timelines, task dependencies, schedules
**Syntax**: `gantt`

### 7. Git Graph
**Use for**: Git branch workflows, version control visualization
**Syntax**: `gitGraph`

## Syntax Examples

### Flowchart (Process Flow)
```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process 1]
    B -->|No| D[Process 2]
    C --> E[End]
    D --> E

    style A fill:#0033A0,stroke:#fff,color:#fff
    style E fill:#0033A0,stroke:#fff,color:#fff
    style B fill:#0091DA,stroke:#fff,color:#fff
```

**Explanation**:
- `graph TD`: Top-down flowchart
- `A[Start]`: Rectangle node
- `B{Decision}`: Diamond node (decision)
- `-->`: Arrow connecting nodes
- `|Label|`: Label on arrow
- `style`: Custom styling for nodes

### Sequence Diagram (System Interaction)
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Submit Form
    activate Frontend
    Frontend->>Backend: POST /api/submit
    activate Backend
    Backend->>Database: Save Data
    activate Database
    Database-->>Backend: Success
    deactivate Database
    Backend-->>Frontend: 200 OK
    deactivate Backend
    Frontend-->>User: Show Success Message
    deactivate Frontend
```

**Explanation**:
- `participant`: Define actors/systems
- `->>`: Solid arrow (synchronous call)
- `-->>`: Dashed arrow (response)
- `activate`/`deactivate`: Show execution time
- `Note`: Add annotations

### Class Diagram (Object-Oriented Structure)
```mermaid
classDiagram
    class User {
        +String name
        +String email
        +String password
        +login()
        +logout()
        +updateProfile()
    }

    class Admin {
        +String permissions
        +manageUsers()
        +viewReports()
    }

    class Customer {
        +String address
        +placeOrder()
        +viewOrders()
    }

    User <|-- Admin : inherits
    User <|-- Customer : inherits
    Customer "1" --> "*" Order : places
```

**Explanation**:
- `class`: Define class with properties and methods
- `+`: Public member
- `-`: Private member
- `#`: Protected member
- `<|--`: Inheritance
- `-->`: Association
- `"1" --> "*"`: Cardinality (one-to-many)

### ER Diagram (Database Schema)
```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    PRODUCT ||--o{ LINE-ITEM : "ordered in"
    CUSTOMER }|--|| PAYMENT-METHOD : uses

    CUSTOMER {
        int id PK
        string name
        string email
        date created_at
    }

    ORDER {
        int id PK
        int customer_id FK
        date order_date
        decimal total
    }

    PRODUCT {
        int id PK
        string name
        decimal price
        int stock
    }
```

**Explanation**:
- `||--o{`: One-to-many relationship
- `||--|{`: One-to-one-or-more
- `}|--||`: Many-to-one
- `PK`: Primary key
- `FK`: Foreign key
- Define entity attributes with types

### State Diagram (Workflow States)
```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> UnderReview : Submit
    UnderReview --> Approved : Approve
    UnderReview --> Rejected : Reject
    Rejected --> Draft : Revise
    Approved --> Published : Publish
    Published --> [*]

    note right of UnderReview
        Review by manager
        Max 5 business days
    end note
```

**Explanation**:
- `[*]`: Start/end state
- `-->`: Transition
- `Label : Action`: Transition label
- `note`: Add annotations

### Gantt Chart (Project Timeline)
```mermaid
gantt
    title Product Launch Timeline
    dateFormat YYYY-MM-DD
    section Planning
    Requirements Gathering :done, req, 2024-01-01, 2024-01-15
    Design Mockups         :done, design, 2024-01-10, 2024-01-25
    section Development
    Backend Development    :active, backend, 2024-01-20, 2024-03-01
    Frontend Development   :frontend, 2024-02-01, 2024-03-15
    section Testing
    QA Testing             :qa, 2024-03-10, 2024-03-30
    UAT                    :uat, 2024-03-25, 2024-04-10
    section Launch
    Production Deployment  :milestone, deploy, 2024-04-15, 1d
```

**Explanation**:
- `title`: Chart title
- `dateFormat`: Date format specification
- `section`: Group tasks
- `:done`: Completed task
- `:active`: Current task
- `:milestone`: Milestone marker
- `task_id`: Reference for dependencies

## Styling and Customization

### Custom Colors
```mermaid
graph LR
    A[Start] --> B[Process]
    B --> C[End]

    classDef primaryColor fill:#0033A0,stroke:#fff,color:#fff;
    classDef secondaryColor fill:#0091DA,stroke:#fff,color:#fff;

    class A,C primaryColor;
    class B secondaryColor;
```

### Node Shapes
```mermaid
graph TD
    A[Rectangle]
    B(Rounded Rectangle)
    C([Stadium])
    D[[Subroutine]]
    E[(Database)]
    F((Circle))
    G{Diamond}
    H{{Hexagon}}
    I[/Parallelogram/]
    J[\Parallelogram Alt\]
    K[/Trapezoid\]
    L[\Trapezoid Alt/]
```

### Arrow Types
```mermaid
graph LR
    A --> B  %% Solid arrow
    A -.-> C  %% Dotted arrow
    A ==> D  %% Thick arrow
    A --text--> E  %% Arrow with text
    A ---|text| F  %% Line with text
```

## Integration with Slides

### Method 1: Mermaid Live Editor
1. Go to https://mermaid.live/
2. Paste Mermaid code
3. Export as SVG or PNG
4. Embed in Google Slides

### Method 2: HTML Rendering
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
  <script>
    mermaid.initialize({ startOnLoad: true, theme: 'default' });
  </script>
</head>
<body>
  <div class="mermaid">
    graph TD
        A[Start] --> B[Process]
        B --> C[End]
  </div>
</body>
</html>
```

### Method 3: CLI Tool (for automation)
```bash
# Install mermaid-cli
npm install -g @mermaid-js/mermaid-cli

# Generate PNG from mermaid file
mmdc -i diagram.mmd -o diagram.png -w 1920 -H 1080

# Generate SVG
mmdc -i diagram.mmd -o diagram.svg
```

## Common Patterns

### Pattern 1: User Authentication Flow
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Service
    participant D as Database

    U->>F: Enter credentials
    F->>A: POST /login
    A->>D: Verify credentials
    alt Valid credentials
        D-->>A: User found
        A->>A: Generate JWT token
        A-->>F: Return token
        F-->>U: Redirect to dashboard
    else Invalid credentials
        D-->>A: User not found
        A-->>F: 401 Unauthorized
        F-->>U: Show error message
    end
```

### Pattern 2: E-Commerce Order Process
```mermaid
graph TD
    Start[Customer Visits Site] --> Browse[Browse Products]
    Browse --> AddCart{Add to Cart?}
    AddCart -->|Yes| Cart[Shopping Cart]
    AddCart -->|No| Browse
    Cart --> Checkout{Checkout?}
    Checkout -->|Yes| Payment[Enter Payment Info]
    Checkout -->|No| Browse
    Payment --> Process[Process Payment]
    Process --> Success{Payment Success?}
    Success -->|Yes| Confirm[Order Confirmation]
    Success -->|No| Retry{Retry?}
    Retry -->|Yes| Payment
    Retry -->|No| Cancel[Cancel Order]
    Confirm --> End[Order Complete]
    Cancel --> End

    style Start fill:#0033A0,color:#fff
    style End fill:#0033A0,color:#fff
    style Confirm fill:#0091DA,color:#fff
    style Cancel fill:#C4122F,color:#fff
```

### Pattern 3: Microservices Architecture
```mermaid
graph TB
    Client[Web Client] --> Gateway[API Gateway]
    Gateway --> Auth[Auth Service]
    Gateway --> User[User Service]
    Gateway --> Order[Order Service]
    Gateway --> Payment[Payment Service]

    Auth --> AuthDB[(Auth DB)]
    User --> UserDB[(User DB)]
    Order --> OrderDB[(Order DB)]
    Payment --> PaymentDB[(Payment DB)]

    Order --> Queue[Message Queue]
    Queue --> Inventory[Inventory Service]
    Queue --> Notification[Notification Service]

    Inventory --> InventoryDB[(Inventory DB)]

    style Gateway fill:#0033A0,color:#fff
    style Queue fill:#0091DA,color:#fff
```

## Output Format

### Mermaid Diagram Deliverable
```markdown
## Diagram: [Slide Number] - [Diagram Title]

### Diagram Type: [Flowchart / Sequence / Class / ER / State / Gantt]

### Purpose
[What does this diagram illustrate?]

### Mermaid Code
```mermaid
[Complete Mermaid syntax]
```

### Rendering Instructions
1. **Option 1**: Use Mermaid Live Editor
   - Visit: https://mermaid.live/
   - Paste code above
   - Export as SVG (recommended) or PNG
   - Download and embed in slide

2. **Option 2**: Use mermaid-cli
   ```bash
   mmdc -i diagram.mmd -o diagram.svg -w 1920 -H 1080
   ```

3. **Option 3**: HTML rendering
   [Provide HTML file with embedded Mermaid]

### Styling Applied
- Primary color: #0033A0 (brand blue)
- Secondary color: #0091DA (light blue)
- Highlight color: #0091DA
- Node shape: [Rectangle / Diamond / Circle]

### Dimensions
- **Width**: 1920px (full slide width)
- **Height**: 1080px (full slide height)
- **Aspect Ratio**: 16:9

### Alt Text
[Descriptive text for accessibility]

### Usage Notes
- Position: [Center / Left / Right of slide]
- Text overlay: [If applicable]
- Animation: [Fade-in / None]
```

## Best Practices

### Simplicity
- Keep diagrams focused (one concept per diagram)
- Limit nodes to 10-15 for readability
- Use sections/subgraphs to organize complex diagrams

### Clarity
- Use descriptive labels (not abbreviations)
- Add notes for complex steps
- Highlight critical paths or decisions

### Consistency
- Use consistent node shapes for similar elements
- Apply brand colors (MAYO blue, etc.)
- Maintain visual hierarchy (important nodes larger/bold)

### Accessibility
- Provide alt text describing diagram flow
- Use color AND shape to convey meaning (not color alone)
- Ensure sufficient contrast for readability

## Quality Checklist

Before completing diagram, verify:
- [ ] Diagram type appropriate for content (flow vs sequence vs class)
- [ ] All nodes have clear, descriptive labels
- [ ] Arrows indicate correct direction of flow
- [ ] Colors align with visual design palette
- [ ] Diagram renders correctly (no syntax errors)
- [ ] Exported at correct resolution (1920x1080)
- [ ] Alt text provided for accessibility
- [ ] Diagram is not overcrowded (max 15 nodes)
- [ ] Critical paths or insights are highlighted
- [ ] Diagram supports slide narrative

## Related Skills

- `chart-library-integration` - For data-driven visualizations
- `data-transformation` - For preparing data for diagrams
- `image-generation` - For custom illustrations

---

**Version**: 1.0 | **Created**: 2026-02-11
