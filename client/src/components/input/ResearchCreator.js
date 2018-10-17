import React, { Component } from 'react';

class ResearchCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      researchName: ""
    }
  }

  updateResearchName = (e) => {
    const newValue = e.target.value;
    this.setState({researchName: newValue})
  }

  createResearch = () => {
    //DB conection
  }

  render() {
    return (
      <div className="input-components-container">
        <fieldset className="research-creator">
          <h2>New Research</h2>
          <label htmlFor="name">Name of the new research line:</label>
          <input id="name" type="text" onChange={(e)=>{this.updateResearchName(e)}}/>
          <button onClick={()=>this.createResearch()}>Create Research</button>
        </fieldset>
      </div>
    )
  }
}

export default ResearchCreator;