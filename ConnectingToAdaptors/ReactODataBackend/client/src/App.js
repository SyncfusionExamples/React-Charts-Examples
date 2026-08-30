import React from 'react';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
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

function App() {
  // ✅ Configure the OData V4 adaptor as the data source.
  // The Chart component accepts a DataManager instance directly and will
  // internally issue the OData request when it renders, exactly like the
  // Grid's ODataV4Adaptor pattern.
  const chartData = new DataManager({
    url: 'http://localhost:5232/odata/Orders',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });

  // ✅ Optional server-side query: take the first 10 records sorted by OrderID.
  const chartQuery = new Query().take(10).sortBy('OrderID');

  const primaryXAxis = {
    valueType: 'Category',
    title: 'Customer'
  };

  const primaryYAxis = {
    title: 'Amount'
  };

  return (
    <div style={{ margin: '40px' }}>
      <h2>📊 Syncfusion React Chart with ODataV4Adaptor</h2>

      <ChartComponent
        id="orders-chart"
        primaryXAxis={primaryXAxis}
        primaryYAxis={primaryYAxis}
        title="Order Amount by Customer"
        tooltip={{ enable: true }}
        legendSettings={{ visible: true }}
      >
        <Inject services={[ColumnSeries, Category, Tooltip, Legend]} />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={chartData}
            query={chartQuery}
            xName="CustomerID"
            yName="Amount"
            type="Column"
            name="Orders"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default App;
