import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Navigation components
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer'
// Login components
import Signup from './components/auth/Signup';
import AuthService from './components/auth/AuthService';
import Login from './components/auth/Login';
// Menu components
import Home from './components/panels/Home'
import Journal from './components/panels/Journal'
//Entry editor
import PostCreator from './components/input/PostCreator';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = () => {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
      })
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {

      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  render() {
    this.fetchUser()

    if (this.state.loggedInUser) {  //USER LOGGED IN ----------------
      return (
        <div className="App">
          <header className="App-header">
            <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
          </header>
          <Switch>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/journal' render={() => <Journal loggedInUser={this.state.loggedInUser} />} />
            <Route exact path='/newentry' render={() => <PostCreator />} />
            </Switch>
            <Footer />
        </div>
          );
    } else { //USER NOT LOGGED IN ----------------
      return (
        <div className="App">
            <header className="App-header">
              <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            </header>
            <Switch>
              <Route exact path='/' render={() => <Home loggedInUser={false} />} />
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser} />} />
            </Switch>
            <Footer />
          </div>
          );
        }
      }
    }
    
export default App;