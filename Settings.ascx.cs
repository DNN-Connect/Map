using System;
using System.IO;
using System.Web.UI.WebControls;
using Connect.DNN.Modules.Map.Common;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Exceptions;

namespace Connect.DNN.Modules.Map
{
    public partial class Settings : ModuleSettingsBase
    {

        #region Properties
        private ModuleSettings _settings;
        public ModuleSettings ModSettings
        {
            get
            {
                if (_settings == null)
                {
                    _settings = Common.ModuleSettings.GetSettings(ModuleConfiguration);
                }
                return _settings;
            }
            set { _settings = value; }
        }
        #endregion

        #region Base Method Implementations

        public override void LoadSettings()
        {
            try
            {
                if (!IsPostBack)
                {
                    ddView.Items.Clear();
                    ddView.Items.Add(new ListItem("Home", "Home"));
                    DirectoryInfo viewDir = new DirectoryInfo(Server.MapPath("~/DesktopModules/Connect/Map/Views"));
                    foreach (FileInfo f in viewDir.GetFiles("*.cshtml"))
                    {
                        string vwName = Path.GetFileNameWithoutExtension(f.Name);
                        if (vwName.ToLower() != "home")
                        {
                            ddView.Items.Add(new ListItem(vwName, vwName));
                        }
                    }
                    try
                    {
                        ddView.Items.FindByValue(ModSettings.View).Selected = true;
                    }
                    catch (Exception ex)
                    {
                    }
                }
            }
            catch (Exception exc) //Module failed to load
            {
                Exceptions.ProcessModuleLoadException(this, exc);
            }
        }

        public override void UpdateSettings()
        {
            try
            {
                ModSettings.View = ddView.SelectedValue;
                ModSettings.SaveSettings();
            }
            catch (Exception exc) //Module failed to load
            {
                Exceptions.ProcessModuleLoadException(this, exc);
            }
        }

        #endregion
    }
}