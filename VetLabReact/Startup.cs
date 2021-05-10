using BLL;
using DAL.Context;
using DAL.Database;
using DAL.DataBase;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace VetLabReact
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private static async Task CreateUserRoles(IServiceProvider ServiceProvider)
        {
            NewsContext a = (NewsContext)ServiceProvider.GetService(typeof(DbContext));
            a.Initialize();

            RoleManager<IdentityRole> RoleManager = ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            UserManager<User> UserManager = ServiceProvider.GetRequiredService<UserManager<User>>();
            if (await RoleManager.FindByNameAsync(RolesNames.Admin) == null)
            {
                await RoleManager.CreateAsync(new IdentityRole(RolesNames.Admin));
            }
            if (await RoleManager.FindByNameAsync(RolesNames.User) == null)
            {
                await RoleManager.CreateAsync(new IdentityRole(RolesNames.User));
            }
            string AdminName = "InarBelkin";
            string AdminPassword = "Aa123456!";

            if (await UserManager.FindByNameAsync(AdminName) == null)
            {
                User Admin = new User
                {
                    UserName = AdminName
                };

                //Secure_Password
                IdentityResult Result = await UserManager.CreateAsync(Admin, AdminPassword);

                if (Result.Succeeded)
                {
                    await UserManager.AddToRoleAsync(Admin, RolesNames.Admin);
                }
            }

            string UserName = "UsualUser";
            string UserPassword = "Aa123456!";
            if (await UserManager.FindByNameAsync(UserName) == null)
            {
                User Quest = new User
                {
                    UserName = UserName
                };

                //qwerty
                IdentityResult Result = await UserManager.CreateAsync(Quest, UserPassword);

                if (Result.Succeeded)
                {
                    await UserManager.AddToRoleAsync(Quest, RolesNames.User);
                }
            }

            
        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            

            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.RegisterDatabase(connection);

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            //services.AddMvc().AddJsonOptions(options => {options.Ser })

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "NewsVetLab";
                options.LoginPath = "/";
                options.AccessDeniedPath = "/";
                options.LogoutPath = "/";
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });


            services.AddMvc().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling =
                ReferenceLoopHandling.Ignore;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider services)
        {
            app.UseAuthentication();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                    //spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            CreateUserRoles(services).Wait();
        }
    }
}
