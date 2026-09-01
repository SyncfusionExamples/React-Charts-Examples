# 📊 OData V4 + React Chart (Server & Client Setup)

This project demonstrates how to run an **ASP.NET Core OData V4 server** and a **React Chart client** using **ODataV4Adaptor**.

---

# 🧾 Prerequisites

- ✅ .NET SDK (6 or later)
- ✅ Node.js (14 or later)
- ✅ Visual Studio Code / Visual Studio

---

# 📁 Project Structure

```
project-root/
 ├── server/   → OData API (ASP.NET Core)
 └── client/   → React Chart App
```

---

# ⚙️ Server Setup (OData API)

## 1. Create Server

```bash
mkdir server
cd server
dotnet new webapi
```

## 2. Install OData

```bash
dotnet add package Microsoft.AspNetCore.OData
```

## 3. Run Server

```bash
dotnet run
```

✅ Server URL:

```
https://localhost:5001/odata/Orders
```

---

# 💻 Client Setup (React Chart)

## 1. Create React App

```bash
cd ..
npx create-react-app client
cd client
```

## 2. Install Packages

```bash
npm install @syncfusion/ej2-react-charts --save
npm install @syncfusion/ej2-data --save
```

## 3. Run Client

```bash
npm start
```

✅ Client URL:

```
http://localhost:3000
```

---

# 🔗 Connection

The React app connects to API using:

```
https://localhost:5001/odata/Orders
```

---

# 🔄 How It Works

1. React app starts
2. DataManager sends request to:
   ```
   /odata/Orders
   ```
3. Server returns OData response
4. ODataV4Adaptor processes data
5. Chart displays results

---

# ⚠️ Notes

- ✅ Enable CORS in server
- ✅ Ensure API returns:
  ```json
  { "value": [], "@odata.count": number }
  ```
- ✅ Ignore webpack warnings (not errors)

---

# ✅ Output

- Chart displays:
  - X-axis → CustomerID  
  - Y-axis → Amount  

---

✅ You now have a **working OData V4 + React Chart integration**
