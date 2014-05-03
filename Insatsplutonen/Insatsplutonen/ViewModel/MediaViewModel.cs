using System.Collections.Generic;
using Insatsplutonen.Model.Blog;

namespace Insatsplutonen.ViewModel
{
    public class MediaViewModel
    {
        public MediaViewModel()
        {
            ImageList = new List<PostMedia>();
            VideoList = new List<PostMedia>();
        }

        public MediaViewModel(List<PostMedia> images, List<PostMedia> videos)
        {
            ImageList = images;
            VideoList = videos;
        }

        public List<PostMedia> ImageList { get; set; }
        public List<PostMedia> VideoList { get; set; }
    }
}