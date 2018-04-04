import React from 'react'
import params from 'Params'
import AppStore from 'Store/AppStore'
import * as AppActions from 'Action'
import { Link } from 'react-router-dom'
import { Typeahead, Menu, MenuItem, Highlighter } from 'react-bootstrap-typeahead'; // ES2015

// <input class="form-control form-control-dark w-100" type="text" placeholder="Search market" aria-label="Search">
// </input>

let changes = {}

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marketList: AppStore.getMarketList()
    }
  }

  componentWillMount() {
    AppStore.on("CHANGE", this.getMarketList.bind(this));
  }
  componentWillUnmount() {
    AppStore.removeListener("CHANGE", this.getMarketList.bind(this));
  }
  getMarketList() {
    this.setState({
      marketList: AppStore.getMarketList()
    });
  }

  componentDidMount() {
    // document.getElementById("p2").style.color = "blue";
  }

  render() {
    changes = this.state.marketList.change;
    const props = {};
    props.renderMenuItemChildren = this._renderMenuItemChildren;
    return (
      <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">{params.pageName}</a>
          <div class="navbar-nav mr-auto col-md-3">
            <Typeahead
              {...props}
              onChange={(selectedMarket) => {
                AppActions.updateMarket(selectedMarket)
              }}
              options={this.state.marketList.name}
              placeholder="Search market..."
            />
          </div>
        <ul class="navbar-nav px-3 ml-auto">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="/">Sign out</a>
          </li>
        </ul>
      </nav>
    );
  }

  _renderMenuItemChildren(option, props, index) {
    let link = '/market/'+option;
    let change
    if (option in changes) {
      change = changes[option]
      if (change > 0) change = '+'+change+'%';
      else change = change+'%';
    }
    else change = '-'

    return [
      <div key="name">
        {option}
      </div>,
      <div key="population">
        <small>
          24h change: {change}
        </small>
      </div>,
    ];
  }
}
