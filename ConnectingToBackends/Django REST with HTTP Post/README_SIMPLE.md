# Syncfusion React Chart with Django REST POST Binding

This project demonstrates a simple full-stack application where a **React Syncfusion Chart** connects to a **Django REST Framework** backend using **HTTP POST request data binding**.

The backend provides monthly sales data, and the frontend displays the data in a Syncfusion chart.

---

## Prerequisites

Install the following before running the project:

- Python 3.11 or later
- Node.js 20 or later
- npm
- Visual Studio Code
- pip

Recommended Visual Studio Code extensions:

- Python
- Pylance
- ES7 React/Redux/React-Native snippets

---

## Project Folder Structure

```text
Django REST with HTTP Post/
│
├── backend/
│   ├── manage.py
│   ├── db.sqlite3
│   │
│   ├── chart_backend/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   └── sales/
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── models.py
│       ├── serializers.py
│       ├── urls.py
│       ├── views.py
│       └── migrations/
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    │
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── index.css
        └── vite-env.d.ts
```

---

## Backend Installation Commands

Open a terminal and go to the backend folder:

```cmd
cd backend
```

Create a Python virtual environment:

```cmd
python -m venv .venv
```

Activate the virtual environment:

```cmd
.venv\Scriptsctivate
```

Install Django backend packages:

```cmd
pip install django djangorestframework django-cors-headers
```

---

## Backend Database Commands

Create migration files:

```cmd
python manage.py makemigrations
```

Apply migrations and create database tables:

```cmd
python manage.py migrate
```

Optional: Create Django admin user:

```cmd
python manage.py createsuperuser
```

---

## Backend Run Command

Start the Django development server:

```cmd
python manage.py runserver
```

Backend server URL:

```text
http://localhost:8000
```

Sales API URL:

```text
http://localhost:8000/api/sales/
```

---

## Frontend Installation Commands

Open another terminal and go to the frontend folder:

```cmd
cd frontend
```

Install frontend dependencies:

```cmd
npm install
```

Install Syncfusion packages:

```cmd
npm install @syncfusion/ej2-react-charts @syncfusion/ej2-data
```

---

## Frontend Run Command

Start the React Vite development server:

```cmd
npm run dev
```

Frontend server URL is usually:

```text
http://localhost:5173
```

If port 5173 is already used, Vite may start on another port, such as:

```text
http://localhost:5174
```

---

## Build Commands

Build the frontend for production:

```cmd
npm run build
```

Preview the production build:

```cmd
npm run preview
```

---

## Recommended Running Order

1. Start the Django backend server.
2. Open the backend API URL and confirm that JSON data is returned.
3. Start the React frontend server.
4. Open the frontend URL in the browser.
5. Confirm that the Syncfusion chart displays the backend sales data.

---

## Common Issue: CORS Error

If the browser blocks the API request, confirm that Django CORS settings allow the frontend URL.

For local development, the backend can allow local frontend origins such as:

```text
http://localhost:5173
http://localhost:5174
```

After changing Django settings, restart the backend server.

---

## Summary

This sample uses:

- Django REST Framework for the backend API
- SQLite for the database
- React with Vite for the frontend
- Syncfusion React Chart for visualization
- Syncfusion DataManager and UrlAdaptor for POST request data binding
