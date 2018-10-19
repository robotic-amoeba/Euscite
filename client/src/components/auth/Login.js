// auth/Signup.js
import React, { Component } from 'react';
import AuthService from '../services/AuthService'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    AuthService.login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
    <div className="dark-background">
      <div class="login-wrapper">
        <h3>Login</h3>
  
        <form className="log-sign-form" onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          </fieldset>
  
          <fieldset>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          </fieldset>
  
          <input id="login-button" type="submit" value="Login" />
        </form>
  
        <h1>{this.state.error ? 'Error' : ''}</h1>
      </div>
    </div>
    )
  }
}

export default Login;