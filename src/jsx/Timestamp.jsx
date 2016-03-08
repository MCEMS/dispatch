var Timestamp = React.createClass({
  propTypes: {
    timestamp: React.PropTypes.string,
    inputFormat: React.PropTypes.string,
    outputFormat: React.PropTypes.string,
    relative: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      timestamp: '2000-01-01 00:00:00',
      inputFormat: 'YYYY-MM-DD HH:mm:ss',
      outputFormat: 'MMMM Do HH:mm:ss',
      relative: false
    };
  },
  render: function() {
    var time = moment.utc(this.props.timestamp, this.props.inputFormat);
    var result = this.props.relative? time.fromNow() : time.local().format(this.props.outputFormat);
    return (
      <span>
        {result}
      </span>
    );
  }
});
