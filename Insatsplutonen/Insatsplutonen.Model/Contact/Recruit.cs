using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insatsplutonen.Model.Contact
{
    public class Recruit
    {
        [Required]
        [Display(Name = "namn")]
        public String Name { get; set; }
        [Required]
        [Display(Name = "persnr")]
        public String SocialNumb { get; set; }
        [Required]
        [Display(Name = "email")]
        public String Email { get; set; }
        [Required]
        [Display(Name = "ort")]
        public String Place { get; set; }
        [Required]
        [Display(Name = "tele")]
        public String Phone { get; set; }
        [Required]
        [Display(Name = "befattning")]
        public String Post { get; set; }
        [Required]
        [Display(Name = "regemente")]
        public String Regiment { get; set; }

        [Display(Name = "övrigt")]
        public String Other { get; set; }
    }
}
