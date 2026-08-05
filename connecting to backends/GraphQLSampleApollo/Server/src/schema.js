export const typeDefs = `#graphql

  type SalesChartPoint {
    month: String!
    sales: Float!
    expenses: Float!
    profit: Float!
  }

  type ChartDataResponse {
    result: [SalesChartPoint!]!
    count: Int!
  }

  type Query {
    getSalesChartData: ChartDataResponse!
  }

`;