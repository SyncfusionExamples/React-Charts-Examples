'use client';

import { useEffect } from 'react';
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

let chartInstance: ChartComponent | null = null;

export default function ChartPage() {

  const loadData = async () => {
    const response = await fetch('/api/sales');
    const data = await response.json();

    if (chartInstance) {
      chartInstance.series[0].dataSource = data.result;
      chartInstance.refresh();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Monthly Sales Chart</h1>

      <ChartComponent
        id="sales-chart"
        title="Monthly Sales Report"
        primaryXAxis={{
          valueType: 'Category',
          title: 'Month'
        }}
        primaryYAxis={{
          title: 'Sales'
        }}
        tooltip={{
          enable: true
        }}
        legendSettings={{
          visible: true
        }}
        ref={(chart) => {
          chartInstance = chart;
        }}
      >
        <Inject
          services={[
            ColumnSeries,
            Category,
            Tooltip,
            Legend
          ]}
        />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={[]}
            type="Column"
            xName="month"
            yName="sales"
            name="Sales"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}