/** @jsx React.DOM */
var TextBox = require('./forms/textbox'),
  CheckBox = require('./forms/checkbox');

var ConnectMapSettings = React.createClass({

  handleUpdate: function() {
    var newSettings = this.props.Settings;
    newSettings.MapWidth = this.refs.txtMapWidth.getValue() || newSettings.MapWidth;
    newSettings.MapHeight = this.refs.txtMapHeight.getValue() || newSettings.MapHeight;
    newSettings.AllowOtherEdit = this.refs.chkAllowOtherEdit.getValue() || newSettings.AllowOtherEdit;
    this.props.onUpdate(newSettings);
    window.ConnectMap.slidePanel($('#connectMapPanel'));
  },

  componentDidMount: function() {
    this.refs.txtMapWidth.getDOMNode().value = this.props.Settings.MapWidth;
    this.refs.txtMapHeight.getDOMNode().value = this.props.Settings.MapHeight;
    this.refs.chkAllowOtherEdit.getDOMNode().value = this.props.Settings.AllowOtherEdit;
  },

  render: function() {
    return (
      <div className="conSettings">
        <TextBox 
          text="Map Width"
          ref="txtMapWidth"
          value={this.props.Settings.MapWidth}
          regex="(\d+)(px|%)"
          errorMessage="Should be a valid css width (in px or %)"
          groupClass="conInput" />
        <TextBox 
          text="Map Height"
          ref="txtMapHeight"
          value={this.props.Settings.MapHeight}
          regex="(\d+)(px|%)"
          errorMessage="Should be a valid css width (in px or %)"
          groupClass="conInput" />
        <CheckBox
          text="Allow Other Edit"
          ref="chkAllowOtherEdit"
          value={this.props.Settings.AllowOtherEdit}
          groupClass="conInput" />
       <button className="dnnPrimaryAction" onClick={this.handleUpdate}>Update</button>
      </div>
    );
  }

});

module.exports = ConnectMapSettings;
