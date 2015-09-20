/** @jsx React.DOM */
var MapService = require('./service'),
  ConnectMapHelpers = require('./helpers')
ConnectMapSettings = require('./ConnectMapSettings');

var ConnectMap = React.createClass({

  _map: {},

  onSettingsUpdate: function(newSettings) {
    var that = this;
    this.state.service.updateSettings(newSettings, function(data) {
      that.setState({
        settings: data
      });
    });
  },

  getInitialState: function() {
    var mapService = new MapService(jQuery, this.props.moduleId);
    return {
      moduleId: this.props.moduleId,
      service: mapService,
      security: {}
    }
  },

  componentDidMount: function() {
    var that = this;
    this.state.service.getInitialData(function(data) {
      that.setState({
        settings: data.Settings,
        mapPoints: data.MapPoints,
        security: data.Security
      });
    });
  },

  componentDidUpdate: function() {
    if (this.state.settings !== undefined) {
      var mapDiv = $(this.refs.mapDiv.getDOMNode());
      mapDiv.width(this.state.settings.MapWidth);
      mapDiv.height(this.state.settings.MapHeight);
      this._map = new google.maps.Map(mapDiv[0], {
        center: new google.maps.LatLng(this.state.settings.MapOriginLat, this.state.settings.MapOriginLong),
        zoom: this.state.settings.Zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var that = this;
      $('.connectMapSettings').click(function() {
        React.render(
          <ConnectMapSettings Settings={that.state.settings} onUpdate={that.onSettingsUpdate} />, $('#connectMapPanel')[0]);
        ConnectMapHelpers.slidePanel($('#connectMapPanel'));
        return false;
      });
    }
  },

  render: function() {

    var editPanel = (<span />);
    if (this.state.security.CanEdit) {
      editPanel = (
        <a href="#" className="dnnPrimaryAction connectMapSettings">Show Settings</a>
      );
    }

    return (
      <div>
        <div ref="mapDiv" />
        {editPanel}
      </div>
    );
  }

});

module.exports = ConnectMap;
