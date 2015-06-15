using System;
using System.Collections;
using DotNetNuke.Entities.Modules;

namespace Connect.DNN.Modules.Map.Common
{
    public class TabModuleScopedSettings : StringBasedSettings
    {
        internal static void UpdateSetting(int moduleId, int tabModuleId, string name, string value)
        {
            if (IsTabModuleSetting(name))
                new ModuleController().UpdateTabModuleSetting(tabModuleId, SettingName(name), value);
            else
                new ModuleController().UpdateModuleSetting(moduleId, name, value);
        }

        internal static bool IsTabModuleSetting(string name)
        {
            return name != "Tab" && name.StartsWith("Tab") && Char.IsUpper(name[3]);
        }

        internal static string SettingName(string name)
        {
            return IsTabModuleSetting(name) ? name.Substring(3) : name;
        }

        public TabModuleScopedSettings(int moduleId, int tabModuleId, Hashtable moduleSettings)
            : base(
                name => moduleSettings[SettingName(name)] as string,
                (name, value) => UpdateSetting(moduleId, tabModuleId, name, value)
                ) { }
    }
}