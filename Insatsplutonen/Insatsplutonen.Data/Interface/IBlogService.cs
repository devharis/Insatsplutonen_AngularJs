using System.Collections.Generic;
using Insatsplutonen.Model.Blog;

namespace Insatsplutonen.Data.Interface
{
    public interface IBlogService
    {
        List<Post> GetPosts();
        Post GetPost(int id);
        void UpdatePost(Post article);
        List<PostMedia> GetPostMedia();
        void AddMediaListForPost(List<PostMedia> mediaList, int postId);
        void AddMediaForPost(PostMedia mediaList, int postId);
        void DeleteMediaForPost(int postId);
        void DeleteMediaListForPost(int media, int postId);
        void Create(Post post);
        void DeletePost(int postId);
    }
}