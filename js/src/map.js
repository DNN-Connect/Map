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
            React.render(<ConnectMap moduleId={moduleId} />, el);
        });
    });
}(jQuery));
