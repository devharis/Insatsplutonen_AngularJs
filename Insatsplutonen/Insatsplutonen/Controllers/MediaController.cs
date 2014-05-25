using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Service;
using Insatsplutonen.Model.Helpers;
using Insatsplutonen.Model.Media;
using Insatsplutonen.ViewModel;
using Newtonsoft.Json;

namespace Insatsplutonen.Controllers
{
    public class MediaController : Controller
    {
        private readonly IMediaService _service;
        private readonly IBlogService _blogService = new BlogService();

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
            //var hej = _blogService.GetPostMedia();

            //foreach (var item in hej)
            //{
            //    _service.AddMediaa(new Media
            //    {
            //        Title = item.Title,
            //        Author = "Haris Kljajic",
            //        Created = DateTime.Now,
            //        Description = item.Description,
            //        File = item.File,
            //        MediaCategoryId = 1
            //    });
            //    _service.SaveChanges();
            //}

            return View("Library");
        }

        [HttpGet]
        public JsonResult GetMedia(int id)
        {
            return Json(_service.GetMedia().SingleOrDefault(o => o.Id == id), JsonRequestBehavior.AllowGet);
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

        public JsonResult GetMonths()
        {
            var monthList = _service.GetMedia().Select(o => o.Created).ToList();

            var newMonthList = new List<DateTime>();
            foreach (var item in monthList)
            {
                if (newMonthList.Count == 0)
                    newMonthList.Add(item.Value);
                else
                {
                    foreach (var newItem in newMonthList)
                        if (item.Value.Month != newItem.Month)
                            newMonthList.Add(item.Value);
                }
            }

            return Json(newMonthList, JsonRequestBehavior.AllowGet);
        }

        [HttpPut]
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

        [HttpPost]
        public void AddCategory(string category)
        {
            var media = JsonConvert.DeserializeObject<MediaCategory>(category);
            media.Created = DateTime.Now;
            _service.AddCategory(media);
            _service.SaveChanges();
        }

        [HttpDelete]
        public void DeleteCategory(int id)
        {
            _service.DeleteCategory(id);
            _service.SaveChanges();
        }

        [HttpPost]
        public JsonResult SaveImage(HttpPostedFileBase file)
        {
            try
            {
                if (file.ContentLength > 0)
                {
                    var imageHandler = new ImageHandler();
                    var image = imageHandler.SaveImage(file, file.FileName.ToLower());

                    _service.AddMedia(new Media
                    {
                        File = image,
                        Author = "Haris Kljajic",
                        Created = DateTime.Now,
                        Description = "",
                        Title = "",
                        MediaCategoryId = 1
                    });

                    _service.SaveChanges();

                    return Json(_service.GetMedia().Find(o => o.File == image), JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
            return Json("Error occured", JsonRequestBehavior.AllowGet);
        }

        [HttpPut]
        public void UpdateMediaList(string mediaList)
        {
            var media = JsonConvert.DeserializeObject<List<Media>>(mediaList);
            foreach (var updatedMedia in media)
            {
                _service.UpdateMedia(updatedMedia);
            }
            _service.SaveChanges();
        }

        [HttpDelete]
        public void DeleteMedia(int id)
        {
            var imageHandler = new ImageHandler();
            var media = _service.GetMedia().SingleOrDefault(o => o.Id == id);
            if (media != null)
            {
                try
                {
                    imageHandler.DeleteImage(media.File);
                    _service.DeleteMedia(media);

                    _service.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        [HttpPut]
        public void UpdateMedia(string media)
        {
            var updatedMedia = JsonConvert.DeserializeObject<Media>(media);
             _service.UpdateMedia(updatedMedia);

            _service.SaveChanges();
        }
        
        [HttpGet]
        public JsonResult GetMediaByCategory(int id)
        {
            var mediaList = _service.GetMediaByCategory(id);

            return Json(mediaList, JsonRequestBehavior.AllowGet);
        }

    }
}
