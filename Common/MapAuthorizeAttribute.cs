﻿using DotNetNuke.Common;
using DotNetNuke.Entities.Users;
using DotNetNuke.Web.Api;

namespace Connect.DNN.Modules.Map.Common
{
    public enum SecurityAccessLevel
    {
        Anonymous = 0,
        View = 1,
        Pointer = 2,
        Edit = 3,
        Admin = 4,
        Host = 5,
        Aidan = 6
    }

    public class MapAuthorizeAttribute : AuthorizeAttributeBase, IOverrideDefaultAuthLevel
    {
        public SecurityAccessLevel SecurityLevel { get; set; }
        public UserInfo User { get; set; }

        public MapAuthorizeAttribute()
        {
            SecurityLevel = SecurityAccessLevel.Admin;
        }

        public MapAuthorizeAttribute(SecurityAccessLevel accessLevel)
        {
            SecurityLevel = accessLevel;
        }

        public override bool IsAuthorized(AuthFilterContext context)
        {
            if (SecurityLevel == SecurityAccessLevel.Anonymous)
            {
                return true;
            }
            if (HttpContextSource.Current.Request.IsAuthenticated)
            {
                User = UserController.Instance.GetCurrentUserInfo();
            }
            else
            {
                User = new UserInfo();
            }
            ContextSecurity security = new ContextSecurity(context.ActionContext.Request.FindModuleInfo());
            switch (SecurityLevel)
            {
                case SecurityAccessLevel.Host:
                    return User.IsSuperUser;
                case SecurityAccessLevel.Admin:
                    return security.IsAdmin;
                case SecurityAccessLevel.Edit:
                    return security.CanEdit;
                case SecurityAccessLevel.Pointer:
                    return security.IsPointer;
                case SecurityAccessLevel.View:
                    return security.CanView;
                case SecurityAccessLevel.Aidan:
                    return (User.FirstName == "Aidan");
            }

            return false;
        }
    }
}