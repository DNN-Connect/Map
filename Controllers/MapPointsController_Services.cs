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

        [HttpGet]
        [MapAuthorize(SecurityLevel = SecurityAccessLevel.View)]
        public HttpResponseMessage GetUser(int id)
        {
            RazorControl ctl = new RazorControl(ActiveModule,
                "~/DesktopModules/Connect/Map/Views/ServiceViews/UserDetails.cshtml",
                Globals.SharedResourceFileName);
            UserInfo u = UserController.GetUserById(ActiveModule.PortalID, id);
            StringContent content = new StringContent(ctl.RenderObject(u), Encoding.UTF8, "text/html");
            HttpResponseMessage res = new HttpResponseMessage(HttpStatusCode.OK) { Content = content };
            return res;
        }
        #endregion

    }
}

