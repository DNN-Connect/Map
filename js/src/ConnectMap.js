/** @jsx React.DOM */
var MapService = require('./service'),
    ConnectMapHelpers = require('./helpers'),
    ConnectMapSettings = require('./ConnectMapSettings'),
    EditMapPoint = require('./EditMapPoint'),
    Icon = require('./forms/icons');

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
      security: {},
      isAdding: false
    }
  },

  addPoint: function() {
    this._map.setOptions({
      draggableCursor: 'crosshair'
    });
    this.setState({
      isAdding: true
    });
    var that = this;
    google.maps.event.addListener(this._map, 'click', function(e) {
      var newPoint = {
        Latitude: e.latLng.lat(),
        Longitude: e.latLng.lng(),
        Message: ''
      };
      React.render(
        <EditMapPoint MapPoint={newPoint} onUpdate={that.onAddPoint} />, $('#connectMapPanel')[0]);
      ConnectMapHelpers.slidePanel($('#connectMapPanel'));
    });
    return false;
  },

  onAddPoint: function(newMapPoint) {
    var that = this;
    this.state.service.addPoint(newMapPoint, function(data) {
      that.addPointToMap(data);
    });
  },

  addPointToMap: function(point) {
    var infowindow = new google.maps.InfoWindow({
      content: point.Message
    });
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(point.Latitude, point.Longitude),
      map: this._map
    });
    var that = this;
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(that._map, marker);
    });
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

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.settings !== this.state.settings;
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
      $.each(this.state.mapPoints, function(index, item) {
        that.addPointToMap(item);
      });
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
          <a href="#" className="conLink connectMapSettings" title="Show Settings">
           <Icon type="map" />
          </a>
          <a href="#" className="conLink" onClick={this.setMap} title="Set Map">
           <Icon type="crosshairs" />
          </a>
          <a href="#" className="conLink" onClick={this.addPoint} title="Add Point">
           <Icon type="map-marker" />
          </a>
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
