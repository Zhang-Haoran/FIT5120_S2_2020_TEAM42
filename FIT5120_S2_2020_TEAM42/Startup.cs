using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FIT5120_S2_2020_TEAM42.Startup))]
namespace FIT5120_S2_2020_TEAM42
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
