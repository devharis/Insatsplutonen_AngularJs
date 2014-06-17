using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Service;

namespace Insatsplutonen.Controllers
{
    public class HomeController : Controller
    {
        private readonly IBlogService _service;

        public HomeController()
            : this(new BlogService())
        {

        }

        public HomeController(IBlogService service)
        {
            this._service = service;
        }

        public ActionResult Start()
        {
            var postList = _service.GetPosts().OrderByDescending(o => o.Created).Take(4).ToList();
            return View("Start", postList);
        }

    }
}
