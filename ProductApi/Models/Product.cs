namespace ProductApi.Models;

public class Product
{
    public string Code { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public string ProductGroup { get; set; } = string.Empty;
    public int StockLevel { get; set; }
}