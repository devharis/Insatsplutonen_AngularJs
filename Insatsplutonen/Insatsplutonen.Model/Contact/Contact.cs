using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insatsplutonen.Model.Contact
{
    public class Contact
    {
        [Required]
        [Display(Name = "namn")]
        public String Name { get; set; }
        [Required]
        [Display(Name = "email")]
        public String Email { get; set; }
        [Required]
        [Display(Name = "ämne")]
        public String Subject { get; set; }
        [Required]
        [Display(Name = "meddelande")]
        public String Text { get; set; }
    }
}
