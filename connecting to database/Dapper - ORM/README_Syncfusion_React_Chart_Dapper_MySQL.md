# Syncfusion React Chart with Dapper and MySQL

This sample demonstrates how to connect a **MySQL database** to a **Syncfusion React Chart** using an **ASP.NET Core Web API** and **Dapper**.

## Overview

Application flow:

```text
MySQL Database
    ↓
ASP.NET Core Web API
    ↓
Dapper + MySqlConnector
    ↓
React + Syncfusion Chart
```

The backend reads monthly sales data from MySQL and exposes it through an API endpoint. The React frontend calls the API and displays the data in a Syncfusion column chart.

---

## Prerequisites

Install the following software before running the project:

- Visual Studio Code
- .NET SDK 8.0 or later
- Node.js 18 or later
- MySQL Server
- MySQL Workbench
- Git, optional

Also make sure:

- MySQL Server is running.
- You can connect to MySQL using MySQL Workbench.
- You know your MySQL username and password.
- Default MySQL port `3306` is available.

---

## Project Folder Structure

```text
Dapper - ORM
│
├── Backend
│   └── ChartDapperApi
│       ├── Controllers
│       │   └── SalesChartController.cs
│       ├── Data
│       │   └── SalesChartRepository.cs
│       ├── Models
│       │   └── SalesChartPoint.cs
│       ├── appsettings.json
│       ├── ChartDapperApi.csproj
│       └── Program.cs
│
└── Frontend
    └── chart-dapper-client
        ├── src
        │   ├── App.css
        │   ├── App.tsx
        │   ├── index.css
        │   └── main.tsx
        ├── index.html
        ├── package.json
        ├── tsconfig.json
        └── vite.config.ts
```

---

## Database Setup

Open **MySQL Workbench**, connect to your MySQL server, and run this script:

```sql
CREATE DATABASE IF NOT EXISTS chart_demo_db;

USE chart_demo_db;

CREATE TABLE IF NOT EXISTS monthly_sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    month_name VARCHAR(20) NOT NULL,
    sales_amount DECIMAL(18,2) NOT NULL
);

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Jan', 12000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Jan');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Feb', 15000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Feb');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Mar', 18000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Mar');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Apr', 14000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Apr');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'May', 21000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'May');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Jun', 25000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Jun');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Jul', 22000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Jul');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Aug', 27000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Aug');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Sep', 30000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Sep');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Oct', 28000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Oct');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Nov', 32000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Nov');

INSERT INTO monthly_sales (month_name, sales_amount)
SELECT 'Dec', 35000
WHERE NOT EXISTS (SELECT 1 FROM monthly_sales WHERE month_name = 'Dec');

SELECT * FROM monthly_sales;
```

---

## Backend Installation Commands

Open a terminal in the backend project folder:

```bash
cd "D:\Source\June 2026\Dapper - ORM\Backend\ChartDapperApi"
```

Install required backend packages:

```bash
dotnet add package Dapper
dotnet add package MySqlConnector
dotnet add package Swashbuckle.AspNetCore
```

If the old SQL Server package was installed, remove it:

```bash
dotnet remove package Microsoft.Data.SqlClient
```

Restore packages:

```bash
dotnet restore
```

---

## Backend Connection String

Open:

```text
Backend/ChartDapperApi/appsettings.json
```

Use this configuration:

```json
{
  "ConnectionStrings": {
    "ChartDemoDB": "Server=localhost;Port=3306;Database=chart_demo_db;User=root;Password=your_mysql_password;"
  },
  "Frontend": {
    "Url": "http://localhost:5173"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

Replace:

```text
your_mysql_password
```

with your actual MySQL password.

---

## Backend Build and Run Commands

Build the backend:

```bash
dotnet build
```

Run the backend:

```bash
dotnet run
```

Swagger URL:

```text
http://localhost:5137/swagger
```

API endpoint:

```text
http://localhost:5137/api/SalesChart
```

Expected API response:

```json
[
  {
    "Month": "Jan",
    "Sales": 12000.00
  },
  {
    "Month": "Feb",
    "Sales": 15000.00
  }
]
```

---

## Frontend Installation Commands

Open a new terminal and go to the frontend project folder:

```bash
cd "D:\Source\June 2026\Dapper - ORM\Frontend\chart-dapper-client"
```

Install frontend dependencies:

```bash
npm install
```

Install Syncfusion React Chart package if not already installed:

```bash
npm install @syncfusion/ej2-react-charts
```

---

## Frontend API URL

Open:

```text
Frontend/chart-dapper-client/src/App.tsx
```

Make sure the API URL is:

```tsx
const API_URL = 'http://localhost:5137/api/SalesChart';
```

---

## Frontend Build and Run Commands

Run the React frontend:

```bash
npm run dev
```

Open the React app:

```text
http://localhost:5173
```

Build the frontend for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Running the Full Application

Use two terminals.

### Terminal 1: Backend

```bash
cd "D:\Source\June 2026\Dapper - ORM\Backend\ChartDapperApi"
dotnet run
```

Backend runs at:

```text
http://localhost:5137
```

### Terminal 2: Frontend

```bash
cd "D:\Source\June 2026\Dapper - ORM\Frontend\chart-dapper-client"
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Quick Troubleshooting

### MySQL access denied

Check the username and password in `appsettings.json`.

```json
"User=root;Password=your_mysql_password;"
```

### Unknown database

Run this in MySQL Workbench:

```sql
CREATE DATABASE IF NOT EXISTS chart_demo_db;
```

### Table does not exist

Run the database setup script again.

### CORS error in React

Make sure backend `appsettings.json` contains:

```json
"Frontend": {
  "Url": "http://localhost:5173"
}
```

Also make sure the backend has CORS enabled in `Program.cs`.

### API URL error

Open this directly in the browser:

```text
http://localhost:5137/api/SalesChart
```

If this does not return JSON, fix the backend first before running the React chart.

---

## Final Output

After running both backend and frontend, the browser should display a **Syncfusion React Column Chart** showing monthly sales data from MySQL through Dapper.
