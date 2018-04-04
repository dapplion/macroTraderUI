import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import tradeStore from 'Store/TradeStore'
import Navbar from './components/Navbar'
import TradingApp from './components/TradingApp'
import './components/API/testSockets'

// const stores = { usersStore, itemsStore }; // combine multiple
const stores = { tradeStore };

import '../css/dashboard.css';

function Layout(props) {
  return (
    <Provider {...stores}>
      <Router>
        <div>
          <Navbar />
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TradingApp />
              </div>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

render(<Layout />, document.getElementById('root'));
