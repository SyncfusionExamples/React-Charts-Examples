import React, { useEffect, useMemo, useRef } from 'react';

import {
  DataManager,
  GraphQLAdaptor,
  Query
} from '@syncfusion/ej2-data';

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  LineSeries,
  Category,
  Legend,
  Tooltip,
  DataLabel
} from '@syncfusion/ej2-react-charts';

import './App.css';

function App() {
  const chartRef = useRef(null);

  const salesService = useMemo(() => {
    return new DataManager({
      url: 'http://localhost:5168/graphql',
      adaptor: new GraphQLAdaptor({
        response: {
          result: 'salesChartData'
        },
        query: `
          query {
            salesChartData {
              month
              sales
              expenses
              profit
            }
          }
        `
      })
    });
  }, []);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        const result = await salesService.executeQuery(
          new Query()
        );

        const chartData = result.result;

        if (chartRef.current) {
          chartRef.current.series[0].dataSource =
            chartData;

          chartRef.current.series[1].dataSource =
            chartData;

          chartRef.current.series[2].dataSource =
            chartData;

          chartRef.current.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadChartData();
  }, [salesService]);

  const primaryXAxis = useMemo(
    () => ({
      valueType: 'Category',
      title: 'Month',
      majorGridLines: {
        width: 0
      }
    }),
    []
  );

  const primaryYAxis = useMemo(
    () => ({
      title: 'Amount in USD',
      labelFormat: '${value}K',
      lineStyle: {
        width: 0
      },
      majorTickLines: {
        width: 0
      }
    }),
    []
  );

  const tooltip = useMemo(
    () => ({
      enable: true
    }),
    []
  );

  const marker = useMemo(
    () => ({
      dataLabel: {
        visible: true
      }
    }),
    []
  );

  return (
    <div className="app-container">
      <div className="header">
        <h1>
          Syncfusion React Chart with
          HotChocolate GraphQL
        </h1>
        <p>
          This chart loads sales data from an
          ASP.NET Core HotChocolate GraphQL backend.
        </p>
      </div>

      <div className="chart-card">
        <ChartComponent
          id="sales-chart"
          ref={chartRef}
          title="Monthly Sales, Expenses, and Profit"
          primaryXAxis={primaryXAxis}
          primaryYAxis={primaryYAxis}
          tooltip={tooltip}
          legendSettings={{ visible: true }}
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
              name="Sales"
              type="Column"
              marker={marker}
            />

            <SeriesDirective
              dataSource={[]}
              xName="month"
              yName="expenses"
              name="Expenses"
              type="Column"
              marker={marker}
            />

            <SeriesDirective
              dataSource={[]}
              xName="month"
              yName="profit"
              name="Profit"
              type="Line"
              marker={{
                visible: true,
                width: 8,
                height: 8,
                dataLabel: {
                  visible: true
                }
              }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}

export default App;