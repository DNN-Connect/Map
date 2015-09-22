/** @jsx React.DOM */
var ConnectMapComponent = require('./ConnectMap');



;
(function($, window, document, undefined) {

  $(document).ready(function() {
    if ($('#connectMapPanel').length == 0) {
      $('body').append('<div id="connectMapPanel" class="connectMapPanel"></div>');
    };
    var googleScript = 'http://maps.googleapis.com/maps/api/js?callback=ConnectMap.loadMaps';
    if ($('.connectMap').first().data('googlekey') !== '') {
      googleScript += '&key=' + $('.connectMap').first().data('googlekey');
    }
    loadScript(googleScript);
  });

  window.loadScript = function(src, callback) {
    var s,
      r,
      t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function() {
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        if (callback !== undefined) {
          callback();
        }
      }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }

  window.ConnectMap = {
    loadMaps: function() {
      $('.connectMap').each(function(i, el) {
        var moduleId = $(el).data('moduleid');
        React.render(<ConnectMapComponent moduleId={moduleId} />, el);
      });
    }
  }

})(jQuery, window, document);
