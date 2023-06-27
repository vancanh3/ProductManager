using Microsoft.AspNetCore.Mvc;
using ReactCRUD.Models;

namespace ReactCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ProductDbContext _dbContext;

        public CategoryController(ProductDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/<CategoriesController>
        [HttpGet]
        public IEnumerable<Category> GetCategories()
        {
            return _dbContext.Categories.ToList();
        }

        [HttpGet("{id}")]
        public Category GetGetCategoryById(int id)
        {
            return _dbContext.Categories.Find(id);
        }

        // POST api/<CategoriesController>
        [HttpPost]
        public async Task<IActionResult> AddNewCategory([FromBody] FormCategoryView _category)
        {
            var cate = new Category()
            {
                Name = _category.Name,
                SlugCategory = _category.SlugCategory
            };
            _dbContext.Categories.Add(cate);
            await _dbContext.SaveChangesAsync();
            if (cate.CategoryId > 0)
            {
                return Ok(1);
            }
            return Ok(0);
        }

        // PUT api/<CategoriesController>/5
        [HttpPut("updateCategory/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] FormCategoryView _category)
        {
            var category = await _dbContext.Categories.FindAsync(id);
            category.SlugCategory = _category.SlugCategory;
            category.Name = _category.Name;
            await _dbContext.SaveChangesAsync();
            return Ok(1);
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _dbContext.Categories.FindAsync(id);
            _dbContext.Categories.Remove(category);
            await _dbContext.SaveChangesAsync();
            return Ok(1);
        }
    }
}
