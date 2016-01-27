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
    setInterval(this.refreshState, 30*1000);
  },

  render: function() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Time Sent</th>
            <th>Call</th>
            <th>Location</th>
            <th>Units</th>
            <th>Incident</th>
          </tr>
          {this.state.alerts.map(function(alert) {
            return <AlertRow key={alert.id} {...alert} />;
          })}
        </tbody>
      </table>
    );
  }
});