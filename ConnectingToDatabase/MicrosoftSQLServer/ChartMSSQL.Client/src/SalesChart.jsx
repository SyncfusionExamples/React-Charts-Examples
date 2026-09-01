import React, { useEffect, useState } from "react";
import axios from "axios";

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
} from "@syncfusion/ej2-react-charts";


function SalesChart() {
  const [laptopData, setLaptopData] = useState([]);
  const [mobileData, setMobileData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5251/api/sales")
      .then((response) => {
        const data = response.data;

        const laptops = data.filter(
          (item) => item.productName === "Laptop"
        );

        const mobiles = data.filter(
          (item) => item.productName === "Mobile"
        );

        setLaptopData(laptops);
        setMobileData(mobiles);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  }, []);

  return (
    <div style={{ margin: "30px", backgroundColor: "white", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#222" }}>
        Sales Revenue Chart
      </h2>

      <ChartComponent
        id="sales-chart"
        title="Laptop vs Mobile Revenue by Year"
        background="white"
        primaryXAxis={{
          valueType: "Category",
          title: "Year",
          labelStyle: { color: "#333" },
          titleStyle: { color: "#333" }
        }}
        primaryYAxis={{
          title: "Revenue",
          labelStyle: { color: "#333" },
          titleStyle: { color: "#333" },
          minimum: 0
        }}
        chartArea={{
          border: {
            width: 0
          }
        }}
        tooltip={{
          enable: true
        }}
        legendSettings={{
          visible: true,
          textStyle: { color: "#333" }
        }}
        titleStyle={{
          color: "#222"
        }}
      >
        <Inject services={[ColumnSeries, Category, Legend, Tooltip, DataLabel]} />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={laptopData}
            xName="year"
            yName="revenue"
            name="Laptop"
            type="Column"
            fill="#4CAF50"
            columnWidth={0.6}
            columnSpacing={0.1}
            marker={{
              dataLabel: {
                visible: true,
                position: "Top",
                font: {
                  color: "#000",
                  fontWeight: "600"
                }
              }
            }}
          />

          <SeriesDirective
            dataSource={mobileData}
            xName="year"
            yName="revenue"
            name="Mobile"
            type="Column"
            fill="#2196F3"
            columnWidth={0.6}
            columnSpacing={0.1}
            marker={{
              dataLabel: {
                visible: true,
                position: "Top",
                font: {
                  color: "#000",
                  fontWeight: "600"
                }
              }
            }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default SalesChart;