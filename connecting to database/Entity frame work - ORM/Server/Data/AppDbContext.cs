using ChartApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ChartApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<SalesRecord> SalesRecords { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SalesRecord>(entity =>
            {
                entity.ToTable("SalesRecords");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Month)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.SalesAmount)
                    .IsRequired()
                    .HasColumnType("decimal(18,2)");

                entity.HasData(
                    new SalesRecord
                    {
                        Id = 1,
                        Month = "Jan",
                        SalesAmount = 12000.00m
                    },
                    new SalesRecord
                    {
                        Id = 2,
                        Month = "Feb",
                        SalesAmount = 18000.00m
                    },
                    new SalesRecord
                    {
                        Id = 3,
                        Month = "Mar",
                        SalesAmount = 15000.00m
                    },
                    new SalesRecord
                    {
                        Id = 4,
                        Month = "Apr",
                        SalesAmount = 22000.00m
                    },
                    new SalesRecord
                    {
                        Id = 5,
                        Month = "May",
                        SalesAmount = 26000.00m
                    },
                    new SalesRecord
                    {
                        Id = 6,
                        Month = "Jun",
                        SalesAmount = 30000.00m
                    }
                );
            });
        }
    }
}