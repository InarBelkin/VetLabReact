using BLL;
using DAL.Database;
using DAL.DataBase;
using DAL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VetLabReact.Controllers
{
    [ApiController]
    [Route("/api/posts/")]
    public class PostsController : AbstractController<Post>
    {
        public PostsController(IUnitOfWork basecontext) :
            base(basecontext, basecontext.Posts)
        { }

        [Authorize(Roles = RolesNames.Admin)]
        public override Task<ActionResult> DeletePost(int id)
        {
            return base.DeletePost(id);
        }

    }
    //public class PostsController : Controller
    //{
    //    private IUnitOfWork db;

    //    public PostsController(IUnitOfWork basecontext)
    //    {
    //        db = basecontext;
    //    }

    //    [HttpGet]
    //    public async Task<ActionResult<IEnumerable<Post>>> GetAll()
    //    {
    //        var a = await db.Posts.GetList();
    //        return new ActionResult<IEnumerable<Post>>(a);
    //        // return new ActionResult<IEnumerable<Post>>(new List<Post>());
    //    }

    //    [HttpGet("{id}")]
    //    public async Task<ActionResult<Post>> GetById(int id)
    //    {
    //        var post = await db.Posts.GetItem(id);
    //        if (post == null)
    //        {
    //            return NotFound();
    //        }
    //        return post;
    //    }

    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Post post)
    //    {
    //        if (!ModelState.IsValid)
    //        {
    //            return BadRequest(ModelState);
    //        }
    //        db.Posts.UpdateItem(post);
    //        await db.Save();

    //        return NoContent();
    //    }

    //    [HttpPost]
    //    public async Task<ActionResult<Post>> Create(Post post)
    //    {
    //        if (!ModelState.IsValid)
    //        {
    //            return BadRequest(ModelState);
    //        }
    //        var rez = await db.Posts.Create(post);
    //        await db.Save();
    //        return rez;
    //    }

    //    [HttpDelete("{id}")]
    //    public async Task<ActionResult> DeletePost(int id)
    //    {
    //        var post = await db.Posts.GetItem(id);

    //        if (post == null)
    //        {
    //            return NotFound();
    //        }
    //        await db.Posts.DeleteItem(id);
    //        await db.Save();

    //        return NoContent();
    //    }

    //}
}
