using System.Collections.Generic;
using Insatsplutonen.Model.Blog;
using Insatsplutonen.Model.Media;

namespace Insatsplutonen.Data.Interface
{
    public interface IMediaService
    {
        List<Media> GetMedia();
    }
}
