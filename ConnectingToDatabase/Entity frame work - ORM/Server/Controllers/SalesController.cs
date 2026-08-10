using ChartApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChartApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSalesData()
        {
            var salesData = await _context.SalesRecords
                .AsNoTracking()
                .OrderBy(record => record.Id)
                .Select(record => new
                {
                    month = record.Month,
                    salesAmount = record.SalesAmount
                })
                .ToListAsync();

            return Ok(salesData);
        }
    }
}