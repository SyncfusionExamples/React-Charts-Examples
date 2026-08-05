# Syncfusion React Chart with UrlAdaptor and ASP.NET Core API

This project shows how to bind a **Syncfusion React Chart** to data from a database using **Syncfusion DataManager** and **UrlAdaptor**.

The project uses:

- React with Vite for the frontend
- Syncfusion React Chart
- ASP.NET Core Web API for the backend
- SQLite database
- Entity Framework Core
- Visual Studio Code

---

## Project Overview

The chart gets data from the backend API. The backend reads data from the SQLite database and sends it to the React Chart.

```text
SQLite Database
      ↓
ASP.NET Core Web API
      ↓
Syncfusion DataManager
      ↓
UrlAdaptor
      ↓
React Chart
```

---

## Project Structure

```text
ReactChartUrlAdaptor/
│
├── client/     # React frontend
│
└── server/     # ASP.NET Core backend API
```

---

## Prerequisites

Before running this project, install:

- Visual Studio Code
- Node.js
- .NET SDK 9.0
- npm

---

# Backend Setup

## 1. Create Backend Project

Create the backend ASP.NET Core Web API project inside the following path:

```text
ReactChartUrlAdaptor/server
```

Use the terminal from Visual Studio Code and create the project in the `server` folder.

---

## 2. Install Required Backend Packages

Install the required NuGet packages inside this path:

```text
ReactChartUrlAdaptor/server
```

Required backend packages:

- Microsoft.EntityFrameworkCore.Sqlite version 9.0.0
- Microsoft.EntityFrameworkCore.Design version 9.0.0
- Syncfusion.EJ2.AspNet.Core

> Note: Do not install `Microsoft.AspNetCore.Mvc.NewtonsoftJson` version `10.x` if your project uses `.NET 9`.

---

## 3. Create Sales Model

Create the Sales model file at this path:

```text
server/Models/SalesRecord.cs
```

This file contains the chart data model with the following fields:

- Id
- Month
- Sales
- Expenses

---

## 4. Create Database Context

Create the database context file at this path:

```text
server/Data/AppDbContext.cs
```

This file is used to configure Entity Framework Core and access the `SalesRecords` table.

---

## 5. Update Program.cs

Update the backend startup configuration in this file:

```text
server/Program.cs
```

This file should include the configuration for:

- ASP.NET Core controllers
- JSON property naming policy
- SQLite database connection
- CORS configuration
- Sample database seeding
- Controller route mapping

The JSON property naming policy should preserve property names such as:

- Month
- Sales
- Expenses

This is important because the React Chart field names must match the API response field names.

---

## 6. Create Sales API Controller

Create the API controller at this path:

```text
server/Controllers/SalesController.cs
```

This controller should expose the sales data API endpoint:

```text
/api/sales
```

The API should return data in this format:

```text
{
  "result": [ ... ],
  "count": 6
}
```

This response format is required when using Syncfusion `UrlAdaptor`.

---

## 7. Run Backend

Run the backend project from this path:

```text
ReactChartUrlAdaptor/server
```

Useful backend command sequence:

```text
dotnet clean
dotnet restore
dotnet build
dotnet run
```

The backend will run on a URL similar to:

```text
http://localhost:5000
```

The API endpoint will be:

```text
http://localhost:5000/api/sales
```

Keep the backend running while testing the React frontend.

---

# Frontend Setup

## 1. Create React App

Create the React frontend application inside this path:

```text
ReactChartUrlAdaptor/client
```

Use Vite with the React template.

---

## 2. Install Syncfusion Packages

Install the required frontend packages inside this path:

```text
ReactChartUrlAdaptor/client
```

Required frontend packages:

- @syncfusion/ej2-react-charts
- @syncfusion/ej2-data

---

## 3. Add CSS

Update the frontend CSS file at this path:

```text
client/src/App.css
```

This file should include:

- Syncfusion chart styles
- Basic page layout styles
- Chart container styles

---

## 4. Add React Chart Code

Update the React application file at this path:

```text
client/src/App.jsx
```

This file should configure:

- Syncfusion `ChartComponent`
- `DataManager`
- `UrlAdaptor`
- API URL
- X-axis field
- Y-axis fields
- Chart series
- Tooltip and legend services

The API URL should point to:

```text
http://localhost:5000/api/sales
```

If your backend runs on a different port, update the API URL in this file.

---

## 5. Run React App

Run the frontend project from this path:

```text
ReactChartUrlAdaptor/client
```

Useful frontend command sequence:

```text
npm install
npm run dev
```

The React app usually runs at:

```text
http://localhost:5173
```

Open this URL in the browser.

You should see a Syncfusion column chart showing:

- Sales data
- Expenses data
- Months on the X-axis

---

# Common Issues and Fixes

## 1. NewtonsoftJson Version Error

If you see an error saying that `Microsoft.AspNetCore.Mvc.NewtonsoftJson 10.x` is not compatible with `net9.0`, remove the package from the backend project.

Use the built-in JSON options in:

```text
server/Program.cs
```

This avoids the package compatibility issue and keeps the project simple.

---

## 2. EntityFrameworkCore Namespace Error

If you see an error saying that `EntityFrameworkCore` does not exist in the `Microsoft` namespace, install the EF Core packages inside:

```text
ReactChartUrlAdaptor/server
```

Required packages:

- Microsoft.EntityFrameworkCore.Sqlite version 9.0.0
- Microsoft.EntityFrameworkCore.Design version 9.0.0

Then restore and rebuild the project.

---

## 3. AddNewtonsoftJson Error

If you see an error saying that `IMvcBuilder` does not contain a definition for `AddNewtonsoftJson`, remove any Newtonsoft JSON configuration from:

```text
server/Program.cs
```

Use the default ASP.NET Core JSON configuration instead.

Also remove the Newtonsoft using statement if it exists.

---

## 4. CORS Error

If the browser blocks the API request, check the CORS configuration in:

```text
server/Program.cs
```

CORS must be enabled because the backend and frontend usually run on different ports.

---

## 5. Chart is Empty

If the chart is empty, check the API response from:

```text
http://localhost:5000/api/sales
```

The API must return data in this structure:

```text
{
  "result": [ ... ],
  "count": number
}
```

Do not return only a plain array.

---

## 6. Field Name Issue

The field names used in the React Chart must match the API response exactly.

For example, if the API returns:

```text
Month
Sales
Expenses
```

Then the chart should use the same field names.

If the API returns lowercase field names such as:

```text
month
sales
expenses
```

Then update the chart field names in:

```text
client/src/App.jsx
```

---

# Useful Commands

## Backend Commands

Run these commands from:

```text
ReactChartUrlAdaptor/server
```

```text
dotnet clean
dotnet restore
dotnet build
dotnet run
```

---

## Frontend Commands

Run these commands from:

```text
ReactChartUrlAdaptor/client
```

```text
npm install
npm run dev
```

---

# Final Result

After completing the setup, the React application displays a Syncfusion Chart with data loaded from the SQLite database through an ASP.NET Core Web API.

The chart uses:

- `DataManager` to manage remote data
- `UrlAdaptor` to connect to the API
- `ChartComponent` to display the data visually

---

# Important File Paths

Backend files:

```text
server/Models/SalesRecord.cs
server/Data/AppDbContext.cs
server/Program.cs
server/Controllers/SalesController.cs
```

Frontend files:

```text
client/src/App.css
client/src/App.jsx
```
