using DAL.Context;
using DAL.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class PostRepos : AbstractRepos<Post>
    {
        public PostRepos(NewsContext context) : base(context.Posts, context) { }

        public async Task<List<Post>> GetByTheme(int themeid)
        {
            var a = await db.Posts.ToListAsync();
            List<Post> rezult = a.Where(p => p.ThemeId == themeid).ToList();
            return rezult;
        }

        public override void UpdateItem(Post item)
        {
            Post To = db2.Find(item.Id);
            if (To != null)
            {
                //To.UserId = item.UserId;
                To.ThemeId = item.ThemeId;
                To.Title = item.Title;
                To.Content = item.Content;
                if (item.Content.Length > 39)
                    To.ContentPreview = item.Content.Remove(40) + "...";
                else To.ContentPreview = item.Content;

                //To.Date = item.Date;  //дата остаётся той же
                base.UpdateItem(To);
            }
        }
        public override async Task<Post> Create(Post item)
        {
            item.Date = DateTime.Now;
            if (item.Content.Length > 39)
                item.ContentPreview = item.Content.Remove(40) + "...";
            else item.ContentPreview = item.Content;
            var a = await db2.AddAsync(item);
            return a.Entity;
        }

       
    }

    public class ThemeRepos : AbstractRepos<Theme>
    {
        public ThemeRepos(NewsContext context) : base(context.Themes, context) { }
    }

    public class UserRepos : AbstractRepos<User>
    {
        public UserRepos(NewsContext context) : base(context.Users, context) { }
    }
}
