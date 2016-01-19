requirejs(['./git'], function(git) {
  document.getElementById('login').onclick = git.login;
});
