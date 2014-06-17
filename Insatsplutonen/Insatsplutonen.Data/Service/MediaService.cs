using System.Collections.Generic;
using System.Linq;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Repository;
using Insatsplutonen.Model.Blog;
using Insatsplutonen.Model.Media;

namespace Insatsplutonen.Data.Service
{
    public class MediaService : IMediaService
    {
        private IRepository _repository;

        public MediaService()
            : this(new InsatsRepository())
        {
            // Empty!
        }

        public MediaService(IRepository repository)
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

        public void AddMedia(Media media)
        {
            _repository.Add(media);
        }

        public void AddCategory(MediaCategory category)
        {
            _repository.Add(category);
        }

        public void DeleteCategory(int id)
        {
            var category = this._repository.Query<MediaCategory>().SingleOrDefault(o => o.Id == id);
            _repository.Delete(category);
        }

        public void DeleteMedia(Media media)
        {
            _repository.Delete(media);
        }

        public List<Media> GetMediaByCategory(int id)
        {
            if (id == -1)
                return this._repository.Query<Media>().OrderByDescending(o => o.Created).Take(5).ToList();

            if (id == 0)
                return this._repository.Query<Media>().ToList();
            return this._repository.Query<Media>().Where(o => o.MediaCategoryId == id).ToList();
        }


        public void SaveChanges()
        {
            this._repository.Save();
        }

    }
}