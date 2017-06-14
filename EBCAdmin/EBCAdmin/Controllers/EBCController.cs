using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EBCAdmin.Database;
using EBCAdmin.Classfiles;

namespace EBCAdmin.Controllers
{
    public class EBCController : Controller
    {
       
        public ActionResult index()
        {
            return View();
        }

        public ActionResult Login()
        {
            System.Web.Security.FormsAuthentication.SignOut();
            
            return View();
        }

        [EBCAdmin.Security.CustomAuthentication.AdminSuperAdmin]
        public ActionResult Home()
        {

            Response.Cache.SetNoStore();
            return View();
        }
       
    }
}
