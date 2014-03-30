using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Insatsplutonen.Model.Blog
{
    public class Article
    {
        public Article()
        {
            this.Pictures = new List<Image>();
        }

        [Key]
        public int NewsId { get; set; }

        public string Header { get; set; }
        public string News { get; set; }
        public string Author { get; set; }
        public string Picture { get; set; }
        public DateTime NewsDate { get; set; }

        public List<Image> Pictures { get; set; }

        public string TrimNews()
        {
            var result = News.Replace("<br />", string.Empty);
            result = result.Replace("<br/>", string.Empty);
            result = result.Replace("\\r", " ").Replace("\\n", " ");
            result = result.Replace(Environment.NewLine, string.Empty);

            if (result.Length <= 370)
                return result.Substring(0, result.Length);

            return result.Trim().Substring(0, 370);
        }

        public string PostTrimNews()
        {
            var result = News.Replace("<br />", Environment.NewLine);
            result = result.Replace("<br/>", Environment.NewLine);
            result = result.Replace("\\r", " ").Replace("\\n", " ");

            return result;
        }

    }
}