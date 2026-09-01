using Microsoft.AspNetCore.Mvc;
using RemoteSaveChart.Server.Models;

namespace RemoteSaveChart.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChartDataController : ControllerBase
    {
        private static readonly List<ChartData> Data = new()
        {
            new ChartData { Id = 1, Month = "Jan", Sales = 35 },
            new ChartData { Id = 2, Month = "Feb", Sales = 28 },
            new ChartData { Id = 3, Month = "Mar", Sales = 34 },
            new ChartData { Id = 4, Month = "Apr", Sales = 32 }
        };

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(Data);
        }

        [HttpPost("Insert")]
        public IActionResult Insert([FromBody] ChartData value)
        {
            Data.Add(value);
            return Ok(value);
        }

        [HttpPost("Update")]
        public IActionResult Update([FromBody] ChartData value)
        {
            ChartData? item = Data.FirstOrDefault(data => data.Id == value.Id);

            if (item == null)
            {
                return NotFound();
            }

            item.Month = value.Month;
            item.Sales = value.Sales;

            return Ok(item);
        }

        [HttpPost("Remove")]
        public IActionResult Remove([FromBody] DeleteRequest request)
        {
            ChartData? item = Data.FirstOrDefault(data => data.Id == request.Id);

            if (item == null)
            {
                return NotFound();
            }

            Data.Remove(item);
            return Ok(item);
        }
    }

    public class DeleteRequest
    {
        public long Id { get; set; }
    }
}