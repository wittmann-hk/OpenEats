import React from 'react'
import {Auth} from './Auth'

// Load in the base CSS
require("./css/login.scss");

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var username = this.refs.username.value;
    var pass = this.refs.pass.value;

    Auth.login(username, pass, (loggedIn) => {
      if (loggedIn) {
        this.context.router.replace('/')
      }
    })
  },
  render: function() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <input type="text" id="username" className="form-control" placeholder="Username" ref="username" autoFocus="true"/>
        <input type="password" id="password" className="form-control" placeholder="Password" ref="pass"/>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    )
  }
})
