using System.Collections.Generic;
using System.Linq;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Repository;
using Insatsplutonen.Model.Blog;
using Insatsplutonen.Model.Media;

namespace Insatsplutonen.Data.Service
{
    public class BlogService : IBlogService
    {
        private IRepository _repository;

        public BlogService()
            : this(new InsatsRepository())
        {
            // Empty!
        }

        public BlogService(IRepository repository)
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
            foreach (var item in article.MediaList)
                this._repository.Update(item);
            this._repository.Save();
        }

        public List<PostMedia> GetPostMedia()
        {
            return this._repository.Query<PostMedia>().ToList();
        }

        public void AddMediaListForPost(List<PostMedia> mediaList, int postId)
        {
            var post = this._repository.Query<Post>().SingleOrDefault(o => o.Id == postId);
            if (post != null)
            {
                post.MediaList = this._repository.Query<PostMedia>().Where(o => o.PostId == post.Id).ToList();

                foreach (var item in mediaList)
                {
                    var media = this._repository.Query<Media>().SingleOrDefault(o => o.Id == item.Id);
                    if (media != null)
                        post.MediaList.Add(new PostMedia
                        {
                            File = media.File,
                            Title = media.Title,
                            Description = media.Description,
                            PostId = postId
                        });
                }
            }

            this._repository.Save();
        }

        public void AddMediaForPost(PostMedia media, int postId)
        {
            var post = this._repository.Query<Post>().SingleOrDefault(o => o.Id == postId);
            if (post != null)
            {
                var newMedia = this._repository.Query<Media>().SingleOrDefault(o => o.Id == media.Id);
                if (newMedia != null)
                {
                    post.Media = newMedia.File;
                    post.MediaId = newMedia.Id;
                }
            }
            this._repository.Save();
        }

        public void DeleteMediaForPost(int postId)
        {
            var post = this._repository.Query<Post>().SingleOrDefault(o => o.Id == postId);
            if (post != null)
            {
                post.Media = null;
                post.MediaId = null;
            }
            this._repository.Save();
        }

        public void DeleteMediaListForPost(int mediaId, int postId)
        {
            var post = this._repository.Query<Post>().SingleOrDefault(o => o.Id == postId);
            if (post != null)
            {
                post.MediaList = this._repository.Query<PostMedia>().Where(o => o.PostId == post.Id).ToList();
                this._repository.Delete(post.MediaList.SingleOrDefault(o => o.Id == mediaId));
            }
            this._repository.Save();
        }

        public void Create(Post post)
        {
            this._repository.Add(post);
            foreach (var item in post.MediaList)
                this._repository.Add(item);
            this._repository.Save();
        }

        public void DeletePost(int postId)
        {
            var post = this._repository.Query<Post>().SingleOrDefault(o => o.Id == postId);
            if (post != null)
            {
                var mediaList = this._repository.Query<PostMedia>().Where(o => o.PostId == post.Id).ToList();
                foreach (var item in mediaList)
                    this._repository.Delete(item);
                this._repository.Delete(post);
            }
            this._repository.Save();
        }
    }
}