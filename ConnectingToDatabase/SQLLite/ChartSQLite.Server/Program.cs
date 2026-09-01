using Microsoft.EntityFrameworkCore;
using ChartSQLiteAPI.Data;
using ChartSQLiteAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add services
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build(); // ✅ app is created HERE

// ✅ Use CORS
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.EnsureCreated();   // ✅ only create

    if (!db.Sales.Any())           // ✅ safe now
    {
        db.Sales.AddRange(
            
            new Sales { Category = "Jan", Amount = 100 },
            new Sales { Category = "Feb", Amount = 200 },
            new Sales { Category = "Mar", Amount = 150 },
            new Sales { Category = "Apr", Amount = 250 },
            new Sales { Category = "May", Amount = 300 }

        );

        db.SaveChanges();
    }
}

app.Run();