import React from 'react'
import Form from 'react-router-form'
import { Link } from 'react-router'

export default React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link className="navbar-brand" to="/">Open Eats</Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link activeClassName="active" to="/">News</Link></li>
              <li><Link activeClassName="active" to="/browse">Browse Recipes</Link></li>
              <li className="dropdown">
                <a href="#" id="menu_dropdown" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span className="caret"/></a>
                <ul className="dropdown-menu">
                  <li className="dropdown-header">Recipes</li>
                  <li><Link activeClassName="active" to="/recipe/create">New Recipe</Link></li>
                  <li><a href="#">My Recipes</a></li>
                  <li role="separator" className="divider"/>
                  <li className="dropdown-header">My Account</li>
                  <li><a href="#">Settings</a></li>
                  <li><Link activeClassName="active" to="/login">Login</Link></li>
                  <li><Link activeClassName="active" to="/logout">Logout</Link></li>
                </ul>
              </li>
              <li><Link activeClassName="active" to="/about">About</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <Form className="navbar-form" to={'/browse/search'} method="GET">
                <div className="form-group">
                  <input type="text" name="search" className="form-control" placeholder="Search"/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </Form>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});