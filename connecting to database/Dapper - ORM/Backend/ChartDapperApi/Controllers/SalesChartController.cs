using ChartDapperApi.Data;
using ChartDapperApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChartDapperApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesChartController : ControllerBase
{
    private readonly SalesChartRepository _repository;

    public SalesChartController(SalesChartRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<List<SalesChartPoint>>> GetMonthlySales()
    {
        var data = await _repository.GetMonthlySalesAsync();

        return Ok(data);
    }
}