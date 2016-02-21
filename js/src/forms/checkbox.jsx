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
      value: !this.state.value
    });
  },

  getValue() {
    return this.state.value;
  },

  render() {
    return (
      <div className={this.props.groupClass} ref="mainDiv">
       <label htmlFor={this.props.text} className="conInputCheck">
        <span>{this.props.text}</span>
       </label>
       <input type="checkbox" ref="chk" checked={this.state.value} onChange={this.handleChange} />
      </div>
    );
  },

});
