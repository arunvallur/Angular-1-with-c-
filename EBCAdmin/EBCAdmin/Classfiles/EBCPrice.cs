using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EBCAdmin.Classfiles
{
    public class EBCPrice
    {
        public int ID { get; set; }
        public Nullable<decimal> mem3m { get; set; }
        public Nullable<decimal> mem6m { get; set; }
        public Nullable<decimal> singlem { get; set; }
        public Nullable<decimal> tax { get; set; }

        public Nullable<decimal> adultcoaching { get; set; }
        public Nullable<decimal> childcoaching { get; set; }
        public int Type { get; set; }
    }
}