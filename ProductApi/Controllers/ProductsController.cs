using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;
    public ProductsController(IProductService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? code, [FromQuery] string? description)
    {
        var results = await _service.SearchProductsAsync(code ?? "", description ?? "");
        return Ok(results);
    }
}