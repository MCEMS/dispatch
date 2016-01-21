var TextInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    error: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string,
    value: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      label: '',
      placeholder: '',
      autoFocus: false,
      error: false,
      onChange: function(id, value) {},
      id: '',
      value: ''
    };
  },

  handleChange: function(event) {
    this.props.onChange(this.props.id, event.target.value);
  },

  render: function() {
    var className = 'form';
    if (this.props.error) className += ' errored';

    return (
      <div>
        <dl className={className}>
          <dt><label>{this.props.label}</label></dt>
          <dd><input placeholder={this.props.placeholder} className="input-block" type="text" autoFocus={this.props.autoFocus} value={this.props.value} onChange={this.handleChange} /></dd>
        </dl>
      </div>
    );
  }
});
