import React from 'react';
let Chart;


function Graph(props) {

  if (props.type === "Line") {
    Chart = require("react-chartjs").Line;
  } else if (props.type === "Bar") {
    Chart = require("react-chartjs").Bar;
  } else if (props.type === "Pie") {
    Chart = require("react-chartjs").Pie;
  } else {
    Chart = require("react-chartjs").Doughnut;
  }
  const data = fromCSV_ToData(props.data); //y axis
  const labels = fromCSV_toLabels(props.labels); //x axis 

  const chartData = {
    labels: labels,
    datasets: [{
      label: "",
      data: data,
      fillColor: 'rgba(255, 255, 255, 0.2)',
      strokeColor:'rgb(255, 255, 255)',
      borderWidth: 1
    }]
  }
  const chartOptions = {
    scales: {
      yAxes: [{
        gridLines:{
          display: true,
          color:'rgb(255, 255, 255)',
        lineWidth:1
      },
        ticks: {
          beginAtZero: false
        }
      }]
    }
  }
  return <Chart data={chartData} options={chartOptions} width="600" height="250" />
}

function fromCSV_ToData(CSV) {
  const rawDataArray = CSV.split(",");
  const data = rawDataArray.map((string) => {
    return Number(string)
  })
  return data
}

function fromCSV_toLabels(CSV) {
  return CSV.split(",")
}

export default Graph;

