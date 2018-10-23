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
    EntriesService.getUserPosts()
      .then((data) => {
        this.setState({ posts: data.data });
        return data.data;
      })
  }

  createBranchOfResearch = (researchName, field) => {
    EntriesService.createBranchedResearch(researchName, field);
  }

  render() {
    return (
      <div className="dark-background">
      {(this.props.message) ? <div className="message journal-message">{this.props.message}</div>: null}
        <div className="entries-container">
          <div className="buttons-wrapper-journal">
            <Link to="/newentry"><button id="new-entry-button">New Entry</button></Link>
            <Link to="/newresearch"><button id="new-research-button">New Research</button></Link>
          </div>
          <ListDisplay displaying="journal" posts={this.state.posts} branchThisResearch={this.createBranchOfResearch}/>
        </div>
      </div>
    )
  }

}
export default Journal;