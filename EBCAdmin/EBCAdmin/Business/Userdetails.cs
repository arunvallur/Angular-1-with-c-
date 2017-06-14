using EBCAdmin.Classfiles;
using EBCAdmin.Database;
//using EBCAdmin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EBCAdmin.Models;

namespace EBCAdmin.Business
{
    public class Userdetails
    {
       
        public IEnumerable<users> UserLogin(users user)
        {
            UserOpertaions checkusers = new UserOpertaions();
            IEnumerable<users> uservalue = checkusers.checkuser(user);
      
            return uservalue;
        }

        public IEnumerable<bookingdetails> gethistorybytype(usertypes usertypes)
        {
            UserOpertaions checkusers = new UserOpertaions();
            IEnumerable<bookingdetails> result = checkusers.bookedhistorybytype(usertypes);
            return result;
        }

       public IEnumerable<bookingdetails> gethistory()
        {
            UserOpertaions checkusers = new UserOpertaions();
            IEnumerable<bookingdetails> result = checkusers.bookedhistory();
            return result;
        }


       public IEnumerable<Members> getmembers()
       {
           UserOpertaions memberslist = new UserOpertaions();
           IEnumerable<Members> result = memberslist.members();
           return result;
       }

       public IEnumerable<Members> getmemberstype(usertypes types)
       {
           UserOpertaions memberslistbytype = new UserOpertaions();
           IEnumerable<Members> result = memberslistbytype.membersfilter(types);
           return result;
       }

       public IEnumerable<EBCPrice> getPrice()
       {
           UserOpertaions Pricelist = new UserOpertaions();
           IEnumerable<EBCPrice> result = Pricelist.Price();
           return result;
       }

       public IEnumerable<EBCPrice> saveprice(EBCPrice price)
       {
           UserOpertaions Pricelist = new UserOpertaions();
           IEnumerable<EBCPrice> result = Pricelist.Price(price);
           return result;

       }

       public IEnumerable<EBCPrice> EditPrice(EBCPrice price)
       {
           UserOpertaions Pricelist = new UserOpertaions();
           IEnumerable<EBCPrice> result = Pricelist.EPrice(price);
           return result;
       }

       public IEnumerable<bookingdetails> GetOneDaymembers()
       {
           UserOpertaions memberslist = new UserOpertaions();
           IEnumerable<bookingdetails> result = memberslist.OneMembers();
           return result;
       }

        public bool cancelbooking(bookingdetails bookingdetails)
        {
            UserOpertaions operation = new UserOpertaions();
             bool result = operation.cancel(bookingdetails);
            return result;
            
        }

        public userdetails Memberdetails(userdetails bookingdetails)
        {
            UserOpertaions operation = new UserOpertaions();
            userdetails result = operation.details(bookingdetails);

            return result;
        }

        public updatedetails accessorydetails(updatedetails updatedetails)
        {
            UserOpertaions operation = new UserOpertaions();
            updatedetails result = operation.accessorydetails(updatedetails);

            return result;
        }

        public NUT_Updates AdminUpdat(NUT_Updates updateNUT)
        {
            UserOpertaions operation = new UserOpertaions();
            NUT_Updates result = operation.NUTUpdates(updateNUT);

            return result;
        }

        public NUT_Updates GetUpdat()
        {
            UserOpertaions operation = new UserOpertaions();
            NUT_Updates result = operation.GetNUTUpdates();

            return result;
        }

        public IEnumerable<user> Operatot()
        {
            UserOpertaions operation = new UserOpertaions();
          IEnumerable<user> result = operation.GetUsersoperator();

            return result;
        }

        public IEnumerable<user> CreateOperator(user operatordetails)
        {
            UserOpertaions operators = new UserOpertaions();
            IEnumerable<user> result = operators.CreateUsersoperator(operatordetails);

            return result;
        }

        public IEnumerable<user> EditOperators(user operatordetails)
        {
            UserOpertaions operators = new UserOpertaions();
            IEnumerable<user> result = operators.EditUsersoperator(operatordetails);

            return result;
        }
    }
}