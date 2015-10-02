using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Connect.DNN.Modules.Map.Common;
using Connect.DNN.Modules.Map.Models.MapPoints;

namespace Connect.DNN.Modules.Map.Controllers
{

    public partial class ModuleController : MapApiController
    {

        public class InitData
        {
            public ModuleSettings Settings { get; set; }
            public IEnumerable<MapPoint> MapPoints { get; set; }
            public ContextSecurity Security { get; set; }
            public Dictionary<string, string> ClientResources { get; set; }
        }

        #region Service Methods
        [HttpGet]
        [MapAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage InitialData()
        {
            InitData init = new InitData();
            init.Settings = ModuleSettings.GetSettings(ActiveModule);
            init.MapPoints = MapPointsController.GetMapPoints(ActiveModule.ModuleID);
            init.Security = new ContextSecurity(ActiveModule);
            init.ClientResources = Localization.GetResourceFile(PortalSettings, "/DesktopModules/Connect/Map/App_LocalResources/ClientResources.resx",
                System.Threading.Thread.CurrentThread.CurrentCulture.Name);
            return Request.CreateResponse(HttpStatusCode.OK, init);
        }
        #endregion

    }
}

