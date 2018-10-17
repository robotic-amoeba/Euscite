import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListDisplay from './ListDisplay';
import EntriesService from '../services/EntriesService';

class Journal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.loggedInUser,
      posts: ""
    };
    this.getUserPosts();
  }

  //return all research lines with all user's posts inside
  getUserPosts = () => {
    console.log("getUserPosts call");
    EntriesService.getUserPosts()
      .then((data) => {
        this.setState({ posts: data.data });
        return data.data;
      })
  }

  createBranchOfResearch = (researchName) => {
    console.log("triggered")
    console.log(researchName)
  }

  render() {
    return (
      <div className="dark-background">
        <div className="entries-container">
          <Link to="/newentry"><button id="new-entry-button">New Entry</button></Link>
          <Link to="/newresearch"><button id="new-entry-button">New Research</button></Link>
          <ListDisplay displaying="journal" posts={this.state.posts} branchThisResearch={this.createBranchOfResearch}/>
        </div>
      </div>
    )
  }

}
export default Journal;