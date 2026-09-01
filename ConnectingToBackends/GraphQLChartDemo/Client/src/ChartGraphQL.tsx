import React, { useEffect, useRef } from 'react';

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
  DataLabel,
  Chart
} from '@syncfusion/ej2-react-charts';

import {
  DataManager,
  Query,
  GraphQLAdaptor
} from '@syncfusion/ej2-data';

const ChartGraphQL: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);

  const marker = {
    visible: true,
    width: 10,
    height: 10,
    dataLabel: {
      visible: true,
      position: 'Top'
    }
  };

  useEffect(() => {
    const dataManager = new DataManager({
      url: 'http://localhost:4000/graphql',

      adaptor: new GraphQLAdaptor({
        response: {
          result: 'getMonthlySales.result',
          count: 'getMonthlySales.count'
        },

        query: `
          query getMonthlySales($datamanager: DataManagerInput) {
            getMonthlySales(datamanager: $datamanager) {
              count
              result {
                id
                month
                sales
                expenses
              }
            }
          }
        `
      })
    });

    dataManager
      .executeQuery(new Query())
      .then((e: any) => {
        console.log('Complete Response:', e);

        // The DataManager wraps the GraphQL response in `e.result`,
        // and the GraphQLAdaptor maps it to `{ result, count }`.
        const chartData = e.result.result;

        console.log('Chart Data:', chartData);

        if (
          chartRef.current &&
          chartRef.current.series &&
          chartRef.current.series.length > 0
        ) {
          chartRef.current.series[0].dataSource = chartData;
          chartRef.current.series[1].dataSource = chartData;

          chartRef.current.refresh();
        }
      })
      .catch((error) => {
        console.error('GraphQL Error:', error);
      });
  }, []);

  return (
    <ChartComponent
      id="graphql-chart"
      title="Monthly Sales and Expenses"
      ref={chartRef as any}
      primaryXAxis={{
        valueType: 'Category',
        title: 'Month'
      }}
      primaryYAxis={{
        title: 'Amount'
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
          marker={marker}
        />

        <SeriesDirective
          dataSource={[]}
          xName="month"
          yName="expenses"
          type="Line"
          name="Expenses"
          marker={marker}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default ChartGraphQL;
