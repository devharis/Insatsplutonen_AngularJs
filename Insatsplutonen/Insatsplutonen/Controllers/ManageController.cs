using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Service;
using Insatsplutonen.Model.Blog;
using Insatsplutonen.ViewModel;
using Newtonsoft.Json;

namespace Insatsplutonen.Controllers
{
    public class ManageController : Controller
    {
        //
        // GET: /ManagePosts/

       private readonly IBlogService _service;

        public ManageController()
            : this(new BlogService())
        {

        }

        public ManageController(IBlogService service)
        {
            this._service = service;
        }

        public ActionResult Posts()
        {
            return View("Posts");
        }

        public JsonResult GetPaginatedPosts(int take, int page, string search, bool ascending, string sortby)
        {
            page = page - 1;

            var result = new PaginationResult();
            var postList = _service.GetPosts().Where(
                    c => c.Title.ToLower().Contains(search.ToLower())
                    || c.Content.ToLower().Contains(search.ToLower())
                    || c.Author.ToLower().Contains(search.ToLower())
                    || c.Created.ToString(CultureInfo.InvariantCulture).ToLower().Contains(search.ToLower()
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
            result.Data = postList.Skip(page * take).Take(take).ToList();
            result.TotalPages = (result.TotalItems % take == 0) ? result.TotalItems / take : result.TotalItems / take + 1;

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPost(int id)
        {
            var result = _service.GetPost(id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult UpdatePost(string postJson)
        {
            var userMessage = "";
            var post = JsonConvert.DeserializeObject<Post>(postJson);

            try
            {
                if (ModelState.IsValid)
                {
                    _service.UpdatePost(post);
                    userMessage = "Nyheten är uppdaterad.";
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Fel inträffade: " + ex.Message);
            }

            return Json(userMessage, JsonRequestBehavior.AllowGet);
        }

    }
}
