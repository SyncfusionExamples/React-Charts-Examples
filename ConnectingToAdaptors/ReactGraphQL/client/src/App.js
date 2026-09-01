import React, { useEffect, useState } from 'react';

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

import { DataManager, GraphQLAdaptor, Query } from '@syncfusion/ej2-data';

import './App.css';

// GraphQL DataManager configuration
const dataManager = new DataManager({
  url: 'http://localhost:4000/graphql',
  adaptor: new GraphQLAdaptor({
    response: {
      result: 'getSalesData.result'
    },
    query: `
      query {
        getSalesData {
          result {
            month
            revenue
          }
        }
      }
    `
  })
});

function App() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    dataManager.executeQuery(new Query())
      .then((response) => {
        console.log('Full GraphQL Response:', response);
        console.log('Chart Data:', response.result);

        setChartData(response.result);
      })
      .catch((error) => {
        console.error('GraphQL Error:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Sales Chart using GraphQLAdaptor</h1>

      <ChartComponent
        id="sales-chart"
        title="Monthly Sales Revenue"
        primaryXAxis={{
          valueType: 'Category',
          title: 'Month'
        }}
        primaryYAxis={{
          title: 'Revenue',
          minimum: 0,
          maximum: 2500,
          interval: 500
        }}
        tooltip={{
          enable: true
        }}
        legendSettings={{
          visible: true
        }}
      >
        <Inject services={[LineSeries, Category, Tooltip, Legend]} />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={chartData}
            xName="month"
            yName="revenue"
            name="Revenue"
            type="Line"
            marker={{
              visible: true,
              width: 10,
              height: 10
            }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default App;