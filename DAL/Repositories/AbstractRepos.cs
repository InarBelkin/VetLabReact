using DAL.Context;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class AbstractRepos<T> : IRepository<T> where T : class
    {
        protected NewsContext db;
        protected DbSet<T> db2;
        public AbstractRepos(DbSet<T> dbset, NewsContext c)
        {
            db2 = dbset;
            db = c;
        }

        public virtual async Task<T> Create(T item)
        {
            //return (await context.Basket.AddAsync(basket)).Entity;
            return (await db2.AddAsync(item)).Entity;
        }

        public virtual async Task DeleteItem(int id)
        {
            T m = await db2.FindAsync(id);
            db2.Remove(m);
        }

        public virtual async Task<T> GetItem(int id)
        {
            return await db2.FindAsync(id);
        }

        public virtual async Task<List<T>> GetList()
        {
            var a = await db2.ToListAsync();
            return a;
        }

        public virtual void UpdateItem(T item)
        {

            db.Entry(item).State = EntityState.Modified;
        }
    }
}
