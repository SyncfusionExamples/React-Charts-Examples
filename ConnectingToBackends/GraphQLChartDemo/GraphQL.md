# Syncfusion React Chart with Node.js GraphQL Backend

This sample demonstrates how to connect a **Syncfusion React Chart** component to a **Node.js GraphQL backend**. The backend exposes monthly sales data through a GraphQL API, and the React frontend fetches that data and renders it as a chart.

---

## Prerequisites

Before running this sample, install the following software:

- **Node.js**: 20.x LTS or later recommended
- **npm**: Installed with Node.js
- **Visual Studio Code**: Recommended IDE
- **Web browser**: Chrome, Edge, or Firefox
- Basic knowledge of:
  - React
  - TypeScript
  - Node.js
  - GraphQL concepts such as query, schema, and resolver

---

## Project Folder Structure

Create the project with the following structure:

```text
GraphQLChartDemo
│
├── Server
│   ├── package.json
│   ├── tsconfig.json
│   └── src
│       ├── data.ts
│       ├── schema.graphql
│       └── server.ts
│
└── Client
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── src
        ├── App.tsx
        ├── ChartGraphQL.tsx
        ├── main.tsx
        └── index.css
```

---

## Backend: Node.js GraphQL Server

### 1. Create Backend Folder

```bash
mkdir GraphQLChartDemo
cd GraphQLChartDemo
mkdir Server
cd Server
npm init -y
```

### 2. Install Backend Packages

```bash
npm install express graphql graphql-http cors
npm install -D typescript ts-node-dev @types/node @types/express @types/cors
```

### 3. Backend `package.json` Scripts

Make sure the backend `package.json` contains these scripts:

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

### 4. Run Backend in Development Mode

From the `Server` folder, run:

```bash
npm run dev
```

Expected output:

```text
GraphQL server running at http://localhost:4000/graphql
```

### 5. Test Backend in Browser

Open this URL:

```text
http://localhost:4000/graphql?query=%7BgetMonthlySales%7Bcount%20result%7Bid%20month%20sales%20expenses%7D%7D%7D
```

Expected response contains:

```json
{
  "data": {
    "getMonthlySales": {
      "count": 6,
      "result": [
        {
          "id": 1,
          "month": "Jan",
          "sales": 35,
          "expenses": 20
        }
      ]
    }
  }
}
```

---

## Frontend: React Syncfusion Chart Client

### 1. Create React Client Application

From the `GraphQLChartDemo` folder, run:

```bash
npm create vite@latest Client -- --template react-ts
cd Client
npm install
```

### 2. Install Syncfusion React Chart Package

```bash
npm install @syncfusion/ej2-react-charts
```

### 3. Run Frontend in Development Mode

From the `Client` folder, run:

```bash
npm run dev
```

The React app will run at:

```text
http://localhost:5173
```

---

## Full Run Commands

Use two separate terminals.

### Terminal 1: Start Backend

```bash
cd "D:\Source\June 2026\GraphQLChartDemo\Server"
npm run dev
```

Backend URL:

```text
http://localhost:4000/graphql
```

### Terminal 2: Start Frontend

```bash
cd "D:\Source\June 2026\GraphQLChartDemo\Client"
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Build Commands

### Build Backend

From the `Server` folder:

```bash
npm run build
```

Run compiled backend:

```bash
npm start
```

> Note: If using `schema.graphql` from the `src` folder, copy it to the `dist` folder after build, or update the backend code to load the schema from the source path.

### Build Frontend

From the `Client` folder:

```bash
npm run build
```

Preview production frontend build:

```bash
npm run preview
```

---

## GraphQL Query Used by Frontend

The React frontend sends this query to the backend:

```graphql
query GetMonthlySales {
  getMonthlySales {
    count
    result {
      id
      month
      sales
      expenses
    }
  }
}
```

---

## Data Flow

```text
Syncfusion React Chart
        ↓
React fetch API
        ↓
GraphQL POST request
        ↓
Node.js Express GraphQL endpoint
        ↓
getMonthlySales resolver
        ↓
monthlySalesData array
        ↓
GraphQL JSON response
        ↓
React state
        ↓
Chart renders Sales and Expenses
```

---

## Expected Output

After running both backend and frontend, open:

```text
http://localhost:5173
```

You should see a Syncfusion chart with:

- **Sales** displayed as a column series
- **Expenses** displayed as a line series
- **Month** displayed on the X-axis
- **Amount** displayed on the Y-axis

---

## Common Issues and Fixes

### 1. `Missing query` message in browser

If you open:

```text
http://localhost:4000/graphql
```

and see:

```json
{"errors":[{"message":"Missing query"}]}
```

This is normal. The GraphQL endpoint requires a query. Use this test URL instead:

```text
http://localhost:4000/graphql?query=%7BgetMonthlySales%7Bcount%20result%7Bid%20month%20sales%20expenses%7D%7D%7D
```

### 2. Frontend cannot load chart data

Check that the backend is running:

```text
http://localhost:4000/graphql
```

Also check that the frontend API URL is correct:

```ts
const GRAPHQL_API_URL = "http://localhost:4000/graphql";
```

### 3. CORS error

Make sure the backend contains:

```ts
app.use(cors());
```

### 4. TypeScript deprecation error

If you see a TypeScript warning related to `moduleResolution=node10`, add this to `tsconfig.json`:

```json
"ignoreDeprecations": "6.0"
```

or install TypeScript 5:

```bash
npm install -D typescript@5.6.3
```

---

## Notes

This sample uses simple in-memory data from `data.ts`. For real applications, replace the array with data from a database such as SQL Server, PostgreSQL, MySQL, MongoDB, or another backend service.
