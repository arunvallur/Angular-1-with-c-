using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;

namespace EBCAdmin
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "EBC", action = "Login", id = UrlParameter.Optional }
            );
            routes.MapHttpRoute(
              name: "api",
             routeTemplate: "EBC/api/{controller}/{action}"
              );
            
        }
    }
}