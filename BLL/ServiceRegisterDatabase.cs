using DAL.Context;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public static class ServiceRegisterDatabase
    {
        public static IServiceCollection RegisterDatabase(this IServiceCollection services, string connection)
        {
            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));    //возможно надо через другой метод добавлять
            services.RegisterBaseContext(connection);                       //чтобы каждый раз заново не создавался контекст
            return services;
        }
    }
}
