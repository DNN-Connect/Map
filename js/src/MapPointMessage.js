/** @jsx React.DOM */
var EditMapPoint = require('./EditMapPoint');

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
    window.ConnectMap.slidePanel($('#connectMapPanel'));
    return false;
  },

  deletePoint: function() {
    if (confirm('Do you wish to delete this point?')) {
      this.props.OnDelete(this.props.MapPoint, this.props.Marker);
    }
  },

  render: function() {

    var editLink;
    if (this.props.CanEdit) {
      editLink = (
        <a href="#" onClick={this.edit}>Edit</a>
        );
      deleteLink = (
        <a href="#" onClick={this.deletePoint}>Delete</a>
        );
    }

    return (
      <div>
       {this.state.mapPoint.Message}<br />
       <em>Created by {this.state.mapPoint.CreatedByUser}</em><br />
       {editLink} {deleteLink}
      </div>
      )
  }

});

module.exports = MapPointMessage;
