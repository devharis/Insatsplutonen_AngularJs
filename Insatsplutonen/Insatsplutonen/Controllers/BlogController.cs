using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Insatsplutonen.Data.Service;
using Insatsplutonen.Model.Interface;
using Insatsplutonen.ViewModel;

namespace Insatsplutonen.Controllers
{
    public class BlogController : Controller
    {
        private readonly IBlogService _service;

        public BlogController()
            : this(new BlogService())
        {

        }

        public BlogController(IBlogService service)
        {
            this._service = service;
        }

        public ActionResult Articles()
        {
            var articleList = _service.GetAllNews().ToList();
            return View(articleList);
        }

        public JsonResult GetPaginatedArticles(int take, int page, string search, bool ascending, string sortby)
        {
            page = page - 1;

            var result = new PaginationResult();
            var articleList = _service.GetAllNews().Where(
                    c => c.Header.ToLower().Contains(search.ToLower())
                    || c.News.ToLower().Contains(search.ToLower())
                    || c.Author.ToLower().Contains(search.ToLower())
                    || c.NewsDate.ToString(CultureInfo.InvariantCulture).ToLower().Contains(search.ToLower()
                )).ToList();

            if (!ascending)
                articleList = articleList.OrderByDescending(o => o.NewsId).ToList();

            if (sortby == "title" || sortby == "date")
            {
                if (sortby == "title")
                    articleList = articleList.OrderBy(o => o.Header).ToList();
                if (sortby == "date")
                    articleList = articleList.OrderBy(o => o.NewsDate).ToList();
            }
             
            result.TotalItems = articleList.Count;
            result.Articles = articleList.Skip(page*take).Take(take).ToList();
            result.TotalPages = (result.TotalItems%take == 0) ? result.TotalItems/take : result.TotalItems/take + 1;

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetArticle(int articleId)
        {
            var result = _service.GetNews(articleId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
