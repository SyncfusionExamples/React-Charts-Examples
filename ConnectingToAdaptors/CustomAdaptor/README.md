# Syncfusion React Chart with Custom Adaptor

This README explains how to set up, install, build, and run the Syncfusion React Chart Custom Adaptor project. The project contains a backend server and a frontend client. The server provides chart data, and the client displays the data using Syncfusion React Chart with a Custom Adaptor.

---

## Prerequisites

Install the following tools before running the project:

- Node.js version 18 or later.
- npm version 9 or later. npm is included with Node.js.
- Visual Studio Code or any preferred code editor.
- A modern browser such as Microsoft Edge, Google Chrome, or Firefox.
- Git, if cloning the project from a repository.

Required project technologies:

- Node.js runtime for the backend server.
- Express framework for the backend API.
- CORS middleware for allowing the frontend client to access the backend API.
- React for the frontend application.
- Vite for frontend development and production build tooling.
- Syncfusion EJ2 React Charts for rendering the chart.
- Syncfusion EJ2 DataManager for remote data handling and Custom Adaptor usage.

Environment setup notes:

- Python is not required.
- Java is not required.
- Docker is not required.
- No environment variable file is required for the current sample.
- No `/server/.env` file is required.
- No `/client/.env` file is required.
- Server dependencies must be installed from `/server`.
- Client dependencies must be installed from `/client`.

Default ports:

- Backend server: `http://localhost:5050`
- Backend chart API: `http://localhost:5050/api/chart-data`
- Frontend client: `http://localhost:5173`

If the default frontend port is already in use, Vite may automatically use another available port such as `5174` or `5175`.

---

## Project Structure

```text
/
├── /server
│   ├── /server/package.json
│   └── /server/server.js
│
└── /client
    ├── /client/package.json
    ├── /client/index.html
    └── /client/src
        ├── /client/src/main.jsx
        ├── /client/src/App.jsx
        ├── /client/src/App.css
        ├── /client/src/index.css
        ├── /client/src/data.js
        └── /client/src/adaptors
            └── /client/src/adaptors/CustomAdaptor.js
```

Directory purpose:

- `/server` contains the Node.js and Express backend API.
- `/client` contains the React and Vite frontend application.
- `/client/src` contains the main React source files.
- `/client/src/adaptors` contains the Syncfusion Custom Adaptor.

Important file purpose:

- `/server/server.js` starts the backend server and exposes the chart data API.
- `/server/package.json` contains backend dependencies and server scripts.
- `/client/package.json` contains frontend dependencies and client scripts.
- `/client/index.html` is the main HTML entry file for the Vite client.
- `/client/src/main.jsx` starts the React application.
- `/client/src/App.jsx` loads chart data and renders the Syncfusion chart.
- `/client/src/data.js` configures Syncfusion DataManager and the backend API URL.
- `/client/src/adaptors/CustomAdaptor.js` transforms backend data into chart-ready data.
- `/client/src/index.css` contains required Syncfusion style imports.
- `/client/src/App.css` contains page-level styling.

---

## Installation

Follow these steps after cloning or copying the project.

### 1. Install server dependencies

1. Open a terminal.
2. Go to `/server`.
3. Install dependencies using npm.
4. Confirm that `/server/package.json` exists.
5. Confirm that `/server/package.json` includes `express` and `cors`.

Server package manager:

- npm

Required server packages:

- express
- cors

Server installation command:

- **npm install**

Server configuration files to verify:

- `/server/package.json`
- `/server/server.js`

No `/server/.env` file needs to be created or edited for this sample.

### 2. Install client dependencies

1. Open a second terminal.
2. Go to `/client`.
3. Install dependencies using npm.
4. Confirm that `/client/package.json` exists.
5. Confirm that `/client/package.json` includes React, Vite, Syncfusion EJ2 Data, and Syncfusion EJ2 React Charts.

Client package manager:

- npm

Required client packages:

- react
- react-dom
- vite
- @vitejs/plugin-react
- @syncfusion/ej2-data
- @syncfusion/ej2-react-charts

Client installation command:

- **npm install**

Client configuration files to verify:

- `/client/package.json`
- `/client/index.html`
- `/client/src/data.js`
- `/client/src/adaptors/CustomAdaptor.js`
- `/client/src/index.css`

No `/client/.env` file needs to be created or edited for this sample.

### 3. Package manager notes

- npm is the recommended package manager for this project.
- yarn can be used only if the project is configured for yarn.
- pnpm can be used only if the project is configured for pnpm.
- pip is not required because this project does not use Python.
- Maven and Gradle are not required because this project does not use Java.
- Docker is not required for the current setup.

---

## Build Instructions

The server does not require a separate build step because the backend runs directly with Node.js.

Server build guidance:

- No server build step is required.
- The server execution file is `/server/server.js`.

Client build guidance:

1. Open a terminal.
2. Go to `/client`.
3. Run the production build command.
4. Confirm that the build output is generated by Vite.

Client build command:

- **npm run build**

Client preview command after build:

- **npm run preview**

---

## Running the Project

The server and client must run at the same time. Use two separate terminals or two terminal tabs.

### 1. Start the server

1. Open Terminal 1.
2. Go to `/server`.
3. Start the server using the server start command.
4. Keep the server terminal open while using the client.
5. Verify the backend API in a browser.

Server start command:

- **npm start**

Alternative server execution command:

- **node server.js**

Default server URL:

- `http://localhost:5050`

Default chart API URL:

- `http://localhost:5050/api/chart-data`

Expected server result:

- The server root URL should confirm that the server is running.
- The chart API URL should return monthly chart data.

### 2. Start the client

1. Open Terminal 2.
2. Go to `/client`.
3. Start the Vite development server using the client dev command.
4. Open the local URL shown in the terminal.

Client development command:

- **npm run dev**

Default client URL:

- `http://localhost:5173`

Possible alternate client URLs:

- `http://localhost:5174`
- `http://localhost:5175`

Vite may select another port if the default port is already in use. Always open the exact URL displayed in the client terminal.

### 3. Run server and client simultaneously

Use two terminals:

- Terminal 1 runs the backend from `/server`.
- Terminal 2 runs the frontend from `/client`.

Recommended order:

1. Start the backend server from `/server`.
2. Confirm the backend API is working in the browser.
3. Start the frontend client from `/client`.
4. Open the Vite client URL in the browser.

### 4. Change default ports

To change the server port:

1. Edit `/server/server.js`.
2. Update the server port value.
3. Edit `/client/src/data.js`.
4. Update the backend API URL to match the new server port.
5. Restart both the server and the client.

To change the client port:

1. Start the Vite client from `/client` with a custom Vite port option.
2. Or allow Vite to automatically select the next available port.

---

## Troubleshooting

If the chart does not render:

- Confirm that the server is running from `/server`.
- Confirm that `/client/src/data.js` points to the active server port.
- Confirm that `/client/src/adaptors/CustomAdaptor.js` exists in the correct directory.
- Confirm that the transformed chart data contains `x` and `y` fields.
- Confirm that `/client/src/App.jsx` uses the same chart field names.
- Confirm that `/client/src/index.css` includes the required Syncfusion styles.

If the client cannot find the Custom Adaptor:

- Confirm the file path is `/client/src/adaptors/CustomAdaptor.js`.
- Do not place the file directly under `/client/adaptors`.
- Confirm that `/client/src/data.js` references the adaptor from the correct path.

If the API returns a 404 error:

- Confirm that the server is running from `/server`.
- Confirm that the browser is using `http://localhost:5050/api/chart-data`.
- Confirm that `/client/src/data.js` is not pointing to an old port such as `5000`.

If dependencies fail:

- Reinstall dependencies inside `/server`.
- Reinstall dependencies inside `/client`.
- Remove stale dependency folders only from the affected directory.
- Restart the terminal and run the project again.

If the frontend port is already in use:

- Use the alternate Vite URL displayed in the terminal.
- Stop older frontend terminals that may still be running.

If the backend port is already in use:

- Stop the old backend process.
- Or change the server port in `/server/server.js` and update `/client/src/data.js`.

---

## Expected Output

After successful setup:

- The backend server runs from `/server`.
- The frontend client runs from `/client`.
- The browser displays a Syncfusion column chart.
- The chart displays monthly sales data for Jan, Feb, Mar, Apr, May, and Jun.

---

## Summary

This project uses a Node.js Express server and a React Vite client. The server provides data through an API, and the client uses Syncfusion DataManager with a Custom Adaptor to transform the data and render it in a Syncfusion React Chart.
