using System;
using Connect.DNN.Modules.Map.Common;

namespace Connect.DNN.Modules.Map
{

    public class ModuleHome : ModuleBase
    {
        protected override string RazorScriptFile
        {
            get
            {
                return "~/DesktopModules/Connect/Map/Views/Home.cshtml";
            }
        }

        protected void Page_Init(object sender, EventArgs e)
        {
            AddService();
            LocalResourceFile = Globals.SharedResourceFileName;
        }

    }
}
