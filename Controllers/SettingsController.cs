using System.Net;
using System.Net.Http;
using System.Web.Http;
using Connect.DNN.Modules.Map.Common;
using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Map.Controllers
{

    public partial class SettingsController : MapApiController
    {
        public class SettingsDTO
        {
            public double MapOriginLat { get; set; }
            public double MapOriginLong { get; set; }
            public int Zoom { get; set; }
            public string MapWidth { get; set; }
            public string MapHeight { get; set; }
            public bool AllowOtherEdit { get; set; }
            public string GoogleMapApiKey { get; set; }
        }


        #region Service Methods
        [HttpPost]
        [MapAuthorize(SecurityLevel = SecurityAccessLevel.Edit)]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage Update(SettingsDTO newSettings)
        {
            var oldSettings = ModuleSettings.GetSettings(ActiveModule);
            oldSettings.MapHeight = newSettings.MapHeight;
            oldSettings.MapOriginLat = newSettings.MapOriginLat;
            oldSettings.MapOriginLong = newSettings.MapOriginLong;
            oldSettings.MapWidth = newSettings.MapWidth;
            oldSettings.Zoom = newSettings.Zoom;
            oldSettings.AllowOtherEdit = newSettings.AllowOtherEdit;
            if (Security.IsAdmin)
            {
                oldSettings.GoogleMapApiKey = newSettings.GoogleMapApiKey;
            }
            oldSettings.SaveSettings();
            return Request.CreateResponse(HttpStatusCode.OK, oldSettings);
        }
        #endregion

    }
}

