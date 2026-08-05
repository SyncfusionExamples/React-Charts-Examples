import { salesChartData } from "./data.js";

export const resolvers = {
  Query: {
    getSalesChartData: () => {
      return {
        result: salesChartData,
        count: salesChartData.length
      };
    }
  }
};