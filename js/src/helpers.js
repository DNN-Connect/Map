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
        panel.animate({
          right: 0
        }, 800);
        var that = this;
        $('body').on("click", function(e) {
          if ($(e.target).closest('#' + panel[0].id).length == 0) {
            that.slidePanel(panel);
          }
        });
      }
    }
  }
})(jQuery);

module.exports = ConnectMapHelpers;