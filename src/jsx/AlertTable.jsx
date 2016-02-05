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
    var dateA = new Date(a.timestamp);
    var dateB = new Date(b.timestamp);

    if (dateA > dateB) {
      return -1;
    }
    else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
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
