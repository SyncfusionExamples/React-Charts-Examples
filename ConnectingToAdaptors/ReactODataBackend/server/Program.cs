using Microsoft.AspNetCore.OData;
using Microsoft.OData.ModelBuilder;
using server.Models;

var builder = WebApplication.CreateBuilder(args);

// ✅ Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// ✅ Configure OData
var modelBuilder = new ODataConventionModelBuilder();
modelBuilder.EntitySet<Order>("Orders");

builder.Services.AddControllers().AddOData(opt =>
{
    opt.Select().Filter().OrderBy().Expand().Count().SetMaxTop(100);
    opt.AddRouteComponents("odata", modelBuilder.GetEdmModel());
});

var app = builder.Build();

app.UseCors("AllowAll");

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
