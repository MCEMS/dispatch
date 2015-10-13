var SelectInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    options: React.PropTypes.arrayOf(React.PropTypes.string),
    defaultValue: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      label: '',
      options: [],
      defaultValue: ''
    };
  },

  getInitialState: function() {
    return {
      value: this.props.options[0]
    };
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  render: function() {
    var self = this;

    var options = this.props.options.map(function(option, id) {
      return (
        <option key={id} value={option}>{option}</option>
      );
    });

    return (
      <div>
        <label>
          <p>{this.props.label}</p>
          <select onChange={this.handleChange}>
            {options}
          </select>
        </label>
      </div>
    );
  }
});
