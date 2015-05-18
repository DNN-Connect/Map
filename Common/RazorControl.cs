using System.IO;
using DotNetNuke.Entities.Modules;
using DotNetNuke.UI.Modules;
using DotNetNuke.Web.Razor;

namespace Connect.DNN.Modules.Map.Common
{
    public class RazorControl
    {
        public string RazorFile { get; set; }
        public ModuleInstanceContext DnnModuleContext { get; set; }
        public string LocalResourceFile { get; set; }

        public RazorControl(ModuleInfo context, string razorFile, string localResourceFile)
        {
            DnnModuleContext = new ModuleInstanceContext { Configuration = context };
            RazorFile = razorFile;
            LocalResourceFile = localResourceFile;
        }

        private RazorEngine _engine;
        public RazorEngine Engine
        {
            get
            {
                if (_engine == null)
                {
                    _engine = new RazorEngine(RazorFile, DnnModuleContext, LocalResourceFile);
                }
                return _engine;
            }
        }

        public string RenderObject<T>(T model)
        {
            using (StringWriter tw = new StringWriter())
            {
                Engine.Render(tw, model);
                return tw.ToString();
            }
        }
    }
}