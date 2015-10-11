var AlertForm = React.createClass({
  getInitialState: function() {
    return {
      disableSending: true,
      type: '',
      location: '',
      address: '2400 W Chew Street',
      age: '',
      sex: 'Unkown',
      breathing: true,
      mentalState: true,
      conscious: true,
      notes: ''
    };
  },

  validate: function() {
    if (this.state.type.length > 0 && this.state.location.length > 0) {
      this.setState({
        disableSending: false
      });
    } else {
      this.setState({
        disableSending: true
      });
    }
  },

  handleAlert: function(e) {
    e.preventDefault();
    var self = this;
    var info = this.state.age + " year old " + this.state.sex;
    if (this.state.conscious) { info += ' conscious, '; } else { info += ' not conscious, '; }
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
        alert("There was a problem sending the alert. Please dispatch by radio.");
      } else {
          alert("Alert Sent");
          self.setState(self.getInitialState());
      }
    });
  },

  handleTypeChange: function(event) {
    this.setState({
      type: event.target.value
    });
    this.validate();
  },

  handleLocationChange: function(event) {
    this.setState({
      location: event.target.value
    });
    this.validate();
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

  handleConsciousChange: function() {
    if (this.state.conscious) {
      this.setState({ conscious: false });
    } else {
      this.setState({ conscious: true });
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
        <div className="tabnav">
          <button className="btn btn-danger right" onClick = {this.logout}>Log Out</button>
          <h1>Send Alert</h1>
        </div>
  			<form onSubmit={this.handleAlert}>
          <div className="columns">
            <div className="one-half column">
      				<div>
                <label>
                  <p className="text-closed">Chief Complaint (required)</p>
                  <p><input placeholder="What is wrong with the patient? Why are they calling for help?" className="input-block" type="text" autoFocus value={this.state.type} onBlur={this.validate} onChange={this.handleTypeChange} /></p>
                </label>
              </div>
      				<div>
                <label>
                  <p className="text-closed">Location (required)</p>
                  <p><input placeholder="Physical campus location, e.g. Walz 123" className="input-block" type="text" value={this.state.location} onBlur={this.validate} onChange={this.handleLocationChange} /></p>
                </label>
              </div>
              <div>
                <label>
                  <p>Address</p>
                  <p><input className="input-block" type="text" value={this.state.address} onChange={this.handleAddressChange} /></p>
                </label>
              </div>
            </div>
            <div className="one-fourth column">
      				<div>
                <label>
                  <p>Age</p>
                  <p><input className="input-block" type="text" value={this.state.age} onChange={this.handleAgeChange} /></p>
                </label>
              </div>
              <div className="form-checkbox">
                <label>
                  <input type="checkbox" checked={this.state.conscious} onChange={this.handleConsciousChange} />
                  Conscious
                </label>
                <p className="note">Patient is conscious</p>
              </div>
              <div className="form-checkbox">
                <label>
                  <input type="checkbox" checked={this.state.mentalState} onChange={this.handleMentalStateChange} />
                  Alert
                </label>
                <p className="note">Patient is behaving and responding normally to questions</p>
              </div>
              <div className="form-checkbox">
                <label>
                  <input type="checkbox" checked={this.state.breathing} onChange={this.handleBreathingChange} />
                  Breathing Normally
                </label>
                <p className="note">Patient is breathing regularly, is not short of breath</p>
              </div>
            </div>
            <div className="one-fourth column">
      				<div>
                <label>
                  <p>Sex</p>
                  <p><select className="input-block select" onChange={this.handleSexChange}>
      				      <option value="" selected={this.state.sex=='Unknown'}>Unknown</option>
      				      <option value='Male' selected={this.state.sex=='Male'}>Male</option>
      				      <option value='Female' selected={this.state.sex=='Female'}>Female</option>
      				      <option value='Other' selected={this.state.sex=='Other'}>Other</option>
      				    </select></p>
                </label>
              </div>
      				<div>
                <label>
                  <p>Additional Information</p>
                  <p><textarea rows="5" onChange={this.handleNotesChange} className="input-block">{this.state.notes}</textarea></p>
                </label>
              </div>
            </div>
          </div>
          <div className="columns">
            <p><input className="btn btn-primary" disabled={this.state.disableSending} type="submit" value="Send Alert" /></p>
          </div>
  			</form>
      </div>
		);
	}
});
