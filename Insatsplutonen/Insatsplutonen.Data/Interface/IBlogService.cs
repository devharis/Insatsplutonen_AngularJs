using System.Collections.Generic;
using Insatsplutonen.Model.Blog;

namespace Insatsplutonen.Model.Interface
{
  public interface IBlogService
  {
    List<Article> GetAllNews();
    Article GetNews(int id);
    List<Image> GetRandomImages();
    List<Article> GetRandomNews();
    List<Article> GetLatestNews();
  }
}