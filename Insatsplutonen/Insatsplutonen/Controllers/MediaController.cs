using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Service;
using Insatsplutonen.Model.Media;
using Insatsplutonen.ViewModel;
using Newtonsoft.Json;

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
            return View("Library");
        }

        public JsonResult GetPaginatedMedia(int take, int page, string search, bool ascending, string sortby)
        {
            page = page - 1;
            var totalItems = 0;
            var result = new PaginationResult();
            var mediaList = _service.GetPaginatedMedia(take, page, search, ascending, sortby, out totalItems);

            result.TotalItems = totalItems;
            result.Data = mediaList;
            result.TotalPages = (totalItems % take == 0) ? totalItems / take : totalItems / take + 1;

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCategories()
        {
            var categoryList = _service.GetCategories();
            return Json(categoryList, JsonRequestBehavior.AllowGet);
        }

        public void UpdateMediaCategory(string mediaList, int categoryId)
        {
            var media = JsonConvert.DeserializeObject<List<Media>>(mediaList);
            foreach (var updatedMedia in media.Select(item => _service.GetMedia().SingleOrDefault(m => m.Id == item.Id)).Where(updatedMedia => updatedMedia != null))
            {
                updatedMedia.MediaCategoryId = categoryId;
                _service.UpdateMedia(updatedMedia);
            }
            _service.SaveChanges();
        }

    }
}
