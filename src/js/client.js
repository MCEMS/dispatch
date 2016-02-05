"use strict";

(function() {
  var MCEMS = function() {};

  var makeRequest = function(method, url, payload, done) {
    var xhr = new XMLHttpRequest();
    var ROOT_URL = 'https://api.bergems.org';
    var token = getToken();

    xhr.addEventListener('load', function() {
      if (this.responseText && this.responseText.length > 0) {
        var response = JSON.parse(this.responseText);
      } else {
        var response = {}
      }
      var code = this.status
      done(code, response);
    });

    xhr.open(method, ROOT_URL + url);
    if (token !== null) {
      xhr.setRequestHeader('Authorization', token);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(payload));
  };

  var storageAvailable = function() {
    var x = '__test__';
    try {
      window.sessionStorage.setItem(x, x);
      window.sessionStorage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  };

  var saveCredentials = function(credentials) {
    if (storageAvailable()) {
      window.sessionStorage.setItem('MCEMS_username', credentials.username);
      window.sessionStorage.setItem('MCEMS_password', credentials.password);
    }
  };

  var getCredentials = function() {
    if (storageAvailable()) {
      return {
        username: window.sessionStorage.getItem('MCEMS_username'),
        password: window.sessionStorage.getItem('MCEMS_password')
      };
    } else {
      return null;
    }
  };

  var saveToken = function(token) {
    if (storageAvailable()) {
      window.sessionStorage.setItem('MCEMS_token', token);
    }
  };

  var getToken = function() {
    if (storageAvailable()) {
      return window.sessionStorage.getItem('MCEMS_token');
    } else {
      return null;
    }
  }

  var refreshToken = function(credentials, done) {
    makeRequest('POST', '/api/accounts/login', credentials, function(status, result) {
      if (status != 200) {
        done(new Error('Could not authenticate'));
      } else {
        saveCredentials(credentials);
        saveToken(result.id);
        console.log('scheduling refresh in', result.ttl, 'seconds');
        setTimeout(function() {
          console.log('refreshing token');
          refreshToken(getCredentials(), function(){})
        }, result.ttl*1000);
        done(null);
      }
    });
  };

  MCEMS.prototype.login = function(username, password, done) {
    var credentials = {
      username: username,
      password: password
    };

    refreshToken(credentials, function(err) {
      if (err) {
        done(err);
      } else {
        done(null);
      }
    });
  };

  MCEMS.prototype.logout = function() {
    if (storageAvailable()) {
      window.sessionStorage.clear();
    }
  };

  MCEMS.prototype.sendAlert = function(data, done) {
    makeRequest('POST', '/api/alerts/send', data, function(status) {
      if (status !== 201) {
        done(new Error('Could not send alert: HTTP ' + status));
      } else {
        done(null);
      }
    });
  };

  MCEMS.prototype.getAlerts = function(done) {
    makeRequest('GET', '/api/alerts/fetchRecent', null, function(status, alerts) {
      if (status !== 200) {
        done(new Error('Could not get alerts: HTTP' + status), null);
      } else {
        done(null, alerts)
      }
    });
  };

  window.MCEMS = MCEMS;
})();
