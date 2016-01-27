var UnitResponse = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    status: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      name: "",
      status: ""
    };
  },

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div>{this.props.name}: {this.props.status}</div>
    );
  }

});