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
  DataLabel
} from "@syncfusion/ej2-react-charts";

import { DataManager, WebApiAdaptor, Query } from "@syncfusion/ej2-data";

import "./index.css";

function App() {
  const chartData = new DataManager({
    url: "http://localhost:5000/api/Sales",
    adaptor: new WebApiAdaptor()
  });

  const chartQuery = new Query().take(12);

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

  const marker = {
    dataLabel: {
      visible: true
    }
  };

  return (
    <div className="chart-container">
      <ChartComponent
        id="sales-chart"
        title="Monthly Sales and Expenses"
        primaryXAxis={primaryXAxis}
        primaryYAxis={primaryYAxis}
        tooltip={tooltip}
        legendSettings={{ visible: true }}
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
            query={chartQuery}
            xName="Month"
            yName="Sales"
            name="Sales"
            type="Column"
            marker={marker}
          />

          <SeriesDirective
            dataSource={chartData}
            query={chartQuery}
            xName="Month"
            yName="Expenses"
            name="Expenses"
            type="Line"
            marker={marker}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default App;