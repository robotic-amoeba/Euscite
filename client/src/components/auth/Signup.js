// auth/Signup.js
import React, { Component } from 'react';
import AuthService from '../services/AuthService'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    AuthService.signup(username, password)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
        });
        this.props.getUser(response.user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      

  render() {
    return(
      <div className="dark-background">
        <div class="signup-wrapper">
          <h3>Sign up to start publishing!</h3>
  
          <form className="log-sign-form" onSubmit={this.handleFormSubmit}>
            <fieldset>
              <label>Username:</label>
              <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
            </fieldset>
            
            <fieldset>
              <label>Password:</label>
              <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
            </fieldset>
            
            <input id="signup-button" type="submit" value="Sign up" />
          </form>
        </div>

      </div>
    )
  }
}

export default Signup;