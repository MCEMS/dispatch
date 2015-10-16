var FlashMessage = React.createClass({
  getDefaultProps: function() {
    return {
      message: ''
    };
  },

  render: function() {
    return (
      <div className='flash-messages'>
        <div className='flash'>{this.props.message}</div>
      </div>
    );
  }
});
