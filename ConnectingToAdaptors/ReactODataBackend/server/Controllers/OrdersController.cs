using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using server.Models;

namespace server.Controllers
{
    [Route("odata/[controller]")]
    public class OrdersController : ControllerBase
    {
        private static List<Order> orders = new List<Order>
        {
            new Order { OrderID = 1, CustomerID = "A", Amount = 100 },
            new Order { OrderID = 2, CustomerID = "B", Amount = 200 },
            new Order { OrderID = 3, CustomerID = "C", Amount = 300 },
            new Order { OrderID = 4, CustomerID = "D", Amount = 150 },
            new Order { OrderID = 5, CustomerID = "E", Amount = 250 }
        };

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(orders);
        }
    }
}