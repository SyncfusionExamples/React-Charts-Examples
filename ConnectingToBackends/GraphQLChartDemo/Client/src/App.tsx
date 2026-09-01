import ChartGraphQL from "./ChartGraphQL";

function App() {
  return (
    <div className="app-container">
      <div className="header-section">
        <h1>Syncfusion React Chart with GraphQL Backend</h1>

        <p>
          This sample loads monthly sales and expenses data from a Node.js
          GraphQL API and displays it using the Syncfusion React Chart
          component.
        </p>
      </div>

      <ChartGraphQL />
    </div>
  );
}

export default App;