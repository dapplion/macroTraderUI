import React from "react";
import params from "Params";

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let url = params.otpUrl + '#' + this.props.otp;
    let classString = '';
    if (this.props.status) {
      if (this.props.status.includes('Success')) {
        classString = 'table-success';
      } else if (this.props.status.includes('Pending')) {
        classString = 'table-warning';
      } else if (this.props.status.includes('Error')) {
        classString = 'table-danger';
      }
    }
    return (
      <tr class={classString}>
        <td>{this.props.a}</td>
        <td>{this.props.b}</td>
        <td>{this.props.c}</td>
        <td>{this.props.d}</td>
        <td>{this.props.status}</td>
      </tr>
    );
  }
}

class TradeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props)
    let rows = [];
    for (let i = 0; i < this.props.tradeList.length; i++) {
      let order = this.props.tradeList[i];
      let amountPercent = Math.round(order.amountNorm * 100)
      let ratePercent = Math.round(order.rateRelative * 100)
      rows.push(
        <Row
          key={i}
          a={order.amount.toFixed(params.numberOfDecimals)}
          b={amountPercent}
          c={order.rate.toFixed(params.numberOfDecimals)}
          d={ratePercent}
          status={order.status}
        />
      );
    }

    return (
      <div class="table-responsive">
        <h4 class="text-center">{this.props.title}</h4>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Amount</th>
              <th>(%)</th>
              <th>Rate</th>
              <th>(%)</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default class TradeLists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6 col-md-6 col-lg-6">
            <TradeList
              tradeList={this.props.tradeList.buy}
              title={'Buys'}
            />
          </div>
          <div class="col-sm-6 col-md-6 col-lg-6">
            <TradeList
              tradeList={this.props.tradeList.sell}
              title={'Sells'}
            />
          </div>
        </div>
      </div>
    );
  }
}
