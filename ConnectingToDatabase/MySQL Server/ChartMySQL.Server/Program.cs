using LinqToDB;
using LinqToDB.AspNet;
using LinqToDB.DataProvider.MySql;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("cors", p =>
        p.AllowAnyOrigin()
         .AllowAnyHeader()
         .AllowAnyMethod());
});

builder.Services.AddLinqToDB((sp, options) =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("MySqlConn")!,
        MySqlVersion.MySql80,
        MySqlProvider.MySqlConnector));

builder.Services.AddScoped<AppDataConnection>();

var app = builder.Build();

app.UseCors("cors");
app.MapControllers();

app.Run();