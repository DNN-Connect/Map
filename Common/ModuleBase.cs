using DotNetNuke.Framework;
using DotNetNuke.Framework.JavaScriptLibraries;
using DotNetNuke.Web.Client.ClientResourceManagement;
using DotNetNuke.Web.Razor;

namespace Connect.DNN.Modules.Map.Common
{
    public class ModuleBase : RazorModuleBase
    {

        #region Properties
        private ContextSecurity _security;
        public ContextSecurity Security
        {
            get
            {
                return _security ?? (_security = new ContextSecurity(ModuleContext.Configuration));
            }
        }

        private ModuleSettings _settings;
        public new ModuleSettings Settings
        {
            get { return _settings ?? (_settings = ModuleSettings.GetSettings(ModuleContext.Configuration)); }
        }
        #endregion

        #region Public Methods
        public void AddService()
        {
            if (Context.Items["MapServiceAdded"] == null)
            {
                JavaScript.RequestRegistration(CommonJs.DnnPlugins);
                ServicesFramework.Instance.RequestAjaxScriptSupport();
                ServicesFramework.Instance.RequestAjaxAntiForgerySupport();
                Context.Items["MapServiceAdded"] = true;
            }

        }

        public void AddJavascriptFile(string jsFilename, int priority)
        {
            ClientResourceManager.RegisterScript(Page, ResolveUrl("~/DesktopModules/Connect/Map/js/" + jsFilename) + "?_=" + Settings.Version, priority);
        }
        #endregion

    }
}
