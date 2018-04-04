import React from 'react'
import AppStore from 'Store/AppStore'
import params from 'Params'
import { Link } from 'react-router-dom'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variable: AppStore.getVariable()
    }
  }

  componentWillMount() {
    AppStore.on("CHANGE", this.getVariable.bind(this));
  }
  componentWillUnmount() {
    AppStore.removeListener("CHANGE", this.getVariable.bind(this));
  }
  getVariable() {
    this.setState({
      variable: AppStore.getVariable()
    });
  }

  render() {
    let variableString = JSON.stringify(this.state.variable);
    let arrayOfJsx = params.pages.map( item =>
        <li key={item.key} class="nav-item">
          <div class="nav-link">
            <Link key={item.key} to={item.key}>
              <span data-feather="home"></span>
              {item.name}<span class="sr-only">(current)</span>
            </Link>
          </div>
        </li>
      )

    return (
      <nav class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
          <ul class="nav flex-column">
            {arrayOfJsx}
          </ul>

          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a class="d-flex align-items-center text-muted" href="#">
              <span data-feather="plus-circle"></span>
            </a>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text"></span>
                Current month
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text"></span>
                Last quarter
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text"></span>
                Social engagement
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span data-feather="file-text"></span>
                Year-end sale
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
