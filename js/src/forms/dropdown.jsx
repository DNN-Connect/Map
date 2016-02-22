var DropDown = React.createClass({

  getInitialState: function() {
    return {
    }
  },

  render: function() {
    var options = this.props.options.map(function(elem) {
      if (this.props.value == elem)
      {
        return (<option value={elem} selected>{elem}</option>);
      } else {
        return (<option value={elem}>{elem}</option>);
      }
    }.bind(this));
    return (
      <div className={this.props.groupClass} ref="mainDiv">
       <label htmlFor={this.props.text}>
        <span>{this.props.text}</span>
       </label>
       <select className="form-control" ref="dropdown">
       {options}
       </select>
      </div>
    );
  },

  getValue() {
    var dd = this.refs.dropdown.getDOMNode();
    return dd.options[dd.selectedIndex].value;
  }

});

module.exports = DropDown;