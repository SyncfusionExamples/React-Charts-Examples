import React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Legend,
  Tooltip
} from '@syncfusion/ej2-react-charts';

import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

import './App.css';

function App() {
  const chartData = new DataManager({
    url: 'http://localhost:5150/api/sales',
    adaptor: new UrlAdaptor()
  });

  const primaryXAxis = {
    valueType: 'Category',
    title: 'Month'
  };

  const primaryYAxis = {
    title: 'Amount',
    labelFormat: '${value}'
  };

  const tooltip = {
    enable: true
  };

  return (
    <div className="app-container">
      <div className="chart-card">
        <h2>Sales and Expenses Chart Using UrlAdaptor</h2>

        <ChartComponent
          id="sales-chart"
          primaryXAxis={primaryXAxis}
          primaryYAxis={primaryYAxis}
          tooltip={tooltip}
          title="Monthly Sales Report"
        >
          <Inject services={[ColumnSeries, Category, Legend, Tooltip]} />

          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={chartData}
              xName="Month"
              yName="Sales"
              name="Sales"
              type="Column"
            />

            <SeriesDirective
              dataSource={chartData}
              xName="Month"
              yName="Expenses"
              name="Expenses"
              type="Column"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}

export default App;