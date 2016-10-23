import React from 'react'
import Form from 'react-router-form'
import { Link } from 'react-router'
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default React.createClass({
  render: function() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className="navbar-brand" to="/">Open Eats</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/news"><NavItem>News</NavItem></LinkContainer>
            <LinkContainer to="/browse"><NavItem>Recipes</NavItem></LinkContainer>
            <NavDropdown eventKey={1} title="Account" id="basic-nav-dropdown">
              <LinkContainer to="/recipe/create"><MenuItem>Create Recipe</MenuItem></LinkContainer>
              <MenuItem divider />
              <LinkContainer to="/login"><MenuItem>Login</MenuItem></LinkContainer>
              <LinkContainer to="/logout"><MenuItem>Logout</MenuItem></LinkContainer>
            </NavDropdown>
            <LinkContainer to="/about"><NavItem>About</NavItem></LinkContainer>
          </Nav>
          <ul className="nav navbar-nav navbar-right">
            <Form className="navbar-form" to={'/browse/search'} method="GET">
              <div className="form-group">
                <input type="text" name="search" className="form-control" placeholder="Search"/>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </Form>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});
