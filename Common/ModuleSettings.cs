using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Modules.Settings;

namespace Connect.DNN.Modules.Map.Common
{
    public class ModuleSettings
    {
        [TabModuleSetting]
        public double MapOriginLat { get; set; } = 44.1;
        [TabModuleSetting]
        public double MapOriginLong { get; set; } = 3.07;
        [TabModuleSetting]
        public int Zoom { get; set; } = 8;
        [TabModuleSetting]
        public string MapWidth { get; set; } = "100%";
        [TabModuleSetting]
        public string MapHeight { get; set; } = "500px";
        [ModuleSetting]
        public bool AllowOtherEdit { get; set; } = false;
        [ModuleSetting]
        public string MapType { get; set; } = "ROADMAP";
        [PortalSetting(Prefix = "ConnectMap_")]
        public string GoogleMapApiKey { get; set; } = "";
        public string Version = typeof(ModuleSettings).Assembly.GetName().Version.ToString();

        public static ModuleSettings GetSettings(ModuleInfo module)
        {
            var repo = new ModuleSettingsRepository();
            return repo.GetSettings(module);
        }

        public void SaveSettings(ModuleInfo module)
        {
            var repo = new ModuleSettingsRepository();
            repo.SaveSettings(module, this);
        }
    }

    public class ModuleSettingsRepository : SettingsRepository<ModuleSettings>
    {
    }

}
