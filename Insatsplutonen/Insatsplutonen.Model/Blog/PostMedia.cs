using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insatsplutonen.Model.Blog
{
    public class PostMedia
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "A title must be given.")]
        [MaxLength(50, ErrorMessage = "Title can't exceeded 50 characters in length.")]
        public string Title { get; set; }

        [MaxLength(Int32.MaxValue, ErrorMessage = "Url can't exceeded max characters in length.")]
        public string Url { get; set; }

        [MaxLength(250, ErrorMessage = "Description can't exceeded 250 characters in length.")]
        public string Description { get; set; }

        public int PostId { get; set; }
    }
}
