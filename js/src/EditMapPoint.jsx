var TextBlock = require('./forms/textblock.jsx');

module.exports = React.createClass({

  getInitialState() {
    return {
    }
  },

  handleUpdate() {
    var newMapPoint = this.props.MapPoint;
    newMapPoint.Message = this.refs.txtMessage.getValue();
    this.props.onUpdate(newMapPoint, this.props.Marker);
    window.ConnectMap.slidePanel($('#connectMapPanel'));
  },

  render() {

    var buttonText = this.props.resources.UpdatePoint;
    if (this.props.MapPoint.MapPointId === undefined)
    {
      buttonText = this.props.resources.AddPoint;
    }

    return (
      <div>
        <div>Latitude: {this.props.MapPoint.Latitude}</div>
        <div>Longitude: {this.props.MapPoint.Longitude}</div>
        <TextBlock 
          className="formFocus"
          text={this.props.resources.Message}
          ref="txtMessage"
          value={this.props.MapPoint.Message}
          groupClass="conInput" />
       <button className="dnnPrimaryAction" onClick={this.handleUpdate}>{buttonText}</button>
      </div>
     );
  }

});
