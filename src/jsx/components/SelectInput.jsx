var SelectInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    options: React.PropTypes.arrayOf(React.PropTypes.string),
    onChange: React.PropTypes.func,
    id: React.PropTypes.string,
    value: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      label: '',
      options: [],
      onChange: function(id, value) {},
      id: '',
      value: ''
    };
  },

  handleChange: function(event) {
    this.props.onChange(this.props.id, event.target.value);
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
          <select onChange={this.handleChange} value={this.props.value}>
            {options}
          </select>
        </label>
      </div>
    );
  }
});
