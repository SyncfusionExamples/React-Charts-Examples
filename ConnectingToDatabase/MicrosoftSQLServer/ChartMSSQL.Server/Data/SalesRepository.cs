using Microsoft.Data.SqlClient;
using ChartAPI.Models;

namespace ChartAPI.Data
{
    public class SalesRepository
    {
        private readonly string _connectionString;

        public SalesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")!;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }

        public async Task<List<SalesRecord>> GetSalesDataAsync()
        {
            var salesRecords = new List<SalesRecord>();

            const string query = @"
                SELECT Id, ProductName, Year, Revenue
                FROM SalesRecords
                ORDER BY Year, ProductName;
            ";

            await using var connection = GetConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand(query, connection);
            await using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                salesRecords.Add(new SalesRecord
                {
                    Id = Convert.ToInt32(reader["Id"]),
                    ProductName = reader["ProductName"]?.ToString(),
                    Year = Convert.ToInt32(reader["Year"]),
                    Revenue = Convert.ToDouble(reader["Revenue"])
                });
            }

            return salesRecords;
        }
    }
}