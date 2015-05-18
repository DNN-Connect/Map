using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Security;
using DotNetNuke.Security.Permissions;

namespace Connect.DNN.Modules.Map.Common
{
    public class ContextSecurity
    {
        public bool CanView { get; set; }
        public bool CanEdit { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsPointer { get; set; }

        #region ctor
        public ContextSecurity(ModuleInfo objModule)
        {
            CanView = ModulePermissionController.CanViewModule(objModule);
            CanEdit = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "EDIT");
            IsAdmin = PortalSecurity.IsInRole(PortalSettings.Current.AdministratorRoleName);
            IsPointer = ModulePermissionController.HasModulePermission(objModule.ModulePermissions, "POINTER");
        }
        #endregion

    }
}