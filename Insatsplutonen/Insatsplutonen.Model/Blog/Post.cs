using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Text.RegularExpressions;

namespace Insatsplutonen.Model.Blog
{
    public class Post
    {
        public Post()
        {
            this.MediaList = new List<PostMedia>();
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title must be given.")]
        [MaxLength(250, ErrorMessage = "Title can't exceeded 250 characters in length.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Content must be given.")]
        [MaxLength(Int32.MaxValue, ErrorMessage = "Content can't exceeded max characters in length.")]
        public string Content { get; set; }

        [Required(ErrorMessage = "Author must be given.")]
        [MaxLength(50, ErrorMessage = "Author can't exceeded 50 characters in length.")]
        public string Author { get; set; }
        
        public string Media { get; set; }
        public int? MediaId { get; set; }

        [Required(ErrorMessage = "Created date must be given.")]
        public DateTime Created { get; set; }
        
        public DateTime? Changed { get; set; }
        
        public bool? Published { get; set; }

        public List<PostMedia> MediaList { get; set; }

        public string ShowMedia()
        {
            if (!string.IsNullOrEmpty(Media))
                return "/images/blog/thumbs/" + Media;
            return "http://placehold.it/350x265";
        }

        public string ShowContent()
        {
            Content = Regex.Replace(Content, @"<[^>]*>", String.Empty);

            if (Content.Length < 150)
                return Content + "...";
            return Content.Substring(0, 200)+ "...";
        }
    }
}