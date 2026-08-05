import React, { useEffect, useState } from 'react';

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Tooltip,
  Legend
} from '@syncfusion/ej2-react-charts';

import { Query } from '@syncfusion/ej2-data';
import { chartDataManager } from './data';

import './App.css';

function App() {
  const [chartData, setChartData] = useState([]);
  const [status, setStatus] = useState('Loading chart data...');

  useEffect(() => {
    const query = new Query();

    chartDataManager
      .executeQuery(query)
      .then((response) => {
        console.log('DataManager response:', response);

        setChartData(response.result || []);
        setStatus('Data loaded successfully');
      })
      .catch((error) => {
        console.error('Data fetch error:', error);
        setStatus('Failed to load chart data. Please check server and console.');
      });
  }, []);

  return (
    <div className="app-container">
      <h2>Syncfusion React Chart with Custom Adaptor</h2>

      <p className="status-text">{status}</p>

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
        <Inject services={[ColumnSeries, Category, Tooltip, Legend]} />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={chartData.result || []}
            xName="x"
            yName="y"
            name="Sales"
            type="Column"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default App;