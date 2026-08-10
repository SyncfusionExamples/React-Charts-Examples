using backend.GraphQL;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy for React Vite frontend.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:5178")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Register HotChocolate GraphQL server.
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();

var app = builder.Build();

app.UseCors("AllowReactApp");

// GraphQL endpoint:
// http://localhost:5000/graphql
app.MapGraphQL("/graphql");

app.MapGet("/", () => "HotChocolate GraphQL Backend is running.");

app.Run();