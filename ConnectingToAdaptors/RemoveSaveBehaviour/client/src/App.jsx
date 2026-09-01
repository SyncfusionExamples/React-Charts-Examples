import React, { useEffect, useState } from 'react';
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
import './App.css';

const serviceUrl = 'http://localhost:5177/api/ChartData';

function App() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadChartData();
  }, []);

  const loadChartData = async () => {
    try {
      const response = await fetch(serviceUrl);
      const result = await response.json();
      setChartData(result);
    } catch (error) {
      console.error('Data loading failed:', error);
    }
  };

  const addData = async () => {
    const newItem = {
      id: Date.now(),
      month: 'May',
      sales: 45
    };

    const response = await fetch(`${serviceUrl}/Insert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });

    const savedItem = await response.json();
    setChartData((previousData) => [...previousData, savedItem]);
  };

  const updateData = async () => {
    if (chartData.length === 0) {
      return;
    }

    const firstItem = chartData[0];
    const updatedItem = {
      ...firstItem,
      sales: firstItem.sales + 10
    };

    const response = await fetch(`${serviceUrl}/Update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    });

    const savedItem = await response.json();

    setChartData((previousData) =>
      previousData.map((item) =>
        item.id === savedItem.id ? savedItem : item
      )
    );
  };

  const deleteData = async () => {
    if (chartData.length === 0) {
      return;
    }

    const lastItem = chartData[chartData.length - 1];

    await fetch(`${serviceUrl}/Remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: lastItem.id })
    });

    setChartData((previousData) =>
      previousData.filter((item) => item.id !== lastItem.id)
    );
  };

  return (
    <div className="container">
      <h2>React Chart with Remote Save Data Integration</h2>

      <div className="button-group">
        <button onClick={addData}>Add Data</button>
        <button onClick={updateData}>Update Data</button>
        <button onClick={deleteData}>Delete Data</button>
      </div>

      <ChartComponent
        id="remote-save-chart"
        title="Monthly Sales Report"
        primaryXAxis={{ valueType: 'Category', title: 'Month' }}
        primaryYAxis={{ title: 'Sales' }}
        tooltip={{ enable: true }}
        legendSettings={{ visible: true }}
      >
        <Inject services={[ColumnSeries, Category, Tooltip, Legend]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={chartData}
            xName="month"
            yName="sales"
            name="Sales"
            type="Column"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default App;