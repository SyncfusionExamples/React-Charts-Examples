var builder = WebApplication.CreateBuilder(args);

// Add controller support
builder.Services.AddControllers();

// Enable CORS for React Vite app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactClient", policy =>
    {
        policy         
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:5174"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Use CORS before mapping controllers
app.UseCors("AllowReactClient");

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Map API controllers
app.MapControllers();

app.Run();