import React from 'react'
import AppStore from 'Store/AppStore'
import { observer } from 'mobx-react'
import { BrowserRouter, Route, Link } from 'react-router-dom'



@observer
export default class TradingInterface extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          data: [{
            x: 0.2,
            y: 3,
          }, {
            x: 0.4,
            y: 4,
          }, {
            x: 0.6,
            y: 2,
          }, {
            x: 1,
            y: 4,
          }, {
            x: 3,
            y: 2,
          }, {
            x: 5,
            y: 4,
          }, {
            x: 8,
            y: 2,
          }],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'logarithmic'
          }],
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        legend: {
          display: false,
        }
      }
    });
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <main role="main" class="col-md-10 ml-sm-auto col-lg-10 pt-3 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 class="h2">Dashboard</h1>
              <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                  <button class="btn btn-sm btn-outline-secondary">Share</button>
                  <button class="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                  <span data-feather="calendar"></span>
                  This week
                </button>
              </div>
            </div>

            <canvas class="my-4" id="myChart" width="900" height="380"></canvas>

          </main>
        </div>
      </div>
    );
  }
}



// PARKING
  // the reload buttons
  // <button
  // onClick={this.handleReloadDeviceList.bind(this)}>Reload device list</button>
