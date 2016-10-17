import request from 'superagent';

export var Auth =  {
  login: function(username, pass, cb) {
    if (localStorage.token) {
      if (cb) cb(true)
      return
    }
    this.getToken(username, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true)
      } else {
        if (cb) cb(false)
      }
    })
  },
  logout: function() {
    delete localStorage.token;
  },
  loggedIn: function() {
    return !!localStorage.token;
  },
  getToken: function(username, pass, cb) {
    request
      .post('/api/v1/accounts/obtain-auth-token/')
      .send({'username': username, 'password': pass})
      .end((err, res) => {
        if (!err && res) {
          cb({authenticated: true, token: res.token})
        } else {
          console.error(url, err.toString());
        }
      })
  },
};
