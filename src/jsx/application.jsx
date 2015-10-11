var Application = React.createClass({
	getInitialState: function() {
		return {
			client: new MCEMS(),
			component: null
		};
	},

	componentDidMount: function() {
		if (this.isMounted()) {
			this.setState({
				component: <LoginPage client={this.state.client} application={this} />
			});
		}
	},

	render: function() {
		return this.state.component;
	}
});
