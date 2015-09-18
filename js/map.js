(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var MapService = require('./service');

(function($, window, document, undefined) {
    var pluginName = 'connectMap',
        defaults = {
            moduleId: '-1',
            tabId: '-1',
            localization: {
                deleteConfirm: 'Do you really want to delete this picture?',
                uploaded: 'Uploaded',
                queued: 'Queued',
                cmdDelete: 'Delete'
            }
        };

    function connectMap(element, options) {
        this._element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this._moduleId = $(element).data('moduleid');
        this._afValue = $('[name="__RequestVerificationToken"]').val();
        this._service = new MapService($, this._moduleId);
        this._settings = {};
        this._mapPoints = [];
        this.init();
    }

    connectMap.prototype.init = function() {
      var that = this;
      this._service.getInitialData(function(data) {
        that._settings = data.Settings;
        that._mapPoints = data.MapPoints;
        that._element.width(that._settings.MapWidth);
        that._element.height(that._settings.MapHeight);
        that._map = new google.maps.Map(that._element[0], {
              center: new google.maps.LatLng(that._settings.MapOriginLat, that._settings.MapOriginLong),
              zoom: that._settings.Zoom,
              mapTypeId: google.maps.MapTypeId.ROADMAP
        });

      });
    }

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new connectMap(this, options));
            }
        });
    }

})(jQuery, window, document);

(function($) {
    $(document).ready(function() {
      $('.connectMap').connectMap();
    });
}(jQuery));

},{"./service":2}],2:[function(require,module,exports){
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

},{}]},{},[1])