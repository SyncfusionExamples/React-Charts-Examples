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

import { DataManager, WebMethodAdaptor, Query } from "@syncfusion/ej2-data";

// WebMethodAdaptor expects DataManager request details inside a "value" wrapper
// and a response shape of { result, count }. The chart component handles the
// query lifecycle itself, so the DataManager instance is passed directly as
// dataSource on each series.
const chartData = new DataManager({
  url: "http://localhost:5143/api/ChartData",
  adaptor: new WebMethodAdaptor(),
  crossDomain: true
});

const chartQuery = new Query().take(12);

const primaryXAxis = {
  valueType: "Category",
  title: "Month"
};

const primaryYAxis = {
  title: "Amount in Thousands",
  labelFormat: "{value}K"
};

const tooltip = {
  enable: true,
  shared: true
};

const legendSettings = {
  visible: true,
  position: "Bottom"
};

const marker = {
  dataLabel: {
    visible: true,
    position: "Top"
  }
};

function App() {
  return (
    <ChartComponent
      id="sales-chart"
      title="Monthly Sales, Expenses and Profit"
      primaryXAxis={primaryXAxis}
      primaryYAxis={primaryYAxis}
      tooltip={tooltip}
      legendSettings={legendSettings}
      width="100%"
      height="450px"
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
          xName="month"
          yName="sales"
          name="Sales"
          type="Column"
          marker={marker}
        />

        <SeriesDirective
          dataSource={chartData}
          query={chartQuery}
          xName="month"
          yName="expenses"
          name="Expenses"
          type="Column"
          marker={marker}
        />

        <SeriesDirective
          dataSource={chartData}
          query={chartQuery}
          xName="month"
          yName="profit"
          name="Profit"
          type="Line"
          marker={marker}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default App;
