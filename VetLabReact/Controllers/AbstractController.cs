using BLL;
using DAL.DataBase;
using DAL.Interfaces;
using DAL.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VetLabReact.Controllers
{
    /// <summary>
    /// Этот контроллер реализует crud операции для наследников
    /// </summary>
    [ApiController]
    public abstract class AbstractController<M> : Controller where M : class
    {
        protected IUnitOfWork db;
        protected IRepository<M> rep;
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
        [Authorize(Roles = RolesNames.Admin)]
        public virtual async Task<IActionResult> Update([FromRoute] int id, [FromBody] M model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            rep.UpdateItem(model);
            var a = await db.Save();

            return NoContent();
        }

        [HttpPost]
        [Authorize(Roles = RolesNames.Admin)]
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
