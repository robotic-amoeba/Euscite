// navbar/Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
  }

  handleLogout = (e) => {
    this.props.logout()
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="nav-style">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/journal'>Journal</Link></li>
            <li><a href="/" onClick={this.handleLogout}>Logout</a></li>
            <span>Welcome, {this.state.loggedInUser.username}</span>
          </ul>

        </nav>
      )
    } else {
      return (
        <div>
          <nav className="nav-style">
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>Sign up</Link></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
}

export default Navbar;