var LoginPage = React.createClass({
	getInitialState: function() {
		return {
			enableInput: true,
			username: '',
			password: '',
			flash: null
		};
	},

	login: function(e) {
		e.preventDefault();
		var self = this;
		this.setState({
			enableInput: false,
			flash: null
		});

		this.props.client.login(this.state.username, this.state.password, function(err) {
			self.setState({ enableInput: true });

			if (err) {
				self.setState({
					password: '',
					flash: <ErrorMessage message='Invalid credentials' />
				});
			} else {
				self.props.application.setState({
					component: <AlertPage client={self.props.client} application={self.props.application} />
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
					{this.state.flash}
					<form onSubmit={this.login}>
						<p><input disabled={!this.state.enableInput} className="input-block input-large" type="text" autoFocus placeholder="Username" value={username} onChange={this.handleUsernameChange} /></p>
						<p><input disabled={!this.state.enableInput} className="input-block input-large" type="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} /></p>
						<p><input disabled={!this.state.enableInput} className="btn btn-primary btn-block" type="submit" value="Log In" /></p>
					</form>
				</div>
      </div>
		);
	}
});
