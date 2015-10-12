var AlertForm = React.createClass({
  getInitialState: function() {
    return {
      enableSending: false,
      type: '',
      location: '',
      address: '2400 W Chew Street',
      age: '',
      sex: 'Unkown',
      breathing: true,
      mentalState: true,
      conscious: true,
      ambulanceRequested: false,
      notes: ''
    };
  },

  validate: function() {
    if (this.state.type.length > 0 && this.state.location.length > 0) {
      this.setState({
        enableSending: true
      });
    } else {
      this.setState({
        enableSending: false
      });
    }
  },

  handleAlert: function(e) {
    e.preventDefault();
    var self = this;
    
    // Prevent sending a duplicate alert
    self.setState({
      enableSending: false
    });
    
    var info = '';
    info += (Number(this.state.age) > 0 ? (Number(this.state.age) + ' Y/O ') : 'Unknown age ');
    info += this.state.sex + ' ';
    info += (this.state.conscious ? 'conscious, ' : 'not conscious, ');
    info += (this.state.mentalState ? 'alert, ' : 'not alert, ');
    info += (this.state.breathing ? 'breathing normally. ' : 'abnormal breathing. ');
    info += (this.state.ambulanceRequested ? 'Ambulance requested. ' : '');
    info += this.state.notes;

    var sendAlert = {
      type: this.state.type,
      location: this.state.location,
      address: this.state.address,
      info: info
    };

    this.props.client.sendAlert(sendAlert, function(err) {
      // Re-enable sending alerts, this one has been processed
      self.setState({
        enableSending: true
      });

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
    this.setState({
      mentalState: !this.state.mentalState
    });
  },

  handleBreathingChange: function(event) {
    this.setState({
      breathing: !this.state.breathing
    });
  },

  handleConsciousChange: function() {
    this.setState({
      conscious: !this.state.conscious
    });
  },

  handleNotesChange: function(event) {
    this.setState({
      notes: event.target.value
    });
  },

  handleAmbulanceRequestedChange: function() {
    this.setState({
      ambulanceRequested: !this.state.ambulanceRequested
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
          <div className="right">
            <div className="tabnav-extra">
              <button className="btn btn-primary" disabled={!this.state.enableSending} onClick={this.handleAlert}>Send Alert</button>
            </div>
            <div className="tabnav-extra">
              <button className="btn btn-danger" onClick = {this.logout}>Log Out</button>
            </div>
          </div>
          <h1>Dispatch MCEMS</h1>
        </div>
  			<form onSubmit={this.handleAlert}>
          <div className="columns">
            <div className="one-third column">
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
            <div className="one-third column">
              <div>
                <label>
                  <p>Age</p>
                  <p><input placeholder="Unknown" className="input-block" type="text" value={this.state.age} onChange={this.handleAgeChange} /></p>
                </label>
              </div>
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
            <div className="one-third column">
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
              <div className="form-checkbox">
                <label>
                  <input type="checkbox" checked={this.state.ambulanceRequested} onChange={this.handleAmbulanceRequestedChange} />
                  Ambulance Requested
                </label>
                <p className="note">An ambulance has also been requested for this patient</p>
              </div>
            </div>
          </div>
  			</form>
      </div>
		);
	}
});
