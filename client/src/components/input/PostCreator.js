import React from 'react';
import TextEditor from './TextEditor';
import GraphEditor from './GraphEditor';
import EntriesService from '../services/EntriesService';


class PostCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      researchs: [],
      selectedResearch: "",
      entryName: "",
      editorsInPage: [],
      menuDisplayed: true
    }

    this.getResearchs();
  }

  getResearchs = () => {
    const researchs = [];
    EntriesService.getUserPosts()
      .then((data) => {
        data.data.forEach((research) => {
          researchs.push(research.name)
        })
        this.setState({ researchs: researchs })
      })
  }

  collapseMenu = () => {
    this.setState({ menuDisplayed: !this.state.menuDisplayed })
  }

  updateEntryName = (e) => {
    this.setState({ entryName: e.target.value })
  }

  addEditor = (type) => {
    const editorsArray = this.state.editorsInPage
    let editor;
    if (type === "text") {
      editor = { type, data: "" };
    } else {
      editor = { type, data: [] };
    }
    editorsArray.push(editor);
    this.setState({ editorsInPage: editorsArray }, () => {
      console.log("editor added to state. Editors in page:" + this.state.editorsInPage)
    })
  }

  deleteEditor = (index) => {
    const diminishedArray = this.state.editorsInPage;
    diminishedArray.splice(index, 1);
    this.setState({ editorsInPage: diminishedArray });
  }

  storeContentFromEditor = (data, id) => {
    const editors = this.state.editorsInPage;
    const oldEditor = this.state.editorsInPage[id];
    const newEditor = { type: oldEditor.type, data }
    editors.splice(id, 1, newEditor)
    this.setState({ editorsInPage: editors });
    console.log(data) //<----- BUG HERE: lacks the last character written
  }

  sendPostToDB = () => {
    // DB format for entry == {name: , data:}
    if (!this.state.selectedResearch) {
      alert("Select a research before saving your post :)");
      return;
    } else if (!this.state.entryName) {
      alert("Choose a name for your entry before submiting! :)");
      return;
    }
    const name = this.state.selectedResearch;
    const data = { name: this.state.entryName, data: this.state.editorsInPage }
    EntriesService.saveEntryInResearch(name, data);
    console.log(name, data)
  }

  render() {

    if (this.state.researchs) {
      return (

        <div className="input-components-container">
          <div className="creator-header">
            <h2>New Entry</h2>

            {(this.state.menuDisplayed) ?

              <fieldset>
                <label htmlFor="entry-name">Title: </label>
                <input id="entry-name" type="text" onChange={(e) => this.updateEntryName(e)} />
                <label htmlFor="research">Associated research: </label>
                <select id="research" onChange={(e) => { this.setState({ selectedResearch: e.target.value }) }}>
                  <option value="" defaultValue>Select one--</option>
                  {this.state.researchs.map((research) => { return (<option value={research}>{research}</option>) })}
                </select>
                <button onClick={this.sendPostToDB}>Save and publish</button>
              </fieldset>

              : <div className="menu-placeholder"><i>- entry menu -</i></div>}
          </div>
            <button onClick={() => { this.collapseMenu() }} className="collapse-button">{'\u25BC'}</button>

          <div className="items-panel">
            <button className="create-editor" onClick={() => { this.addEditor("text") }}>New Text Editor</button>
            <button className="create-editor" onClick={() => { this.addEditor("graph") }}>New Graph Editor</button>
            <div>
              {
                this.state.editorsInPage.map((editor, index) => {
                  return (
                    <div>
                      <span>Editor {index + 1}: {editor.type}</span>
                      <button className="delete-editor" onClick={() => { this.deleteEditor(index) }}>X</button>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div>
            {
              this.state.editorsInPage.map((editor, index) => {
                if (editor.type === "text") {
                  return (
                    <TextEditor saveText={this.storeContentFromEditor} id={index} key={index} />
                  )
                } else if (editor.type === "graph") {
                  return (
                    <GraphEditor saveGraph={this.storeContentFromEditor} id={index} key={index} />
                  );
                }
                return null;
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

