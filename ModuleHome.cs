using System;
using Connect.DNN.Modules.Map.Common;
using DotNetNuke.Collections;

namespace Connect.DNN.Modules.Map
{

    public class ModuleHome : ModuleBase
    {
        public string View { get; set; }

        protected override string RazorScriptFile
        {
            get
            {
                return string.Format("~/DesktopModules/Connect/Map/Views/{0}.cshtml", View);
            }
        }

        protected void Page_Init(object sender, EventArgs e)
        {
            View = Request.QueryString.GetValueOrDefault<string>("View", Settings.View);
            AddService();
            LocalResourceFile = Globals.SharedResourceFileName;
        }

    }
}
