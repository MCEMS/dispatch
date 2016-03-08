var AlertTable = React.createClass({
  getDefaultProps: function() {
    return {
      client: null
    };
  },

  getInitialState: function() {
    return {
      alerts: []
    };
  },

  refreshState: function() {
    var component = this;
    this.props.client.getAlerts(function(err, alerts) {
      if (err) {
        component.setState({ alerts: [] });
      } else {
        component.setState({ alerts: alerts });
      }
    });
  },

  componentDidMount: function() {
    this.refreshState();
    this.refreshTimer = setInterval(this.refreshState, 15*1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.refreshTimer);
  },

  compareAlerts: function(a, b) {
    var format = 'YYYY-MM-DD HH:mm:ss';
    var dateA = moment.utc(a.timestamp, format);
    var dateB = moment.utc(b.timestamp, format);

    if (dateA.isSame(dateB)) {
      return 0;
    } else if (dateA.isBefore(dateB)) {
      return 1;
    } else {
      return -1;
    }
  },

  render: function() {
    var sortedAlerts = this.state.alerts.sort(this.compareAlerts);
    return (
      <table className='alertTable'>
        <tbody>
          <tr>
            <th>Time Sent</th>
            <th>Call</th>
            <th>Location</th>
            <th>Units</th>
            <th>Incident</th>
          </tr>
          {sortedAlerts.map(function(alert) {
            return <AlertRow key={alert.id} {...alert} />;
          })}
        </tbody>
      </table>
    );
  }
});
