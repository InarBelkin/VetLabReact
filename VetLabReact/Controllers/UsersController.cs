using BLL;
using DAL.Database;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VetLabReact.Controllers
{
    [ApiController]
    [Route("/api/users/")]
    public class UsersController : AbstractController<User>
    {
        public UsersController(IUnitOfWork basecontext) :
             base(basecontext, basecontext.Users)
        { }
    }
}
