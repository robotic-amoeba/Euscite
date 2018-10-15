import React, { Component } from 'react';
import ListDisplay from './ListDisplay'
import getPostsService from './GetPostsService';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.loggedInUser,
      posts: ""
    };
    this.service = new getPostsService();
    this.getRandomPosts();
  }


  getRandomPosts = () => {
    console.log("getRandomPosts call")
    this.service.getRandomPosts()
      .then((data) => {
        this.setState({ posts: data.data })
      })
  }

  render() {
    return (
      <div className="entries-container">
        <div>
          <ListDisplay displaying="home" posts={this.state.posts} />
        </div>
      </div>
    )
  }

}
export default Home;