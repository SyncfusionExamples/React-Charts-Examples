using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : ControllerBase
    {
        private static readonly List<SalesData> SalesRecords = new()
        {
            new SalesData { Id = 1, Month = "Jan", Sales = 35, Expenses = 20, Profit = 15, Region = "South" },
            new SalesData { Id = 2, Month = "Feb", Sales = 28, Expenses = 18, Profit = 10, Region = "South" },
            new SalesData { Id = 3, Month = "Mar", Sales = 34, Expenses = 22, Profit = 12, Region = "West" },
            new SalesData { Id = 4, Month = "Apr", Sales = 32, Expenses = 21, Profit = 11, Region = "West" },
            new SalesData { Id = 5, Month = "May", Sales = 40, Expenses = 26, Profit = 14, Region = "North" },
            new SalesData { Id = 6, Month = "Jun", Sales = 38, Expenses = 24, Profit = 14, Region = "North" },
            new SalesData { Id = 7, Month = "Jul", Sales = 45, Expenses = 30, Profit = 15, Region = "East" },
            new SalesData { Id = 8, Month = "Aug", Sales = 42, Expenses = 28, Profit = 14, Region = "East" },
            new SalesData { Id = 9, Month = "Sep", Sales = 48, Expenses = 32, Profit = 16, Region = "South" },
            new SalesData { Id = 10, Month = "Oct", Sales = 50, Expenses = 35, Profit = 15, Region = "West" },
            new SalesData { Id = 11, Month = "Nov", Sales = 55, Expenses = 38, Profit = 17, Region = "North" },
            new SalesData { Id = 12, Month = "Dec", Sales = 60, Expenses = 40, Profit = 20, Region = "East" }
        };

        [HttpGet]
        public IActionResult Get()
        {
            IQueryable<SalesData> query = SalesRecords.AsQueryable();

            query = ApplyFiltering(query);

            int count = query.Count();

            query = ApplySorting(query);

            query = ApplyPaging(query);

            return Ok(new
            {
                Items = query.ToList(),
                Count = count
            });
        }

        private IQueryable<SalesData> ApplyPaging(IQueryable<SalesData> query)
        {
            if (Request.Query.TryGetValue("$skip", out var skipValue))
            {
                if (int.TryParse(skipValue.ToString(), out int skip))
                {
                    query = query.Skip(skip);
                }
            }

            if (Request.Query.TryGetValue("$top", out var topValue))
            {
                if (int.TryParse(topValue.ToString(), out int top))
                {
                    query = query.Take(top);
                }
            }

            return query;
        }

        private IQueryable<SalesData> ApplySorting(IQueryable<SalesData> query)
        {
            if (!Request.Query.TryGetValue("$orderby", out var orderByValue))
            {
                return query.OrderBy(x => x.Id);
            }

            string orderBy = orderByValue.ToString();
            bool isDescending = orderBy.Contains("desc", StringComparison.OrdinalIgnoreCase);

            if (orderBy.Contains("Month", StringComparison.OrdinalIgnoreCase))
            {
                return isDescending
                    ? query.OrderByDescending(x => x.Month)
                    : query.OrderBy(x => x.Month);
            }

            if (orderBy.Contains("Sales", StringComparison.OrdinalIgnoreCase))
            {
                return isDescending
                    ? query.OrderByDescending(x => x.Sales)
                    : query.OrderBy(x => x.Sales);
            }

            if (orderBy.Contains("Expenses", StringComparison.OrdinalIgnoreCase))
            {
                return isDescending
                    ? query.OrderByDescending(x => x.Expenses)
                    : query.OrderBy(x => x.Expenses);
            }

            if (orderBy.Contains("Profit", StringComparison.OrdinalIgnoreCase))
            {
                return isDescending
                    ? query.OrderByDescending(x => x.Profit)
                    : query.OrderBy(x => x.Profit);
            }

            if (orderBy.Contains("Region", StringComparison.OrdinalIgnoreCase))
            {
                return isDescending
                    ? query.OrderByDescending(x => x.Region)
                    : query.OrderBy(x => x.Region);
            }

            return query.OrderBy(x => x.Id);
        }

        private IQueryable<SalesData> ApplyFiltering(IQueryable<SalesData> query)
        {
            if (!Request.Query.TryGetValue("$filter", out var filterValue))
            {
                return query;
            }

            string filter = filterValue.ToString();

            if (filter.Contains("Region", StringComparison.OrdinalIgnoreCase))
            {
                string region = ExtractStringValue(filter);

                if (!string.IsNullOrWhiteSpace(region))
                {
                    query = query.Where(x =>
                        x.Region.Equals(region, StringComparison.OrdinalIgnoreCase));
                }
            }

            if (filter.Contains("Sales", StringComparison.OrdinalIgnoreCase))
            {
                double value = ExtractNumberValue(filter);

                if (filter.Contains("gt", StringComparison.OrdinalIgnoreCase))
                {
                    query = query.Where(x => x.Sales > value);
                }
                else if (filter.Contains("lt", StringComparison.OrdinalIgnoreCase))
                {
                    query = query.Where(x => x.Sales < value);
                }
                else if (filter.Contains("eq", StringComparison.OrdinalIgnoreCase))
                {
                    query = query.Where(x => x.Sales == value);
                }
            }

            return query;
        }

        private static string ExtractStringValue(string filter)
        {
            int firstQuote = filter.IndexOf('\'');
            int lastQuote = filter.LastIndexOf('\'');

            if (firstQuote >= 0 && lastQuote > firstQuote)
            {
                return filter.Substring(firstQuote + 1, lastQuote - firstQuote - 1);
            }

            return string.Empty;
        }

        private static double ExtractNumberValue(string filter)
        {
            string[] parts = filter.Split(' ', StringSplitOptions.RemoveEmptyEntries);

            foreach (string part in parts.Reverse())
            {
                if (double.TryParse(part, out double value))
                {
                    return value;
                }
            }

            return 0;
        }
    }
}