# Syncfusion React Chart with SQL Server and Entity Framework Core

This sample project demonstrates how to connect a **SQL Server database** to a **Syncfusion React Chart** using an **ASP.NET Core Web API** and **Entity Framework Core**.

The application flow is:

```text
SQL Server Database
        ↓
Entity Framework Core
        ↓
ASP.NET Core Web API
        ↓
React Fetch API
        ↓
Syncfusion React Chart
```

---

## 1. Prerequisites

Before running this project, install the following software:

- Visual Studio Code
- .NET SDK 8.0 or later
- Node.js 18.0 or later
- npm 9.0 or later
- SQL Server / SQL Server Express / LocalDB
- SQL Server Management Studio or Azure Data Studio
- EF Core CLI tool

Install EF Core CLI globally if it is not already installed:

```bash
dotnet tool install --global dotnet-ef
```

Verify installed versions:

```bash
dotnet --version
node --version
npm --version
dotnet ef --version
```

---

## 2. Project Folder Structure

Create the project with the following structure:

```text
SyncfusionChartEfDemo
│
├── ChartApi
│   ├── Controllers
│   │   └── SalesController.cs
│   ├── Data
│   │   └── AppDbContext.cs
│   ├── Models
│   │   └── SalesRecord.cs
│   ├── appsettings.json
│   ├── Program.cs
│   └── ChartApi.csproj
│
└── chart-client
    ├── src
    │   ├── App.tsx
    │   ├── App.css
    │   ├── main.tsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.ts
```

---

## 3. Create Main Project Folder

```bash
mkdir SyncfusionChartEfDemo
cd SyncfusionChartEfDemo
```

---

## 4. Backend Setup - ASP.NET Core Web API

Create the backend API project:

```bash
dotnet new webapi -n ChartApi --use-controllers
cd ChartApi
```

Install required Entity Framework Core packages:

```bash
dotnet add package Microsoft.EntityFrameworkCore --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 9.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 9.0.0
```

---

## 5. Backend Files

### 5.1 Models/SalesRecord.cs

Create this file:

```text
ChartApi/Models/SalesRecord.cs
```

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChartApi.Models
{
    public class SalesRecord
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Month { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal SalesAmount { get; set; }
    }
}
```

---

### 5.2 Data/AppDbContext.cs

Create this file:

```text
ChartApi/Data/AppDbContext.cs
```

```csharp
using ChartApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ChartApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<SalesRecord> SalesRecords { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SalesRecord>(entity =>
            {
                entity.ToTable("SalesRecords");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Month)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.SalesAmount)
                    .IsRequired()
                    .HasColumnType("decimal(18,2)");

                entity.HasData(
                    new SalesRecord { Id = 1, Month = "Jan", SalesAmount = 12000.00m },
                    new SalesRecord { Id = 2, Month = "Feb", SalesAmount = 18000.00m },
                    new SalesRecord { Id = 3, Month = "Mar", SalesAmount = 15000.00m },
                    new SalesRecord { Id = 4, Month = "Apr", SalesAmount = 22000.00m },
                    new SalesRecord { Id = 5, Month = "May", SalesAmount = 26000.00m },
                    new SalesRecord { Id = 6, Month = "Jun", SalesAmount = 30000.00m }
                );
            });
        }
    }
}
```

---

### 5.3 Controllers/SalesController.cs

Create this file:

```text
ChartApi/Controllers/SalesController.cs
```

```csharp
using ChartApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChartApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSalesData()
        {
            var salesData = await _context.SalesRecords
                .AsNoTracking()
                .OrderBy(record => record.Id)
                .Select(record => new
                {
                    month = record.Month,
                    salesAmount = record.SalesAmount
                })
                .ToListAsync();

            return Ok(salesData);
        }
    }
}
```

---

### 5.4 appsettings.json

Use one of the following connection strings based on your SQL Server setup.

#### SQL Server Default Instance

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SyncfusionChartDb;Trusted_Connection=True;TrustServerCertificate=True;"
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

#### SQL Server Express

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.\\SQLEXPRESS;Database=SyncfusionChartDb;Trusted_Connection=True;TrustServerCertificate=True;"
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

#### LocalDB

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=SyncfusionChartDb;Trusted_Connection=True;TrustServerCertificate=True;"
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

---

### 5.5 Program.cs

Replace the full content of `Program.cs` with this:

```csharp
using ChartApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactClientPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("ReactClientPolicy");

app.MapControllers();

app.Run();
```

---

## 6. Backend Build and Database Commands

Run these commands from the `ChartApi` folder:

```bash
dotnet clean
dotnet restore
dotnet build
```

Create the database using EF Core migrations:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Run the backend API:

```bash
dotnet run --urls "http://localhost:5000"
```

Test the API in the browser:

```text
http://localhost:5000/api/sales
```

Expected response:

```json
[
  {
    "month": "Jan",
    "salesAmount": 12000.00
  },
  {
    "month": "Feb",
    "salesAmount": 18000.00
  }
]
```

---

## 7. Frontend Setup - React with Vite

Go back to the main folder:

```bash
cd ..
```

Create the React application:

```bash
npm create vite@latest chart-client -- --template react-ts
cd chart-client
npm install
```

Install Syncfusion React Chart package:

```bash
npm install @syncfusion/ej2-react-charts --save
```

---

## 8. Frontend Files

### 8.1 src/main.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

### 8.2 src/App.tsx

```tsx
import { useEffect, useState } from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Tooltip,
  Legend,
  DataLabel
} from '@syncfusion/ej2-react-charts';

import './App.css';

type SalesRecord = {
  month: string;
  salesAmount: number;
};

function App() {
  const [chartData, setChartData] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5000/api/sales')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load sales data from API.');
        }

        return response.json();
      })
      .then((data: SalesRecord[]) => {
        setChartData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>Syncfusion React Chart with SQL Server and Entity Framework</h1>

      <p className="description">
        This chart displays monthly sales data loaded from SQL Server through an ASP.NET Core Web API.
      </p>

      {loading && <p>Loading chart data...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="chart-card">
          <ChartComponent
            id="sales-chart"
            title="Monthly Sales Report"
            primaryXAxis={{
              valueType: 'Category',
              title: 'Month'
            }}
            primaryYAxis={{
              title: 'Sales Amount',
              labelFormat: '₹{value}'
            }}
            tooltip={{
              enable: true
            }}
            legendSettings={{
              visible: true
            }}
          >
            <Inject services={[ColumnSeries, Category, Tooltip, Legend, DataLabel]} />

            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={chartData}
                xName="month"
                yName="salesAmount"
                name="Sales"
                type="Column"
                marker={{
                  dataLabel: {
                    visible: true
                  }
                }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      )}
    </div>
  );
}

export default App;
```

---

### 8.3 src/App.css

```css
.app-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  text-align: center;
  color: #222;
  margin-bottom: 10px;
}

.description {
  text-align: center;
  color: #555;
  margin-bottom: 30px;
}

.chart-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.error-message {
  color: #d32f2f;
  text-align: center;
  font-weight: bold;
}
```

---

### 8.4 src/index.css

```css
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../node_modules/@syncfusion/ej2-react-charts/styles/material.css';

body {
  margin: 0;
  background-color: #f5f7fb;
}
```

---

## 9. Frontend Build and Run Commands

Run the frontend from the `chart-client` folder:

```bash
npm run dev
```

Open the React app in the browser:

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

## 10. Final Run Order

Use two terminals.

### Terminal 1 - Backend

```bash
cd ChartApi
dotnet run --urls "http://localhost:5000"
```

### Terminal 2 - Frontend

```bash
cd chart-client
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 11. Troubleshooting

### Error: Chart data is not loading

Check backend API is running:

```text
http://localhost:5000/api/sales
```

### Error: CORS issue

Make sure `Program.cs` contains:

```csharp
.WithOrigins("http://localhost:5173")
```

### Error: SQL Server connection failed

Try one of these connection strings:

```json
"DefaultConnection": "Server=.\\SQLEXPRESS;Database=SyncfusionChartDb;Trusted_Connection=True;TrustServerCertificate=True;"
```

or:

```json
"DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=SyncfusionChartDb;Trusted_Connection=True;TrustServerCertificate=True;"
```

### Error: dotnet ef not found

Install EF CLI:

```bash
dotnet tool install --global dotnet-ef
```

Then close and reopen the terminal.

---

## 12. Expected Output

After running both backend and frontend, the browser should display a Syncfusion column chart showing monthly sales data:

```text
Jan - 12000
Feb - 18000
Mar - 15000
Apr - 22000
May - 26000
Jun - 30000
```

---

## 13. Summary

This project demonstrates a complete beginner-friendly integration of:

- SQL Server
- Entity Framework Core
- ASP.NET Core Web API
- React with Vite
- Syncfusion React Chart

The chart data is stored in SQL Server, accessed through EF Core, exposed using Web API, fetched by React, and displayed using Syncfusion React Chart.
