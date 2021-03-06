﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Filters;



namespace EBCAdmin.Security
{
    public class CustomAuthentication
    {
        public class AdminSuperAdminAttribute : FilterAttribute, IAuthenticationFilter
        {
          //  string superAdminRole = "SuperAdmin"; // can be taken from resource file or config file
         //   string adminRole = "Admin"; // can be taken from resource file or config file

            public void OnAuthentication(AuthenticationContext context)
            {
                if (context.HttpContext.User.Identity.IsAuthenticated)
                {
                    // do nothing
                }
                else
                {
                    context.Result = new HttpUnauthorizedResult(); // mark unauthorized
                }
            }

            public void OnAuthenticationChallenge(AuthenticationChallengeContext context)
            {
                if (context.Result == null || context.Result is HttpUnauthorizedResult)
                {
                    context.Result = new RedirectToRouteResult("Default",
                        new System.Web.Routing.RouteValueDictionary{
                        {"controller", "EBC"},
                        {"action", "Login"},
                        {"returnUrl", context.HttpContext.Request.RawUrl}
                    });
                }
            }
        }
    }
}