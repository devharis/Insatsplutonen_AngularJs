using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Insatsplutonen.Model.Blog
{
    public class PostMedia
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //[Required(ErrorMessage = "A title must be given.")]
        [MaxLength(50, ErrorMessage = "Title can't exceeded 50 characters in length.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "File must be given.")]
        [MaxLength(Int32.MaxValue, ErrorMessage = "File can't exceeded max characters in length.")]
        public string File { get; set; }

        [MaxLength(250, ErrorMessage = "Description can't exceeded 250 characters in length.")]
        public string Description { get; set; }

        public int PostId { get; set; }
    }
}
