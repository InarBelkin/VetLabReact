using DAL.Context;
using DAL.Database;
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

        public override void UpdateItem(Post item)
        {
            Post To = db2.Find(item.Id);
            if (To != null)
            {
                //To.UserId = item.UserId;
                To.ThemeId = item.ThemeId;
                To.Title = item.Title;
                To.Content = item.Content;
                To.ContentPreview = item.Content;

                //To.Date = item.Date;  //дата остаётся той же
                base.UpdateItem(To);
            }
        }
        public override async Task<Post> Create(Post item)
        {
            item.Date = DateTime.Now;
            item.ContentPreview = item.Content.Remove(40)+"...";
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
