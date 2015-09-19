/** @jsx React.DOM */
var MapService = require('./service');

var ConnectMap = React.createClass({

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
        this.state.service.getInitialData(function(data) {
            that.setState({
                settings: data.Settings,
                mapPoints: data.MapPoints
            });
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
        return <div ref = "mapDiv" / > ;
    }

});

module.exports = ConnectMap;
