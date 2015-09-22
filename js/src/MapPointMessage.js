/** @jsx React.DOM */
var EditMapPoint = require('./EditMapPoint'),
    ConnectMapHelpers = require('./helpers');

var MapPointMessage = React.createClass({

  getInitialState: function() {
    return {
      mapPoint: this.props.MapPoint
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      mapPoint: nextProps.MapPoint
    });
  },

  onEdit: function(newMapPoint, marker) {
    this.setState({
      mapPoint: newMapPoint
    });
    this.props.OnEdit(newMapPoint, marker);
  },

  edit: function() {
    React.render(
      <EditMapPoint MapPoint={this.props.MapPoint} onUpdate={this.onEdit} Marker={this.props.Marker} />, $('#connectMapPanel')[0]);
    ConnectMapHelpers.slidePanel($('#connectMapPanel'));
    return false;
  },

  render: function() {

    var editLink;
    if (this.props.CanEdit) {
      editLink = (
        <a href="#" onClick={this.edit}>Click me</a>
        );
    }

    return (
      <div>
       {this.state.mapPoint.Message}<br />
       <em>Created by {this.state.mapPoint.CreatedByUser}</em><br />
       {editLink}
      </div>
      )
  }

});

module.exports = MapPointMessage;
