/** @jsx React.DOM */
var MapService = require('./service'),
    ConnectMapHelpers = require('./helpers')
    ConnectMapSettings = require('./ConnectMapSettings');

var ConnectMap = React.createClass({

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
            React.render(<ConnectMapSettings Settings={that.state.settings} onUpdate={that.onSettingsUpdate} />, $('#connectMapPanel')[0]);
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
          <div ref="mapDiv" />
          );
    }

});

module.exports = ConnectMap;
