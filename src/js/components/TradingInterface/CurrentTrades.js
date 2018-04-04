import React from 'react';
import TradeLists from './TradeLists';
import AppStore from 'Store/AppStore';

export default class TradingInterface extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let tradeList;
    if (this.props.tradeList.hasOwnProperty(this.props.market)) {
      tradeList = this.props.tradeList[this.props.market];
    } else {
      tradeList = {buy: [], sell: []};
    }
    return (
      <div class="container mt-4">
        <div class="row">
          <div class="col-sm-12">
            <h2>Current Trades</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <button type="button" class="btn btn-outline-secondary mb-3"
            onClick={this.props.handleCancelOrders}>Cancel orders</button>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <TradeLists
              tradeList={tradeList}
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
