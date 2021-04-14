using DAL.Context;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class UnitOfWork : IUnitOfWork
    {
        private NewsContext db;
        public UnitOfWork(NewsContext context)
        { db = context; }

        private PostRepos post;
        public PostRepos Posts => post ??= new PostRepos(db);

        private ThemeRepos theme;
        public ThemeRepos Themes => theme ??= new ThemeRepos(db);

        private UserRepos users;
        public UserRepos Users => users ??= new UserRepos(db);

        public void Dispose()
        {
            db.Dispose();
            GC.SuppressFinalize(this);
        }

        public async Task<Exception> Save()
        {
            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return ex;
            }
            return null;
        }
    }
}
