using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EBCAdmin.Classfiles
{
    public class users
    {
        public long id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email_id { get; set; }
        public Nullable<long> phone_no { get; set; }
        public long role_id { get; set; }
        public string password { get; set; }
        public bool status { get; set; }
        public string Roles { get; set; }

        //public class Role
        //{

        //    public long id { get; set; }
        //    public string name { get; set; }
        //}
    }
}