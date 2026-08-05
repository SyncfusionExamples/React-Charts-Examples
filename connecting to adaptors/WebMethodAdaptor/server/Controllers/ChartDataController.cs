using Microsoft.AspNetCore.Mvc;
using Syncfusion.EJ2.Base;
using server.Models;

namespace server.Controllers
{
    // Required for Syncfusion WebMethodAdaptor.
    // WebMethodAdaptor sends DataManagerRequest inside a "value" object.
    public class DataManagerWrapper
    {
        public DataManagerRequest? Value { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class ChartDataController : ControllerBase
    {
        // GET method for browser testing.
        // URL example:
        // http://localhost:5143/api/ChartData
        [HttpGet]
        public IActionResult Get()
        {
            List<SalesData> data = GetSalesData();

            return Ok(new
            {
                result = data,
                count = data.Count
            });
        }

        // POST method used by Syncfusion React Chart WebMethodAdaptor.
        [HttpPost]
        public IActionResult Post([FromBody] DataManagerWrapper request)
        {
            IQueryable<SalesData> dataSource = GetSalesData().AsQueryable();

            DataManagerRequest? dm = request.Value;

            QueryableOperation operation = new QueryableOperation();

            // Optional sorting support
            if (dm?.Sorted != null && dm.Sorted.Count > 0)
            {
                dataSource = operation.PerformSorting(dataSource, dm.Sorted);
            }

            // Count should be calculated before paging
            int count = dataSource.Count();

            // Optional skip support
            if (dm?.Skip != null && dm.Skip != 0)
            {
                dataSource = operation.PerformSkip(dataSource, dm.Skip);
            }

            // Optional take support
            if (dm?.Take != null && dm.Take != 0)
            {
                dataSource = operation.PerformTake(dataSource, dm.Take);
            }

            return Ok(new
            {
                result = dataSource.ToList(),
                count = count
            });
        }

        private List<SalesData> GetSalesData()
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
                    Expenses = 19,
                    Profit = 13
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
                    Sales = 32,
                    Expenses = 21,
                    Profit = 11
                },
                new SalesData
                {
                    Month = "Jul",
                    Sales = 45,
                    Expenses = 29,
                    Profit = 16
                },
                new SalesData
                {
                    Month = "Aug",
                    Sales = 48,
                    Expenses = 30,
                    Profit = 18
                },
                new SalesData
                {
                    Month = "Sep",
                    Sales = 38,
                    Expenses = 24,
                    Profit = 14
                },
                new SalesData
                {
                    Month = "Oct",
                    Sales = 42,
                    Expenses = 26,
                    Profit = 16
                },
                new SalesData
                {
                    Month = "Nov",
                    Sales = 50,
                    Expenses = 31,
                    Profit = 19
                },
                new SalesData
                {
                    Month = "Dec",
                    Sales = 55,
                    Expenses = 35,
                    Profit = 20
                }
            };
        }
    }
}