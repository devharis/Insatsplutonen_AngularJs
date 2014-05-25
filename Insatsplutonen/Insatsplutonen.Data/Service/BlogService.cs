using System;
using System.Collections.Generic;
using System.Linq;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Repository;
using Insatsplutonen.Model.Blog;

namespace Insatsplutonen.Data.Service
{
    public class BlogService : IBlogService
    {
        private IBlogRepository _repository;

        public BlogService()
            : this(new BlogRepository())
        {
            // Empty!
        }

        public BlogService(IBlogRepository repository)
        {
            this._repository = repository;
        }

        public List<Post> GetPosts()
        {
            return this._repository.Query<Post>().ToList();
        }

        public Post GetPost(int id)
        {
            var post = this._repository.Find<Post>(o => o.Id == id);
            post.MediaList = this._repository.Query<PostMedia>().Where(o => o.PostId == post.Id).ToList();
            return post;
        }

        public void UpdatePost(Post article)
        {
            this._repository.Update(article);
            foreach(var item in article.MediaList)
                this._repository.Update(item);
            this._repository.Save();
        }

        public List<PostMedia> GetPostMedia()
        {
            return this._repository.Query<PostMedia>().ToList();
        }
    }
}