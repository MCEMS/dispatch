var TextInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    required: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      label: '',
      placeholder: '',
      defaultValue: '',
      autoFocus: false,
      required: false
    };
  },

  getInitialState: function() {
    return {
      value: this.props.defaultValue || ''
    };
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  validate: function() {
    if (this.props.required) {
      return (this.state.value != '' && this.state.value.length > 0)
    } else {
      return true;
    }
  },

  render: function() {
    var className = 'form';
    if (!this.validate()) className += ' errored';

    return (
      <div>
        <dl className={className}>
          <dt><label>{this.props.label}</label></dt>
          <dd><input placeholder={this.props.placeholder} className="input-block" type="text" autoFocus={this.props.autoFocus} value={this.state.value} onChange={this.handleChange} /></dd>
          <dd className='error'>This field is required</dd>
        </dl>
      </div>
    );
  }
});
