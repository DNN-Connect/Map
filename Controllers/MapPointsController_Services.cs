using System.Net;
using System.Net.Http;
using System.Web.Http;
using Connect.DNN.Modules.Map.Common;
using Connect.DNN.Modules.Map.Models.MapPoints;
using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Map.Controllers
{

    public partial class MapPointsController : MapApiController
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

        public class SetMapDTO
        {
            public double Lat { get; set; }
            public double Lng { get; set; }
            public int Zoom { get; set; }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [MapAuthorize(SecurityLevel = SecurityAccessLevel.Edit)]
        public HttpResponseMessage SetMap(SetMapDTO postData)
        {
            Settings.MapOriginLat = postData.Lat;
            Settings.MapOriginLong = postData.Lng;
            Settings.Zoom = postData.Zoom;
            Settings.SaveSettings();
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }
        #endregion

    }
}

