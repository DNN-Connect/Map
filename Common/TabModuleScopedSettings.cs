﻿using System.Collections;
using DotNetNuke.Entities.Modules;

namespace Connect.DNN.Modules.Map.Common
{
    public class TabModuleScopedSettings : StringBasedSettings
    {
        public TabModuleScopedSettings(int tabModuleId, Hashtable moduleSettings)
            : base(
                name => moduleSettings[name] as string,
                (name, value) => new ModuleController().UpdateTabModuleSetting(tabModuleId, name, value)
                ) { }
    }
}