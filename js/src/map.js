/** @jsx React.DOM */
var ConnectMap = require('./ConnectMap');

(function($) {
    $(document).ready(function() {
        $('.connectMap').each(function(i, el) {
            var moduleId = $(el).data('moduleid');
            React.render(<ConnectMap moduleId={moduleId} />, el);
        });
    });
}(jQuery));
