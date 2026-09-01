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

import { chartDataManager } from './data';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <h2>Syncfusion React Chart with Custom Adaptor</h2>

      <ChartComponent
        id="sales-chart"
        title="Monthly Sales Report"
        primaryXAxis={{
          valueType: 'Category',
          title: 'Month'
        }}
        primaryYAxis={{
          title: 'Sales Amount',
          labelFormat: '{value}'
        }}
        tooltip={{
          enable: true
        }}
        legendSettings={{
          visible: true
        }}
      >
        <Inject services={[ColumnSeries, Category, Tooltip, Legend, DataLabel]} />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={chartDataManager}
            xName="x"
            yName="y"
            name="Sales"
            type="Column"
            marker={{ dataLabel: { visible: true } }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default App;