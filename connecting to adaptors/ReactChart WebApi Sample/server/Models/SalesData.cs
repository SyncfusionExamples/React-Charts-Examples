namespace server.Models
{
    public class SalesData
    {
        public int Id { get; set; }

        public string Month { get; set; } = string.Empty;

        public double Sales { get; set; }

        public double Expenses { get; set; }

        public double Profit { get; set; }

        public string Region { get; set; } = string.Empty;
    }
}