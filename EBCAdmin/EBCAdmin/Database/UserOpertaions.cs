using EBCAdmin.Classfiles;
//using EBCAdmin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using EBCAdmin.Controllers;
using System.Data.Entity;
using EBCAdmin.Models;

namespace EBCAdmin.Database
{
    public class UserOpertaions
    {

        EBCAdmin.Models.EBCAdminEntities db = new EBCAdmin.Models.EBCAdminEntities();
        
        public IEnumerable<users> checkuser(users user)
        {

            IEnumerable<users> userdetails = (from login in db.users
                                              where login.first_name == user.first_name
                                                  && login.password == user.password
                                              select
                                              new users
                                              {
                                                  id = login.id,
                                                  first_name = login.first_name,
                                                  last_name = login.last_name,
                                                  phone_no = login.phone_no,
                                                  email_id = login.email_id,
                                                  role_id = login.role_id,
                                                  status = login.status,
                                                  password = null,
                                                 Roles = (from m in db.Roles where m.Id == login.role_id select m.Roles).FirstOrDefault()

                                            }).ToList();
         
            return userdetails;
        }

        public IEnumerable<bookingdetails> bookedhistory()
        {
            IEnumerable<bookingdetails> history = (from bookinghistory in db.bookings orderby bookinghistory.Booking_expdate descending
                                           select new
                                               EBCAdmin.Classfiles.bookingdetails
                                               { 
                                               id= bookinghistory.id,
                                               cour_id =bookinghistory.cour_id,
                                               slot_id=bookinghistory.slot_id,
                                               start_time = (from timeing in db.slots where timeing.id == bookinghistory.slot_id select timeing.start_time).FirstOrDefault(),
                                               booking_date = (bookinghistory.booking_date),
                                               booking_status=bookinghistory.booking_status,
                                               user_id=bookinghistory.user_id,
                                               username = (from resgister in db.Members
                                                           where resgister.id == bookinghistory.user_id
                                                           select resgister.Name).FirstOrDefault() 

                                           }).ToList();
            foreach(bookingdetails time in history.ToList())
            {

              time.starttime =  DateTime.Today.Add(time.start_time).ToString("h:mm tt");

            }

            return history;
        }

        public updatedetails accessorydetails(updatedetails updatedetails)
        {
            EBCAdmin.Models.accessory accessory = db.accessories.Find(updatedetails.Id);
            accessory.racket = updatedetails.racket;
            accessory.Tshirt = updatedetails.Tshirt;
            db.Entry(accessory).State = EntityState.Modified;
            db.SaveChanges();

            accessory result = db.accessories.Where(m => m.UserId == updatedetails.UserId).FirstOrDefault();
            Member details = db.Members.Find(updatedetails.id);
            details.mobile = updatedetails.mobile;
            db.Entry(details).State = EntityState.Modified;
            db.SaveChanges();
            return updatedetails;

        }

        public IEnumerable<user> CreateUsersoperator(user operatordetails)
        {

            EBCAdmin.Models.user Usersopo = new EBCAdmin.Models.user();
            Usersopo.first_name = operatordetails.first_name;
            Usersopo.last_name = operatordetails.last_name;
            Usersopo.email_id = operatordetails.email_id;
            Usersopo.phone_no = operatordetails.phone_no;
            Usersopo.password = operatordetails.password;
            Usersopo.role_id = operatordetails.role_id;
            Usersopo.status = operatordetails.status;


            db.users.Add(Usersopo);
            db.SaveChanges();
            IEnumerable<Models.user> result = db.users.Where(m => m.role_id > 1).ToList();
            return result;

        }

        public IEnumerable<user> EditUsersoperator(user operatordetails)
        {
          EBCAdmin.Models.user useropo = db.users.Find(operatordetails.id);

            if(useropo!= null)
            {
                try {
                    //  Models.user editopo = new user();
                    useropo.first_name = operatordetails.first_name;
                    useropo.last_name = operatordetails.last_name;
                    useropo.phone_no = operatordetails.phone_no;
                    useropo.status = operatordetails.status;
                    useropo.password = operatordetails.password;
                    useropo.email_id = operatordetails.email_id;
                    useropo.role_id = operatordetails.role_id;
                   db.Entry(useropo).State = EntityState.Modified;
                   db.SaveChanges();
                  IEnumerable<EBCAdmin.Models.user> result = db.users.Where(m => m.role_id > 1).ToList();
                return result;
                }
                catch(Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return null;   
            }
        }

        public IEnumerable<user> GetUsersoperator()
        {
            IEnumerable<user> Oprator = db.users.Where(m => m.role_id > 1).ToList();

            return Oprator; 
        }

        public NUT_Updates GetNUTUpdates()
        {
            Models.NUT_Updates updatesreturn = new NUT_Updates();
            Models.NUT_Updates result = db.NUT_Updates.Where(m => m.ID == 1).FirstOrDefault();

            if (result == null)
            {
                Models.NUT_Updates record = new NUT_Updates();
                record.ID = 1;
                record.News = null;
                record.Tournaments = null;
                record.Updates = null;

                db.NUT_Updates.Add(record);
                db.SaveChanges();

                Models.NUT_Updates Updates = db.NUT_Updates.Where(m => m.ID == 1).FirstOrDefault();

                updatesreturn.ID = Updates.ID;
                updatesreturn.News = Updates.News;
                updatesreturn.Updates = Updates.Updates;
                updatesreturn.Tournaments = Updates.Tournaments;
                return updatesreturn;

            }
            else
            {
                updatesreturn.ID = result.ID;
                updatesreturn.News = result.News;
                updatesreturn.Updates = result.Updates;
                updatesreturn.Tournaments = result.Tournaments;
                return updatesreturn;
            }
        }

        public NUT_Updates NUTUpdates(NUT_Updates updateNUT)
        {
            EBCAdmin.Models.NUT_Updates NUT = db.NUT_Updates.Find(updateNUT.ID);
            NUT.News = updateNUT.News;
            NUT.Updates = updateNUT.Updates;
            NUT.Tournaments = updateNUT.Tournaments;
            db.Entry(NUT).State = EntityState.Modified;
            db.SaveChanges();

            NUT_Updates NUTUpdates = db.NUT_Updates.Where(N => N.ID == updateNUT.ID).FirstOrDefault();

            return NUTUpdates;
        }

        public userdetails details(userdetails Memberdetails)
        {
            Models.accessory result = db.accessories.Where(m => m.UserId == Memberdetails.id).FirstOrDefault();

            if (result == null)
            {
                accessory record = new accessory();
                record.UserId =Convert.ToInt32(Memberdetails.id);
                record.racket = false;
                record.Tshirt = false;

                db.accessories.Add(record);
                db.SaveChanges();

                Models.accessory acccessory  = db.accessories.Where(m => m.UserId == Memberdetails.id).FirstOrDefault();

                Memberdetails.Id = acccessory.Id;
                Memberdetails.racket = acccessory.racket;
                Memberdetails.Tshirt = acccessory.Tshirt;
                return Memberdetails;

            }
            else
            {
                Memberdetails.Id = result.Id;
                Memberdetails.racket = result.racket;
                Memberdetails.Tshirt = result.Tshirt;

                return Memberdetails;
            }
        }

        public bool cancel(bookingdetails bookingdetails)
        {
            bool retunvalue;
            Models.booking result = db.bookings.Where(m => m.id == bookingdetails.id).OrderByDescending(m=>m.Booking_expdate).FirstOrDefault();

            EmailService mail = new EmailService();
            try
            {
                if(result!= null)
                {
                    Models.Member member = db.Members.Where(m => m.id == result.id).FirstOrDefault();
                    mail.SendMail(member);

                    result.booking_status = "Canceled";
                    db.SaveChanges();
                   

                    
                }
                retunvalue = true;
                return retunvalue;

            }
            catch
            {
                retunvalue= false;

                return retunvalue;
            }

         
        }

        public IEnumerable<bookingdetails> bookedhistorybytype(usertypes usertypes)
        {
            if (usertypes != null)
            {
                if (usertypes.id == 1)
                {
                    IEnumerable<bookingdetails> history = (from bookinghistory in db.bookings
                                                               //join user in db.tblregisters
                                                               //on bookinghistory.user_id equals user.ID
                                                           where bookinghistory.Member_id == 1 || bookinghistory.Member_id == 2
                                                           orderby bookinghistory.Booking_expdate descending
                                                           select new
                                                               EBCAdmin.Classfiles.bookingdetails
                                                           {
                                                               id = bookinghistory.id,
                                                               cour_id = bookinghistory.cour_id,
                                                               slot_id = bookinghistory.slot_id,
                                                               start_time = (from timeing in db.slots where timeing.id == bookinghistory.slot_id select timeing.start_time).FirstOrDefault(),
                                                               booking_date = (bookinghistory.booking_date),
                                                               booking_status = bookinghistory.booking_status,
                                                               user_id = bookinghistory.user_id,
                                                               username = (from resgister in db.Members
                                                                           where resgister.id == bookinghistory.user_id
                                                                           select resgister.Name).FirstOrDefault()

                                                           }).ToList();

                    foreach (bookingdetails time in history.ToList())
                    {

                        time.starttime = DateTime.Today.Add(time.start_time).ToString("h:mm tt");

                    }
                    return history;
                }
                else
                {
                    IEnumerable<bookingdetails> history = (from bookinghistory in db.bookings
                                                               //join user in db.tblregisters
                                                               //on bookinghistory.user_id equals user.ID
                                                           where bookinghistory.Member_id == usertypes.id
                                                           orderby bookinghistory.Booking_expdate descending
                                                           select new
                                                               EBCAdmin.Classfiles.bookingdetails
                                                           {
                                                               id = bookinghistory.id,
                                                               cour_id = bookinghistory.cour_id,
                                                               slot_id = bookinghistory.slot_id,
                                                               start_time = (from timeing in db.slots where timeing.id == bookinghistory.slot_id select timeing.start_time).FirstOrDefault(),
                                                               booking_date = (bookinghistory.booking_date),
                                                               booking_status = bookinghistory.booking_status,
                                                               user_id = bookinghistory.user_id,
                                                               username = (from resgister in db.Members
                                                                           where resgister.id == bookinghistory.user_id
                                                                           select resgister.Name).FirstOrDefault()

                                                           }).ToList();

                    foreach (bookingdetails time in history.ToList())
                    {

                        time.starttime = DateTime.Today.Add(time.start_time).ToString("h:mm tt");

                    }
                    return history;
                }
            }
            else
            {
                IEnumerable<bookingdetails> history = (from bookinghistory in db.bookings
                                                       orderby bookinghistory.Booking_expdate descending
                                                       select new
                                                           EBCAdmin.Classfiles.bookingdetails
                                                       {
                                                           id = bookinghistory.id,
                                                           cour_id = bookinghistory.cour_id,
                                                           slot_id = bookinghistory.slot_id,
                                                           start_time = (from timeing in db.slots where timeing.id == bookinghistory.slot_id select timeing.start_time).FirstOrDefault(),
                                                           booking_date = (bookinghistory.booking_date),
                                                           booking_status = bookinghistory.booking_status,
                                                           user_id = bookinghistory.user_id,
                                                           username = (from resgister in db.tblregisters
                                                                       where resgister.ID == bookinghistory.user_id
                                                                       select resgister.Name).FirstOrDefault()

                                                       }).ToList();

                foreach (bookingdetails time in history.ToList())
                {

                    time.starttime = DateTime.Today.Add(time.start_time).ToString("h:mm tt");

                }
                return history;
            }

           
           
        }

        internal IEnumerable<Members> members()
        {
            IEnumerable<Members> Member = (from memberslist in db.Members where DateTime.Now<=memberslist.expiry_date 
                                                   select new 
                                                       EBCAdmin.Classfiles.Members
                                                   {
                                                      id=memberslist.id,
                                                      Name=memberslist.Name,
                                                      Email=memberslist.Email,
                                                      mobile=memberslist.mobile,
                                                      Address=memberslist.Address,
                                                      member_type=memberslist.member_type,
                                                       expiry_date = memberslist.expiry_date
                                                   }).ToList();
            return Member;
        }

        public IEnumerable<Members> membersfilter(usertypes types)
        {
            if (types != null)
            {
               


                    IEnumerable<Members> Member = (from memberslist in db.Members
                                                   where memberslist.member_type == types.id && DateTime.Now <= memberslist.expiry_date
                                                   select new
                                                       EBCAdmin.Classfiles.Members
                                                   {
                                                       id = memberslist.id,
                                                       Name = memberslist.Name,
                                                       Email = memberslist.Email,
                                                       mobile = memberslist.mobile,
                                                       Address = memberslist.Address,
                                                       member_type = memberslist.member_type,
                                                       expiry_date = memberslist.expiry_date
                                                   }).ToList();
                    return Member;
                
            }
            else
            {
                IEnumerable<Members> Member = (from memberslist in db.Members where  DateTime.Now <= memberslist.expiry_date
                                               select new
                                                   EBCAdmin.Classfiles.Members
                                               {
                                                   id = memberslist.id,
                                                   Name = memberslist.Name,
                                                   Email = memberslist.Email,
                                                   mobile = memberslist.mobile,
                                                   Address = memberslist.Address,
                                                   member_type = memberslist.member_type,
                                                   expiry_date = memberslist.expiry_date
                                               }).ToList();
                return Member;
            }
        }

     

        public IEnumerable<EBCPrice> Price()
        {
            IEnumerable<EBCPrice> result = (from pricelist in db.pricelsts
                                           select new
                                               EBCAdmin.Classfiles.EBCPrice
                                           {
                                               ID=pricelist.ID,
                                               singlem =pricelist.singlem,
                                              mem3m=pricelist.mem3m,
                                              mem6m=pricelist.mem6m,
                                              adultcoaching= pricelist.adultcoaching,
                                              childcoaching = pricelist.childcoaching,
                                              tax=pricelist.tax
                                           }).ToList();
            return result;
        }


        public IEnumerable<EBCPrice> Price(EBCPrice price)
        {
            EBCAdmin.Models.pricelst pricelists = new EBCAdmin.Models.pricelst();
            pricelists.singlem = price.singlem;
            pricelists.mem3m = price.mem3m;
            pricelists.mem6m = price.mem6m;
            pricelists.adultcoaching = price.adultcoaching;
            pricelists.childcoaching = price.childcoaching;
            pricelists.tax = price.tax;
           
            db.pricelsts.Add(pricelists);
            db.SaveChanges();
            IEnumerable<EBCPrice> result = (from pricelist in db.pricelsts
                                            select new
                                                EBCAdmin.Classfiles.EBCPrice
                                            {
                                                ID = pricelist.ID,
                                                singlem = pricelist.singlem,
                                                mem3m = pricelist.mem3m,
                                                mem6m = pricelist.mem6m,
                                                adultcoaching = pricelist.adultcoaching,
                                                childcoaching = pricelist.childcoaching,
                                                tax = pricelist.tax
                                            }).ToList();
            return result;

        }




        public IEnumerable<EBCPrice> EPrice(EBCPrice price)
        {
            EBCAdmin.Models.pricelst pricelists = db.pricelsts.Find(price.ID);
            pricelists.singlem = price.singlem;
            pricelists.mem3m = price.mem3m;
            pricelists.mem6m = price.mem6m;
            pricelists.adultcoaching = price.adultcoaching;
            pricelists.childcoaching = price.childcoaching;
            pricelists.tax = price.tax;
            db.Entry(pricelists).State = EntityState.Modified;
            db.SaveChanges();

            IEnumerable<EBCPrice> result = (from pricelist in db.pricelsts
                                            select new
                                                EBCAdmin.Classfiles.EBCPrice
                                            {
                                                ID = pricelist.ID,
                                                singlem = pricelist.singlem,
                                                mem3m = pricelist.mem3m,
                                                mem6m = pricelist.mem6m,
                                                adultcoaching = pricelist.adultcoaching,
                                                childcoaching = pricelist.childcoaching,
                                                tax = pricelist.tax
                                            }).ToList();
            return result;
            
        }

        public IEnumerable<bookingdetails> OneMembers()
        {
            IEnumerable<bookingdetails> OneMember = (from bookinghistory in db.bookings
                                                   //join user in db.tblregisters
                                                   //on bookinghistory.user_id equals user.ID
                                                   where bookinghistory.Member_id == 1
                                                   select new
                                                       EBCAdmin.Classfiles.bookingdetails
                                                   {
                                                       id = bookinghistory.id,
                                                       cour_id = bookinghistory.cour_id,
                                                       slot_id = bookinghistory.slot_id,
                                                       booking_date = (bookinghistory.booking_date),
                                                       booking_status = bookinghistory.booking_status,
                                                       user_id = bookinghistory.user_id,
                                                       username = (from resgister in db.tblregisters
                                                                   where resgister.ID == bookinghistory.user_id
                                                                   select resgister.Name).FirstOrDefault()

                                                   }).ToList();
         
            return OneMember;
        }
    }
}