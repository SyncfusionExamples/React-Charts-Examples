using LinqToDB;
using LinqToDB.Data;
using LinqToDB.DataProvider.MySql;

public class AppDataConnection : DataConnection
{
    public AppDataConnection(IConfiguration config)
        : base(new DataOptions()
            .UseMySql(
                config.GetConnectionString("MySqlConn"),
                MySqlVersion.MySql80,
                MySqlProvider.MySqlConnector))
    { }

    public ITable<SalesData> Sales => this.GetTable<SalesData>();
}