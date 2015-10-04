using System;
using System.Web.Caching;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Modules;

namespace Connect.DNN.Modules.Map.Common
{
    public class ModuleSettings
    {

        #region Properties
        internal ISettingsStore TmsStore;
        internal ISettingsStore MsStore;
        internal ISettingsStore PsStore;
        public double MapOriginLat { get { return TmsStore.Get(44.1); } set { TmsStore.Set(value); } }
        public double MapOriginLong { get { return TmsStore.Get(3.07); } set { TmsStore.Set(value); } }
        public int Zoom { get { return TmsStore.Get(8); } set { TmsStore.Set(value); } }
        public string MapWidth { get { return TmsStore.Get("100%"); } set { TmsStore.Set(value); } }
        public string MapHeight { get { return TmsStore.Get("500px"); } set { TmsStore.Set(value); } }
        public bool AllowOtherEdit { get { return MsStore.Get(false); } set { MsStore.Set(value); } }
        public string GoogleMapApiKey { get { return PsStore.Get(""); } set { PsStore.Set(value); } }
        public string Version = typeof(ModuleSettings).Assembly.GetName().Version.ToString();
        #endregion

        #region .ctor
        public ModuleSettings(ModuleInfo ctlModule)
        {
            PsStore = new PortalScopedSettings(ctlModule.PortalID);
            MsStore = new ModuleScopedSettings(ctlModule.ModuleID, ctlModule.ModuleSettings);
            TmsStore = new TabModuleScopedSettings(ctlModule.TabModuleID, ctlModule.TabModuleSettings);
        }
        #endregion

        #region Public Members
        public void SaveSettings()
        {
            PsStore.Save();
            MsStore.Save();
            TmsStore.Save();
        }

        public static ModuleSettings GetSettings(ModuleInfo ctlModule)
        {
            return CBO.GetCachedObject<ModuleSettings>(new CacheItemArgs(CacheKey(ctlModule.TabModuleID), 20, CacheItemPriority.AboveNormal),
                                                       cacheItemArgs => new ModuleSettings(ctlModule),
                                                       true);
        }

        public static string CacheKey(int moduleId)
        {
            return string.Format("SettingsModule{0}", moduleId);
        }
        #endregion

    }
}
