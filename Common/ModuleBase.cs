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
        public ModuleSettings Settings
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
                ClientResourceManager.RegisterScript(Page, "http://maps.googleapis.com/maps/api/js",70);
                AddJavascriptFile("Connect.Map.js", 70);
                string script = "(function($){$(document).ready(function(){ connectMapService = new ConnectMapService($, {}, " + ModuleContext.ModuleId + ") })})(jQuery);";
                Page.ClientScript.RegisterClientScriptBlock(script.GetType(), ID + "_service", script, true);
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
