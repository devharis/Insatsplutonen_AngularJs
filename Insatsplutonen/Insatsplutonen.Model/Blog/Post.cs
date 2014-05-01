using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Insatsplutonen.Model.Blog
{
    public class Post
    {
        public Post()
        {
            this.MediaList = new List<Media>();
        }

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public string Media { get; set; }
        public DateTime Date { get; set; }

        public List<Media> MediaList { get; set; }

    }
}