import React, { useEffect, useRef } from "react";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  LineSeries,
  Category,
  Tooltip,
  Legend,
  DataLabel
} from "@syncfusion/ej2-react-charts";

import {
  DataManager,
  Query,
  GraphQLAdaptor
} from "@syncfusion/ej2-data";

const ChartGraphQL = () => {

  const chartRef = useRef(null);

  useEffect(() => {

    const dataManager = new DataManager({
      url: "http://localhost:4000/",

      adaptor: new GraphQLAdaptor({
        response: {
          result: "getSalesChartData.result",
          count: "getSalesChartData.count"
        },

        query: `
          query {
            getSalesChartData {
              count
              result {
                month
                sales
                expenses
                profit
              }
            }
          }
        `
      })
    });

    dataManager
      .executeQuery(new Query())
      .then((e) => {

        console.log(e);

        const chartData =
          Array.isArray(e.result)
            ? e.result
            : e.result?.result || [];

        if (
          chartRef.current &&
          chartRef.current.series &&
          chartRef.current.series.length > 0
        ) {

          chartRef.current.series[0].dataSource =
            chartData;

          chartRef.current.series[1].dataSource =
            chartData;

          chartRef.current.series[2].dataSource =
            chartData;

          chartRef.current.refresh();
        }

      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  return (
    <ChartComponent
      id="graphql-chart"
      ref={chartRef}
      title="Monthly Sales Analysis"
      primaryXAxis={{
        valueType: "Category",
        title: "Month"
      }}
      primaryYAxis={{
        title: "Amount"
      }}
      tooltip={{
        enable: true
      }}
      legendSettings={{
        visible: true
      }}
      height="500px"
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
          dataSource={[]}
          xName="month"
          yName="sales"
          type="Column"
          name="Sales"
        />

        <SeriesDirective
          dataSource={[]}
          xName="month"
          yName="expenses"
          type="Column"
          name="Expenses"
        />

        <SeriesDirective
          dataSource={[]}
          xName="month"
          yName="profit"
          type="Line"
          name="Profit"
        />

      </SeriesCollectionDirective>

    </ChartComponent>
  );
};

export default ChartGraphQL;