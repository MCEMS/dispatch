var AlertPage = React.createClass({
  getDefaultProps: function() {
    return {
      client: null,
      application: null
    };
  },

  getInitialState: function() {
    return {
      enableSending: false,
      chiefComplaint: '',
      location: '',
      address: '2400 W CHEW ST',
      age: '',
      sex: 'Unknown Sex',
      notes: '',
      isConscious: true,
      isAlert: true,
      isBreathing: true,
      ambulanceRequested: false
    };
  },

  getInfo: function() {
    var age = Number(this.state.age);
    var sex = this.state.sex;
    var isConscious = this.state.isConscious;
    var isAlert = this.state.isAlert;
    var isBreathing = this.state.isBreathing;
    var ambulanceRequested = this.state.ambulanceRequested;
    var notes = this.state.notes;

    var info = '';
    info += (age > 0 ? (age + ' Y/O ') : 'Unknown age ');
    info += sex + '. ';
    info += (isConscious ? 'Conscious, ' : 'Unconscious, ');
    info += (isAlert ? 'alert, ' : 'not alert, ');
    info += (isBreathing ? 'breathing normally. ' : 'abnormal breathing. ');
    info += (ambulanceRequested ? 'Ambulance requested. ' : '');
    info += notes;

    return info;
  },

  getAlert: function() {
    return {
      type: this.state.chiefComplaint,
      location: this.state.location,
      address: this.state.address,
      info: this.getInfo()
    };
  },

  handleInputElementChange: function(id, value) {
    var chiefComplaint = (id == 'chiefComplaint' ? value : this.state.chiefComplaint);
    var location = (id == 'location' ? value : this.state.location);

    var state = {};
    state[id] = value;
    state.enableSending = (chiefComplaint != '' && location != '');
    this.setState(state);
  },

  handleAlert: function(e) {
    e.preventDefault();
    var self = this;
    
    // Prevent sending a duplicate alert
    self.setState({
      enableSending: false
    });

    this.props.client.sendAlert(this.getAlert(), function(err) {
      // Re-enable sending alerts, this one has been processed
      self.setState({
        enableSending: true
      });

      if (err) {
        alert('There was a problem sending the alert. Please dispatch by radio.');
      } else {
          alert('Alert Sent');
          self.setState(self.getInitialState());
      }
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
        <div className='tabnav'>
          <div className='right'>
            <div className='tabnav-extra'>
              <button className='btn btn-primary' disabled={!this.state.enableSending} onClick={this.handleAlert}>Send Alert</button>
            </div>
            <div className='tabnav-extra'>
              <button className='btn btn-danger' onClick={this.logout}>Log Out</button>
            </div>
          </div>
          <h1>Dispatch MCEMS</h1>
        </div>
  			<form onSubmit={this.handleAlert}>
          <div className='columns'>
            <div className='one-third column'>
              <TextInput
                label='Chief Complaint'
                placeholder='Why is the patient calling for help?'
                id='chiefComplaint'
                onChange={this.handleInputElementChange}
                value={this.state.chiefComplaint}
                error={this.state.chiefComplaint==''}
                autoFocus={true} />

      				<TextInput
                label='Location'
                placeholder='Physical campus location, e.g. Walz 123'
                id='location'
                value={this.state.location}
                error={this.state.location==''}
                onChange={this.handleInputElementChange} />

              <TextInput
                label='Address'
                defaultValue='2400 W CHEW ST'
                id='address'
                value={this.state.address}
                onChange={this.handleInputElementChange} />
            </div>
            <div className='one-third column'>
              <TextInput
                label='Age'
                placeholder='Unknown'
                id='age'
                value={this.state.age}
                onChange={this.handleInputElementChange} />

              <SelectInput
                label='Sex'
                options={[
                  'Unknown sex',
                  'Male',
                  'Female',
                  'Other'
                ]}
                id='sex'
                value={this.state.sex}
                onChange={this.handleInputElementChange} />

              <LongTextInput
                label='Additional Information'
                id='notes'
                value={this.state.notes}
                onChange={this.handleInputElementChange} />
            </div>
            <div className='one-third column'>
              <CheckboxInput
                label='Conscious'
                note='Patient is awake'
                id='isConscious'
                value={this.state.isConscious}
                onChange={this.handleInputElementChange} />

              <CheckboxInput
                label='Alert'
                note='Patient is behaving and responding normally to questions'
                id='isAlert'
                value={this.state.isAlert}
                onChange={this.handleInputElementChange} />

              <CheckboxInput
                label='Breathing Normally'
                note='Patient is breathing regularly, is not short of breath'
                id='isBreathing'
                value={this.state.isBreathing}
                onChange={this.handleInputElementChange} />

              <CheckboxInput
                label='Ambulance Requested'
                note='An ambulance has also been requested for this patient'
                id='ambulanceRequested'
                value={this.state.ambulanceRequested}
                onChange={this.handleInputElementChange} />
            </div>
          </div>
  			</form>
      </div>
		);
	}
});
