using System.Net;
using System.Net.Http;
using System.Web.Http;
using Connect.DNN.Modules.Map.Common;
using Connect.DNN.Modules.Map.Models.MapPoints;
using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Map.Controllers
{

    public partial class MapPointsController : DnnApiController
    {

        #region Service Methods
        [HttpGet]
        [MapAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage List()
        {
            return Request.CreateResponse(HttpStatusCode.OK, GetMapPoints(ActiveModule.ModuleID));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [MapAuthorize(SecurityLevel = SecurityAccessLevel.Pointer)]
        public HttpResponseMessage Add(MapPointBase postData)
        {
            postData.ModuleId = ActiveModule.ModuleID;
            AddMapPoint(ref postData, UserInfo.UserID);
            return Request.CreateResponse(HttpStatusCode.OK, postData);
        }
        #endregion

    }
}

