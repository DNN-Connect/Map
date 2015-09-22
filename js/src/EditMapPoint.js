/** @jsx React.DOM */
var ConnectMapHelpers = require('./helpers'),
    TextBlock = require('./forms/textblock');

var EditMapPoint = React.createClass({

  handleUpdate: function() {
    var newMapPoint = this.props.MapPoint;
    newMapPoint.Message = this.refs.txtMessage.getValue();
    this.props.onUpdate(newMapPoint, this.props.Marker);
    ConnectMapHelpers.slidePanel($('#connectMapPanel'));
  },

  render: function() {

    var buttonText = "Update Point";
    if (this.props.MapPoint.MapPointId === undefined)
    {
      buttonText = "Add Point";
    }

    return (
      <div>
        <div>Latitude: {this.props.MapPoint.Latitude}</div>
        <div>Longitude: {this.props.MapPoint.Longitude}</div>
        <TextBlock 
          text="Message"
          ref="txtMessage"
          value={this.props.MapPoint.Message}
          groupClass="conInput" />
       <button className="dnnPrimaryAction" onClick={this.handleUpdate}>{buttonText}</button>
      </div>
     );
  }

});

module.exports = EditMapPoint;
