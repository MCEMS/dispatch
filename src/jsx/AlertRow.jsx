var AlertRow = React.createClass({
  propTypes: {
    timestamp: React.PropTypes.string,
    description: React.PropTypes.string,
    location: React.PropTypes.string,
    address: React.PropTypes.string,
    id: React.PropTypes.number,
    responses: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      timestamp: "",
      description: "",
      location: "",
      address: "",
      id: null,
      responses: []
    };
  },

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <tr>
        <td>{alert.timestamp}</td>
        <td>{alert.description}</td>
        <td>{alert.location} <br /> {alert.address}</td>
        <td>
          {this.state.responses.map(function(response) {
            return <UnitResponse key={response.id} name={response.name} status={response.status} />;
          })}
        </td>
        <td>{alert.id}</td>
      </tr>
    );
  }

});