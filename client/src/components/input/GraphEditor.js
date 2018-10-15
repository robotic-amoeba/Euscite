import React, { Component } from 'react';
import Graph from './Graph'

class GraphEditor extends Component {
  constructor() {
    super();
    this.state = {
      type: "Line",
      labels: "5.010, 22.900, 23.090, 23.220, 29.050, 29.420, 29.670, 35.860, 36.000, 36.170, 39.220, 39.450, 39.770, 43.000, 43.190, 43.460, 47.010, 47.490, 47.850, 48.310, 48.520, 48.830, 60.570, 60.690, 61.230, 80.800",
      data: "0.035, 9.199, 115.099, 8.090, 9.618, 1630.799, 73.661, 24.166, 120.117, 25.223, 7.581, 182.484, 10.731, 11.742, 169.521, 9.537, 16.947, 185.618, 6.867, 18.772, 219.332, 11.575, 6.729, 52.786, 9.343, 5.108",
      caption: ""
    }

  }

  changeGraphType = (e) => {
    const type = e.target.value
    this.setState({type})
  }

  changeGraphX = (e) => {
    const labels = e.target.value
    this.setState({labels})
  }

  changeGraphY = (e) => {
    const data = e.target.value
    this.setState({data})
  }

  render() {
    return (
      <div className="graph-container">
        <Graph type={this.state.type} data={this.state.data} labels={this.state.labels}/>
        <div className="graph-options">
          <select onChange={(e) => { this.changeGraphType(e) }}>
            <option value="Line">Line</option>
            <option value="Bar">Bar</option>
            <option value="Pie">Pie</option>
            <option value="Doughnut">Doughnut</option>
          </select>
          <fieldset>
            <div className="graph-labels">
              <label>Dataset for X axis:</label>
              <label>Dataset for Y axis:</label>
            </div>
            <div>
              <textarea onChange={(e) => { this.changeGraphX(e) }} />
              <textarea onChange={(e) => { this.changeGraphY(e) }} />
            </div>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default GraphEditor;