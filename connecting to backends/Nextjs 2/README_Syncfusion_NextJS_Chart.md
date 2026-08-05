# Syncfusion React Chart with Next.js App Router

This sample demonstrates how to build a simple **Next.js application** with a **Syncfusion React Chart component**, a backend API route, and basic routing.

The application includes:

- A Home page at `/`
- A Chart page at `/chart`
- A backend API route at `/api/sales`
- A Syncfusion React Column Chart
- Simple static sales data

---

## Prerequisites

Before running this project, install the following tools:

1. **Node.js LTS**
   - Recommended: Node.js 18 or later

2. **npm**
   - npm is installed automatically with Node.js

3. **Visual Studio Code**
   - Recommended IDE for editing and running the project

4. **Basic terminal knowledge**
   - You should know how to run commands in the VS Code terminal

---

## Project Folder Structure

```txt
syncfusion-nextjs-chart-app
├── package.json
├── next.config.ts
├── tsconfig.json
└── src
    ├── app
    │   ├── api
    │   │   └── sales
    │   │       └── route.ts
    │   ├── chart
    │   │   └── page.tsx
    │   ├── data
    │   │   └── salesData.ts
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    └── components
        └── SalesChart.tsx
```

---

## Create a New Next.js Project

Open **Visual Studio Code** and run the following command in the terminal:

```bash
npx create-next-app@latest syncfusion-nextjs-chart-app
```

Recommended options:

```txt
TypeScript: Yes
ESLint: Yes
Tailwind CSS: No
Use src/ directory: Yes
Use App Router: Yes
Customize import alias: No
```

Move into the project folder:

```bash
cd syncfusion-nextjs-chart-app
```

Open the project in VS Code:

```bash
code .
```

---

## Installation Commands

Install the Syncfusion React Chart package:

```bash
npm install @syncfusion/ej2-react-charts --save
```

If dependencies are missing, run:

```bash
npm install
```

---

## Required Files

Create or update the following files in the project:

```txt
src/app/data/salesData.ts
src/app/api/sales/route.ts
src/components/SalesChart.tsx
src/app/chart/page.tsx
src/app/page.tsx
src/app/layout.tsx
src/app/globals.css
```

---

## API Endpoint

The backend API route is available at:

```txt
http://localhost:3000/api/sales
```

Expected response format:

```json
{
  "result": [
    {
      "month": "Jan",
      "sales": 35
    }
  ],
  "count": 12
}
```

---

## Run the Application

Start the development server:

```bash
npm run dev
```

Open the application in the browser:

```txt
http://localhost:3000
```

Open the chart page:

```txt
http://localhost:3000/chart
```

Open the backend API directly:

```txt
http://localhost:3000/api/sales
```

---

## Build Command

To create a production build, run:

```bash
npm run build
```

---

## Start Production Server

After building the project, run:

```bash
npm run start
```

Then open:

```txt
http://localhost:3000
```

---

## Clean Next.js Cache

If the chart or routing does not update correctly, stop the server and delete the `.next` folder.

For macOS/Linux/Git Bash:

```bash
rm -rf .next
```

For Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .next
```

Then run again:

```bash
npm run dev
```

---

## Troubleshooting

### 1. Chart is not displayed

Check whether the Syncfusion package is installed:

```bash
npm install @syncfusion/ej2-react-charts --save
```

Restart the development server:

```bash
npm run dev
```

---

### 2. API is not working

Open:

```txt
http://localhost:3000/api/sales
```

If the API does not return JSON, check that this file exists:

```txt
src/app/api/sales/route.ts
```

---

### 3. `/chart` page is not working

Check that this file exists exactly:

```txt
src/app/chart/page.tsx
```

The folder must be named `chart`, and the file must be named `page.tsx`.

---

### 4. Styles are not applied

Check that Syncfusion styles are imported in:

```txt
src/app/globals.css
```

Example imports:

```css
@import '@syncfusion/ej2-base/styles/material.css';
@import '@syncfusion/ej2-buttons/styles/material.css';
@import '@syncfusion/ej2-popups/styles/material.css';
@import '@syncfusion/ej2-react-charts/styles/material.css';
```

---

## Expected Output

After running the project, the chart page should display:

```txt
Monthly Sales Chart
API Endpoint: /api/sales
Monthly Sales Report
```

Below the title, a Syncfusion Column Chart should render monthly sales data from January to December.

---

## Useful Commands Summary

```bash
# Create project
npx create-next-app@latest syncfusion-nextjs-chart-app

# Move into project
cd syncfusion-nextjs-chart-app

# Install Syncfusion Chart
npm install @syncfusion/ej2-react-charts --save

# Run development server
npm run dev

# Build production version
npm run build

# Start production server
npm run start
```

---

## Notes

This project uses static sample data from:

```txt
src/app/data/salesData.ts
```

In a real-world project, this file can be replaced with data from a database or external API.
