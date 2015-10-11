var LoginPage = React.createClass({
	getInitialState: function() {
		return {
			username: '',
			password: ''
		};
	},

	login: function(e) {
		e.preventDefault();
		var self = this;
		this.props.client.login(this.state.username, this.state.password, function(err) {
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
      <div>
        <h1>MCEMS Dispatch</h1>
  			<form onSubmit={this.login}>
  				<p><input type="text" autoFocus placeholder="Username" value={username} onChange={this.handleUsernameChange} /></p>
  				<p><input type="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} /></p>
  				<p><input className="btn btn-primary" type="submit" value="Log In" /></p>
  			</form>
      </div>
		);
	}
});

React.render(
	<Application />,
	document.getElementById('application')
);
