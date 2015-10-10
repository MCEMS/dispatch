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

    var data = new FormData();
    if (payload) {
      for (var prop in payload) {
        data.append(prop, payload[prop]);
      }
    }

    xhr.open(method, ROOT_URL + url);
    if (token !== null) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
    xhr.send(data);
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
    makeRequest('POST', '/auth/key', credentials, function(status, result) {
      if (status != 200) {
        done(new Error('Could not authenticate'));
      } else {
        saveCredentials(credentials);
        saveToken(result.token);
        setTimeout(function() {
          console.log('refreshing token');
          refreshToken(getCredentials(), function(){})
        }, result.expiresInSeconds*1000);
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
    makeRequest('POST', '/api/v1/alert', data, function(status) {
      if (status !== 204) {
        done(new Error('Could not send alert: HTTP ' + status));
      } else {
        done(null);
      }
    });
  };

  window.MCEMS = MCEMS;
})();
