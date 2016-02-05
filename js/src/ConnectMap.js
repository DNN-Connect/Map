/** @jsx React.DOM */
var ConnectMapSettings = require('./ConnectMapSettings'),
  EditMapPoint = require('./EditMapPoint'),
  Icon = require('./forms/icons'),
  MapPointMessage = require('./MapPointMessage');

var ConnectMapComponent = React.createClass({

  _map: {},
  _mapListener: {},

  getInitialState: function() {
    this.security = ConnectMap.modules[this.props.moduleId].security;
    this.service = ConnectMap.modules[this.props.moduleId].service;
    this.resources = ConnectMap.modules[this.props.moduleId].resources;
    return {
      moduleId: this.props.moduleId,
      settings: ConnectMap.modules[this.props.moduleId].settings,
      mapPoints: ConnectMap.modules[this.props.moduleId].mapPoints,
      isAdding: false
    }
  },

  render: function() {
    var editSettingsLink = (<span />);
    var setMapLink = (<span />);
    var addPointLink = (<span />);
    if (this.security.CanEdit) {
      editSettingsLink = (
        <a href="#" className="conLink connectMapSettings" title={this.resources.ShowSettings}>
         <Icon type="map" />
        </a>
      );
      setMapLink = (
        <a href="#" className="conLink" onClick={this.setMap} title={this.resources.SetMap}>
         <Icon type="crosshairs" />
        </a>
      );
    }
    if (this.security.IsPointer) {
      addPointLink = (
        <a href="#" className="conLink" onClick={this.addPoint} title={this.resources.AddPoint}>
         <Icon type="map-marker" />
        </a>
      );
    }

    return (
      <div>
        <div ref="mapDiv" />
        <div className="conMgtPanel">
         {editSettingsLink}
         {setMapLink}
         {addPointLink}
        </div>
      </div>
    );
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.settings !== this.state.settings;
  },

  componentDidMount: function() {
    this.setMapSize();
    this._map = new google.maps.Map(this.refs.mapDiv.getDOMNode(), {
      center: new google.maps.LatLng(this.state.settings.MapOriginLat, this.state.settings.MapOriginLong),
      zoom: this.state.settings.Zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    $.each(this.state.mapPoints, function(index, item) {
      this.addPointToMap(item);
    }.bind(this));
    $('.connectMapSettings').off("click");
    $('.connectMapSettings').click(function() {
      React.render(
        <ConnectMapSettings Settings={this.state.settings} onUpdate={this.onSettingsUpdate} resources={this.resources} />, $('#connectMapPanel')[0]);
      window.ConnectMap.slidePanel($('#connectMapPanel'));
      return false;
    }.bind(this));
  },

  onSettingsUpdate: function(newSettings) {
    this.service.updateSettings(newSettings, function(data) {
      this.setState({
        settings: data
      });
      this.setMapSize();
    }.bind(this));
  },

  setMap: function() {
    if (confirm(this.resources.SetMapConfirm)) {
      var newSettings = this.state.settings;
      newSettings.MapOriginLat = this._map.getCenter().lat();
      newSettings.MapOriginLong = this._map.getCenter().lng();
      newSettings.Zoom = this._map.getZoom();
      this.service.updateSettings(newSettings);
    }
    return false;
  },

  setMapSize: function() {
    var mapDiv = $(this.refs.mapDiv.getDOMNode());
    mapDiv.width(this.state.settings.MapWidth);
    mapDiv.height(this.state.settings.MapHeight);
  },

  addPoint: function() {
    if (this.state.isAdding) {
      return this.stopAddingPoint();
    }
    this._map.setOptions({
      draggableCursor: 'crosshair'
    });
    this.setState({
      isAdding: true
    });
    this._mapListener = google.maps.event.addListener(this._map, 'click', function(e) {
      var newPoint = {
        Latitude: e.latLng.lat(),
        Longitude: e.latLng.lng(),
        Message: '',
        MapPointId: -1
      };
      React.render(
        <EditMapPoint MapPoint={newPoint} onUpdate={this.onAddPoint} resources={this.resources} />, $('#connectMapPanel')[0]);
      window.ConnectMap.slidePanel($('#connectMapPanel'));
      this.stopAddingPoint();
    }.bind(this));
    return false;
  },

  stopAddingPoint: function() {
    this._map.setOptions({
      draggableCursor: 'grab'
    });
    this.setState({
      isAdding: false
    });
    google.maps.event.removeListener(this._mapListener);
    return false;
  },

  onAddPoint: function(newMapPoint, marker) {
    this.service.submitPoint(newMapPoint, function(data) {
      if (marker === undefined) {
        this.addPointToMap(data);
        var newPoints = this.state.mapPoints;
        newPoints.push(data);
        this.setState({
          mapPoints: newPoints
        });
      } else {
        var newPoints = this.state.mapPoints;
        for (var i = 0; i < newPoints.length; i++) {
          if (newPoints[i].MapPointId === newMapPoint.MapPointId) {
            newPoints[i] = newMapPoint;
          }
        }
        this.setState({
          mapPoints: newPoints
        });
      }
    }.bind(this));
  },

  onDeletePoint: function(mapPoint, marker) {
    this.service.deletePoint(mapPoint.MapPointId, function(data) {
      marker.setMap(null);
    });
  },

  addPointToMap: function(point) {
    var canEdit = ((this.security.IsPointer && (point.CreatedByUserID == this.security.UserId || this.state.settings.AllowOtherEdit)) || this.security.CanEdit);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(point.Latitude, point.Longitude),
      map: this._map,
      draggable: canEdit,
      mapPoint: point
    });
    var msg = $('<div id="point' + point.MapPointId + '" class="conPointMessage"></div>').appendTo('body');
    React.render(
      <MapPointMessage MapPoint={point} CanEdit={canEdit} OnEdit={this.onAddPoint} OnDelete={this.onDeletePoint} Marker={marker} resources={this.resources} />,
      msg[0]);
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(msg[0]);
    msg.remove();
    google.maps.event.addListener(marker, 'click', function(e) {
      infowindow.open(this._map, marker);
    }.bind(this));
    google.maps.event.addListener(marker, 'dragend', function(e) {
      var changedPoint = marker.mapPoint;
      changedPoint.Latitude = e.latLng.lat();
      changedPoint.Longitude = e.latLng.lng();
      this.onAddPoint(changedPoint, marker);
    }.bind(this));
  }

});

module.exports = ConnectMapComponent;
