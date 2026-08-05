# Syncfusion React Chart with Express.js Server

This sample demonstrates how to connect a **Syncfusion React Chart** component to an **Express.js backend server**. The backend exposes a simple REST API that returns monthly sales data, and the React frontend displays that data in a chart.

---

## Prerequisites

Before running this sample, install the following software:

- **Node.js** 20.x or later
- **npm** 10.x or later, included with Node.js
- **Visual Studio Code**
- A modern browser such as Microsoft Edge, Google Chrome, or Firefox

To check Node.js and npm versions, run:

```bash
node -v
npm -v
```

---

## Project Folder Structure

```text
ej2-react-chart-with-express-js/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── chart.controller.ts
│   │   ├── routes/
│   │   │   └── chart.routes.ts
│   │   ├── types/
│   │   │   └── interface.ts
│   │   ├── utils/
│   │   │   └── data.ts
│   │   └── server.ts
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
└── ChartClient/
    ├── src/
    │   ├── components/
    │   │   └── SalesChart.tsx
    │   ├── services/
    │   │   └── dataManager.ts
    │   ├── App.tsx
    │   ├── App.css
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    └── vite.config.ts
```

---

## Backend Setup: Express.js Server

### 1. Create the backend folder

```bash
mkdir server
cd server
```

### 2. Initialize Node.js project

```bash
npm init -y
```

### 3. Install backend dependencies

```bash
npm install express cors
```

### 4. Install backend development dependencies

```bash
npm install -D typescript ts-node nodemon @types/express @types/cors @types/node
```

### 5. Create backend folders

```bash
mkdir src
mkdir src/controllers
mkdir src/routes
mkdir src/types
mkdir src/utils
```

### 6. Create TypeScript config

```bash
npx tsc --init
```

Then update `server/tsconfig.json` with the required TypeScript configuration.

---

## Frontend Setup: React Chart Client

From the main project folder, run:

```bash
npm create vite@latest ChartClient -- --template react-ts
cd ChartClient
npm install
```

Install Syncfusion React Chart and DataManager packages:

```bash
npm install @syncfusion/ej2-react-charts @syncfusion/ej2-data
```

Create frontend folders:

```bash
mkdir src/components
mkdir src/services
```

---

## Backend API Endpoint

The Express.js backend runs on:

```text
http://localhost:5000
```

The chart data API endpoint is:

```text
http://localhost:5000/api/chart-sales
```

Expected API response format:

```json
{
  "result": [
    {
      "month": "Jan",
      "sales": 35,
      "expenses": 20
    }
  ],
  "count": 12
}
```

---

## Installation Commands Summary

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd ChartClient
npm install
```

---

## Run Commands

Use two terminals in Visual Studio Code.

### Terminal 1: Run Backend Server

```bash
cd server
npm run dev
```

Expected output:

```text
Server is running at http://localhost:5000
Chart API endpoint: http://localhost:5000/api/chart-sales
```

### Terminal 2: Run React Frontend

```bash
cd ChartClient
npm run dev
```

Expected output:

```text
Local: http://localhost:5173/
```

Open the browser and visit:

```text
http://localhost:5173/
```

---

## Build Commands

### Build Backend

```bash
cd server
npm run build
```

This command compiles TypeScript files into the `dist` folder.

### Build Frontend

```bash
cd ChartClient
npm run build
```

This command creates a production-ready frontend build in the `dist` folder.

---

## Test Backend API

You can test the backend directly in the browser:

```text
http://localhost:5000
```

Expected response:

```text
Express.js Chart API is running
```

Test chart data endpoint:

```text
http://localhost:5000/api/chart-sales
```

Expected response:

```json
{
  "result": [
    {
      "month": "Jan",
      "sales": 35,
      "expenses": 20
    },
    {
      "month": "Feb",
      "sales": 28,
      "expenses": 18
    }
  ],
  "count": 12
}
```

---

## How the Application Works

```text
React Chart Component
        ↓
Syncfusion DataManager
        ↓
UrlAdaptor sends request to Express API
        ↓
Express.js returns chart data
        ↓
React Chart displays monthly sales data
```

---

## Common Issues and Fixes

### 1. Browser shows 404 for `/api/chart-sales`

Make sure the route file supports both GET and POST:

```ts
router.get('/', getChartData);
router.post('/', getChartData);
```

Also confirm that `server.ts` contains:

```ts
app.use('/api/chart-sales', chartRoutes);
```

### 2. CORS error in browser console

Make sure `server.ts` has CORS enabled:

```ts
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 3. Chart is blank

Check the following:

- Backend server is running on `http://localhost:5000`
- Frontend `dataManager.ts` uses the correct API URL
- Syncfusion chart CSS is imported in `index.css`
- Browser console does not show errors

### 4. Port already in use

If port `5000` is already used, change the backend port in `server/src/server.ts`:

```ts
const PORT = 5001;
```

Then update frontend API URL in `ChartClient/src/services/dataManager.ts`:

```ts
const API_BASE_URL = 'http://localhost:5001/api/chart-sales';
```

---

## Useful Commands

### Stop running server

Press:

```text
Ctrl + C
```

### Restart backend server

```bash
npm run dev
```

### Restart frontend server

```bash
npm run dev
```

---

## Notes

- This sample uses in-memory static data from `server/src/utils/data.ts`.
- Data will reset when the backend server restarts.
- For production applications, connect the Express.js server to a real database.
- The Syncfusion React Chart gets remote data using `DataManager` and `UrlAdaptor`.
