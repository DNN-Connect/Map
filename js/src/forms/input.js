/** @jsx React.DOM */
var Input = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value,
      message: this.props.regex
    }
  },

  requiredPassed: function(input) {
    if (this.props.required === undefined) {
      return true;
    } else {
      return (input != '');
    }
  },

  regexPassed: function(input) {
    if (this.props.regex === undefined) {
      return true;
    } else {
      var re = new RegExp(this.props.regex);
      return re.test(input);
    }
  },

  handleChange: function(e) {
    var input = e.target.value;
    if (this.regexPassed(input) && this.requiredPassed(input)) {
      $(this.refs.txtInput.getDOMNode()).css('background-color', 'white');
    } else {
      $(this.refs.txtInput.getDOMNode()).css('background-color', 'red');
    }
    this.setState({
      value: e.target.value
    });
  },

  getValue: function() {
    if (this.regexPassed(this.state.value) && this.requiredPassed(this.state.value)) {
      return this.state.value;
    } else {
      return null;
    }
  },

  render: function() {
    return (
      <div className={this.props.groupClass}>
       <label htmlFor={this.props.text}>
        <span>{this.props.text}</span>
       </label>
       <input
         type="text"
         ref="txtInput"
         value={this.state.value}
         onChange={this.handleChange} />
      </div>
      );
  }

});

module.exports = Input;
