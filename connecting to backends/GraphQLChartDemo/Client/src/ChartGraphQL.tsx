import { useEffect, useState } from "react";
import {
  AxisModel,
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  Legend,
  LegendSettingsModel,
  LineSeries,
  MarkerSettingsModel,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  TooltipSettingsModel
} from "@syncfusion/ej2-react-charts";

interface MonthlySales {
  id: number;
  month: string;
  sales: number;
  expenses: number;
}

interface GraphQLError {
  message: string;
}

interface MonthlySalesGraphQLResponse {
  data?: {
    getMonthlySales: {
      count: number;
      result: MonthlySales[];
    };
  };
  errors?: GraphQLError[];
}

const GRAPHQL_API_URL = "http://localhost:4000/graphql";

function ChartGraphQL() {
  const [chartData, setChartData] = useState<MonthlySales[]>([]);
  const [recordCount, setRecordCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadChartData();
  }, []);

  const loadChartData = async () => {
    try {
      setLoading(true);
      setError("");

      const query = `
        query GetMonthlySales {
          getMonthlySales {
            count
            result {
              id
              month
              sales
              expenses
            }
          }
        }
      `;

      const response = await fetch(GRAPHQL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: query
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }

      const json: MonthlySalesGraphQLResponse = await response.json();

      if (json.errors && json.errors.length > 0) {
        throw new Error(json.errors[0].message);
      }

      const result = json.data?.getMonthlySales.result ?? [];
      const count = json.data?.getMonthlySales.count ?? 0;

      setChartData(result);
      setRecordCount(count);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const primaryXAxis: AxisModel = {
    valueType: "Category",
    title: "Month",
    labelIntersectAction: "Rotate45"
  };

  const primaryYAxis: AxisModel = {
    title: "Amount",
    minimum: 0,
    interval: 10,
    labelFormat: "{value}"
  };

  const tooltip: TooltipSettingsModel = {
    enable: true
  };

  const legendSettings: LegendSettingsModel = {
    visible: true
  };

  const marker: MarkerSettingsModel = {
    visible: true,
    width: 8,
    height: 8,
    dataLabel: {
      visible: true
    }
  };

  if (loading) {
    return (
      <div className="status-card">
        <h3>Loading chart data...</h3>
        <p>Please wait. Data is being loaded from GraphQL backend.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-card">
        <h3>Unable to load chart data</h3>

        <p>{error}</p>

        <button className="retry-button" onClick={loadChartData}>
          Retry
        </button>

        <div className="help-box">
          <p>Check these points:</p>
          <ul>
            <li>Backend should be running on http://localhost:4000</li>
            <li>GraphQL endpoint should be http://localhost:4000/graphql</li>
            <li>Backend should have CORS enabled</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h2>Monthly Sales and Expenses</h2>
          <p>Total records loaded from GraphQL: {recordCount}</p>
        </div>

        <button className="refresh-button" onClick={loadChartData}>
          Refresh Data
        </button>
      </div>

      <ChartComponent
        id="monthly-sales-chart"
        title="Sales vs Expenses Report"
        primaryXAxis={primaryXAxis}
        primaryYAxis={primaryYAxis}
        tooltip={tooltip}
        legendSettings={legendSettings}
        height="450px"
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
            dataSource={chartData}
            xName="month"
            yName="sales"
            name="Sales"
            type="Column"
            marker={marker}
          />

          <SeriesDirective
            dataSource={chartData}
            xName="month"
            yName="expenses"
            name="Expenses"
            type="Line"
            marker={marker}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default ChartGraphQL;