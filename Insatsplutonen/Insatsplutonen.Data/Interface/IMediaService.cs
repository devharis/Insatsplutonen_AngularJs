using System.Collections.Generic;
using Insatsplutonen.Model.Blog;
using Insatsplutonen.Model.Media;

namespace Insatsplutonen.Data.Interface
{
    public interface IMediaService
    {
        List<Media> GetMedia();
        List<Media> GetPaginatedMedia(int take, int page, string search, bool ascending, string sortby, out int totalItems);
        List<MediaCategory> GetCategories();
        void SaveChanges();
        void UpdateMedia(Media media);
        void AddCategory(MediaCategory media);
        void AddMedia(Media media);
        void DeleteCategory(int id);
        void DeleteMedia(Media media);
    }
}
