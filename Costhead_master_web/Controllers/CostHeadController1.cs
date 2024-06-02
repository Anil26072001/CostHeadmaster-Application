using CostHead_WebApi.Data;
using CostHead_WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;

namespace Costhead_master_web.Controllers
{

    public class CostHeadController1 : Controller
    {
        ////private object _configuration;
        //// private object _login;
        // private readonly ApplicationDBContext _context;

        //public CostHeadController1(IConfiguration configuration, ApplicationDBContext context)
        //{

        //    // _configuration = configuration;
        //    _context = context;
        //}

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
           

            return View();
        }
        public IActionResult Add()
        {
            return View();
        }

       
    }
}
