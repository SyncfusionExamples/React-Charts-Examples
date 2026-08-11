'use client';

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

type SalesRecord = {
  month: string;
  sales: number;
};

type SalesApiResponse = {
  result: SalesRecord[];
  count: number;
};

export default function SalesChart() {
  const [chartData, setChartData] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    async function loadSalesData() {
      try {
        const response = await fetch('/api/sales');

        if (!response.ok) {
          throw new Error('Failed to fetch sales data from /api/sales');
        }

        const data: SalesApiResponse = await response.json();

        if (!data.result || !Array.isArray(data.result)) {
          throw new Error('Invalid API response. Expected result array.');
        }

        setChartData(data.result);
      } catch (error) {
        console.error('Chart data loading error:', error);
        setErrorMessage('Unable to load chart data. Please check /api/sales API route.');
      } finally {
        setLoading(false);
      }
    }

    loadSalesData();
  }, []);

  if (loading) {
    return (
      <div className="chart-wrapper">
        <p className="loading-text">Loading chart data...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="chart-wrapper">
        <p className="error-text">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="chart-wrapper">
      <ChartComponent
        id="sales-chart"
        title="Monthly Sales Report"
        width="100%"
        height="450px"
        primaryXAxis={{
          valueType: 'Category',
          title: 'Month'
        }}
        primaryYAxis={{
          title: 'Sales',
          labelFormat: '{value}'
        }}
        tooltip={{
          enable: true
        }}
        legendSettings={{
          visible: true
        }}
      >
        <Inject
          services={[
            ColumnSeries,
            Category,
            Tooltip,
            Legend,
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
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}