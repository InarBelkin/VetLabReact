using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repositories;
namespace BLL
{
    public interface IUnitOfWork :IDisposable
    {
        PostRepos Posts { get; }
        ThemeRepos Themes { get; }
        UserRepos Users { get; }


        public Task<Exception> Save();

    }
}
