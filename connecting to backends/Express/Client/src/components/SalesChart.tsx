import React from 'react';
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
import { salesDataManager } from '../services/dataManager';

const SalesChart: React.FC = () => {
  const primaryXAxis = {
    valueType: 'Category',
    title: 'Month'
  };

  const primaryYAxis = {
    title: 'Amount',
    labelFormat: '{value}K'
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
    <div className="chart-wrapper">
      <ChartComponent
        id="sales-chart"
        title="Monthly Sales Report"
        primaryXAxis={primaryXAxis}
        primaryYAxis={primaryYAxis}
        tooltip={tooltip}
        height="450px"
      >
        <Inject services={[ColumnSeries, Category, Legend, Tooltip, DataLabel]} />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={salesDataManager}
            xName="month"
            yName="sales"
            name="Sales"
            type="Column"
            marker={marker}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default SalesChart;