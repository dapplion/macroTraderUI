import React from 'react';
import 'API/testSockets';
import AppStore from 'Store/AppStore';

export default class TradingInterface extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let ticker = this.props.ticker || {market: '', ticker: ''}
    let balanceA = this.props.balance[0] || {name: '', balance: ''}
    let balanceB = this.props.balance[1] || {name: '', balance: ''}

    return (
      <div class="container mt-4">
        <h2>{this.props.market} market</h2>
        <div class="row">
          <div class="col-sm-4">
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item card-title">Your {balanceA.coin} Balance</li>
                <li class="list-group-item">{balanceA.balance || 0.0}</li>
              </ul>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{ticker.market} Ticker</li>
                <li class="list-group-item">{ticker.ticker}</li>
              </ul>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Your {balanceB.coin} Balance</li>
                <li class="list-group-item">{balanceB.balance || 0.0}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

// <p><strong>Balance {balance.A.name} </strong>{balance.A.amount}</p>
// <p><strong>Balance {balance.B.name} </strong>{balance.B.amount}</p>

// PARKING
  // the reload buttons
  // <button
  // onClick={this.handleReloadDeviceList.bind(this)}>Reload device list</button>
