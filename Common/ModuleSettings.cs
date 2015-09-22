using System;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Modules;

namespace Connect.DNN.Modules.Map.Common
{
    public class ModuleSettings
    {

        #region Properties
        internal ISettingsStore TmsStore;
        internal ISettingsStore MsStore;
        public double MapOriginLat { get { return TmsStore.Get(44.1); } set { TmsStore.Set(value); } }
        public double MapOriginLong { get { return TmsStore.Get(3.07); } set { TmsStore.Set(value); } }
        public int Zoom { get { return TmsStore.Get(8); } set { TmsStore.Set(value); } }
        public string MapWidth { get { return TmsStore.Get("100%"); } set { TmsStore.Set(value); } }
        public string MapHeight { get { return TmsStore.Get("500px"); } set { TmsStore.Set(value); } }
        public bool AllowOtherEdit { get { return MsStore.Get(false); } set { MsStore.Set(value); } }
        public string Version = typeof(ModuleSettings).Assembly.GetName().Version.ToString();
        #endregion

        #region .ctor
        public ModuleSettings(ModuleInfo ctlModule)
        {
            MsStore = new ModuleScopedSettings(ctlModule.ModuleID, ctlModule.ModuleSettings);
            TmsStore = new TabModuleScopedSettings(ctlModule.TabModuleID, ctlModule.TabModuleSettings);
        }
        #endregion

        #region Public Members
        public void SaveSettings()
        {
            MsStore.Save();
            TmsStore.Save();
        }

        public static ModuleSettings GetSettings(ModuleInfo ctlModule)
        {

            ModuleSettings res = null;
            try
            {
                res = (ModuleSettings)DataCache.GetCache(CacheKey(ctlModule.TabModuleID));
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
