import React from 'react'
import { Link } from 'react-router'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import AuthActions from '../../account/actions/AuthActions';
import AuthStore from '../../account/stores/AuthStore';

function getAuthState() {
  return {
    authenticated: AuthStore.isAuthenticated()
  };
}

export default injectIntl(React.createClass({
  render: function() {

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      brand: {
        id: 'nav.brand',
        description: 'Open Eats title',
        defaultMessage: 'Open Eats',
      },
      news: {
        id: 'nav.news',
        description: 'Navbar News',
        defaultMessage: 'News',
      },
      recipes: {
        id: 'nav.recipes',
        description: 'Navbar Recipes',
        defaultMessage: 'Recipe',
      },
      about: {
        id: 'nav.about',
        description: 'Navbar About',
        defaultMessage: 'About',
      },
    });

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className="navbar-brand" to="/">{formatMessage(messages.brand)}</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/news"><NavItem>{formatMessage(messages.news)}</NavItem></LinkContainer>
            <LinkContainer to="/browse"><NavItem>{formatMessage(messages.recipes)}</NavItem></LinkContainer>
            <Account/>
            <LinkContainer to="/about"><NavItem>{formatMessage(messages.about)}</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}));

// TODO: I want to wave this code for now,
// since I still kind of want to use it in the future
//import Form from 'react-router-form'
//"react-router-form": "^2.0.0-rc.0",
/*<ul className="nav navbar-nav navbar-right">
  <Form className="navbar-form" to={'/browse'} method="GET">
    <div className="form-group">
      <input type="text" name="search" className="form-control" placeholder="Search"/>
    </div>
    <button type="submit" className="btn btn-default">Submit</button>
  </Form>
</ul>*/


var Account = React.createClass({
  getInitialState: function() {
    return getAuthState();
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getAuthState());
  },

  render: function () {
    if (this.state.authenticated) {
      return <AccountMenu/>
    } else {
      return <AccountLogin/>
    }
  }
});


var AccountLogin = React.createClass({
  render: function () {
    return (
      <LinkContainer to="/login"><MenuItem>Login</MenuItem></LinkContainer>
    )
  }
});


var AccountMenu = React.createClass({
  logout: function() {
    AuthActions.logUserOut();
  },

  render: function () {
    return (
      <NavDropdown eventKey={1} title="My Account" id="basic-nav-dropdown">
        <LinkContainer to="/recipe/create"><MenuItem>Create Recipe</MenuItem></LinkContainer>
        <MenuItem divider />
        <NavItem onClick={this.logout}>Logout</NavItem>
      </NavDropdown>
    )
  }
});
