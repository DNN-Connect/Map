/** @jsx React.DOM */
var MapService = require('./service'),
    ConnectMapHelpers = require('./helpers'),
    Input = require('./forms/input');

var ConnectMapSettings = React.createClass({

  handleUpdate: function() {
    var newSettings = this.props.Settings;
    newSettings.MapWidth = this.refs.txtMapWidth.getValue() || newSettings.MapWidth;
    this.props.onUpdate(newSettings);
    ConnectMapHelpers.slidePanel($('#connectMapPanel'));
  },

  componentDidMount: function() {
    this.refs.txtMapWidth.getDOMNode().value = this.props.Settings.MapWidth;
  },

    render: function() {
        return (
          <div>
            <Input 
              text="Map Width"
              ref="txtMapWidth"
              value={this.props.Settings.MapWidth}
              regex="(\d+)(px|%)"
              errorMessage="Should be a valid css width (in px or %)"
              groupClass="conInput" />
           <button className="dnnPrimaryAction" onClick={this.handleUpdate}>Update</button>
          </div>
          );
    }

});

module.exports = ConnectMapSettings;
