var TextBox = require('./forms/textbox.jsx'),
  CheckBox = require('./forms/checkbox.jsx'),
  DropDown = require('./forms/dropdown.jsx');

module.exports = React.createClass({

  getInitialState() {
    return {
    }
  },

  render() {
    return (
      <div className="conSettings">
        <TextBox 
          text={this.props.resources.MapWidth}
          ref="txtMapWidth"
          value={this.props.Settings.MapWidth}
          regex="(\d+)(px|%)"
          errorMessage={this.props.resources.CssSizeError}
          groupClass="conInput" />
        <TextBox 
          text={this.props.resources.MapHeight}
          ref="txtMapHeight"
          value={this.props.Settings.MapHeight}
          regex="(\d+)(px|%)"
          errorMessage={this.props.resources.CssSizeError}
          groupClass="conInput" />
        <CheckBox
          text={this.props.resources.AllowOtherEdit}
          ref="chkAllowOtherEdit"
          value={this.props.Settings.AllowOtherEdit}
          groupClass="conInput" />
        <TextBox 
          text={this.props.resources.GoogleMapsAPIKey}
          ref="txtGoogleKey"
          value={this.props.Settings.GoogleMapApiKey}
          groupClass="conInput" />
        <DropDown
          text={this.props.resources.MapType}
          ref="ddMapType"
          value={this.props.Settings.MapType}
          options={['ROADMAP','SATELLITE','HYBRID','TERRAIN']}
          groupClass="conInput" />
       <button className="dnnPrimaryAction" onClick={this.handleUpdate}>{this.props.resources.Update}</button>
      </div>
    );
  },

  componentDidMount() {
    this.refs.txtMapWidth.getDOMNode().value = this.props.Settings.MapWidth;
    this.refs.txtMapHeight.getDOMNode().value = this.props.Settings.MapHeight;
    this.refs.chkAllowOtherEdit.getDOMNode().value = this.props.Settings.AllowOtherEdit;
    this.refs.txtGoogleKey.getDOMNode().value = this.props.Settings.GoogleMapApiKey;
  },

  handleUpdate() {
    var newSettings = this.props.Settings;
    newSettings.MapWidth = this.refs.txtMapWidth.getValue() || newSettings.MapWidth;
    newSettings.MapHeight = this.refs.txtMapHeight.getValue() || newSettings.MapHeight;
    newSettings.AllowOtherEdit = this.refs.chkAllowOtherEdit.getValue() || newSettings.AllowOtherEdit;
    newSettings.GoogleMapApiKey = this.refs.txtGoogleKey.getValue();
    newSettings.MapType = this.refs.ddMapType.getValue();
    this.props.onUpdate(newSettings);
    window.ConnectMap.slidePanel($('#connectMapPanel'));
  }

});
