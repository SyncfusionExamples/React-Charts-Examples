# 📊 Syncfusion React Chart with Django REST

## ✅ Prerequisites

Make sure the following are installed on your system:

- Python 3.10+  
- Node.js (v18+)  
- npm (comes with Node.js)  
- Visual Studio Code  
- pip (Python package manager)

---

## ⚙️ Installation

### 🔹 1. Create Project Folder

```bash
mkdir chart-project
cd chart-project
```

---

### 🔹 2. Setup Django Backend

```bash
python -m venv venv
venv\Scripts\activate   # Windows

pip install django djangorestframework django-cors-headers

django-admin startproject backend
cd backend
python manage.py startapp api
```

---

### 🔹 3. Setup React Frontend

Open new terminal:

```bash
cd chart-project

npm create vite@latest frontend
cd frontend

npm install
npm install axios @syncfusion/ej2-react-charts
```

---

## ▶️ Running the Application

### ✅ 1. Run Django Backend

```bash
cd backend
venv\Scripts\activate   # If not already activated

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Backend will run at:
```
http://127.0.0.1:8000/
```

API endpoint:
```
http://127.0.0.1:8000/api/sales/
```

---

### ✅ 2. Run React Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend will run at:
```
http://localhost:5173/
```

---

## ✅ ✅ Final Check

- Backend running ✅  
- Frontend running ✅  
- API accessible ✅  
- Chart should display data ✅  

---

✅ That’s it — your project is ready to run!
