using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public SalesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private IDbConnection Connection =>
            new SqlConnection(
                _configuration.GetConnectionString("DefaultConnection"));

        // For browser testing
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using var db = Connection;

            var result = await db.QueryAsync<SalesData>(
                @"SELECT
                    Id,
                    MonthName,
                    SalesAmount
                  FROM SalesData
                  ORDER BY Id");

            return Ok(result);
        }

        // Required for Syncfusion DataManager + UrlAdaptor
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using var db = Connection;

            var result = await db.QueryAsync<SalesData>(
                @"SELECT
                    Id,
                    MonthName,
                    SalesAmount
                  FROM SalesData
                  ORDER BY Id");

            return Ok(result);
        }
    }
}