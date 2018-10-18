import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Navigation components
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer'
// Login components
import AuthService from './components/services/AuthService';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
// Menu components
import Home from './components/panels/Home'
import Journal from './components/panels/Journal'
//Editors
import PostCreator from './components/input/PostCreator';
import ResearchCreator from './components/input/ResearchCreator';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  logout = () => {
    AuthService.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
      })
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {

      AuthService.loggedin()
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
            <Route exact path='/journal/newbranch' render={() => <Journal message="You just branched a research. Start contributing creating a new post." loggedInUser={this.state.loggedInUser} />} />
            <Route exact path='/newentry' render={() => <PostCreator />} />
            <Route exact path='/newresearch' render={() => <ResearchCreator />} />
            <Route exact path='/login' render={() => <Journal message="Welcome to your journal" loggedInUser={this.state.loggedInUser} />} />
            <Route exact path='/signup' render={() => <Journal loggedInUser={this.state.loggedInUser} />} />
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