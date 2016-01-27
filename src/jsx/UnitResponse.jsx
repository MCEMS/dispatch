var UnitResponse = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    response: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      name: "",
      response: ""
    };
  },

  getCssClass: function() {
    var classMap = {
      'Resp': 'responding',
      'PickUp': 'pickup',
      'Driver': 'driver',
      'OnScen': 'onscene',
      'Clear': 'clear'
    };
    return classMap[this.props.response];
  },

  getInitialState: function() {
    return {};
  },

  render: function() {
    var className = this.getCssClass() + ' response';
    return (
      <div className={className}>{this.props.name}: {this.props.response}</div>
    );
  }

});
