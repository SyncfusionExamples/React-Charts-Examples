import { useEffect, useState } from 'react';

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Tooltip,
  DataLabel
} from '@syncfusion/ej2-react-charts';

interface SalesData {
  id: number;
  category: string;
  amount: number;
}

function App() {
  const [chartData, setChartData] = useState<SalesData[]>([]);

  useEffect(() => {
    fetch('http://localhost:5165/api/sales')
      .then((response) => response.json())
      .then((data) => {
        console.log('API DATA:', data);
        setChartData(data);
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Monthly Sales</h2>

      <ChartComponent
        id="sales-chart"
        title="Monthly Sales"
        primaryXAxis={{
          valueType: 'Category',
          title: 'Month'
        }}
        primaryYAxis={{
          title: 'Sales Amount'
        }}
        tooltip={{ enable: true }}
      >
        <Inject services={[ColumnSeries, Category, Tooltip, DataLabel]} />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={chartData}
            xName="category"
            yName="amount"
            type="Column"
            name="Sales"
            marker={{
              dataLabel: {
                visible: true
              }
            }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default App;