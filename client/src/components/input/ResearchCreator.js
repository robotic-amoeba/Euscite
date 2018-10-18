import React, { Component } from 'react';
import EntriesService from '../services/EntriesService';

class ResearchCreator extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      researchName: "",
      field: "",
      createdResearch: false
    }
  }

  updateResearchName = (e) => {
    const newValue = e.target.value;
    this.setState({ researchName: newValue })
  }

  updateField = (e) => {
    const newValue = e.target.value;
    this.setState({ field: newValue }, () => {
      console.log(newValue)
    })
  }

  createResearch = () => {
    if (!this.state.researchName) {
      alert("Please, fill the name of your research! :)")
      return
    }
    EntriesService.createNewResearch(this.state.researchName, this.state.field)
      .then(() => {
        this.setState({
          researchName: "",
          field: "",
          createdResearch: true
        })
      })
  }

  render() {
    return (
        <div className="input-components-container">
          <fieldset className="research-creator">
            <h2>New Research</h2>
            <label htmlFor="name">Name of the new research line:</label>
            <input id="name" type="text" onChange={(e) => { this.updateResearchName(e) }} />
            <label htmlFor="tags">Field: (ex: Physics)</label>
            <input id="name" type="text" onChange={(e) => { this.updateField(e) }} />
            <button onClick={() => this.createResearch()}>Create Research</button>
            {(this.state.createdResearch ? <div className="message">Research created succesfully!</div> : null)}
          </fieldset>
        </div>)
  }
}

export default ResearchCreator;