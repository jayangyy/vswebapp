using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        private List<Persons> pers;
        public HomeController()
        {
            pers = new List<Persons>();
            for (int i = 0; i < 100; i++)
            {
                pers.Add(new Persons() { id = i + "", name = i + "tom", telephone = i + new Random().Next().ToString() });
            }
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        //分页
        [HttpPost]
        public JsonResult getPages(PageModel model)
        {
            object o = new object();
            DataModel result = new DataModel();
            result.result = true;
            result.total = 100;
            result.info = "";
            result.rows = pers.Skip((model.page - 1) * model.rows).Take(model.rows).ToList();
            return Json(result);
        }
        //分页
        [HttpPost]
        public JsonResult addPer(Persons model)
        {
            DataModel result = new DataModel();
            result.result = true;
            result.info = "成功";
            if (string.IsNullOrWhiteSpace(model.id))
            {
                pers.Add(model);
            }
            else
            {
               
            }
            return Json(result);
        }
        //分页
        [HttpPost]
        public Object updatePer(Persons model)
        {
            return "";
        }
        //分页
        [HttpPost]
        public void delPer(String model)
        {
             pers.Remove(pers.Where(m=>m.id==model).FirstOrDefault());
        }
    }
}