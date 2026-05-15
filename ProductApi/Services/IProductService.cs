using ProductApi.Models;

public interface IProductService
{
    Task<IEnumerable<Product>> SearchProductsAsync(string code, string description);
}