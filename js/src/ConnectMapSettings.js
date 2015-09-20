/** @jsx React.DOM */
var ConnectMapHelpers = require('./helpers'),
  TextBox = require('./forms/textbox');

var ConnectMapSettings = React.createClass({

  handleUpdate: function() {
    var newSettings = this.props.Settings;
    newSettings.MapWidth = this.refs.txtMapWidth.getValue() || newSettings.MapWidth;
    newSettings.MapHeight = this.refs.txtMapHeight.getValue() || newSettings.MapHeight;
    this.props.onUpdate(newSettings);
    ConnectMapHelpers.slidePanel($('#connectMapPanel'));
  },

  componentDidMount: function() {
    this.refs.txtMapWidth.getDOMNode().value = this.props.Settings.MapWidth;
    this.refs.txtMapHeight.getDOMNode().value = this.props.Settings.MapHeight;
  },

  render: function() {
    return (
      <div>
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
       <button className="dnnPrimaryAction" onClick={this.handleUpdate}>Update</button>
      </div>
    );
  }

});

module.exports = ConnectMapSettings;
