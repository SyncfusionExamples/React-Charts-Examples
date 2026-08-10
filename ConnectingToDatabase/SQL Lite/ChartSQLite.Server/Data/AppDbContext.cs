using Microsoft.EntityFrameworkCore;
using ChartSQLiteAPI.Models;

namespace ChartSQLiteAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Sales> Sales { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
    }
}