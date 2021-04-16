using BLL;
using DAL.Interfaces;
using DAL.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VetLabReact.Controllers
{
    [ApiController]
    public abstract class AbstractController<M> : Controller where M : class
    {
        private IUnitOfWork db;
        private IRepository<M> rep;
        public AbstractController(IUnitOfWork basecontext, IRepository<M> repository)
        {
            db = basecontext;
            rep = repository;
        }

        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<M>>> GetAll()
        {
            var a = await rep.GetList();
            return new ActionResult<IEnumerable<M>>(a);
            // return new ActionResult<IEnumerable<Post>>(new List<Post>());
        }

        [HttpGet("{id}")]
        public virtual async Task<ActionResult<M>> GetById(int id)
        {
            var model = await rep.GetItem(id);
            if (model == null)
            {
                return NotFound();
            }
            return model;
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Update([FromRoute] int id, [FromBody] M model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            rep.UpdateItem(model);
            await db.Save();

            return NoContent();
        }

        [HttpPost]
        public virtual async Task<ActionResult<M>> Create(M model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var rez = await rep.Create(model);
            var ex = await db.Save();
            return rez;
        }

        [HttpDelete("{id}")]
        public virtual async Task<ActionResult> DeletePost(int id)
        {
            var model = await rep.GetItem(id);

            if (model == null)
            {
                return NotFound();
            }
            await rep.DeleteItem(id);
            await db.Save();

            return NoContent();
        }
    }
}
