var LongTextInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    autoFocus: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      label: '',
      defaultValue: '',
      autoFocus: undefined
    };
  },

  getInitialState: function() {
    return {
      value: this.props.defaultValue
    }
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  render: function() {
    return (
      <div>
        <label>
          <p>{this.props.label}</p>
          <p><textarea rows="5" onChange={this.handleChange} className="input-block" value={this.state.value} autoFocus={this.props.autoFocus} /></p>
        </label>
      </div>
    );
  }
});
