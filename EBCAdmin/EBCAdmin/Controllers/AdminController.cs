using EBCAdmin.Business;
//using EBCAdmin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web;
using EBCAdmin.Classfiles;
using System.Web.Security;
using System.Web.SessionState;
using System.Collections;
using System.Web.Mvc.Routing;

namespace EBCAdmin.Controllers
{

    public class AdminController : ApiController
    {
        string result = string.Empty;
        HttpResponseMessage response = new HttpResponseMessage();
        [AllowAnonymous]
        [HttpPost]
        public string Login(users users)
        {
            try
            {
                Userdetails checkusers = new Userdetails();
                IEnumerable<users> user = checkusers.UserLogin(users);

              //  string test = "arun";
                if (user.Count() != 0)
                {

                    //   HttpContext.Current.Session["session"] = DateTime.Now;
                    // session["checki"] = DateTime.Now;
                   
                     HttpContext.Current.Session["UserDetails"]  = user.FirstOrDefault();

                    users tt = HttpContext.Current.Session["UserDetails"] as users;

                    //    HttpContext.Current.Session["time"] = DateTime.Now;

                    //   HttpContext.Current.Session["Check1"] = test;
                    // HttpContext
                    try
                    {

                        FormsAuthentication.SetAuthCookie(user.FirstOrDefault().first_name, false);

                        //  Roles.CreateRole(user.FirstOrDefault().Roles);
                       bool testing= User.IsInRole("Admin");

                
                        //    Roles.AddUserToRole("", user.FirstOrDefault().Roles);
                      //  var role1 = HttpContext.Current.User.IsInRole(user.FirstOrDefault().Roles);
                      //  var role = Roles.IsUserInRole(user.FirstOrDefault().Roles.ToString());
                        result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(user);

                        return result;
                    }
                    catch(Exception ex)
                    {
                        throw ex;
                    }
                }
                else
                {

                    result = null;

                    return result;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }


        [HttpGet]    
        public string History()
        {
            try
            {
                Userdetails userbookedhistory = new Userdetails();
                IEnumerable<bookingdetails> history = userbookedhistory.gethistory();
                if (history != null)
                {
                    result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(history);                 
                    return result;
                }
                else
                {
                    result = null;
                    return result;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost]
        public string HistorybyType(usertypes usertypes)
        {
            try
            {
                Userdetails userbookedhistory = new Userdetails();
                IEnumerable<bookingdetails> history = userbookedhistory.gethistorybytype(usertypes);
                if (history != null)
                {
                    result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(history);
                    return result;
                }
                else
                {
                    result =null;
                    return result;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


       [HttpGet]
        public string Members()
       {
           try
           {
               
                Userdetails registeredmember = new Userdetails();
               IEnumerable<Members> members = registeredmember.getmembers();
               if (members != null)
               {
                   result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(members);
                   return result;
               }
               else
               {
                   result = null;
                   return result;
               }

           }
           catch (Exception ex)
           {
               throw ex;
           }
       }



       [HttpPost]
       public string Memberstype(usertypes types)
       {
           try
           {
               Userdetails memberbytype = new Userdetails();
               IEnumerable<Members> members = memberbytype.getmemberstype(types);
               if (members != null)
               {
                   result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(members);
                   return result;
               }
               else
               {
                   result = null;
                   return result;
               }

           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       [HttpGet]
       public string Price()
       {
           try
           {
               Userdetails EBCPricet = new Userdetails();
               IEnumerable<EBCPrice> PriceEBC = EBCPricet.getPrice();
               if (PriceEBC != null)
               {
                   result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(PriceEBC);
                   return result;
               }
               else
               {
                   result = null;
                   return result;
               }

           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

       [HttpPost]
       public string SavePrice(EBCPrice price)
       {
           try
           {
               Userdetails Pricenew = new Userdetails();
               IEnumerable<EBCPrice> members = Pricenew.saveprice(price);
               if (members != null)
               {
                   result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(members);
                   return result;
               }
               else
               {
                   result = null;
                   return result;
               }

           }
           catch (Exception ex)
           {
               throw ex;
           }
       }


       [HttpPost]
       public string EditedPrices(EBCPrice price)
       {
           try
           {
               Userdetails Pricenew = new Userdetails();
               IEnumerable<EBCPrice> priceresult = Pricenew.EditPrice(price);
               if (priceresult != null)
               {
                   result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(priceresult);
                   return result;
               }
               else
               {
                   result = null;
                   return result;
               }

           }
           catch (Exception ex)
           {
               throw ex;
           }
       }

    
        [HttpGet]
       public string OneDayMembers()
       {
           try
           {
               Userdetails onemember = new Userdetails();
               IEnumerable<bookingdetails> members = onemember.GetOneDaymembers();
               if (members != null)
               {
                   result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(members);
                   return result;
               }
               else
               {
                   result = null;
                   return result;
               }

           }
           catch (Exception ex)
           {
               throw ex;
           }
       }
   
        [HttpPost]
        public bool Cancelbooking(bookingdetails Bookingdetails)
        {

            Userdetails usercancel = new Userdetails();
            bool result = usercancel.cancelbooking(Bookingdetails);

            return result;
        }



        public string Details(userdetails Bookingdetails)
        {

            Userdetails usercancel = new Userdetails();
            userdetails Details = usercancel.Memberdetails(Bookingdetails);

            if (Details != null)
            {
                result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(Details);
                return result;
            }
            else
            {
                result = null;
                return result;
            }
          
        }


        public string UpdateDetails(updatedetails updatedetails)
        {

            Userdetails usercancel = new Userdetails();
            updatedetails accessory = usercancel.accessorydetails(updatedetails);

            if (accessory != null)
            {
                result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(accessory);
                return result;
            }
            else
            {
                result = null;
                return result;
            }

        }


        public string SaveUpdates(Models.NUT_Updates updateNUT)
        {

            updateNUT.ID = 1;

            Userdetails usercancel = new Userdetails();
             Models.NUT_Updates AdminUpdates = usercancel.AdminUpdat(updateNUT);

            if (AdminUpdates != null)
            {
                result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(AdminUpdates);
                return result;
            }
            else
            {
                result = null;
                return result;
            }

        }

        public string GetUpdates()
        {

            Userdetails usercancel = new Userdetails();
            Models.NUT_Updates GetUpdates = usercancel.GetUpdat();

            if (GetUpdates != null)
            {
                result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(GetUpdates);
                return result;
            }
            else
            {
                result = null;
                return result;
            }

        }



        public string GetUseDetails()
        {

            if(HttpContext.Current.Session["UserDetails"] as users != null)
            {
                users usedetail = HttpContext.Current.Session["UserDetails"] as users;

              result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(usedetail);

                return result;
            }
            else
            {
                return null;
            }
           

        }


        public string GetOperator()
        {

            
                Userdetails userOperator = new Userdetails();
               IEnumerable<Models.user> operators = userOperator.Operatot();

                if (operators != null)
                {
                    result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(operators);
                    return result;
                }
                else
                {
                    result = null;
                    return result;
                }
           


        }

        [HttpPost]
        public string CreateOpo(Models.user Operator)
        {


            Userdetails Operator1 = new Userdetails();
            IEnumerable<Models.user> operators = Operator1.CreateOperator(Operator);

            if (operators != null)
            {
                result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(operators);
                return result;
            }
            else
            {
                result = null;
                return result;
            }



        }

        [HttpPost]
        public string Editedoprator(Models.user Operator)
        {


            Userdetails Operator1 = new Userdetails();
            IEnumerable<Models.user> operators = Operator1.EditOperators(Operator);

            if (operators != null)
            {
                result = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(operators);
                return result;
            }
            else
            {
                result = null;
                return result;
            }



        }


    }
}
