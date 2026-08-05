# Syncfusion React Chart with HotChocolate GraphQL Backend

This sample demonstrates how to connect a **Syncfusion React Chart** component to an **ASP.NET Core HotChocolate GraphQL Backend** using a simple static sales data source.

The React frontend sends a GraphQL query to the backend, receives chart data, and displays it using the Syncfusion React Chart component.

---

## Prerequisites

Install the following tools before running the sample:

- Visual Studio Code
- .NET SDK 8.0 or later
- Node.js 20 LTS or later
- npm
- Basic knowledge of React and ASP.NET Core

Verify the installed versions:

```bash
dotnet --version
node --version
npm --version
```

---

## Project Folder Structure

```text
HotChocolateSyncfusionChartSample/
│
├── backend/
│   ├── backend.csproj
│   ├── Program.cs
│   ├── Models/
│   │   └── SalesData.cs
│   └── GraphQL/
│       └── Query.cs
│
└── frontend/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        └── index.css
```

---

## Create the Project

Create the root folder:

```bash
mkdir HotChocolateSyncfusionChartSample
cd HotChocolateSyncfusionChartSample
```

---

## Backend Setup

Create the ASP.NET Core backend project:

```bash
dotnet new webapi -n backend
cd backend
```

Install HotChocolate GraphQL package:

```bash
dotnet add package HotChocolate.AspNetCore --version 13.0.0
```

Create required folders:

```bash
mkdir Models
mkdir GraphQL
```

Backend files to create:

```text
backend/Models/SalesData.cs
backend/GraphQL/Query.cs
backend/Program.cs
```

The backend GraphQL endpoint will be available at:

```text
http://localhost:5000/graphql
```

---

## Frontend Setup

Go back to the root project folder:

```bash
cd ..
```

Create the React frontend using Vite:

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

Install Syncfusion React Charts:

```bash
npm install @syncfusion/ej2-react-charts
```

Frontend files to update:

```text
frontend/src/main.jsx
frontend/src/App.jsx
frontend/src/App.css
frontend/src/index.css
frontend/vite.config.js
frontend/index.html
```

---

## GraphQL Query Used by React

The React app sends this query to the HotChocolate backend:

```graphql
query {
  salesChartData {
    month
    sales
    expenses
    profit
  }
}
```

Expected response format:

```json
{
  "data": {
    "salesChartData": [
      {
        "month": "Jan",
        "sales": 35,
        "expenses": 20,
        "profit": 15
      }
    ]
  }
}
```

---

## Run the Backend

Open a terminal and run:

```bash
cd HotChocolateSyncfusionChartSample/backend
dotnet run --urls http://localhost:5000
```

Test the GraphQL endpoint in the browser:

```text
http://localhost:5000/graphql
```

Run this query in the GraphQL IDE:

```graphql
query {
  salesChartData {
    month
    sales
    expenses
    profit
  }
}
```

---

## Run the Frontend

Open another terminal and run:

```bash
cd HotChocolateSyncfusionChartSample/frontend
npm run dev
```

Open the React app in the browser:

```text
http://localhost:5173
```

You should see a Syncfusion React Chart displaying monthly sales, expenses, and profit data from the HotChocolate GraphQL backend.

---

## Build Commands

Build the backend:

```bash
cd HotChocolateSyncfusionChartSample/backend
dotnet build
```

Build the frontend:

```bash
cd HotChocolateSyncfusionChartSample/frontend
npm run build
```

---

## Run Commands Summary

Backend:

```bash
cd HotChocolateSyncfusionChartSample/backend
dotnet run --urls http://localhost:5000
```

Frontend:

```bash
cd HotChocolateSyncfusionChartSample/frontend
npm run dev
```

Application URLs:

```text
Backend GraphQL API: http://localhost:5000/graphql
Frontend React App:  http://localhost:5173
```

---

## Common Issues

### 1. Failed to fetch

Make sure the backend is running at:

```text
http://localhost:5000/graphql
```

Also verify that CORS allows the React frontend URL:

```text
http://localhost:5173
```

### 2. Cannot query field `salesChartData`

Make sure the backend Query method is named:

```csharp
public List<SalesData> GetSalesChartData()
```

In GraphQL, this is queried as:

```graphql
salesChartData
```

### 3. Chart is empty

Check the browser developer console and confirm that the GraphQL response contains data under:

```javascript
result.data.salesChartData
```

---

## Next Steps

You can extend this sample by adding:

- Entity Framework Core database support
- GraphQL query arguments such as year or category
- More Syncfusion chart types
- Loading spinner and retry button
- Authentication and authorization
- Real-time updates

---

## Sample Description

This sample is intended for beginners who want to learn how to connect a Syncfusion React Chart component with a HotChocolate GraphQL backend using Visual Studio Code.
