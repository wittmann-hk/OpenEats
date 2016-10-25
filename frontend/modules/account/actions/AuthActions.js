import request from 'superagent';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';

export default {
  getToken: function(username, pass) {
    var url = '/api/v1/accounts/obtain-auth-token/';
    request
      .post(url)
      .send({'username': username, 'password': pass})
      .end((err, res) => {
        if (!err && res) {
          this.logUserIn({token: res.token});
        } else {
          this.logInError({error: true});
          console.error(url, err.toString());
        }
      })
  },

  logUserIn: (token) => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_USER,
      token: token
    });
  },

  logInError: (error) => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_ERROR,
      error: error
    });
  },

  logUserOut: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_USER
    });
  },
}
