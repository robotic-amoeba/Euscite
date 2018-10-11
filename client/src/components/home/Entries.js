import React, { Component } from 'react';
import Entry from './Entry'
import '../../styles/entries.scss'
import getPostsService from './GetPostsService';

class Entries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.loggedInUser,
      posts: ""
    };
    this.service = new getPostsService()
  }


getPosts = () =>{

  this.service.getUserPosts()
  .then((data)=>{
    this.setState({posts:data})
  })
}

  render() {
    this.getPosts()
    return (
      <div className="entries-container">
        <div>
          THIS IS THE ENTRIES COMPONENT
    </div>
        <div>
          <ListDisplay />
        </div>
      </div>
    )
  }

}
export default Entries;