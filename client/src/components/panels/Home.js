import React, { Component } from 'react';
import ListDisplay from './ListDisplay'
import EntriesService from '../services/EntriesService';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.loggedInUser,
      posts: ""
    };
    this.getRandomPosts();
  }

  createBranchOfResearch = (researchName, field) => {
    EntriesService.createBranchedResearch(researchName, field);
  }

  getRandomPosts = () => {
    console.log("getRandomPosts call")
    EntriesService.getRandomPosts()
      .then((data) => {
        this.setState({ posts: data.data })
      })
  }

  render() {
    return (
      <div className="dark-background">
        <div className="entries-container">
          <ListDisplay displaying="home" posts={this.state.posts} branchThisResearch={this.createBranchOfResearch} />
        </div>
      </div>
    )
  }

}
export default Home;