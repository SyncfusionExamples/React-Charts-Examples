import React, { useEffect, useState } from 'react';
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

import './App.css';

function App() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const graphqlUrl = 'http://localhost:5000/graphql';

  useEffect(() => {
    loadChartData();
  }, []);

  async function loadChartData() {
    try {
      setLoading(true);
      setErrorMessage('');

      const query = `
        query {
          salesChartData {
            month
            sales
            expenses
            profit
          }
        }
      `;

      const response = await fetch(graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query
        })
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed. Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setChartData(result.data.salesChartData);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  const primaryXAxis = {
    valueType: 'Category',
    title: 'Month',
    majorGridLines: {
      width: 0
    }
  };

  const primaryYAxis = {
    title: 'Amount in USD',
    labelFormat: '${value}K',
    lineStyle: {
      width: 0
    },
    majorTickLines: {
      width: 0
    }
  };

  const tooltip = {
    enable: true
  };

  const marker = {
    dataLabel: {
      visible: true
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="chart-card status">Loading chart data...</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="app-container">
        <div className="chart-card status error">
          Error: {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>Syncfusion React Chart with HotChocolate GraphQL</h1>
        <p>
          This chart loads sales data from an ASP.NET Core HotChocolate GraphQL backend.
        </p>
      </div>

      <div className="chart-card">
        <ChartComponent
          id="sales-chart"
          title="Monthly Sales, Expenses, and Profit"
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
              xName="month"
              yName="sales"
              name="Sales"
              type="Column"
              marker={marker}
            />

            <SeriesDirective
              dataSource={chartData}
              xName="month"
              yName="expenses"
              name="Expenses"
              type="Column"
              marker={marker}
            />

            <SeriesDirective
              dataSource={chartData}
              xName="month"
              yName="profit"
              name="Profit"
              type="Line"
              marker={{
                visible: true,
                width: 8,
                height: 8,
                dataLabel: {
                  visible: true
                }
              }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}

export default App;