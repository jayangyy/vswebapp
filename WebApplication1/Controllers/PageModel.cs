using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Controllers
{
    public class PageModel
    {
        public int page { set; get; }
        public int rows { set; get; }
        public string sort { set; get; }
        public string order { set; get; }
    }
}