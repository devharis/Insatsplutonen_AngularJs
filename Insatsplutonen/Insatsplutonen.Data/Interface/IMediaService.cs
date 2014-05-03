using System.Collections.Generic;
using Insatsplutonen.Model.Blog;

namespace Insatsplutonen.Data.Interface
{
    public interface IMediaService
    {
        List<PostMedia> GetMedia();
    }
}
