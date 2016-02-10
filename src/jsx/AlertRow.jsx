var AlertRow = React.createClass({
  propTypes: {
    timestamp: React.PropTypes.string,
    description: React.PropTypes.string,
    location: React.PropTypes.string,
    address: React.PropTypes.string,
    id: React.PropTypes.string,
    responses: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      timestamp: "",
      description: "",
      location: "",
      address: "",
      id: "",
      responses: []
    };
  },

  getInitialState: function() {
    return {};
  },

  compareResponse: function(a, b) {
    var values = [];
    values["Resp"] = 4;
    values["Driver"] = 3;
    values["OnScen"] = 2;
    values["Clear"] = 1;
    values["Sprvsr"] = 0;

    if(values[a.response] > values[b.response]) {
      return 0;
    }
    else {
      return 1;
    }
  },

  getResponsesToDisplay: function() {
    var deviceIds = [];
    var devices = {};
    var latestForDevice = {};

    for (var k = 0; k < this.props.responses.length; k++) {
      var response = this.props.responses[k];
      if (!devices[response.deviceId]) {
        deviceIds.push(response.deviceId);
        devices[response.deviceId] = true;
      }
      if (latestForDevice[response.deviceId]) {
        var existingTimestamp = new Date(latestForDevice[response.deviceId].timestamp);
        var newTimestamp = new Date(response.timestamp);
        if (newTimestamp > existingTimestamp) {
          latestForDevice[response.deviceId] = response;
        }
      } else {
        latestForDevice[response.deviceId] = response;
      }
    }
    var latestResponses = [];
    for (var k = 0; k < deviceIds.length; k++) {
      var id = deviceIds[k];
      latestResponses.push(latestForDevice[id]);
    }

    return latestResponses.filter(function(response) {
      return response.response !== 'watch';
    });
  },

  render: function() {
    var sortedResponses = this.getResponsesToDisplay().sort(this.compareResponse);

    return (
      <tr>
        <td>{this.props.timestamp}</td>
        <td>{this.props.description}</td>
        <td>{this.props.address} <br /> {this.props.location}</td>
        <td>
         {sortedResponses.map(function(response, index) {
           return <UnitResponse key={index} {...response} />;
         })}
        </td>
        <td>{this.props.id}</td>
      </tr>
    );
  }

});
