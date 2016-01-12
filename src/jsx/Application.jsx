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

ReactDOM.render(
	<div>
		<Application />
		<div className="container">
			<div className="text-center">
				<a href="https://mcems.github.io/docs/MCEMS%20Dispatch%20-%20User%20Guide%20-%20Single%20Page.pdf">Help</a>
			</div>
		</div>
	</div>,
	document.getElementById('application')
);
