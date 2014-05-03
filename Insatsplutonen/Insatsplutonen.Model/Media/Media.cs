using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Insatsplutonen.Model.Media
{
    public class Media
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //[Required(ErrorMessage = "Title must be given.")]
        [MaxLength(250, ErrorMessage = "Title can't exceeded 250 characters in length.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "File must be given.")]
        [MaxLength(Int32.MaxValue, ErrorMessage = "File exceeded max characters in length.")]
        public string File { get; set; }

        [MaxLength(250, ErrorMessage = "Description can't exceeded 250 characters in length.")]
        public string Description { get; set; }

        //[Required(ErrorMessage = "Author must be given.")]
        [MaxLength(50, ErrorMessage = "Author can't exceeded 50 characters in length.")]
        public string Author { get; set; }

        //[Required(ErrorMessage = "Created date must be given.")]
        public DateTime? Created { get; set; }

        public DateTime? Changed { get; set; }

        public int CategoryId { get; set; }

    }
}
