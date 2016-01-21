define(['./config'], function(config) {

  function login() {
    var scopes = 'user,repo';
    window.location = config.loginUrl + '?scope=' + scopes + '&client_id=' + config.client_id;
  }

  function setAuthToken() {
    var authCode = getAuthCode(window.location.href),
      context = this;

    getJSON(config.gatekeeperUrl + authCode, setToken);

    function setToken() {
      context.token = JSON.parse(this.responseText).token;
    }

    function getAuthCode(url){
      var error = url.match(/[&\?]error=([^&]+)/);
      if (error) {
        throw 'Error getting authorization code: ' + error[1];
      }
      return url.match(/[&\?]code=([\w\/\-]+)/)[1];
    }
  }

  function getJSON(url, cb, headers) {
    var req = new XMLHttpRequest();
    req.addEventListener("load", cb);
    req.open("GET", url);
    if (headers) {
      for (var header in headers) {
        req.setRequestHeader(header, headers[header]);
      }
    }
    req.send();
  }

  return {
    login: login,
    setAuthToken: setAuthToken,
    getJSON: getJSON,
    token: this.token
  };
});

