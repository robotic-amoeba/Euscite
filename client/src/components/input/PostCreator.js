import React from 'react';
import TextEditor from './TextEditor';
import GraphEditor from './GraphEditor';

class PostCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      editorsInPage: [],
      savedText: []
    }
  }
  
  keepTextFromEditor = () => {
    
  }
  
  addTextEditor = () => {
    const editorsArray = this.state.editorsInPage
    editorsArray.push("text");
    this.setState({editorsInPage: editorsArray})
  }

  addGraphEditor = () => {
    const editorsArray = this.state.editorsInPage
    editorsArray.push("graph");
    this.setState({editorsInPage: editorsArray})
  }
  
  
  
  render() {
    
    return (
      <div className="newPost-container">
        <h2>Entry Creator</h2>

        <div className="items-panel">
          <button onClick={()=>{this.addTextEditor()}}>New Text Editor</button>
          <button onClick={()=>{this.addGraphEditor()}}>New Graph Editor</button>
        </div>

        <div>
          {
            this.state.editorsInPage.map((editorType) => {
              console.log(editorType)
              if (editorType === "text") {
                return (
                  <TextEditor keepText={this.keepTextFromEditor} />
                  )
                } else if (editorType === "graph") {
                  return (<GraphEditor />);
                }
              })
            }
        </div>
      </div>
    );
  }
}


export default PostCreator;