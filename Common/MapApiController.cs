using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Map.Common
{
    public abstract class MapApiController : DnnApiController
    {
        private ModuleSettings _settings;
        public ModuleSettings Settings
        {
            get { return _settings ?? (_settings = ModuleSettings.GetSettings(ActiveModule)); }
            set { _settings = value; }
        }

    }
}