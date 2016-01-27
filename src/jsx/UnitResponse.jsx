var UnitResponse = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    response: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      name: "",
      response: ""
    };
  },

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>{this.props.name}: {this.props.response}</div>
    );
  }

});