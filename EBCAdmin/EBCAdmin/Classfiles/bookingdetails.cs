using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EBCAdmin.Classfiles
{
    public class bookingdetails
    {
        public long id { get; set; }
        public long user_id { get; set; }
        public long cour_id { get; set; }
        public long slot_id { get; set; }
        public System.DateTime booking_date { get; set; }
        public string booking_status { get; set; }
        public decimal booking_price { get; set; }
        public System.DateTime Booking_expdate { get; set; }
        public Nullable<int> UserType { get; set; }
        public string username { get; set; }

        public System.TimeSpan start_time { get; set; }

      //  public string start_time { get; set; }

        public string starttime { get; set; }
    }
}


