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

  setMap: function() {
    if (confirm('You wish to set the map to this location and zoom?')) {
      var newSettings = this.state.settings;
      newSettings.MapOriginLat = this._map.getCenter().lat();
      newSettings.MapOriginLong = this._map.getCenter().lng();
      newSettings.Zoom = this._map.getZoom();
      this.state.service.updateSettings(newSettings);
    }
    return false;
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
        <div>
        <a href="#" className="dnnPrimaryAction connectMapSettings">Show Settings</a>
        <a href="#" className="dnnSecondaryAction connectSetMap" onClick={this.setMap}>Set Map</a>
        </div>
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
