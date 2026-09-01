using LinqToDB.Mapping;

[Table("sales_data")]
public class SalesData
{
    [PrimaryKey, Identity]
    public int Id { get; set; }

    [Column]
    public string Month { get; set; }

    [Column]
    public decimal SalesAmount { get; set; }
}
