using System;
using System.Collections.Generic;
using System.Linq;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Repository;
using Insatsplutonen.Model.Blog;

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
    }
}