import React, { useEffect, useState } from 'react';
import './App.css';

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Legend,
  Tooltip,
  DataLabel
} from '@syncfusion/ej2-react-charts';

function App() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5073/api/chart')
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);
      })
      .catch((error) => {
        console.error('Error loading chart data:', error);
      });
  }, []);

  const primaryXAxis = {
    valueType: 'Category',
    title: 'Month'
  };

  const primaryYAxis = {
    title: 'Sales Amount'
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
    <div className="App">
      <div className="chart-container">

        <ChartComponent
          id="mysql-chart"
          primaryXAxis={primaryXAxis}
          primaryYAxis={primaryYAxis}
          title="Monthly Sales Report"
          tooltip={tooltip}>

          <Inject
            services={[
              ColumnSeries,
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
              yName="salesAmount"
              type="Column"
              name="Sales"
              marker={marker}>
            </SeriesDirective>
          </SeriesCollectionDirective>

        </ChartComponent>

      </div>
    </div>
  );
}

export default App;