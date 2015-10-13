var CheckboxInput = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.bool,
    label: React.PropTypes.string,
    note: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      defaultValue: false,
      label: '',
      note: ''
    };
  },

  getInitialState: function() {
    return {
      value: this.props.defaultValue || false
    };
  },

  handleChange: function() {
    this.setState({
      value: !this.state.value
    });
  },

  render: function() {
    return (
      <div className="form-checkbox">
        <label>
          <input type="checkbox" checked={this.state.value} onChange={this.handleChange} />
          {this.props.label}
        </label>
        <p className="note">{this.props.note}</p>
      </div>
    );
  }
});
