/** @jsx React.DOM */
var MapService = require('./service'),
    ConnectMapHelpers = require('./helpers');

var ConnectMapSettings = React.createClass({

  handleUpdate: function() {
    var newSettings = this.props.Settings;
    newSettings.MapWidth = this.refs.txtMapWidth.getDOMNode().value;
    this.props.onUpdate(newSettings);
    ConnectMapHelpers.slidePanel($('#connectMapPanel'));
  },

  componentDidMount: function() {
    this.refs.txtMapWidth.getDOMNode().value = this.props.Settings.MapWidth;
  },

    render: function() {
        return (
          <div>
           <input ref="txtMapWidth" type="text" />
           <button className="dnnPrimaryAction" onClick={this.handleUpdate}>Update</button>
          </div>
          );
    }

});

module.exports = ConnectMapSettings;
