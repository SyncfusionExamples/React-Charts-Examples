using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Order
    {
        [Key]
        public int OrderID { get; set; }
        public string CustomerID { get; set; }
        public int Amount { get; set; }
    }
}