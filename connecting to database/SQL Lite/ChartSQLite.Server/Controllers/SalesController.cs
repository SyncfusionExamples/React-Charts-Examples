using Microsoft.AspNetCore.Mvc;
using ChartSQLiteAPI.Data;
using ChartSQLiteAPI.Models;

namespace ChartSQLiteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _context.Sales.ToList();
            return Ok(data);
        }
    }
}