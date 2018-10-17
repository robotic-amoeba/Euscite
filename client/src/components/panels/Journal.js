import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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

  render() {
    return (
      <div className="entries-container">
        <div>
          <Link to="/newentry"><button id="new-entry-button">New Entry</button></Link>
          <Link to="/newresearch"><button id="new-entry-button">New Research</button></Link>
          <ListDisplay displaying="journal" posts={this.state.posts} />
        </div>
      </div>
    )
  }

}
export default Journal;