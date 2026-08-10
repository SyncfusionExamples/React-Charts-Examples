import React, { useEffect, useState } from "react";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  LineSeries,
  Category,
  Legend,
  Tooltip,
  DataLabel
} from "@syncfusion/ej2-react-charts";

const GRAPHQL_API_URL = "http://localhost:4000/";

function App() {
  const [chartData, setChartData] = useState([]);
  const [recordCount, setRecordCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const query = `
        query GetSalesChartData {
          getSalesChartData {
            result {
              month
              sales
              expenses
              profit
            }
            count
          }
        }
      `;

      const response = await fetch(GRAPHQL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: query
        })
      });

      const responseJson = await response.json();

      if (responseJson.errors) {
        throw new Error(responseJson.errors[0].message);
      }

      const result = responseJson.data.getSalesChartData.result;
      const count = responseJson.data.getSalesChartData.count;

      setChartData(result);
      setRecordCount(count);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong while loading chart data.");
    } finally {
      setLoading(false);
    }
  };

  const primaryXAxis = {
    valueType: "Category",
    title: "Month"
  };

  const primaryYAxis = {
    title: "Amount",
    labelFormat: "{value}K"
  };

  const tooltip = {
    enable: true
  };

  const legendSettings = {
    visible: true
  };

  const marker = {
    dataLabel: {
      visible: true
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="header">
          <h1>Syncfusion React Chart with Apollo GraphQL</h1>
          <p>
            This chart loads simple sales data from a GraphQL backend created using Apollo Server.
          </p>
        </div>

        {loading && (
          <div className="status loading">
            Loading chart data from GraphQL server...
          </div>
        )}

        {errorMessage && (
          <div className="status error">
            Error: {errorMessage}
            <br />
            Please check whether your GraphQL backend is running at http://localhost:4000/
          </div>
        )}

        {!loading && !errorMessage && (
          <div className="status success">
            Successfully loaded {recordCount} records from GraphQL backend.
          </div>
        )}

        {!loading && !errorMessage && (
          <ChartComponent
            id="sales-chart"
            title="Monthly Sales, Expenses and Profit"
            primaryXAxis={primaryXAxis}
            primaryYAxis={primaryYAxis}
            tooltip={tooltip}
            legendSettings={legendSettings}
          >
            <Inject
              services={[
                ColumnSeries,
                LineSeries,
                Category,
                Legend,
                Tooltip,
                DataLabel
              ]}
            />

            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={chartData}
                xName="month"
                yName="sales"
                name="Sales"
                type="Column"
                marker={marker}
              />

              <SeriesDirective
                dataSource={chartData}
                xName="month"
                yName="expenses"
                name="Expenses"
                type="Column"
                marker={marker}
              />

              <SeriesDirective
                dataSource={chartData}
                xName="month"
                yName="profit"
                name="Profit"
                type="Line"
                marker={{
                  visible: true,
                  width: 8,
                  height: 8,
                  dataLabel: {
                    visible: true
                  }
                }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        )}
      </div>
    </div>
  );
}

export default App;