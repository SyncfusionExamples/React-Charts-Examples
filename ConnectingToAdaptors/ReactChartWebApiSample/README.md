# Syncfusion React Chart with ASP.NET Core Web API

This sample demonstrates how to bind a **Syncfusion React Chart** to a remote **ASP.NET Core Web API** using **Syncfusion DataManager** and **WebApiAdaptor**.

The application contains:

- ASP.NET Core Web API backend
- React frontend created with Vite
- Syncfusion React Chart component
- Remote data binding using `DataManager`
- Web API response format compatible with `WebApiAdaptor`

---

## Project Structure

```text
ReactChartWebApiSample/
│
├── server/
│   ├── Controllers/
│   │   └── SalesController.cs
│   ├── Models/
│   │   └── SalesData.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── Program.cs
│   └── server.csproj
│
└── client/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Prerequisites

Install the following:

- Visual Studio Code
- Node.js
- .NET SDK 8 or later
- npm

---

## Backend Setup

Navigate to the server folder:

```text
server/
```

Restore and run the API from the server project directory.

The API runs at:

```text
http://localhost:5000
```

Test the API endpoint:

```text
http://localhost:5000/api/Sales
```

Expected response details are available from the backend controller at:

```text
server/Controllers/SalesController.cs
```

---

## Important Backend Notes

This sample does **not require Swagger/OpenAPI**.

If you get errors related to the following:

```text
Microsoft.OpenApi
Swashbuckle.AspNetCore
AddSwaggerGen
UseSwagger
UseSwaggerUI
```

Remove Swagger/OpenAPI package references from:

```text
server/server.csproj
```

Also make sure Swagger configuration is not present in:

```text
server/Program.cs
```

---

## Frontend Setup

Navigate to the client folder:

```text
client/
```

Install dependencies and run the React application from the client project directory.

The React app runs at:

```text
http://localhost:5173
```

---

## Required Syncfusion Packages

The client uses the following Syncfusion packages:

- `@syncfusion/ej2-react-charts`
- `@syncfusion/ej2-data`

Package references are maintained in:

```text
client/package.json
```

---

## Data Flow

```text
React Chart
   ↓
Syncfusion DataManager
   ↓
WebApiAdaptor
   ↓
ASP.NET Core Web API
   ↓
Response: { Items, Count }
   ↓
Chart renders data
```

---

## WebApiAdaptor Response Format

The Web API should return data in this format:

```text
{
  Items: [],
  Count: number
}
```

Where:

- `Items` contains the chart data records.
- `Count` contains the total record count.

The response is implemented in:

```text
server/Controllers/SalesController.cs
```

---

## Chart Binding Location

The chart binding using `DataManager`, `WebApiAdaptor`, and `Query` is configured in:

```text
client/src/App.jsx
```

The chart series fields are mapped from the API response using:

- `Month`
- `Sales`
- `Expenses`
- `Profit`

The data model is defined in:

```text
server/Models/SalesData.cs
```

---

## Features Included

- Remote data binding
- Column chart for sales
- Column chart for expenses
- Line chart for profit
- Query support using Syncfusion `Query`
- Server-side paging using `$top` and `$skip`
- Basic server-side sorting using `$orderby`
- Basic filtering support
- CORS enabled for React client

---

## Run the Full Application

Open two terminals.

### Terminal 1: Run Backend

Run the backend from:

```text
server/
```

### Terminal 2: Run Frontend

Run the frontend from:

```text
client/
```

Open the React application at:

```text
http://localhost:5173
```

---

## Troubleshooting

### API not loading

Check whether the API is running:

```text
http://localhost:5000/api/Sales
```

Relevant files:

```text
server/Program.cs
server/Controllers/SalesController.cs
server/Properties/launchSettings.json
```

---

### CORS error

Check the CORS configuration in:

```text
server/Program.cs
```

The allowed React client URL should match:

```text
http://localhost:5173
```

---

### Chart is empty

Verify that the API response property names match the chart field names.

Relevant files:

```text
client/src/App.jsx
server/Models/SalesData.cs
server/Controllers/SalesController.cs
```

---

### API port changed

If the backend runs on another port, update the API URL in:

```text
client/src/App.jsx
```

Also check the backend launch settings at:

```text
server/Properties/launchSettings.json
```

---

## Common OpenAPI/Swagger Fix

If the server throws a `Microsoft.OpenApi` or `Swagger` error, remove related package references from:

```text
server/server.csproj
```

Remove Swagger-related configuration from:

```text
server/Program.cs
```

Then clean the server project by deleting old build output folders:

```text
server/bin/
server/obj/
```

If the issue still exists, create a fresh backend and copy only the required files:

```text
server/Program.cs
server/Models/SalesData.cs
server/Controllers/SalesController.cs
server/Properties/launchSettings.json
server/server.csproj
```

---

## Key Files

### Server

```text
server/server.csproj
server/Program.cs
server/Models/SalesData.cs
server/Controllers/SalesController.cs
server/Properties/launchSettings.json
```

### Client

```text
client/package.json
client/vite.config.js
client/index.html
client/src/main.jsx
client/src/index.css
client/src/App.jsx
```

---

## Conclusion

This sample shows how to connect:

```text
ASP.NET Core Web API → Syncfusion DataManager → WebApiAdaptor → React Chart
```

It is useful when you want to display server-side data in Syncfusion React Chart components with remote querying support.
