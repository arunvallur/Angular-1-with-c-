//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EBCAdmin.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class booking
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public booking()
        {
            this.Wallets = new HashSet<Wallet>();
        }
    
        public long id { get; set; }
        public long user_id { get; set; }
        public long cour_id { get; set; }
        public long slot_id { get; set; }
        public System.DateTime booking_date { get; set; }
        public string booking_status { get; set; }
        public decimal booking_price { get; set; }
        public System.DateTime Booking_expdate { get; set; }
        public string BookingNumber { get; set; }
        public Nullable<int> Member_id { get; set; }
    
        public virtual court court { get; set; }
        public virtual Member Member { get; set; }
        public virtual slot slot { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Wallet> Wallets { get; set; }
    }
}