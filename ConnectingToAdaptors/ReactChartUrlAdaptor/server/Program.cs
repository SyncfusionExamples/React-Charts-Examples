using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=sales.db"));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors();

app.MapControllers();

SeedDatabase(app);

app.Run();

static void SeedDatabase(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.EnsureCreated();

    if (!db.SalesRecords.Any())
    {
        db.SalesRecords.AddRange(
            new SalesRecord { Month = "Jan", Sales = 12000, Expenses = 8000 },
            new SalesRecord { Month = "Feb", Sales = 15000, Expenses = 9000 },
            new SalesRecord { Month = "Mar", Sales = 18000, Expenses = 11000 },
            new SalesRecord { Month = "Apr", Sales = 22000, Expenses = 13000 },
            new SalesRecord { Month = "May", Sales = 26000, Expenses = 15000 },
            new SalesRecord { Month = "Jun", Sales = 30000, Expenses = 17000 }
        );

        db.SaveChanges();
    }
}