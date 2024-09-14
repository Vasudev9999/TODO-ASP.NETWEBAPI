using Microsoft.AspNetCore.Mvc;
using ToDoAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace ToDoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {
        private static List<ToDoItem> _items = new List<ToDoItem>();

        [HttpGet]
        public ActionResult<IEnumerable<ToDoItem>> Get() => Ok(_items);

        [HttpGet("{id}")]
        public ActionResult<ToDoItem> Get(int id)
        {
            var item = _items.FirstOrDefault(i => i.Id == id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public ActionResult<ToDoItem> Post(ToDoItem item)
        {
            item.Id = _items.Count + 1;
            _items.Add(item);
            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ToDoItem item)
        {
            var existingItem = _items.FirstOrDefault(i => i.Id == id);
            if (existingItem == null) return NotFound();

            existingItem.Name = item.Name; // Update the existing item's name
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var index = _items.FindIndex(i => i.Id == id);
            if (index == -1) return NotFound();
            _items.RemoveAt(index);
            return NoContent();
        }
    }
}
