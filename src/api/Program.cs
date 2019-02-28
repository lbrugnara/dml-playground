using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace DmlApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseKestrel((context, options) =>
                {
                    options.Listen(IPAddress.Any, 5000);

                    if (context.Configuration.GetValue<bool>("Host:Https:Enabled"))
                    {
                        options.Listen(IPAddress.Any, 5001, listenOptions =>
                        {
                            var cert = context.Configuration.GetValue<string>("Host:Https:Certificate");
                            var pass = context.Configuration.GetValue<string>("Host:Https:CertificatePassword");

                            if (!string.IsNullOrEmpty(cert) && !string.IsNullOrEmpty(pass))
                                listenOptions.UseHttps(cert, pass);
                            else if (!string.IsNullOrEmpty(cert))
                                listenOptions.UseHttps(cert);
                            else
                                throw new Exception("Cannot start dml-playground: Missing certificate configuration");
                        });
                    }
                })
                .UseStartup<Startup>()
            ;
    }
}
