using DotNetNuke.Web.Razor;

namespace Connect.DNN.Modules.Map.Common
{
    public abstract class MapWebPage : DotNetNukeWebPage
    {
        private ContextSecurity _security;
        public ContextSecurity Security
        {
            get
            {
                if (_security == null)
                {
                    _security = new ContextSecurity(Dnn.Module);
                }
                return _security;
            }
        }

        private ModuleSettings _settings;
        public ModuleSettings Settings
        {
            get
            {
                if (_settings == null)
                {
                    _settings = ModuleSettings.GetSettings(Dnn.Module);
                }
                return _settings;
            }
            set { _settings = value; }
        }

    }

    public abstract class MapWebPage<T> : DotNetNukeWebPage<T>
    {
        private ContextSecurity _security;
        public ContextSecurity Security
        {
            get
            {
                if (_security == null)
                {
                    _security = new ContextSecurity(Dnn.Module);
                }
                return _security;
            }
        }

        private ModuleSettings _settings;
        public ModuleSettings Settings
        {
            get
            {
                if (_settings == null)
                {
                    _settings = ModuleSettings.GetSettings(Dnn.Module);
                }
                return _settings;
            }
            set { _settings = value; }
        }
    }
}