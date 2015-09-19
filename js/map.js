(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var MapService = require('./service');

var ConnectMap = React.createClass({displayName: "ConnectMap",

  _map: {},

  getInitialState: function() {
    var mapService = new MapService(jQuery, this.props.moduleId);
    return {
      moduleId: this.props.moduleId,
      service: mapService
    }
  },

  componentDidMount: function() {
    var that = this;
    this.state.service.getInitialData(function (data) {
      that.setState({
        settings: data.Settings,
        mapPoints: data.MapPoints
      });
    });
  },

  componentDidUpdate: function() {
    // alert(this.state.settings.MapWidth);
    // alert(this.refs.mapDiv.getDOMNode());
    var mapDiv = $(this.refs.mapDiv.getDOMNode());
    mapDiv.width(this.state.settings.MapWidth);
    mapDiv.height(this.state.settings.MapHeight);
    this._map = new google.maps.Map(mapDiv[0], {
              center: new google.maps.LatLng(this.state.settings.MapOriginLat, this.state.settings.MapOriginLong),
              zoom: this.state.settings.Zoom,
              mapTypeId: google.maps.MapTypeId.ROADMAP
        });
  },

  render: function() {
    if (this.state.settings === undefined) {
      this._div = React.createElement("div", null);
    } else {
      this._div = React.createElement("div", null);
    }
    return React.createElement("div", {ref: "mapDiv"});
  }

});

module.exports = ConnectMap;


},{"./service":3}],2:[function(require,module,exports){
/** @jsx React.DOM */
var ConnectMap = require('./ConnectMap');

(function($) {
    $(document).ready(function() {
        $('.connectMap').each(function(i, el) {
            var moduleId = $(el).data('moduleid');
            React.render(React.createElement(ConnectMap, {moduleId: moduleId}), el);
        });
    });
}(jQuery));


},{"./ConnectMap":1}],3:[function(require,module,exports){
var ConnectMapService = function ($, mid) {
    var moduleId = mid;
    var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Map');

    this.ajaxCall = function(type, controller, action, id, data, success, fail) {
        // showLoading();
        $.ajax({
            type: type,
            url: baseServicepath + controller + '/' + action + (id != null ? '/' + id : ''),
            beforeSend: $.dnnSF(moduleId).setModuleHeaders,
            data: data
        }).done(function(retdata) {
            // hideLoading();
            if (success != undefined) {
                success(retdata);
            }
        }).fail(function(xhr, status) {
            // showError(xhr.responseText);
            if (fail != undefined) {
                fail(xhr.responseText);
            }
        });
    }

    this.getInitialData = function(success) {
        this.ajaxCall('GET', 'Module', 'InitialData', null, null, success);
    }

    this.getDataPoints = function(success) {
        this.ajaxCall('GET', 'MapPoints', 'List', null, null, success);
    }
    this.addPoint = function(lat, lng, msg, success) {
        this.ajaxCall('POST', 'MapPoints', 'Add', null, {
            Latitude: lat,
            Longitude: lng,
            Message: msg
        }, success);
    }
    this.showUser = function(userId, success, fail) {
        this.ajaxCall('GET', 'MapPoints', 'GetUser', userId, null, success, fail);
    }
    this.setMap = function(lat, lng, zoom, success) {
        this.ajaxCall('POST', 'MapPoints', 'SetMap', null, {
            Lat: lat,
            Lng: lng,
            Zoom: zoom
        }, success);
    }
}

module.exports = ConnectMapService;


},{}]},{},[2])