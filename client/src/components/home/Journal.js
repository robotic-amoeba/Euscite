import React, { Component } from 'react';
import ListDisplay from './ListDisplay'
import '../../styles/entries.scss'
import getPostsService from './GetPostsService';

class Journal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.loggedInUser,
      posts: ""
    };
    this.service = new getPostsService();
    this.getUserPosts();
  }


  getUserPosts = () => {
    console.log("getUserPosts call")
    this.service.getUserPosts()
      .then((data) => {
        this.setState({ posts: data.data })
        return data.data
      })
  }

  render() {
    return (
      <div className="entries-container">
        <div>
          ----JOURNAL----
        </div>
        <div>
          <ListDisplay displaying="journal" posts={this.state.posts} />
        </div>
      </div>
    )
  }

}
export default Journal;