using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ChartController : ControllerBase
{
    private readonly AppDataConnection _db;

    public ChartController(AppDataConnection db)
    {
        _db = db;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var data = _db.Sales.ToList();
        return Ok(data);
    }
}