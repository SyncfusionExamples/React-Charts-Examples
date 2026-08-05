import React, { useEffect, useState } from "react";

import {
  ChartComponent, Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  ColumnSeries,
  LineSeries,
  Category,
  Legend,
  Tooltip,
  DataLabel
} from "@syncfusion/ej2-react-charts";

import {
  DataManager,
  WebMethodAdaptor,
  Query
} from "@syncfusion/ej2-data";

function App() {
  const [chartData, setChartData] = useState([]);
  const [statusMessage, setStatusMessage] = useState("Loading chart data...");

  useEffect(() => {
    const dataManager = new DataManager({
      url: "http://localhost:5143/api/ChartData",
      adaptor: new WebMethodAdaptor(),
      crossDomain: true
    });

    const query = new Query().take(12);

    dataManager
      .executeQuery(query)
      .then((response) => {
        console.log("Full DataManager response:", response);
        console.log("Raw response data:", response.result || response.actual);
        let rawData = [];

        if (Array.isArray(response.result)) {
          rawData = response.result;
        } else if (
          response.result &&
          Array.isArray(response.result.result)
        ) {
          rawData = response.result.result;
        } else if (
          response.actual &&
          Array.isArray(response.actual.result)
        ) {
          rawData = response.actual.result;
        }

        const normalizedData = rawData.map((item) => ({
          month: item.month ?? item.Month,
          sales: item.sales ?? item.Sales,
          expenses: item.expenses ?? item.Expenses,
          profit: item.profit ?? item.Profit
        }));

        console.log("Final chart data:", normalizedData);

        setChartData(normalizedData);
        setStatusMessage(`Loaded ${normalizedData.length} records`);
      })
      .catch((error) => {
        console.error("Chart data loading error:", error);
        setStatusMessage(
          "Failed to load chart data. Check API URL, CORS, and browser console."
        );
      });
  }, []);

  const primaryXAxis = {
    valueType: "Category",
    title: "Month",
    labelIntersectAction: "Rotate45"
  };

  const primaryYAxis = {
    title: "Amount in Thousands",
    labelFormat: "{value}K",
    minimum: 0,
    interval: 10
  };

  const tooltip = {
    enable: true,
    shared: true
  };

  const legendSettings = {
    visible: true,
    position: "Bottom"
  };

  const columnMarker = {
    dataLabel: {
      visible: true,
      position: "Top"
    }
  };

  const lineMarker = {
    visible: true,
    width: 8,
    height: 8,
    dataLabel: {
      visible: true,
      position: "Top"
    }
  };

  return (
    <div className="app-container">
      <h1>Syncfusion React Chart with WebMethodAdaptor</h1>

      <p className="description">
        This chart loads remote data from ASP.NET Core Web API using Syncfusion
        DataManager and WebMethodAdaptor.
      </p>

      <p className="status-message">{statusMessage}</p>

      <div className="chart-card">
        <ChartComponent
          id="sales-chart"
          title="Monthly Sales, Expenses and Profit"
          primaryXAxis={primaryXAxis}
          primaryYAxis={primaryYAxis}
          tooltip={tooltip}
          legendSettings={legendSettings}
          width="100%"
          height="500px"
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
              marker={columnMarker}
            />

            <SeriesDirective
              dataSource={chartData}
              xName="month"
              yName="expenses"
              name="Expenses"
              type="Column"
              marker={columnMarker}
            />

            <SeriesDirective
              dataSource={chartData}
              xName="month"
              yName="profit"
              name="Profit"
              type="Line"
              marker={lineMarker}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>

      <div className="debug-box">
        <h3>Debug Data</h3>
        <pre>{JSON.stringify(chartData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;