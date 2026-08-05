# Syncfusion React Chart WebMethodAdaptor Project Setup Guide

## Purpose

This README summarizes the required server and client project contents for building a Syncfusion React Chart sample using ASP.NET Core Web API and `WebMethodAdaptor`.

This README intentionally does **not** include source code. It lists only the required file paths, package names, configuration responsibilities, run sequence, and verification steps.

---

## Project Overview

The sample project contains two applications:

- ASP.NET Core Web API backend
- React Vite frontend with Syncfusion React Chart

The React Chart loads data from the ASP.NET Core API through Syncfusion DataManager using `WebMethodAdaptor`.

---

## Recommended Project Root

Use this project root:

`D:\Source\May 2026\Adaptors\chart-webmethod-demo`

Expected main folders:

- `server`
- `client`

---

## Final Project Structure

Expected backend folder:

`D:\Source\May 2026\Adaptors\chart-webmethod-demo\server`

Expected frontend folder:

`D:\Source\May 2026\Adaptors\chart-webmethod-demo\client`

Required backend files:

- `server/server.csproj`
- `server/Program.cs`
- `server/Models/SalesData.cs`
- `server/Controllers/ChartDataController.cs`
- `server/Properties/launchSettings.json`

Required frontend files:

- `client/package.json`
- `client/index.html`
- `client/vite.config.js`
- `client/src/main.jsx`
- `client/src/App.jsx`
- `client/src/App.css`

---

# Server Project Contents

## Server Project Creation

Create the ASP.NET Core Web API project in:

`D:\Source\May 2026\Adaptors\chart-webmethod-demo\server`

Important project rule:

- There must be only one backend project folder.
- There must be only one `Program.cs` file.
- The valid file is `server/Program.cs`.
- The invalid duplicate path is `server/server/Program.cs`.

If `server/server/Program.cs` exists, remove the nested `server` folder.

---

## Server Package Requirement

The backend requires this NuGet package:

- `Syncfusion.EJ2.AspNet.Core`

The package reference should be available in:

`server/server.csproj`

Swagger is not required for this sample. To keep the sample simple, avoid these packages unless Swagger is specifically needed:

- `Swashbuckle.AspNetCore`
- `Microsoft.OpenApi`

---

## Server Project File

File path:

`server/server.csproj`

This file should define:

- ASP.NET Core Web SDK project type
- Target framework such as `.NET 8`
- Nullable setting
- Implicit using setting
- Syncfusion EJ2 ASP.NET Core package reference

---

## Server Program File

File path:

`server/Program.cs`

This file should configure:

- Controller services
- CORS policy for React client ports
- Controller endpoint mapping
- Application startup

The CORS configuration should allow the React Vite development origins, commonly:

- `http://localhost:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:5174`

For this sample, the file should not include:

- Swagger setup
- OpenAPI setup
- Swagger UI setup

---

## Server Model File

File path:

`server/Models/SalesData.cs`

This file should define the chart data model.

Recommended model fields:

- `Month`
- `Sales`
- `Expenses`
- `Profit`

These fields are used by the React Chart series.

---

## Server Controller File

File path:

`server/Controllers/ChartDataController.cs`

This file should define the chart data API.

The controller should include:

- A `GET` endpoint for browser testing
- A `POST` endpoint for Syncfusion `WebMethodAdaptor`
- A DataManager wrapper object for the `value` request payload
- Sample monthly data for Sales, Expenses, and Profit
- Response structure containing `result` and `count`

The browser test uses the `GET` endpoint.

The React Chart uses the `POST` endpoint through `WebMethodAdaptor`.

---

## Server API URL

Expected backend API URL:

`http://localhost:5143/api/ChartData`

Use this URL to verify the server in a browser.

Expected browser result:

- JSON response appears
- JSON contains `result`
- JSON contains `count`

---

# Client Project Contents

## Client Project Creation

Create the React Vite project in:

`D:\Source\May 2026\Adaptors\chart-webmethod-demo\client`

The client should use the React template.

---

## Client Package Requirements

File path:

`client/package.json`

The React client requires these npm packages:

- `@syncfusion/ej2-react-charts`
- `@syncfusion/ej2-data`
- `react`
- `react-dom`
- `vite`
- `@vitejs/plugin-react`

The package file should also include scripts for:

- Development server
- Production build
- Preview

Recommended development port:

`5173`

If Vite runs on another port, update backend CORS accordingly.

---

## Client HTML File

File path:

`client/index.html`

This file should include:

- Root element for React rendering
- Valid module script reference to `client/src/main.jsx`

The required React entry reference is:

`/src/main.jsx`

If this reference is malformed, the client can show a blank page.

---

## Client Vite Configuration File

File path:

`client/vite.config.js`

This file should configure:

- React plugin
- Local development host
- Local development port

Recommended local client URL:

`http://localhost:5173`

Alternative local client URL:

`http://localhost:5174`

The selected client URL must be allowed by server CORS in:

`server/Program.cs`

---

## Client React Entry File

File path:

`client/src/main.jsx`

This file should:

- Import React
- Import React DOM client
- Import `client/src/App.jsx`
- Import `client/src/App.css`
- Render the React app into the root element from `client/index.html`

---

## Client Chart Component File

File path:

`client/src/App.jsx`

This file should:

- Import Syncfusion React Chart modules
- Import Syncfusion DataManager
- Import Syncfusion WebMethodAdaptor
- Call the backend API at `http://localhost:5143/api/ChartData`
- Execute the DataManager query
- Normalize the returned response data
- Store final chart data in React state
- Bind final chart data to Syncfusion Chart series
- Render Sales as a chart series
- Render Expenses as a chart series
- Render Profit as a chart series
- Display a status message while loading data
- Optionally display debug data for verification

Recommended approach:

- Use DataManager with WebMethodAdaptor
- Execute the query manually
- Normalize the result
- Bind a plain array to the chart series

This approach is recommended because it avoids blank chart issues caused by nested response formats.

---

## Client Style File

File path:

`client/src/App.css`

This file should include:

- Syncfusion base styles
- Syncfusion chart styles
- Page layout styles
- Chart card styles
- Status message styles
- Optional debug section styles

---

# Run Sequence

## Step 1: Run Server

Open a terminal in:

`D:\Source\May 2026\Adaptors\chart-webmethod-demo\server`

Start the ASP.NET Core backend.

After startup, verify this API URL:

`http://localhost:5143/api/ChartData`

If JSON appears, the server is working.

---

## Step 2: Run Client

Open another terminal in:

`D:\Source\May 2026\Adaptors\chart-webmethod-demo\client`

Start the React Vite client.

Open the Vite URL shown in the terminal.

Common client URL:

`http://localhost:5173`

Alternative client URL:

`http://localhost:5174`

---

# Expected Result

When both projects are running successfully:

- Browser API test returns JSON from `http://localhost:5143/api/ChartData`
- React client loads without a blank page
- Browser console does not show CORS errors
- Syncfusion Chart displays monthly data
- Chart includes Sales, Expenses, and Profit series
- Status message shows loaded record count

---

# Important URLs

Backend API:

`http://localhost:5143/api/ChartData`

React client:

`http://localhost:5173`

Alternative React client:

`http://localhost:5174`

---

# Key Integration Notes

## WebMethodAdaptor Request Shape

Syncfusion `WebMethodAdaptor` sends DataManager request details inside a `value` wrapper.

The backend controller should account for this wrapper in:

`server/Controllers/ChartDataController.cs`

---

## Server Response Shape

The backend should return a response containing:

- `result`
- `count`

The React client should read the result collection and bind it to the chart.

---

## Property Name Matching

ASP.NET Core commonly serializes C# property names into camel case JSON.

For example:

- `Month` becomes `month`
- `Sales` becomes `sales`
- `Expenses` becomes `expenses`
- `Profit` becomes `profit`

The React Chart configuration in:

`client/src/App.jsx`

should map to the JSON property names used by the API response.

---

# Troubleshooting Summary

## Duplicate Program.cs Error

Error:

`Only one compilation unit can have top-level statements`

Cause:

Duplicate file exists at:

`server/server/Program.cs`

Fix:

Remove the nested folder:

`server/server`

---

## Syncfusion Namespace Not Found

Error:

`The type or namespace name 'Syncfusion' could not be found`

Cause:

The backend package is missing.

Fix location:

`server/server.csproj`

Required package:

`Syncfusion.EJ2.AspNet.Core`

---

## Swagger or Microsoft.OpenApi Error

Error:

Runtime error related to `Microsoft.OpenApi` types.

Cause:

Swagger/OpenAPI package version conflict.

Fix locations:

- `server/server.csproj`
- `server/Program.cs`
- `server/bin`
- `server/obj`

Recommendation:

Remove Swagger/OpenAPI from this sample.

---

## HTTP 405 Browser Error

Error:

`HTTP ERROR 405`

Cause:

Browser sends `GET`, but only `POST` exists.

Fix location:

`server/Controllers/ChartDataController.cs`

Required endpoint:

`GET`

---

## React Blank Page

Possible causes:

- Invalid `client/index.html`
- Missing `client/src/main.jsx`
- Incorrect `client/src/App.jsx`
- Missing package in `client/package.json`
- Runtime error in browser console

Check these paths:

- `client/index.html`
- `client/package.json`
- `client/src/main.jsx`
- `client/src/App.jsx`

---

## CORS Error

Error:

`Access to fetch has been blocked by CORS policy`

Cause:

React client origin is not allowed by backend.

Fix location:

`server/Program.cs`

Allow the actual React client URL, such as:

- `http://localhost:5173`
- `http://localhost:5174`

Restart the backend after changing CORS.

---

## Chart Renders but Data Is Empty

Possible causes:

- API response is nested
- Chart is bound before data loads
- Field names do not match JSON property names

Fix location:

`client/src/App.jsx`

Recommended fix:

- Execute the DataManager query manually
- Normalize the response
- Store final data in React state
- Bind the state array to chart series

---

# Final Verification Checklist

## Server Checklist

- `server/Program.cs` exists
- `server/server.csproj` references `Syncfusion.EJ2.AspNet.Core`
- `server/Models/SalesData.cs` exists
- `server/Controllers/ChartDataController.cs` exists
- `server/Controllers/ChartDataController.cs` contains GET and POST endpoints
- `server/server/Program.cs` does not exist
- Swagger/OpenAPI is removed for this sample
- `http://localhost:5143/api/ChartData` returns JSON

## Client Checklist

- `client/package.json` includes required React and Syncfusion packages
- `client/index.html` references `/src/main.jsx`
- `client/vite.config.js` sets a known local port
- `client/src/main.jsx` renders the app
- `client/src/App.jsx` calls `http://localhost:5143/api/ChartData`
- `client/src/App.css` includes Syncfusion chart styles
- React client port is allowed in backend CORS

---

# Final Summary

This sample requires:

- ASP.NET Core Web API backend
- Syncfusion EJ2 ASP.NET Core package
- React Vite frontend
- Syncfusion React Chart package
- Syncfusion DataManager package
- `WebMethodAdaptor` for remote data loading
- GET API endpoint for browser testing
- POST API endpoint for chart binding
- CORS configured between backend and frontend

The final working URLs are:

Backend API:

`http://localhost:5143/api/ChartData`

React client:

`http://localhost:5173`

or:

`http://localhost:5174`

This README contains no source code. Use the listed file paths to place the required project contents.
