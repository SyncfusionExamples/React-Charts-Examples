import { useEffect, useState } from 'react';

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
} from '@syncfusion/ej2-react-charts';

import {
  getSalesData,
  SalesData
} from './services/chartService';

export default function App() {
  const [chartData, setChartData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadChartData = async () => {
    try {
      setLoading(true);
      setError('');

      const apiResponse = await getSalesData();

      setChartData(apiResponse.result);
    } catch (exception) {
      console.error('Error loading chart data:', exception);

      setError(
        'Unable to load chart data from Flask API. Please check whether Flask is running on http://127.0.0.1:5000'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChartData();
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <div className="card">
          <h1 className="heading">Sales and Expenses Chart</h1>

          <p className="description">
            React Syncfusion Chart connected with Flask API
          </p>

          <div className="status">
            Loading chart data from Flask API...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="card">
          <h1 className="heading">Sales and Expenses Chart</h1>

          <p className="description">
            React Syncfusion Chart connected with Flask API
          </p>

          <div className="status error">
            {error}
          </div>

          <button
            className="reload-button"
            type="button"
            onClick={loadChartData}
          >
            Retry
          </button>

          <div className="api-info">
            Backend API URL: http://127.0.0.1:5000/api/sales
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="heading">Sales and Expenses Chart</h1>

        <p className="description">
          Data loaded from Flask API and displayed using Syncfusion React Chart
        </p>

        <ChartComponent
          id="sales-expenses-chart"
          title="Monthly Sales and Expenses"
          primaryXAxis={{
            valueType: 'Category',
            title: 'Month'
          }}
          primaryYAxis={{
            title: 'Amount',
            labelFormat: '${value}K'
          }}
          tooltip={{
            enable: true
          }}
          legendSettings={{
            visible: true
          }}
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
              xName="month"
              yName="sales"
              name="Sales"
              type="Column"
              marker={{
                dataLabel: {
                  visible: true
                }
              }}
            />

            <SeriesDirective
              dataSource={chartData}
              xName="month"
              yName="expenses"
              name="Expenses"
              type="Line"
              marker={{
                visible: true,
                dataLabel: {
                  visible: true
                }
              }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>

        <div className="api-info">
          Data Source: http://127.0.0.1:5000/api/sales
        </div>

        <button
          className="reload-button"
          type="button"
          onClick={loadChartData}
        >
          Reload Data
        </button>
      </div>
    </div>
  );
}