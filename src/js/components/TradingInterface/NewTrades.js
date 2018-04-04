import React from 'react';
import TradeLists from './TradeLists';
import AppStore from 'Store/AppStore';
import params from 'Params'



export default class TradingInterface extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChangeMode(e) {
    let selectedStraddle;
    this.props.straddleNames.forEach(function(object) {
      if (object.name == e.target.value) selectedStraddle = object.id
    });
    this.props.handleSelectedStraddle(selectedStraddle)
  }

  render() {
    // Keep a copy of each market's tradelist + erase on change
    let newTradeList;
    if (this.props.newTradeList.hasOwnProperty(this.props.market)) {
      newTradeList = this.props.newTradeList[this.props.market];
    } else {
      newTradeList = {buy: [], sell: []};
    }
    // Compute the equivalent buy amount in source coin
    let totalBuyAmount = 0;
    newTradeList.buy.forEach(function(order) {
      totalBuyAmount += order.amount * order.rate;
    })
    totalBuyAmount = totalBuyAmount.toFixed(params.numberOfDecimals)
    // Get each coin name from the market id
    let coins = this.props.market.split('-');
    return (
      <div class="container mt-4">
        <div class="row">
          <div class="col-sm-12">
            <h2>New Trades</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="">Buy amount ({coins[1]})</span>
              </div>
              <input type="text" class="form-control"
              placeholder={"0 "+coins[1]}
              onChange={this.props.handleChangeBuyAmount}
              />
              <div class="input-group-append">
                <span class="input-group-text" id="">= {totalBuyAmount} {coins[0]}</span>
              </div>
              <div class="input-group-prepend">
                <span class="input-group-text" id="">Sell amount ({coins[1]})</span>
              </div>
              <input type="text" class="form-control"
              placeholder={"0 "+coins[1]}
              onChange={this.props.handleChangeSellAmount}
              />
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="input-group col-sm-12 ">
            <select class="custom-select"
              id="mySelect"
              onChange={this.handleChangeMode.bind(this)}
              >
              <option>Choose straddle...</option>
              {this.props.straddleNames.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button"
              onClick={this.props.handlePreviewOrders}
              >Preview Trades</button>
            </div>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary btn btn-dark" type="button"
              onClick={this.props.handleFireOrders}
              >Fire Trades</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <TradeLists
              tradeList={newTradeList}
            />
          </div>
        </div>
      </div>
    );
  }
}

// PARKING
  // the reload buttons
  // <button
  // onClick={this.handleReloadDeviceList.bind(this)}>Reload device list</button>
