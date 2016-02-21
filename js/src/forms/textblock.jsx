module.exports = React.createClass({

  getInitialState() {
    return {
      value: this.props.value
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  },

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  },

  getValue() {
    return this.refs.txtInput.getDOMNode().value;
  },

  render() {
    return (
      <div className={this.props.groupClass} ref="mainDiv">
       <label htmlFor={this.props.text}>
        <span>{this.props.text}</span>
       </label>
       <textarea ref="txtInput" value={this.state.value} onChange={this.handleChange} className={this.props.className} />
      </div>
    );
  },

});
