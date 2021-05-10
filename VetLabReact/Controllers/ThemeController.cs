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
    [Route("/api/themes/")]
    public class ThemeController : AbstractController<Theme>
    {
        public ThemeController(IUnitOfWork basecontext) :
            base(basecontext, basecontext.Themes)
        { }
    }
}
