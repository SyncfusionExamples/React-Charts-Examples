using Microsoft.AspNetCore.Mvc;
using ChartAPI.Data;

namespace ChartAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly SalesRepository _repository;

        public SalesController(SalesRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetSalesData()
        {
            var data = await _repository.GetSalesDataAsync();
            return Ok(data);
        }
    }
}