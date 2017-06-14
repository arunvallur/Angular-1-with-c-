using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EBCAdmin.Classfiles
{
    public class updatedetails
    {
        public long id { get; set; }
        public string member_type { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string mobile { get; set; }
        public string Email { get; set; }
        public Nullable<System.DateTime> expiry_date { get; set; }
        public Nullable<System.DateTime> reg_Date { get; set; }
        public string Address { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public string MEstatus { get; set; }
        public Nullable<int> Slot { get; set; }
        public Nullable<int> Court { get; set; }
        public string MemberNumber { get; set; }
        public Nullable<int> Usertype { get; set; }

        public int Id { get; set; }
        public Nullable<bool> Tshirt { get; set; }
        public Nullable<bool> racket { get; set; }
        public Nullable<int> UserId { get; set; }

    }
}