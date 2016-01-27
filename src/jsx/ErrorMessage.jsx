var ErrorMessage = React.createClass({
  getDefaultProps: function() {
    return {
      message: ''
    };
  },

  render: function() {
    return (
      <div className='flash-messages'>
        <div className='flash flash-error'>{this.props.message}</div>
      </div>
    );
  }
});
