using System.Web;
using System.Web.Mvc;

namespace FIT5120_S2_2020_TEAM42
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
