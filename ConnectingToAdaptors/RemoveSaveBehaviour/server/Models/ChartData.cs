namespace RemoteSaveChart.Server.Models
{
    public class ChartData
    {
        public long Id { get; set; }
        public string Month { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}