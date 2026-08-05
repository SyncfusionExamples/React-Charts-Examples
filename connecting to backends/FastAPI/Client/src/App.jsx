import React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Tooltip,
  Legend,
  DataLabel
} from '@syncfusion/ej2-react-charts';

import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

function App() {
  const chartDataManager = new DataManager({
    url: 'http://localhost:8000/chart-data',
    adaptor: new UrlAdaptor()
  });

  const primaryXAxis = {
    valueType: 'Category',
    title: 'Month'
  };

  const primaryYAxis = {
    title: 'Sales',
    labelFormat: '{value}'
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
    <div className="app-container">
      <div className="chart-card">
        <h1>Syncfusion React Chart with FastAPI Backend</h1>
        <p>
          This chart loads sales data from a FastAPI REST API using Syncfusion DataManager and UrlAdaptor.
        </p>

        <ChartComponent
          id="sales-chart"
          title="Monthly Sales Report"
          primaryXAxis={primaryXAxis}
          primaryYAxis={primaryYAxis}
          tooltip={tooltip}
          legendSettings={{ visible: true }}
        >
          <Inject services={[ColumnSeries, Category, Tooltip, Legend, DataLabel]} />

          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={chartDataManager}
              xName="month"
              yName="sales"
              name="Sales"
              type="Column"
              marker={marker}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}

export default App;