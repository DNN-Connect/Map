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
        [HttpPost]
        [ValidateAntiForgeryToken]
        [MapAuthorize(SecurityLevel = SecurityAccessLevel.Pointer)]
        public HttpResponseMessage MapPoint(MapPointBase postData)
        {
            postData.ModuleId = ActiveModule.ModuleID;
            if (postData.MapPointId == -1)
            {
                AddMapPoint(ref postData, UserInfo.UserID);
            }
            else
            {
                var oldData = GetMapPoint(postData.MapPointId).GetMapPointBase();
                if (oldData.CreatedByUserID == UserInfo.UserID | Settings.AllowOtherEdit | Security.CanEdit | Security.IsAdmin)
                {
                    oldData.Latitude = postData.Latitude;
                    oldData.Longitude = postData.Longitude;
                    oldData.Message = postData.Message;
                    UpdateMapPoint(oldData, UserInfo.UserID);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.MethodNotAllowed, "");                   
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, postData);
        }

        #endregion

    }
}

