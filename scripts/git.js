define(function() {

  function login() {
    var client_id = '2582beb06ed078ba0634',
      scopes = 'user,repo';
    window.location = 'https://github.com/login/oauth/authorize?scopes=' + scopes + '&client_id=' + client_id;
  }

  function getAuth(tokenObj) {
    var gatekeeperUrl = 'http://localhost:9999/authenticate/',
      authCode = getAuthCode(window.location.href);

    getJSON(gatekeeperUrl + authCode, setToken);

    function setToken() {
      tokenObj.token = JSON.parse(this.responseText).token;
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
    getAuth: getAuth,
    getJSON: getJSON
  }
});
