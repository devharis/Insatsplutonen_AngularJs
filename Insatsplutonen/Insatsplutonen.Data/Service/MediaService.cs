using System.Collections.Generic;
using System.Linq;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Repository;
using Insatsplutonen.Model.Media;

namespace Insatsplutonen.Data.Service
{
    public class MediaService : IMediaService
    {
        private IBlogRepository _repository;

        public MediaService()
            : this(new BlogRepository())
        {
            // Empty!
        }

        public MediaService(IBlogRepository repository)
        {
            this._repository = repository;
        }

        public List<Media> GetMedia()
        {
            return this._repository.Query<Media>().ToList();
        }

        public List<Media> GetPaginatedMedia(int take, int page, string search, bool ascending, string sortby, out int totalItems)
        {
            var mediaList = this._repository.Query<Media>().ToList();

            if (search != "")
            {
                mediaList = mediaList.Where(
                    c => c.File.ToLower().Contains(search.ToLower())
                    || c.MediaCategory.Title.ToLower().Contains(search.ToLower())
                    || c.Author.ToLower().Contains(search.ToLower())
                    //|| c.Created.Value.ToShortDateString().ToLower().Contains(search.ToLower())
                    ).ToList();
            }

            if (!ascending)
                mediaList = mediaList.OrderByDescending(o => o.Id).ToList();

            if (sortby == "title" || sortby == "date")
            {
                if (sortby == "title")
                    mediaList = mediaList.OrderBy(o => o.Title).ToList();
                if (sortby == "date")
                    mediaList = mediaList.OrderBy(o => o.Created).ToList();
            }

            totalItems = mediaList.Count;

            mediaList = mediaList.Skip(page * take).Take(take).ToList();

            return mediaList;
        }

        public List<MediaCategory> GetCategories()
        {
            return this._repository.Query<MediaCategory>().ToList();
        }

        public void UpdateMedia(Media media)
        {
            _repository.Update(media);
        }

        public void SaveChanges()
        {
            this._repository.Save();
        }

    }
}