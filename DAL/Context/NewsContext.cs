using DAL.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    public class NewsContext : DbContext
    {


        public NewsContext(DbContextOptions options) : base(options)
        {

            this.Initialize();
        }

        private void Initialize()
        {
            this.Database.EnsureCreated();
            if (Posts.Any())
            {
                return;
            }
            Themes.Add(new Theme { Name = "Срочное" });
            Themes.Add(new Theme { Name = "Обычное" });
            SaveChanges();
            Users.Add(new User { Name = "Я" });
            SaveChanges();
            Posts.Add(new Post()
            {
                ThemeId = Themes.FirstOrDefault().Id,
                UserId = Users.FirstOrDefault().Id,
                Content = "На этом месте 32 мая 1985 года ничего не произошло",
                Title = "Срочно!",
                ContentPreview = "На этом месте...",
                Date = DateTime.Today
            });
            Posts.Add(new Post()
            {
                ThemeId = Themes.FirstOrDefault().Id,
                UserId = Users.FirstOrDefault().Id,
                Content = "Фантазии нет",
                Title = "Не очень срочно",
                ContentPreview = "Фантаз...",
                Date = DateTime.Today.AddDays(-1)
            }) ;
            SaveChanges();

        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Theme> Themes { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
