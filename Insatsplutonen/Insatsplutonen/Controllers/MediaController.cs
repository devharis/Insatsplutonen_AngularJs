using System.Linq;
using System.Web.Mvc;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Service;
using Insatsplutonen.ViewModel;

namespace Insatsplutonen.Controllers
{
    public class MediaController : Controller
    {
        private readonly IMediaService _service;

        public MediaController()
            : this(new MediaService())
        {

        }

        public MediaController(IMediaService service)
        {
            this._service = service;
        }

        public ActionResult Library()
        {
            return View("Dashboard");
        }


        public JsonResult GetPaginatedMedia(int take, int page, string search, bool ascending, string sortby)
        {
            page = page - 1;

            var result = new PaginationResult();
            var postList = _service.GetMedia().Where(
                    c => c.Title.ToLower().Contains(search.ToLower())
                    || c.File.ToLower().Contains(search.ToLower())
                    || c.Author.ToLower().Contains(search.ToLower())
                    || c.Created.ToString().ToLower().Contains(search.ToLower()
                )).ToList();

            if (!ascending)
                postList = postList.OrderByDescending(o => o.Id).ToList();

            if (sortby == "title" || sortby == "date")
            {
                if (sortby == "title")
                    postList = postList.OrderBy(o => o.Title).ToList();
                if (sortby == "date")
                    postList = postList.OrderBy(o => o.Created).ToList();
            }

            result.TotalItems = postList.Count;
            result.Posts = postList.Skip(page * take).Take(take).ToList();
            result.TotalPages = (result.TotalItems % take == 0) ? result.TotalItems / take : result.TotalItems / take + 1;

            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
