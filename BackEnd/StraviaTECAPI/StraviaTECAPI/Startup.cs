using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace StraviaTECAPI
{
    //Create conexion
    //Scaffold-DbContext "host=localhost;database=Stravia;user id=postgres; port=5433; password=admin" Npgsql.EntityFrameworkCore.PostgreSQL -OutputDir Models

    //Update dataBaser
    //Scaffold-DbContext "host=localhost;database=Stravia;user id=postgres; port=5433; password=admin" Npgsql.EntityFrameworkCore.PostgreSQL -OutputDir Models -context StraviaContext -force
    public class Startup
    {
        readonly string myCors = "myCors";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //avoid circular navigation 
            services.AddMvc()
        .AddJsonOptions(
            options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
        );

            //permitir el acceso de Web Services
            services.AddCors(options =>
            {
                options.AddPolicy(name: myCors,
                    builder =>
                    {
                        builder.WithHeaders("*"); // aceptar metodo post
                        builder.WithOrigins("*"); // * => a cualquier dominio
                        builder.WithMethods("*"); // permite todos los metodos
                    });
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //anadir, configurar cors
            app.UseCors(myCors);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
