import React from 'react';
import TextEditor from './TextEditor';
import GraphEditor from './GraphEditor';
import getPostsService from '../panels/GetPostsService';


class PostCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      researchs: [],
      selectedResearch:"",
      entryName:"",
      editorsInPage: [],
      savedText: [],
      savedGraph: []
    }
    this.service = new getPostsService();
    this.getResearchs();
  }
  
  getResearchs = () => {
    const researchs = [];
    this.service.getUserPosts()
    .then((data)=>{
    data.data.forEach((research)=>{
      researchs.push(research.name)
    })
    this.setState({researchs: researchs})
  })

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
    diminishedArray.splice(index, 1);
    this.setState({ editorsInPage: diminishedArray })
  }

  saveTextFromEditor = (text, id) => {
    let newSavedText = this.state.savedText
    newSavedText.splice(id, 1, text)
    this.setState({ savedText: newSavedText })
    console.log(this.state.savedText)
  }

  sendPostToDB() {
    // DB format for entry == {name: , data:}
    const research = this.state.selectedResearch; //THIS IS UNDEFINED 'COS THE SELECT HTML ELEMENT DIDN'T CHANGE. FIX-----
    const entry = {name: this.state.entryName, data: this.state.savedText}
    this.service.saveEntryInResearch(research, entry);
  }

  render() {

    if (this.state.researchs) {
      return (

        <div className="newPost-container">
          <div className="creator-header">
            <h2>New Entry</h2>
            <fieldset>
              <label htmlFor="entry-name">Title: </label>
              <input id="entry-name" type="text" />
              <label htmlFor="research">Associated research: </label>
              <select id="research" onChange={(e)=>{this.setState({selectedResearch:e.target.value})}}>
              {this.state.researchs.map((research) => { return (<option value={research}>{research}</option>) })}
              </select>
              <button onClick={this.sendPostToDB}>Save and publish</button>
            </fieldset>
          </div>

          <div className="items-panel">
            <button className="create-editor" onClick={() => { this.addTextEditor() }}>New Text Editor</button>
            <button className="create-editor" onClick={() => { this.addGraphEditor() }}>New Graph Editor</button>
            <div>
              {
                this.state.editorsInPage.map((editorType, index) => {
                  return (
                    <div>
                      <span>Editor {index + 1}: {editorType}</span>
                      <button className="delete-editor" onClick={() => { this.deleteEditor(index) }}>X</button>
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
                    <TextEditor deleteEditor="" saveText={this.saveTextFromEditor} id={index} key={index} />
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
    } else {
      return (
        <div>It seems that you have no current line of work active. Create one to begin publishing!</div>
      )
    }
  }
}


export default PostCreator;

