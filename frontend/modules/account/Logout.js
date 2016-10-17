import React from 'react'
import {Auth} from './Auth'
import request from 'superagent';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  logoutHandler: function() {
    Auth.logout();
  },
  render: function() {
    return (
      <div>
      <h1>You are now logged in</h1>
      <button onClick={this.logoutHandler}>Log out</button>
      </div>
    )
  }
})
