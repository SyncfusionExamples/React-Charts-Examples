using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ChartApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SalesRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Month = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    SalesAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesRecords", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "SalesRecords",
                columns: new[] { "Id", "Month", "SalesAmount" },
                values: new object[,]
                {
                    { 1, "Jan", 12000.00m },
                    { 2, "Feb", 18000.00m },
                    { 3, "Mar", 15000.00m },
                    { 4, "Apr", 22000.00m },
                    { 5, "May", 26000.00m },
                    { 6, "Jun", 30000.00m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalesRecords");
        }
    }
}
