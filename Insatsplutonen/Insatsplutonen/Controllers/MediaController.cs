using System;
using System.Linq;
using System.Web.Mvc;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Service;
using Insatsplutonen.ViewModel;
using Microsoft.Ajax.Utilities;

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

        //
        // GET: /Media/

        public ActionResult Dashboard()
        {
            var mediaList = _service.GetMedia();

            var mediaViewModel = new MediaViewModel(mediaList.Where(o => o.Url.IsNullOrWhiteSpace()).ToList(), mediaList.Where(o => !o.Url.IsNullOrWhiteSpace()).ToList());
            return View("Dashboard", mediaViewModel);
        }

    }
}
