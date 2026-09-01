namespace backend.Models
{
    public class SalesData
    {
        public string Month { get; set; } = string.Empty;

        public double Sales { get; set; }

        public double Expenses { get; set; }

        public double Profit { get; set; }
    }
}