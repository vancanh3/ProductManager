using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCRUD.Models;

namespace ReactCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProductController : Controller
    {
        private readonly ProductDbContext _dbContext;

        public ProductController(ProductDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProduct()
        {
            var products = await _dbContext.Products.Select(x => new Product
            {
                ProductId = x.ProductId,
                Title = x.Title,
                Body = x.Body,
                Slug = x.Slug,
                CategoryId = x.CategoryId,
                Category = _dbContext.Categories.FirstOrDefault(y => y.CategoryId == x.CategoryId)
            }).ToListAsync();

            return products;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var products = await _dbContext.Products.Select(x => new Product
            {
                ProductId = x.ProductId,
                Title = x.Title,
                Body = x.Body,
                Slug = x.Slug,
                CategoryId = x.CategoryId,
                Category = _dbContext.Categories.FirstOrDefault(y => y.CategoryId == x.CategoryId)
            }).ToListAsync();

            var product = products.FirstOrDefault(x => x.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost("addProduct")]
        public async Task<IActionResult> Post([FromBody] FormProductView _product)
        {
            var product = new Product()
            {
                Title = _product.Title,
                Body = _product.Body,
                Slug = _product.Slug,
                Category = _dbContext.Categories.Find(_product.CategoryId)
            };

            _dbContext.Products.Add(product);
            await _dbContext.SaveChangesAsync();

            if (product.ProductId > 0)
            {
                return Ok(1);
            }
            return Ok(0);
        }

        // PUT api/<ProductsController>/5
        [HttpPut("updateProduct/{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] FormProductView _user)
        {
            var product = _dbContext.Products.Find(id);
            product.Title = _user.Title;
            product.Body = _user.Body;
            product.Slug = _user.Slug;
            product.Category = _dbContext.Categories.Find(_user.CategoryId);
            await _dbContext.SaveChangesAsync();
            return Ok(1);
        }

        // DELETE api/<ProductsController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = _dbContext.Products.Find(id);
            _dbContext.Products.Remove(product);
            await _dbContext.SaveChangesAsync();
            return Ok(1);
        }

    }
}
