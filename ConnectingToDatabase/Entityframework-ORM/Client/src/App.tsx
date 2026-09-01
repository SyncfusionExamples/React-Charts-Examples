import { useEffect, useState } from 'react';
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

import './App.css';

type SalesRecord = {
  month: string;
  salesAmount: number;
};

function App() {
  const [chartData, setChartData] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5000/api/sales')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load sales data from API.');
        }

        return response.json();
      })
      .then((data: SalesRecord[]) => {
        setChartData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>Syncfusion React Chart with SQL Server and Entity Framework</h1>

      <p className="description">
        This chart displays monthly sales data loaded from SQL Server through an ASP.NET Core Web API.
      </p>

      {loading && <p>Loading chart data...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="chart-card">
          <ChartComponent
            id="sales-chart"
            title="Monthly Sales Report"
            primaryXAxis={{
              valueType: 'Category',
              title: 'Month'
            }}
            primaryYAxis={{
              title: 'Sales Amount',
              labelFormat: '₹{value}'
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
                dataSource={chartData}
                xName="month"
                yName="salesAmount"
                name="Sales"
                type="Column"
                marker={{
                  dataLabel: {
                    visible: true
                  }
                }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      )}
    </div>
  );
}

export default App;