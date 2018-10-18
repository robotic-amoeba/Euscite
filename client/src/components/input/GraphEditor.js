import React, { Component } from 'react';
import Graph from './Graph'

class GraphEditor extends Component {
  constructor() {
    super();
    this.state = {
      type: "Line",
      labels: "",
      data: "",
      caption: ""
    }

  }

  changeGraphType = (e) => {
    const type = e.target.value;
    this.setState({ type }, () => {
      this.submitGraph();
    });
  }

  changeGraphAxis = (e, axis) => {
    if (axis === "X") {
      this.setState({ labels: e.target.value }, () => {
        this.submitGraph();
      });
    } else if (axis === "Y") {
      this.setState({ data: e.target.value }, () => {
        this.submitGraph();
      });
    }

  }

  submitGraph = () => {
    const rawData = [];
    rawData.unshift(this.state.type, this.state.labels, this.state.data);
    this.props.saveGraph(rawData, this.props.id);
  }

  render() {
    return (
      <div className="graph-container">
        <Graph type={this.state.type} data={this.state.data} labels={this.state.labels} />
        <div className="graph-options">
          <select onChange={(e) => { this.changeGraphType(e) }}>
            <option value="Line">Line</option>
            <option value="Bar">Bar</option>
            {/* <option value="Pie">Pie</option>
            <option value="Doughnut">Doughnut</option> */}
          </select>
          <fieldset>
            <div className="graph-labels">
              <label>Dataset for X axis:</label>
              <label>Dataset for Y axis:</label>
            </div>
            <div>
              <textarea onChange={(e) => { this.changeGraphAxis(e, "X") }} />
              <textarea onChange={(e) => { this.changeGraphAxis(e, "Y") }} />
            </div>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default GraphEditor;