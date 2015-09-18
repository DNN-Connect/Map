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
