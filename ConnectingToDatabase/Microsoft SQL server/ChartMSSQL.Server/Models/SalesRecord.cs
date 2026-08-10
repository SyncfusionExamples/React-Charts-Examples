using System.ComponentModel.DataAnnotations;

namespace ChartAPI.Models
{
    public class SalesRecord
    {
        [Key]
        public int Id { get; set; }

        public string? ProductName { get; set; }

        public int Year { get; set; }

        public double Revenue { get; set; }
    }
}