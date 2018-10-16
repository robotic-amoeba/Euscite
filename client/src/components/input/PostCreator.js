import React from 'react';
import TextEditor from './TextEditor';
import GraphEditor from './GraphEditor';
import getPostsService from '../panels/GetPostsService';


class PostCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      researchs: [],
      selectedResearch: "",
      entryName: "",
      editorsInPage: [],
      savedTexts: [],
      savedGraphs: []
    }
    this.service = new getPostsService();
    this.getResearchs();
  }

  getResearchs = () => {
    const researchs = [];
    this.service.getUserPosts()
      .then((data) => {
        data.data.forEach((research) => {
          researchs.push(research.name)
        })
        this.setState({ researchs: researchs })
      })

  }

  updateEntryName = (e) => {
    this.setState({entryName:e.target.value})
  }

  addEditor = (type) => {
    const editorsArray = this.state.editorsInPage
    editorsArray.push(type);
    this.setState({ editorsInPage: editorsArray })
  }

  deleteEditor = (index) => {
    const diminishedArray = this.state.editorsInPage;
    diminishedArray.splice(index, 1);
    this.setState({ editorsInPage: diminishedArray });
  }

  saveTextFromEditor = (text, id) => {
    let newSavedTexts = this.state.savedTexts;
    newSavedTexts.splice(id, 1, text);
    this.setState({ savedTexts: newSavedTexts });
  }

  saveGraphFromEditor = (rawData, id) => {
    let newSavedGraphs = this.state.savedGraphs;
    newSavedGraphs.splice(id, 1, rawData);
    this.setState({ savedGraphs: newSavedGraphs });
    //console.log(this.state.savedGraphs);
  }

  sendPostToDB = () => {
    // DB format for entry == {name: , data:}
    if (!this.state.selectedResearch) {
      alert("Select a research before saving your post :)")
      return
    } else if (!this.state.entryName) {
      alert("Choose a name for your entry before submiting! :)")
    }
    const rawDataToSend = [];
    let textEditorCount = 0;
    let graphEditorCount = 0;
    this.state.editorsInPage.forEach((editor) => {
      if (editor === "text") {
        rawDataToSend.push(this.state.savedTexts[textEditorCount]);
        console.log("Saved text: " +this.state.savedTexts[textEditorCount]);
        textEditorCount += 1
      } if (editor === "graph") {
        rawDataToSend.push(this.state.savedGraphs[graphEditorCount]);
        console.log("Saved graph: " + this.state.savedGraphs[graphEditorCount]);
        graphEditorCount +=1;
      }
    })
    const research = this.state.selectedResearch;
    const entry = { name: this.state.entryName, data: rawDataToSend }
    this.service.saveEntryInResearch(research, entry);
    console.log(research, entry)
  }

  render() {

    if (this.state.researchs) {
      return (

        <div className="newPost-container">
          <div className="creator-header">
            <h2>New Entry</h2>
            <fieldset>
              <label htmlFor="entry-name">Title: </label>
              <input id="entry-name" type="text" onChange={(e)=>this.updateEntryName(e)} />
              <label htmlFor="research">Associated research: </label>
              <select id="research" onChange={(e) => { this.setState({ selectedResearch: e.target.value }) }}>
                <option value="" defaultValue>Select one--</option>
                {this.state.researchs.map((research) => { return (<option value={research}>{research}</option>) })}
              </select>
              <button onClick={this.sendPostToDB}>Save and publish</button>
            </fieldset>
          </div>

          <div className="items-panel">
            <button className="create-editor" onClick={() => { this.addEditor("text") }}>New Text Editor</button>
            <button className="create-editor" onClick={() => { this.addEditor("graph") }}>New Graph Editor</button>
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
                    <TextEditor saveText={this.saveTextFromEditor} id={index} key={index} />
                  )
                } else if (editorType === "graph") {
                  return (
                    <GraphEditor saveGraph={this.saveGraphFromEditor} id={index} key={index} />
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

