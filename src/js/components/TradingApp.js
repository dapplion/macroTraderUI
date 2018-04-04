import React from 'react'
import AppStore from 'Store/AppStore'
import { observer } from 'mobx-react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import CurrentTrades from './TradingInterface/CurrentTrades'
import NewTrades from './TradingInterface/NewTrades'
import MarketStatus from './TradingInterface/MarketStatus'
import Sidebar from './Sidebar'
import Home from './Home'
import Authenticate from './Authenticate'
import * as websocketAPI from 'API/testSockets';

@observer
export default class TradingApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initial states of variables must be defined in the constructor
      // Authentication parameters
      authenticated: AppStore.getAuthenticated(),
      // Current market parameters
      market: AppStore.getMarket(),
      ticker: AppStore.getTicker(),
      balance: AppStore.getBalance(),
      // Tradelists
      tradeList: AppStore.getTradeList(),
      newTradeList: AppStore.getNewTradeList(),
      // Future orders parameters
      straddleNames: AppStore.getStraddleNames(),
      selectedStraddle: '',
      sellAmount: 0,
      buyAmount: 0
    };
  }

  componentWillMount() {
    AppStore.on("CHANGE", this.updateMarket.bind(this));
    AppStore.on("CHANGE", this.updateAuthenticated.bind(this));
    AppStore.on("CHANGE", this.updateBalance.bind(this));
    AppStore.on("CHANGE", this.updateTicker.bind(this));
    AppStore.on("CHANGE", this.updateTradeList.bind(this));
    AppStore.on("CHANGE", this.updateNewTradeList.bind(this));
    AppStore.on("CHANGE", this.updateStraddleNames.bind(this));
  }

  componentWillUnmount() {
    AppStore.removeListener("CHANGE", this.updateMarket.bind(this));
    AppStore.removeListener("CHANGE", this.updateAuthenticated.bind(this));
    AppStore.removeListener("CHANGE", this.updateBalance.bind(this));
    AppStore.removeListener("CHANGE", this.updateTicker.bind(this));
    AppStore.removeListener("CHANGE", this.updateTradeList.bind(this));
    AppStore.removeListener("CHANGE", this.updateNewTradeList.bind(this));
    AppStore.removeListener("CHANGE", this.updateStraddleNames.bind(this));
  }
  updateMarket() {
    this.setState({ market: AppStore.getMarket() });
  }
  updateAuthenticated() {
    this.setState({ authenticated: AppStore.getAuthenticated() });
  }
  updateBalance() {
    this.setState({ balance: AppStore.getBalance() });
  }
  updateTicker() {
    this.setState({ ticker: AppStore.getTicker() });
  }
  updateTradeList() {
    this.setState({ tradeList: AppStore.getTradeList() });
  }
  updateNewTradeList() {
    this.setState({ newTradeList: AppStore.getNewTradeList() });
  }
  updateStraddleNames() {
    this.setState({ straddleNames: AppStore.getStraddleNames() });
  }

  handleLoadOrders() {
    websocketAPI.loadOrders(this.state.market)
  }

  handleCancelOrders() {
    websocketAPI.cancelOrders(this.state.market)
  }

  handlePreviewOrders() {
    let selectedStraddle = this.state.selectedStraddle
    if (selectedStraddle == '') selectedStraddle = 'normal_straddle';
    websocketAPI.previewOrders({
      straddleId: selectedStraddle,
      market: this.state.market,
      sellAmount: this.state.sellAmount,
      buyAmount: this.state.buyAmount
    })
  }

  handleFireOrders() {
    let selectedStraddle = this.state.selectedStraddle
    if (selectedStraddle == '') selectedStraddle = 'normal_straddle';
    websocketAPI.fireOrders({
      straddleId: selectedStraddle,
      market: this.state.market,
      sellAmount: this.state.sellAmount,
      buyAmount: this.state.buyAmount
    })
  }

  handleSelectedStraddle(selectedStraddle) {
    this.setState({ selectedStraddle });
  }
  handleChangeSellAmount(e) {
    this.setState({ sellAmount: e.target.value });
  }
  handleChangeBuyAmount(e) {
    this.setState({ buyAmount: e.target.value });
  }

  render() {
    let displayApp = Boolean(this.state.market);
    if (!this.state.authenticated) {
      return (
        <Authenticate />
      )
    }
    else if (displayApp) {
      return (
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-2 col-lg-2">
              <Sidebar
              market={this.state.market}
              />
            </div>
            <div class="col-sm-12 col-md-10 col-lg-10">
              <MarketStatus
              market={this.state.market}
              ticker={this.state.ticker}
              balance={this.state.balance}
              />
              <CurrentTrades
              market={this.state.market}
              tradeList={this.state.tradeList}
              handleCancelOrders={this.handleCancelOrders.bind(this)}
              handleLoadOrders={this.handleLoadOrders.bind(this)}
              />
              <NewTrades
              market={this.state.market}
              newTradeList={this.state.newTradeList}
              straddleNames={this.state.straddleNames}
              handlePreviewOrders={this.handlePreviewOrders.bind(this)}
              handleFireOrders={this.handleFireOrders.bind(this)}
              handleSelectedStraddle={this.handleSelectedStraddle.bind(this)}
              handleChangeBuyAmount={this.handleChangeBuyAmount.bind(this)}
              handleChangeSellAmount={this.handleChangeSellAmount.bind(this)}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Home />
      )
    }
  }
}
