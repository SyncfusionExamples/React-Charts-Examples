using ChartDapperApi.Models;
using Dapper;
using System.Data;

namespace ChartDapperApi.Data;

public class SalesChartRepository
{
    private readonly IDbConnection _connection;

    public SalesChartRepository(IDbConnection connection)
    {
        _connection = connection;
    }

    public async Task<List<SalesChartPoint>> GetMonthlySalesAsync()
    {
        const string sql = @"
            SELECT 
                MonthName AS Month,
                SalesAmount AS Sales
            FROM dbo.MonthlySales
            ORDER BY Id";

        var result = await _connection.QueryAsync<SalesChartPoint>(sql);

        return result.ToList();
    }
}