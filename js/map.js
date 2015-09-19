(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var MapService = require('./service'),
    ConnectMapHelpers = require('./helpers')
    ConnectMapSettings = require('./ConnectMapSettings');

var ConnectMap = React.createClass({displayName: "ConnectMap",

    _map: {},

    onSettingsUpdate: function(newSettings) {
        this.setState({
            settings: newSettings
        });
    },

    getInitialState: function() {
        var mapService = new MapService(jQuery, this.props.moduleId);
        return {
            moduleId: this.props.moduleId,
            service: mapService
        }
    },

    componentDidMount: function() {
        var that = this;
        this.state.service.getInitialData(function(data) {
            that.setState({
                settings: data.Settings,
                mapPoints: data.MapPoints
            });
        });
        $('.connectMapSettings').click(function (){
            React.render(React.createElement(ConnectMapSettings, {Settings: that.state.settings, onUpdate: that.onSettingsUpdate}), $('#connectMapPanel')[0]);
            ConnectMapHelpers.slidePanel($('#connectMapPanel'));
            return false;
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
        }
    },

    render: function() {
        return (
          React.createElement("div", {ref: "mapDiv"})
          );
    }

});

module.exports = ConnectMap;


},{"./ConnectMapSettings":2,"./helpers":4,"./service":5}],2:[function(require,module,exports){
/** @jsx React.DOM */
var MapService = require('./service'),
    ConnectMapHelpers = require('./helpers');

var ConnectMapSettings = React.createClass({displayName: "ConnectMapSettings",

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
          React.createElement("div", null, 
           React.createElement("input", {ref: "txtMapWidth", type: "text"}), 
           React.createElement("button", {className: "dnnPrimaryAction", onClick: this.handleUpdate}, "Update")
          )
          );
    }

});

module.exports = ConnectMapSettings;


},{"./helpers":4,"./service":5}],3:[function(require,module,exports){
/** @jsx React.DOM */
var ConnectMap = require('./ConnectMap'),
    ConnectMapHelpers = require('./helpers')
    ConnectMapSettings = require('./ConnectMapSettings');

(function($) {
    $(document).ready(function() {
        if($('#connectMapPanel').length == 0) {
            $('body').append('<div id="connectMapPanel" class="connectMapPanel"></div>');
        };
        $('.connectMap').each(function(i, el) {
            var moduleId = $(el).data('moduleid');
            React.render(React.createElement(ConnectMap, {moduleId: moduleId}), el);
        });
    });
}(jQuery));


},{"./ConnectMap":1,"./ConnectMapSettings":2,"./helpers":4}],4:[function(require,module,exports){
var ConnectMapHelpers = (function($) {
    return {
        slidePanel: function(panel) {
            if (panel.css('display') == 'block') {
                $('body').off("click");
                panel.off("click");
                panel.animate({
                    right: -window.innerWidth
                }, 800, function() {
                    panel.css('display', 'none');
                    $('body').css('overflow', 'auto');
                });
            } else {
                $('body').css('overflow', 'hidden');
                panel.css('right', -window.innerWidth);
                panel.css('display', 'block');
                panel.animate({
                    right: 0
                }, 800);
                var that = this;
                $('body').on("click", function(e) {
                    that.slidePanel(panel);
                });
                panel.on("click", function(e) {
                    e.stopPropagation();
                })
            }
        }
    }
})(jQuery);

module.exports = ConnectMapHelpers;


},{}],5:[function(require,module,exports){
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


},{}]},{},[3])