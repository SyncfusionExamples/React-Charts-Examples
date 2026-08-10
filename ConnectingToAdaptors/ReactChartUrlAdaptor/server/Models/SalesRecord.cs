using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class SalesRecord
    {
        [Key]
        public int Id { get; set; }

        public string Month { get; set; } = string.Empty;

        public double Sales { get; set; }

        public double Expenses { get; set; }
    }
}