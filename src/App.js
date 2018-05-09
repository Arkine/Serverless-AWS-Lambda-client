import React, { Component, Fragment } from 'react';
import { Auth } from 'aws-amplify';

import './App.css';

import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    
    // check if user is logged in
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    } catch (error) {
      if (error !== 'No current user') {
        alert(error);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating && 
      <div className="App container">
        <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.state.isAuthenticated
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
              : <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem href="/signup">Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem href="/login">Login</NavItem>
                  </LinkContainer>
                </Fragment>
            }
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps}/>
      </div>
    );
  }
}

export default withRouter(App);
