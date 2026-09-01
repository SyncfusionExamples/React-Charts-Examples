import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category
} from "@syncfusion/ej2-react-charts";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/Sales")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <ChartComponent
      primaryXAxis={{ valueType: "Category" }}
      title="Sales Report"
    >
      <Inject services={[ColumnSeries, Category]} />

      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName="monthName"
          yName="salesAmount"
          type="Column"
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default App;