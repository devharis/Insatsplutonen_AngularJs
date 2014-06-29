using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using Insatsplutonen.Data.Interface;
using Insatsplutonen.Data.Service;
using Insatsplutonen.Model.Contact;

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

        public ActionResult Contact()
        {
            return View("Contact");
        }

        [HttpPost]
        public ActionResult Contact(Contact emailModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var msg = new MailMessage { From = new MailAddress("no-reply@insatsplutonen.devharis.com", "Kontaktformulär") };
                    msg.To.Add("haris.kljajic@hotmail.se");
                    msg.Subject = emailModel.Subject;
                    var body = "Name: " + emailModel.Name + "\n"
                                + "Email: " + emailModel.Email + "\n\n"
                                + emailModel.Text;

                    msg.Body = body;
                    msg.IsBodyHtml = false;

                    var smtp = new SmtpClient("smtp.live.com")
                    {
                        Port = 587,
                        UseDefaultCredentials = false,
                        Credentials = new System.Net.NetworkCredential("haris.kljajic@hotmail.se", "wzcevd1"),
                        EnableSsl = true
                    };
                    smtp.Send(msg);
                    msg.Dispose();

                    return View();
                }
                catch (Exception ex)
                {
                }
            }
            return View();
        }

        public ActionResult Recruit()
        {
            var model = new Recruit();
            return View("Recruit", model);
        }

        [HttpPost]
        public ActionResult Recruit(Recruit emailModel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var msg = new MailMessage
                    {
                        From = new MailAddress("no-reply@insatsplutonen.devharis.com", "Kontaktformulär")
                    };
                    msg.To.Add("haris.kljajic@hotmail.se");
                    msg.Subject = "Ny rekryt";
                    var body = "Name: " + emailModel.Name + "\n"
                               + "Persnr: " + emailModel.SocialNumb + "\n"
                               + "Email: " + emailModel.Email + "\n"
                               + "Ort: " + emailModel.Place + "\n"
                               + "Tele: " + emailModel.Phone + "\n"
                               + "Befattning: " + emailModel.Post + "\n"
                               + "Regemente: " + emailModel.Regiment + "\n\n"
                               + "Övrigt: \n" + emailModel.Other;

                    msg.Body = body;
                    msg.IsBodyHtml = false;

                    var smtp = new SmtpClient("smtp.live.com")
                    {
                        Port = 587,
                        UseDefaultCredentials = false,
                        Credentials = new System.Net.NetworkCredential("haris.kljajic@hotmail.se", "wzcevd1"),
                        EnableSsl = true
                    };
                    smtp.Send(msg);
                    msg.Dispose();

                    return View();
                }
                catch (Exception ex)
                {
                }
            }
            return View();
        }

        public ActionResult About()
        {
            return View("About");
        }

    }
}
