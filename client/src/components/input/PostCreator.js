import React from 'react';
import TextEditor from './TextEditor';
import GraphEditor from './GraphEditor';

class PostCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      editorsInPage: [],
      savedText: [],
      savedGraph: []
    }
  }

  saveTextFromEditor = () => {

  }

  addTextEditor = () => {
    const editorsArray = this.state.editorsInPage
    editorsArray.push("text");
    this.setState({ editorsInPage: editorsArray })
  }

  addGraphEditor = () => {
    const editorsArray = this.state.editorsInPage
    editorsArray.push("graph");
    this.setState({ editorsInPage: editorsArray })
  }

  deleteEditor = (index) => {
    const diminishedArray = this.state.editorsInPage;
    console.log(index)
    diminishedArray.splice(index, 1);
    this.setState({editorsInPage:diminishedArray})
    //this.setState({editorsInPage: this.state.editorsInPage.splice(index, 1)})
  }


  render() {

    return (

      <div className="newPost-container">
        <h2>Entry Creator</h2>

        <div className="items-panel">
          <button className="create-editor" onClick={() => { this.addTextEditor() }}>New Text Editor</button>
          <button className ="create-editor" onClick={() => { this.addGraphEditor() }}>New Graph Editor</button>
          <div>
            {
              this.state.editorsInPage.map((editorType, index) => {
                  return (
                    <div>
                      <span>Editor {index +1}: {editorType}</span>
                      <button className="delete-editor" onClick={()=>{this.deleteEditor(index)}}>X</button>
                    </div>
                  )
              })
            }
          </div>

        </div>

        <div>
          {
            this.state.editorsInPage.map((editorType, index) => {
              if (editorType === "text") {
                return (
                  <TextEditor deleteEditor="" keepText={this.saveTextFromEditor} id={index} key={index} />
                )
              } else if (editorType === "graph") {
                return (
                  <GraphEditor id={index} key={index} />
                );
              }
            })
          }
        </div>
      </div>
    );
  }
}


export default PostCreator;