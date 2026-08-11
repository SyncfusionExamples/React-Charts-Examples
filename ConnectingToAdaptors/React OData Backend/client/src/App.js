import React, { useEffect, useState } from 'react';
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

  const [data, setData] = useState([]);

  // ✅ Configure OData adaptor
  const dataManager = new DataManager({
    url: 'http://localhost:5232/odata/Orders',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  });

  // ✅ Fetch data
  useEffect(() => {
    const query = new Query().take(10); // limit records

    dataManager.executeQuery(query).then((e) => {
      setData(e.result);
    });
  }, []);

  return (
    <div style={{ margin: "40px" }}>
      <h2>📊 Syncfusion React Chart with ODataV4Adaptor</h2>

      <ChartComponent
        primaryXAxis={{ valueType: 'Category', title: 'Customer' }}
        primaryYAxis={{ title: 'Amount' }}
        title="Order Amount by Customer"
      >
        <Inject services={[ColumnSeries, Category, Tooltip, Legend]} />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data}
            xName="CustomerID"
            yName="Amount"
            type="Column"
            name="Orders"
            tooltipMappingName="Amount"
          />
        </SeriesCollectionDirective>

      </ChartComponent>
    </div>
  );
}

export default App;
