# Syncfusion React Chart with FastAPI Backend

This sample project shows how to connect a **Syncfusion React Chart** component with a **FastAPI** backend using Visual Studio Code.

The backend provides simple chart data through REST API endpoints, and the React frontend displays that data in a Syncfusion column chart.

---

## Prerequisites

Install the following software before starting:

- Visual Studio Code
- Python 3.11 or later
- Node.js 20 or later
- npm

Check your installed versions:

```bash
python --version
node --version
npm --version
```

---

## Project Folder Structure

```text
fastapi-react-chart-sample/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        └── App.css
```

---

## Backend Setup - FastAPI

### 1. Create backend folder

```bash
mkdir fastapi-react-chart-sample
cd fastapi-react-chart-sample
mkdir backend
cd backend
```

### 2. Create virtual environment

#### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Create `requirements.txt`

Create this file:

```text
backend/requirements.txt
```

Add:

```txt
fastapi
uvicorn
```

### 4. Install backend packages

```bash
pip install -r requirements.txt
```

### 5. Run FastAPI backend

From the `backend` folder, run:

```bash
uvicorn main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

Test these URLs in your browser:

```text
http://localhost:8000
http://localhost:8000/chart-data
http://localhost:8000/docs
```

---

## Frontend Setup - React + Vite

Open a new terminal from the root project folder:

```bash
cd fastapi-react-chart-sample
```

### 1. Create React app

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### 2. Install Syncfusion packages

```bash
npm install @syncfusion/ej2-react-charts @syncfusion/ej2-data
```

### 3. Run React frontend

From the `frontend` folder, run:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Build Commands

### Build frontend for production

From the `frontend` folder:

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Run Commands Summary

Use two terminals.

### Terminal 1 - Backend

```bash
cd backend
.venv\Scripts\activate
uvicorn main:app --reload
```

For macOS / Linux:

```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload
```

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Open the React app:

```text
http://localhost:5173
```

---

## API Endpoints

### Root endpoint

```text
GET http://localhost:8000/
```

### Monthly sales chart data

```text
GET http://localhost:8000/chart-data
POST http://localhost:8000/chart-data
```

### Category sales chart data

```text
GET http://localhost:8000/category-sales
POST http://localhost:8000/category-sales
```

The `GET` endpoints are useful for browser testing.

The `POST` endpoints are useful for Syncfusion `DataManager` with `UrlAdaptor`.

---

## Troubleshooting

### Backend is not running

Make sure this command is running inside the `backend` folder:

```bash
uvicorn main:app --reload
```

### Frontend is not running

Make sure this command is running inside the `frontend` folder:

```bash
npm run dev
```

### CORS error

Make sure `CORSMiddleware` is added in `backend/main.py`.

### Chart is blank

Check whether this URL returns JSON data:

```text
http://localhost:8000/chart-data
```

If it does not return data, fix and run the backend first.

---

## Notes

- This is a beginner-friendly sample.
- The backend uses in-memory data only.
- No database is required for this sample.
- You can later replace the sample data with database data.
