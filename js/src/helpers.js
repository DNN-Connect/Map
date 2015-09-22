var ConnectMapHelpers = (function($) {
  return {
    
    slidePanel: function(panel) {
      if (panel.css('display') == 'block') {
        $('body').off("click");
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
        panel.css('top', $(document).scrollTop());
        var that = this;
        panel.animate({
          right: 0
        }, 800, function() {
          $('body').on("click", function(e) {
            if ($(e.target).closest('#' + panel[0].id).length == 0) {
              that.slidePanel(panel);
            }
          });
        });
      }
    },

    formatString: function(format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    }

  }
})(jQuery);

module.exports = ConnectMapHelpers;
