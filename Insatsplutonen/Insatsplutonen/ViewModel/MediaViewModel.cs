using System.Collections.Generic;
using Insatsplutonen.Model.Blog;

namespace Insatsplutonen.ViewModel
{
    public class MediaViewModel
    {
        public MediaViewModel()
        {
            ImageList = new List<Media>();
            VideoList = new List<Media>();
        }

        public MediaViewModel(List<Media> images, List<Media> videos)
        {
            ImageList = images;
            VideoList = videos;
        }

        public List<Media> ImageList { get; set; }
        public List<Media> VideoList { get; set; }
    }
}