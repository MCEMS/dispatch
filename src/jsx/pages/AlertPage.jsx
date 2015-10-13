var AlertPage = React.createClass({
  getDefaultProps: function() {
    return {
      client: null,
      application: null
    };
  },

  getInitialState: function() {
    return {
      enableSending: true
    };
  },

  getInfo: function() {
    var age = Number(this.refs.age.state.value);
    var sex = this.refs.sex.state.value;
    var conscious = this.refs.conscious.state.value;
    var alert = this.refs.alert.state.value;
    var breathing = this.refs.breathing.state.value;
    var ambulanceRequested = this.refs.ambulanceRequested.state.value;
    var notes = this.refs.notes.state.value;

    var info = '';
    info += (age > 0 ? (age + ' Y/O ') : 'Unknown age ');
    info += sex + '. ';
    info += (conscious ? 'Conscious, ' : 'Unconscious, ');
    info += (alert ? 'alert, ' : 'not alert, ');
    info += (breathing ? 'breathing normally. ' : 'abnormal breathing. ');
    info += (ambulanceRequested ? 'Ambulance requested. ' : '');
    info += notes;

    return info;
  },

  getAlert: function() {
    return {
      type: this.refs.complaint.state.value,
      location: this.refs.location.state.value,
      address: this.refs.address.state.value,
      info: this.getInfo()
    };
  },

  // handleAlert: function(e) {
  //   e.preventDefault();
  //   var self = this;
    
  //   // Prevent sending a duplicate alert
  //   self.setState({
  //     enableSending: false
  //   });

  //   this.props.client.sendAlert(sendAlert, function(err) {
  //     // Re-enable sending alerts, this one has been processed
  //     self.setState({
  //       enableSending: true
  //     });

  //     if (err) {
  //       alert('There was a problem sending the alert. Please dispatch by radio.');
  //     } else {
  //         alert('Alert Sent');
  //         self.setState(self.getInitialState());
  //     }
  //   });
  // },

  handleAlert: function() {
    console.log(this.getAlert());
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
                ref='complaint'
                required={true}
                autoFocus={true} />

      				<TextInput
                label='Location'
                placeholder='Physical campus location, e.g. Walz 123'
                ref='location'
                required={true} />

              <TextInput
                label='Address'
                defaultValue='2400 W CHEW ST'
                ref='address'
                required={true} />
            </div>
            <div className='one-third column'>
              <TextInput
                label='Age'
                placeholder='Unknown'
                ref='age' />

              <SelectInput
                label='Sex'
                options={[
                  'Unknown sex',
                  'Male',
                  'Female',
                  'Other'
                ]}
                ref='sex' />

              <LongTextInput
                label='Additional Information'
                ref='notes' />
            </div>
            <div className='one-third column'>
              <CheckboxInput
                label='Conscious'
                note='Patient is awake'
                ref='conscious'
                defaultValue={true} />

              <CheckboxInput
                label='Alert'
                note='Patient is behaving and responding normally to questions'
                ref='alert'
                defaultValue={true} />

              <CheckboxInput
                label='Breathing Normally'
                note='Patient is breathing regularly, is not short of breath'
                ref='breathing'
                defaultValue={true} />

              <CheckboxInput
                label='Ambulance Requested'
                note='An ambulance has also been requested for this patient'
                ref='ambulanceRequested'
                defaultValue={false} />
            </div>
          </div>
  			</form>
      </div>
		);
	}
});
