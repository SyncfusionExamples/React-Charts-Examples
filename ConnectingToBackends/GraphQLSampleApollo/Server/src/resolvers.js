import { salesChartData } from './data.js';

export const resolvers = {
  Query: {
    getSalesChartData: () => ({
      result: salesChartData,
      count: salesChartData.length
    })
  }
};