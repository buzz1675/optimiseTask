using Microsoft.Data.SqlClient;
using Dapper;
using System.Data;
using ProductApi.Models;

public class ProductService : IProductService
{
    private readonly string _connectionString;

    public ProductService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")!;
    }

    public async Task<IEnumerable<Product>> SearchProductsAsync(string code, string description)
    {
        using var connection = new SqlConnection(_connectionString);
        var parameters = new { Code = code ?? "", PartOfDescription = description ?? "" };

        return await connection.QueryAsync<Product>(
            "osp_GetProductSearch",
            parameters,
            commandType: CommandType.StoredProcedure
        );
    }
}