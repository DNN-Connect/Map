<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Settings.ascx.cs" Inherits="Connect.DNN.Modules.Map.Settings" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/LabelControl.ascx" %>

<fieldset>
 <div class="dnnFormItem">
  <dnn:label id="lblView" runat="server" controlname="ddView" suffix=":" />
  <asp:DropDownList runat="server" ID="ddView" />
 </div>
</fieldset>

