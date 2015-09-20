/** @jsx React.DOM */
var Input = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value
    }
  },

  handleChange: function(e) {
    this.setState({
      value: e.target.value
    });
  },

  getValue: function() {
    return this.state.value;
  },

  render: function() {
    return (
      <div className={this.props.groupClass} ref="mainDiv">
       <label htmlFor={this.props.text}>
        <span>{this.props.text}</span>
       </label>
       <textarea ref="txtInput" value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  },

});

module.exports = Input;
