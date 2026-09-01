using Microsoft.AspNetCore.Mvc;
using server.Data;
using Syncfusion.EJ2.Base;

namespace server.Controllers
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

        [HttpPost]
        public object Post([FromBody] DataManagerRequest dm)
        {
            var dataSource = _context.SalesRecords.AsQueryable();

            int count = dataSource.Count();

            return new
            {
                result = dataSource.ToList(),
                count = count
            };
        }

        [HttpGet]
        public object Get()
        {
            var dataSource = _context.SalesRecords.ToList();

            return new
            {
                result = dataSource,
                count = dataSource.Count
            };
        }
    }
}