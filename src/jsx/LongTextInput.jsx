var LongTextInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string,
    value: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      label: '',
      autoFocus: undefined,
      onChange: function(id, value) {},
      id: '',
      value: ''
    };
  },

  handleChange: function(event) {
    this.props.onChange(this.props.id, event.target.value);
  },

  render: function() {
    return (
      <div>
        <label>
          <p>{this.props.label}</p>
          <p><textarea rows="5" onChange={this.handleChange} className="input-block" value={this.props.value} autoFocus={this.props.autoFocus} /></p>
        </label>
      </div>
    );
  }
});
