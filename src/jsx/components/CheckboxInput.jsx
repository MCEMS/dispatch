var CheckboxInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    note: React.PropTypes.string,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string,
    value: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      label: '',
      note: '',
      onChange: function(id, value) {},
      id: '',
      value: false
    };
  },

  handleChange: function() {
    this.props.onChange(this.props.id, !this.props.value);
  },

  render: function() {
    return (
      <div className="form-checkbox">
        <label>
          <input type="checkbox" checked={this.props.value} onChange={this.handleChange} />
          {this.props.label}
        </label>
        <p className="note">{this.props.note}</p>
      </div>
    );
  }
});
