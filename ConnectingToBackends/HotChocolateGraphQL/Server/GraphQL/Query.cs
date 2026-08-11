using backend.Models;

namespace backend.GraphQL
{
    public class Query
    {
        public List<SalesData> GetSalesChartData()
        {
            return new List<SalesData>
            {
                new SalesData
                {
                    Month = "Jan",
                    Sales = 35,
                    Expenses = 20,
                    Profit = 15
                },
                new SalesData
                {
                    Month = "Feb",
                    Sales = 28,
                    Expenses = 18,
                    Profit = 10
                },
                new SalesData
                {
                    Month = "Mar",
                    Sales = 34,
                    Expenses = 22,
                    Profit = 12
                },
                new SalesData
                {
                    Month = "Apr",
                    Sales = 32,
                    Expenses = 21,
                    Profit = 11
                },
                new SalesData
                {
                    Month = "May",
                    Sales = 40,
                    Expenses = 25,
                    Profit = 15
                },
                new SalesData
                {
                    Month = "Jun",
                    Sales = 45,
                    Expenses = 27,
                    Profit = 18
                }
            };
        }
    }
}