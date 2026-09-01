# React Syncfusion Chart with Flask API

This project demonstrates how to connect a **React Syncfusion Chart component** with a **Flask API backend**. The Flask backend returns simple monthly sales and expenses data, and the React frontend displays the data using a Syncfusion chart.

---

## Prerequisites

Before running this project, install the following software:

- **Python 3.8 or later**
- **Node.js LTS version**
- **npm**
- **Visual Studio Code**
- **Python extension for Visual Studio Code**
- **Modern web browser** such as Microsoft Edge, Chrome, or Firefox

---

## Project Folder Structure

```text
Flask API/
│
├── server/
│   ├── app.py
│   ├── requirements.txt
│   └── venv/
│
└── client/
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── index.css
        └── services/
            └── chartService.ts
```

---

## Backend Setup - Flask API

### 1. Open the project folder in Visual Studio Code

```bash
cd "D:\Source\June 2026\Flask API"
code .
```

### 2. Go to the backend folder

```bash
cd server
```

### 3. Create a Python virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

For Windows:

```bash
venv\Scripts\activate
```

For macOS or Linux:

```bash
source venv/bin/activate
```

### 5. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 6. Run the Flask API

```bash
python app.py
```

Expected output:

```text
* Serving Flask app 'app'
* Debug mode: on
* Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

### 7. Test the Flask API

Open this URL in the browser:

```text
http://127.0.0.1:5000/
```

Expected response:

```json
{
  "message": "Flask API is running successfully",
  "salesApi": "http://127.0.0.1:5000/api/sales"
}
```

Open the chart data API:

```text
http://127.0.0.1:5000/api/sales
```

Expected response format:

```json
{
  "count": 12,
  "result": [
    {
      "month": "Jan",
      "sales": 35,
      "expenses": 20
    }
  ]
}
```

---

## Frontend Setup - React Syncfusion Chart

Open a new terminal in Visual Studio Code.

### 1. Go to the frontend folder

```bash
cd "D:\Source\June 2026\Flask API\client"
```

### 2. Install frontend dependencies

```bash
npm install
```

This installs React, Vite, TypeScript, and Syncfusion React Charts packages from `package.json`.

### 3. Run the React application

```bash
npm run dev
```

Expected output:

```text
Local: http://127.0.0.1:5173/
```

Open this URL in the browser:

```text
http://127.0.0.1:5173/
```

You should see the Syncfusion chart with monthly **Sales** and **Expenses** data loaded from the Flask API.

---

## Build Commands

### Build the React frontend

Run this command inside the `client` folder:

```bash
npm run build
```

The production build will be generated inside the `client/dist` folder.

### Preview the production build

```bash
npm run preview
```

Expected preview URL:

```text
http://127.0.0.1:4173/
```

---

## Run Commands Summary

### Terminal 1 - Backend

```bash
cd "D:\Source\June 2026\Flask API\server"
venv\Scripts\activate
python app.py
```

Backend URL:

```text
http://127.0.0.1:5000
```

API endpoint:

```text
http://127.0.0.1:5000/api/sales
```

### Terminal 2 - Frontend

```bash
cd "D:\Source\June 2026\Flask API\client"
npm run dev
```

Frontend URL:

```text
http://127.0.0.1:5173
```

---

## Important Notes

- Flask backend runs on port **5000**.
- React frontend runs on port **5173**.
- Use `127.0.0.1` instead of `localhost` if the browser does not load the API correctly.
- Keep both backend and frontend terminals running at the same time.
- If port `5000` is already used, change the Flask port to `5001` in `server/app.py` and update the API URL in `client/src/services/chartService.ts`.

---

## Troubleshooting

### Problem: Cannot GET /api/sales

Use this URL exactly:

```text
http://127.0.0.1:5000/api/sales
```

Make sure Flask is running:

```bash
python app.py
```

### Problem: React chart shows API error

Check that the Flask backend is running before starting or refreshing the React app.

### Problem: Module not found

Run this command inside the `client` folder:

```bash
npm install
```

### Problem: CORS error

Make sure `flask-cors` is installed and `CORS(app)` is added in `server/app.py`.

---

## Application Flow

```text
React App starts
      |
      v
App.tsx calls chartService.ts
      |
      v
chartService.ts sends GET request to Flask API
      |
      v
Flask returns sales JSON data
      |
      v
React stores data in state
      |
      v
Syncfusion Chart displays the data
```

---

## Output

The final application displays a chart with:

- Month names on the X-axis
- Sales as a column series
- Expenses as a line series
- Tooltip
- Legend
- Data labels

---

## Project Type

This is a beginner-friendly full-stack sample using:

- Flask
- Flask-CORS
- React
- TypeScript
- Vite
- Syncfusion React Charts
