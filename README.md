Using the github api in your browser.
-------------------------------------

*Instructions*

* [register a new OAuth application](https://github.com/settings/applications/new)
* configure and deploy a [gatekeeper](https://github.com/prose/gatekeeper) instance with your client secret
* change the client_id in scripts/config.js
* run node server.js

You can now navigate to localhost:8000, click login and after authorizing the application you'll have access to the github api in your browser's console.

```javascript
var git = require('./git');
git.setAuthToken();

git.getJSON(
  'https://api.github.com/users/bjdixon', // API endpoint
  function () { console.log(this); }, // callback to deal with the json response
  { Authorization: 'token ' + git.token } // headers
);
```
