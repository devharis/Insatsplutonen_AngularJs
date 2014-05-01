using System.Collections.Generic;
using Insatsplutonen.Model.Blog;

namespace Insatsplutonen.Data.Interface
{
  public interface IBlogService
  {
    List<Post> GetPosts();
    Post GetPost(int id);
    void UpdatePost(Post article);
  }
}