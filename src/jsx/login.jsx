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
				alert("Try again");
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
			<form onSubmit={this.login}>
				<input type="text" placeholder="Username" value={username} onChange={this.handleUsernameChange} />
				<input type="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} />
				<input type="submit" value="Log In" />
			</form>
		);
	}
});

var AlertForm = React.createClass({
  getInitialState: function() {
    return {
      type: '',
      location: '',
      address: '2400 W Chew Street',
      age: '',
      sex: 'Unkown',
      breathing: true,
      mentalState: true,
      notes: ''
    };
  },

  handleAlert: function(e) {
    e.preventDefault();
    var self = this;
    var info = this.state.age + " year old " + this.state.sex;
    if (this.state.mentalState) { info += " alert, "; } else { info += " not alert, "; }
    if (this.state.breathing) { info += " breathing normally. "; } else { info += " not breathing normally. "; }
    info += this.state.notes;
    var sendAlert = {
      type: this.state.type,
      location: this.state.location,
      address: this.state.address,
      info: info
    };
    this.props.client.sendAlert(sendAlert, function(err) {
      if (err) {
        alert("Could not send alert.");
      } else {
          alert("Alert Sent!");
          self.setState(self.getInitialState());
      }
    });
  },

  handleTypeChange: function(event) {
    this.setState({
      type: event.target.value
    });
  },

  handleLocationChange: function(event) {
    this.setState({
      location: event.target.value
    });
  },
  handleAddressChange: function(event) {
    this.setState({
      address: event.target.value
    });
  },
  handleAgeChange: function(event) {
    this.setState({
      age: event.target.value
    });
  },
  handleSexChange: function(event) {
    this.setState({
      sex: event.target.value
    });
  },
  handleMentalStateChange: function() {
    if (this.state.mentalState) {
      this.setState({ mentalState: false });
    } else {
      this.setState({ mentalState: true });
    }
  },
  handleBreathingChange: function(event) {
    if (this.state.breathing) {
      this.setState({ breathing: false });
    } else {
      this.setState({ breathing: true });
    }
  },

  handleNotesChange: function(event) {
    this.setState({
      notes: event.target.value
    });
  },
  logout: function() {
    this.props.client.logout();
    this.props.application.setState({
      component: <LoginPage client={this.props.client} application={this.props.application} />
    });

  },
	render: function() {
		return (
      <div>
  			<form onSubmit={this.handleAlert}>
  				<label>Type:</label><input type="text" value={this.state.type} onChange={this.handleTypeChange} />
  				<label>Location:</label><input type="text" value={this.state.location} onChange={this.handleLocationChange} />
          <label>Address:</label><input type="text" value={this.state.address} onChange={this.handleAddressChange} />
  				<label>Age:</label><input type="text" value={this.state.age} onChange={this.handleAgeChange} />
  				<select name="Sex:" onChange={this.handleSexChange}>
  				  <option value="" selected={this.state.sex=='Unknown'}>Unknown</option>
  				  <option value='Male' selected={this.state.sex=='Male'}>Male</option>
  				  <option value='Female' selected={this.state.sex=='Female'}>Female</option>
  				  <option value='Other' selected={this.state.sex=='Other'}>Other</option>
  				</select>
  				<label>Alert: </label><input type="checkbox" checked={this.state.mentalState} onChange={this.handleMentalStateChange} />
  				<label>Breathing Normally</label><input type="checkbox" checked={this.state.breathing} onChange={this.handleBreathingChange} />
  				<label>Notes:</label><input type="text" value={this.state.notes} onChange={this.handleNotesChange} />
  				<input type="submit" value="Submit" />
  			</form>
        <button onClick = {this.logout}>Log Out</button>
      </div>
		);
	}
});

React.render(
	<Application />,
	document.getElementById('application')
);
