import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Category,
  Tooltip,
  Legend
} from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
  axios.get("http://127.0.0.1:8000/api/sales/")
    .then(res => {
      console.log(res.data);  // ✅ debug
      const data = res.data.results || res.data;
      setData(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <ChartComponent
      primaryXAxis={{ valueType: 'Category', title: 'Month' }}
      primaryYAxis={{ title: 'Revenue' }}
      title="Monthly Sales Data"
    >
      <Inject services={[LineSeries, Category, Tooltip, Legend]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName="month"
          yName="revenue"
          type="Line"
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default App;