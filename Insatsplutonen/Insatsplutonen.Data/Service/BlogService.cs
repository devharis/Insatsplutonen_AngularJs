using System;
using System.Collections.Generic;
using System.Linq;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Repository;
using Insatsplutonen.Model.Blog;
using Insatsplutonen.Model.Interface;

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

        public Article GetNews(int id)
        {
            var news = this._repository.Find<Article>(o => o.NewsId == id);
            news.Pictures = this._repository.Query<Image>().Where(o => o.NewsId == news.NewsId).ToList();
            return news;
        }

        public List<Image> GetRandomImages()
        {
            return this._repository.Query<Image>().OrderBy(r => Guid.NewGuid()).Take(9).ToList();
        }

        public List<Article> GetRandomNews()
        {
            return this._repository.Query<Article>().OrderBy(r => Guid.NewGuid()).Take(4).ToList();
        }

        public List<Article> GetAllNews()
        {
            return this._repository.Query<Article>().ToList();
        }
        public List<Article> GetLatestNews()
        {
            return this._repository.Query<Article>().OrderByDescending(o => o.NewsDate).Take(4).ToList();
        }
    }
}