using System;
using System.Collections;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Modules;

namespace Connect.DNN.Modules.Map.Common
{
    public class ModuleSettings
    {

        #region Properties
        internal ISettingsStore Store;
        public double MapOriginLat { get { return Store.Get(44.1); } set { Store.Set(value); } }
        public double MapOriginLong { get { return Store.Get(3.07); } set { Store.Set(value); } }
        public int Zoom { get { return Store.Get(8); } set { Store.Set(value); } }
        public string MapWidth { get { return Store.Get("100%"); } set { Store.Set(value); } }
        public string MapHeight { get { return Store.Get("500px"); } set { Store.Set(value); } }
        public bool AllowOtherEdit { get { return Store.Get(false); } set { Store.Set(value); } }
        public string Version = typeof(ModuleSettings).Assembly.GetName().Version.ToString();
        #endregion

        #region .ctor
        public ModuleSettings(int moduleId, Hashtable settings)
        {
            Store = new ModuleScopedSettings(moduleId, settings);
        }
        #endregion

        #region Public Members
        public void SaveSettings()
        {
            Store.Save();
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
                res = new ModuleSettings(ctlModule.ModuleID, ctlModule.ModuleSettings);
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
