using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Map.Common
{
    public class RouteMapper : IServiceRouteMapper
    {

        #region IServiceRouteMapper
        public void RegisterRoutes(IMapRoute mapRouteManager)
        {
            mapRouteManager.MapHttpRoute("Connect/Map", "ConnectMap1", "{controller}/{action}", null, null, new[] { "Connect.DNN.Modules.Map.Controllers" });
            mapRouteManager.MapHttpRoute("Connect/Map", "ConnectMap2", "{controller}/{action}/{id}", null, new { id = "\\d*" }, new[] { "Connect.DNN.Modules.Map.Controllers" });
        }
        #endregion

    }
}
