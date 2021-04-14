using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    public static class ServiceRegisterBaseContext
    {
        public static IServiceCollection RegisterBaseContext(this IServiceCollection services, string connection)
        {
            services.AddScoped(typeof(DbContext), typeof(NewsContext));

           // services.AddDbContext<NewsContext>(options => options.UseSqlServer(connection));

            //var optionsBuilder = new DbContextOptionsBuilder<NewsContext>();
            //optionsBuilder.UseLazyLoadingProxies();
            services.AddDbContext<NewsContext>(options => options.UseLazyLoadingProxies().UseSqlServer(connection));

            return services;
        }
    }
}
