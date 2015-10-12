var LoginPage = React.createClass({
	getInitialState: function() {
		return {
			enableLoginButton: true,
			username: '',
			password: ''
		};
	},

	login: function(e) {
		e.preventDefault();
		var self = this;
		this.setState({
			enableLoginButton: false
		});

		this.props.client.login(this.state.username, this.state.password, function(err) {
			self.setState({
				enableLoginButton: true
			});

			if (err) {
				alert("Invalid credentials");
			} else {
				self.props.application.setState({
					component: <AlertForm client={self.props.client} application={self.props.application} />
				});
			}
		});
	},

	handleUsernameChange: function(event) {
		this.setState({
			username: event.target.value
		});
	},

	handlePasswordChange: function(event) {
		this.setState({
			password: event.target.value
		});
	},

	render: function() {
		var username = this.state.username;
		var password = this.state.password;
		return (
			<div className="columns">
				<div className="one-third column centered">
					<h1 className="text-center">MCEMS Dispatch</h1>
					<form onSubmit={this.login}>
						<p><input className="input-block input-large" type="text" autoFocus placeholder="Username" value={username} onChange={this.handleUsernameChange} /></p>
						<p><input className="input-block input-large" type="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} /></p>
						<p><input disabled={!this.state.enableLoginButton} className="btn btn-primary btn-block" type="submit" value="Log In" /></p>
					</form>
				</div>
      </div>
		);
	}
});

React.render(
	<Application />,
	document.getElementById('application')
);
