# Syncfusion React Chart with Apollo GraphQL Backend

This sample demonstrates how to create a simple **Apollo GraphQL backend** and connect it to a **Syncfusion React Chart** component. The backend provides monthly sales data through a GraphQL query, and the React frontend fetches that data and displays it in a chart.

---

## Prerequisites

Before running this sample, install the following tools:

- **Node.js**: Version 20 or later recommended
- **npm**: Comes with Node.js
- **Visual Studio Code**: Recommended IDE
- **Modern browser**: Chrome, Edge, Firefox, etc.

To verify Node.js and npm installation, run:

```bash
node -v
npm -v
```

---

## Project Folder Structure

Create the project with the following structure:

```text
GraphQLSampleApollo
│
├── Server
│   ├── package.json
│   └── src
│       ├── data.js
│       ├── schema.js
│       ├── resolvers.js
│       └── server.js
│
└── Client
    ├── package.json
    ├── index.html
    ├── vite.config.js
    └── src
        ├── main.jsx
        ├── App.jsx
        └── index.css
```

---

## Backend: Apollo GraphQL Server

### 1. Create Backend Project

Open VS Code terminal and run:

```bash
mkdir GraphQLSampleApollo
cd GraphQLSampleApollo
mkdir Server
cd Server
npm init -y
```

### 2. Install Backend Packages

```bash
npm install @apollo/server graphql
```

### 3. Create Source Folder

```bash
mkdir src
```

### 4. Important Backend Configuration

Make sure your `Server/package.json` contains:

```json
{
  "name": "chart-graphql-server",
  "version": "1.0.0",
  "description": "Apollo GraphQL backend for Syncfusion React Chart",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node src/server.js"
  },
  "dependencies": {
    "@apollo/server": "^5.0.0",
    "graphql": "^16.0.0"
  }
}
```

> Note: The `"type": "module"` line is required because the backend files use ES module `import` syntax.

---

## Backend Files

Create these files inside `Server/src`:

```text
Server/src/data.js
Server/src/schema.js
Server/src/resolvers.js
Server/src/server.js
```

---

## Frontend: React App with Syncfusion Chart

### 1. Create React App

From the root folder `GraphQLSampleApollo`, run:

```bash
cd ..
npm create vite@latest Client -- --template react
cd Client
npm install
```

If you are already inside the root folder, use:

```bash
npm create vite@latest Client -- --template react
cd Client
npm install
```

### 2. Install Syncfusion React Chart Package

```bash
npm install @syncfusion/ej2-react-charts
```

---

## Frontend Files

Update or create these files:

```text
Client/index.html
Client/vite.config.js
Client/src/main.jsx
Client/src/App.jsx
Client/src/index.css
```

---

## Run the Application

You need two terminals: one for backend and one for frontend.

---

### Terminal 1: Run Backend

Go to the backend folder:

```bash
cd "D:\Source\June 2026\GraphQLSampleApollo\Server"
npm start
```

Expected output:

```text
GraphQL server is running at http://localhost:4000/
```

Open this URL in browser:

```text
http://localhost:4000/
```

Test this GraphQL query:

```graphql
query {
  getSalesChartData {
    result {
      month
      sales
      expenses
      profit
    }
    count
  }
}
```

---

### Terminal 2: Run Frontend

Go to the frontend folder:

```bash
cd "D:\Source\June 2026\GraphQLSampleApollo\Client"
npm run dev
```

Expected output usually shows:

```text
Local: http://localhost:5173/
```

Open:

```text
http://localhost:5173/
```

You should see the Syncfusion React Chart displaying data from the Apollo GraphQL backend.

---

## Build Commands

### Build Frontend

```bash
cd Client
npm run build
```

The production build will be generated in:

```text
Client/dist
```

### Preview Frontend Production Build

```bash
npm run preview
```

---

## Backend Run Command

The backend does not need a build step because this sample uses plain JavaScript.

Run backend using:

```bash
cd Server
npm start
```

---

## Application URLs

```text
Backend GraphQL API:
http://localhost:4000/

Frontend React App:
http://localhost:5173/
```

---

## Common Issues and Fixes

### Error: Cannot use import statement outside a module

Fix: Add this line to `Server/package.json`:

```json
"type": "module"
```

Then run:

```bash
npm start
```

---

### Error: Failed to fetch

This usually means the backend is not running.

Start backend first:

```bash
cd Server
npm start
```

Then run frontend:

```bash
cd Client
npm run dev
```

---

### Port 4000 already in use

Change backend port in `Server/src/server.js`:

```js
listen: {
  port: 4001
}
```

Then update frontend API URL in `Client/src/App.jsx`:

```js
const GRAPHQL_API_URL = "http://localhost:4001/";
```

---

## Summary

This sample contains:

- Apollo GraphQL backend
- Simple sales chart data
- React frontend created with Vite
- Syncfusion React Chart component
- GraphQL fetch request from React to Apollo Server
- Chart binding using returned GraphQL data

