import React from "react";

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
  DataLabel,
} from "@syncfusion/ej2-react-charts";

import { DataManager, Query, UrlAdaptor } from "@syncfusion/ej2-data";

const App: React.FC = () => {
  const chartDataManager = new DataManager({
    url: "http://localhost:8000/api/sales/",
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  const chartQuery = new Query().take(12).sortBy("id", "ascending");

  const primaryXAxis = {
    valueType: "Category" as const,
    title: "Month",
  };

  const primaryYAxis = {
    title: "Amount",
    labelFormat: "{value}K",
  };

  const tooltipSettings = {
    enable: true,
  };

  const legendSettings = {
    visible: true,
  };

  return (
    <div className="app-container">
      <h1 className="app-title">
        Syncfusion React Chart with Django REST POST Binding
      </h1>

      <p className="app-description">
        This chart loads monthly sales data from a Django REST Framework backend
        using Syncfusion DataManager and UrlAdaptor.
      </p>

      <div className="api-box">
        API URL: <strong>http://localhost:8000/api/sales/</strong>
      </div>

      <ChartComponent
        id="sales-chart"
        title="Monthly Sales and Expenses"
        primaryXAxis={primaryXAxis}
        primaryYAxis={primaryYAxis}
        tooltip={tooltipSettings}
        legendSettings={legendSettings}
        height="450px"
      >
        <Inject
          services={[
            ColumnSeries,
            LineSeries,
            Category,
            Legend,
            Tooltip,
            DataLabel,
          ]}
        />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={chartDataManager}
            query={chartQuery}
            xName="month"
            yName="sales"
            name="Sales"
            type="Column"
            marker={{
              dataLabel: {
                visible: true,
                position: "Top",
              },
            }}
          />

          <SeriesDirective
            dataSource={chartDataManager}
            query={chartQuery}
            xName="month"
            yName="expenses"
            name="Expenses"
            type="Line"
            marker={{
              visible: true,
              width: 8,
              height: 8,
              dataLabel: {
                visible: true,
                position: "Top",
              },
            }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default App;
