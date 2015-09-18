using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Connect.DNN.Modules.Map.Common;
using Connect.DNN.Modules.Map.Models.MapPoints;
using DotNetNuke.Entities.Users;
using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Map.Controllers
{

    public partial class ModuleController : MapApiController
    {

        public class InitData
        {
            public ModuleSettings Settings { get; set; }
            public IEnumerable<MapPoint> MapPoints { get; set; }
        }

        #region Service Methods
        [HttpGet]
        [MapAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage InitialData()
        {
            InitData init = new InitData();
            init.Settings = ModuleSettings.GetSettings(ActiveModule);
            init.MapPoints = MapPointsController.GetMapPoints(ActiveModule.ModuleID);
            return Request.CreateResponse(HttpStatusCode.OK, init);
        }

        #endregion

    }
}

