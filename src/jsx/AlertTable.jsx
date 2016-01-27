var AlertTable = React.createClass({
  getDefaultProps: function() {
    return {
      client: null
    };
  },

  getInitialState: function() {
    this.props.client.getAlerts(function(err, alerts) {
      if (err) {
        return { alerts: [] };
      } else {
        return { alerts: alerts };
      }
    });
  },

  componentDidMount: function() {
    setInterval(this.setState(this.getInitialState()), 30)
  },

  render: function() {
    return (
      <table>
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
      </table>
    );
  }
});