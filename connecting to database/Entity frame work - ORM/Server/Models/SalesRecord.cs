using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChartApi.Models
{
    public class SalesRecord
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Month { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal SalesAmount { get; set; }
    }
}