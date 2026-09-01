# React Chart with GraphQLAdaptor

This sample demonstrates how to bind simple GraphQL data to a Syncfusion React Chart component using Syncfusion DataManager and GraphQLAdaptor.

The sample contains two parts:

1. GraphQL Server
2. React Client with Syncfusion Chart

---

## Project Structure

The project uses the following folder structure:

- chart-graphql-server/server.js
- chart-graphql-server/package.json
- chart-client/package.json
- chart-client/src/App.js
- chart-client/src/App.css
- chart-client/src/index.js

---

## Prerequisites

Before running the sample, make sure the following tools are installed:

- Node.js
- npm
- Visual Studio Code or any preferred code editor

---

## Server Setup

The GraphQL server source file is available at:

- chart-graphql-server/server.js

The server package configuration is available at:

- chart-graphql-server/package.json

Install the server dependencies from the server folder.

Start the GraphQL server from the server folder.

The GraphQL server runs at:

- http://localhost:4000/graphql

---

## GraphQL API Test

After starting the server, open the GraphQL endpoint in a browser:

- http://localhost:4000/graphql

Use the GraphQL query available in the server implementation to verify the sales data response.

The server returns sales data with the following fields:

- month
- revenue

Expected data points:

- Jan → 1000
- Feb → 1500
- Mar → 1200
- Apr → 2000
- May → 1800
- Jun → 2200

---

## Client Setup

The React client source file is available at:

- chart-client/src/App.js

The client stylesheet is available at:

- chart-client/src/App.css

The React entry file is available at:

- chart-client/src/index.js

The client package configuration is available at:

- chart-client/package.json

Install the client dependencies from the client folder.

Start the React client from the client folder.

The React client runs at:

- http://localhost:3000

---

## Syncfusion Packages Used

The React client uses the following Syncfusion packages:

- @syncfusion/ej2-react-charts
- @syncfusion/ej2-data

The chart component is configured in:

- chart-client/src/App.js

The DataManager and GraphQLAdaptor configuration is also available in:

- chart-client/src/App.js

---

## Expected Output

After running both server and client, the browser should display a Syncfusion Line Chart titled:

- Monthly Sales Revenue

The chart displays monthly revenue values from January to June.

Expected chart points:

- Jan → 1000
- Feb → 1500
- Mar → 1200
- Apr → 2000
- May → 1800
- Jun → 2200

---

## Run Order

Run the sample in this order:

1. Start the GraphQL server.
2. Verify the GraphQL API in the browser.
3. Start the React client.
4. Open the React app in the browser.

Server folder:

- chart-graphql-server

Client folder:

- chart-client

---

## Important Notes

Both the server and client must run at the same time.

The server must be running before the React client loads data.

The chart data binding depends on the GraphQL response mapping configured in:

- chart-client/src/App.js

The GraphQL schema and sample sales data are configured in:

- chart-graphql-server/server.js

---

## Troubleshooting

### Server is not running

Check whether the GraphQL endpoint is accessible:

- http://localhost:4000/graphql

If the endpoint is not accessible, start the server again from:

- chart-graphql-server

---

### Chart is empty

Check the following files:

- chart-graphql-server/server.js
- chart-client/src/App.js

Make sure the server response field names match the chart binding fields.

Required field names:

- month
- revenue

---

### Syncfusion packages missing

Check the client package configuration at:

- chart-client/package.json

Make sure the required Syncfusion packages are installed in the client project.

---

## Technologies Used

- React
- Syncfusion React Charts
- Syncfusion DataManager
- GraphQLAdaptor
- Node.js
- Express
- GraphQL

---

## Summary

This sample shows how to connect a React Chart component to a GraphQL backend using Syncfusion DataManager and GraphQLAdaptor.

The backend provides simple sales data, and the React client displays that data as a line chart.
