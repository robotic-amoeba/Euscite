import React from 'react';
import TextEditor from './TextEditor'

class PostCreator extends React.Component {

  render() {
    return (
      <div className="newPost-container">
        <h2>New Entry Creator</h2>
        <TextEditor />
      </div>
    );
  }
}


export default PostCreator;