using System;
using System.Collections;
using DotNetNuke.Collections;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Modules;

namespace Connect.DNN.Modules.Map.Common
{
    public class ModuleSettings
    {

        #region Properties
        private int ModuleId { get; set; }
        private Hashtable Settings { get; set; }

        public string View { get; set; }
        public double MapOriginLat { get; set; }
        public double MapOriginLong { get; set; }
        public int Zoom { get; set; }
        public string MapWidth { get; set; }
        public string MapHeight { get; set; }
        public string Version { get; set; }
        #endregion

        #region .ctor
        public ModuleSettings(ModuleInfo ctlModule)
        {
            ModuleId = ctlModule.ModuleID;
            Settings = ctlModule.ModuleSettings;
            View = Settings.GetValueOrDefault<string>("View", "Home");
            MapOriginLat = Settings.GetValueOrDefault<double>("MapOriginLat", 44.1);
            MapOriginLong = Settings.GetValueOrDefault<double>("MapOriginLong", 3.07);
            MapWidth = Settings.GetValueOrDefault<string>("MapWidth", "100%");
            MapHeight = Settings.GetValueOrDefault<string>("MapHeight", "500px");
            Zoom = Settings.GetValueOrDefault<int>("Zoom", 8);
            Version = typeof(ModuleSettings).Assembly.GetName().Version.ToString();
        }
        #endregion

        #region Public Members
        public void SaveSettings()
        {
            ModuleController objModules = new ModuleController();
            objModules.UpdateModuleSetting(ModuleId, "View", View);
            objModules.UpdateModuleSetting(ModuleId, "MapOriginLat", MapOriginLat.ToString());
            objModules.UpdateModuleSetting(ModuleId, "MapOriginLong", MapOriginLong.ToString());
            objModules.UpdateModuleSetting(ModuleId, "MapWidth", MapWidth);
            objModules.UpdateModuleSetting(ModuleId, "MapHeight", MapHeight);
            objModules.UpdateModuleSetting(ModuleId, "Zoom", Zoom.ToString());
            DataCache.SetCache(CacheKey(ModuleId), this);
        }

        public static ModuleSettings GetSettings(ModuleInfo ctlModule)
        {

            ModuleSettings res = null;
            try
            {
                res = (ModuleSettings)DataCache.GetCache(CacheKey(ctlModule.ModuleID));
            }
            catch (Exception ex)
            {
            }
            if (res == null)
            {
                res = new ModuleSettings(ctlModule);
                DataCache.SetCache(CacheKey(ctlModule.ModuleID), res);
            }
            return res;
        }

        public static string CacheKey(int moduleId)
        {
            return string.Format("SettingsModule{0}", moduleId);
        }
        #endregion

    }
}
