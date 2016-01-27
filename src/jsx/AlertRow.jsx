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

  render: function() {
    var responsesToDisplay = this.props.responses.filter(function(response) {
      return response.response !== 'watch';
    });
    return (
      <tr>
        <td>{this.props.timestamp}</td>
        <td>{this.props.description}</td>
        <td>{this.props.location} <br /> {this.props.address}</td>
        <td>
         {responsesToDisplay.map(function(response, index) {
           return <UnitResponse key={index} {...response} />;
         })}
        </td>
        <td>{this.props.id}</td>
      </tr>
    );
  }

});