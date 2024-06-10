using CostHead_WebApi.Data;
using CostHead_WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Win32;

namespace Costhead_master_web.Controllers
{

    public class CostHeadController1 : Controller
    {
        private readonly IConfiguration _configuration;
        public CostHeadController1(IConfiguration configuration)
        {

            _configuration = configuration;

        }

        public IActionResult Login()
        {
            return View();
        }
        [HttpGet]
        public IActionResult RegistrationPage()
        {
            return View();

        }
        //public IActionResult ListPage(string mode="Listpage")
        //{
        //    ViewBag.Mode = mode; 

        //    return View();
        //}
        public IActionResult ListPage()
        {
            var baseurl = _configuration["Appsettings:BaseUrl"];
            ViewBag.hostname = baseurl;

            return View();
        }
        public IActionResult Add()
        {
            return View();
        }

       
    }
}
