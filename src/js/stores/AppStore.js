import { EventEmitter } from 'events'
import params from 'Params'

import dispatcher from '../dispatcher'

let defaultBalance = {name: '', amount: 0}

class AppStore extends EventEmitter {
  constructor() {
    super()
    this.variable = params.variable;
    this.tradeList = {}
    this.newTradeList = {}
    this.balance = {
      A: defaultBalance,
      B: defaultBalance
    }
    this.ticker = {}
    this.balance = {}
    this.marketList = {name: [], change: {}}
    this.straddleNames = []
    if (params.dev) {
      this.market = 'BTC-LTC'
      this.authenticated = true
    } else {
      this.market = ''
      this.authenticated = false
    }

    this.signInMessage = ''

    this.tag = {
      UPDATE_VARIABLE: 'UPDATE_VARIABLE',
      UPDATE_TRADELIST: 'UPDATE_TRADELIST',
      UPDATE_NEWTRADELIST: 'UPDATE_NEWTRADELIST',
      UPDATE_MARKETLIST: 'UPDATE_MARKETLIST',
      UPDATE_STRADDLENAMES: 'UPDATE_STRADDLENAMES',
      UPDATE_MARKET: 'UPDATE_MARKET',
      UPDATE_BALANCE: 'UPDATE_BALANCE',
      UPDATE_AUTHENTICATED: 'UPDATE_AUTHENTICATED',
      UPDATE_SIGNINMESSAGE: 'UPDATE_SIGNINMESSAGE',
      CHANGE: 'CHANGE'
    }
  }

  getVariable() {
    return this.variable;
  }
  getTradeList() {
    return this.tradeList;
  }
  getNewTradeList() {
    return this.newTradeList;
  }
  getMarketList() {
    return this.marketList;
  }
  getStraddleNames() {
    return this.straddleNames;
  }
  getMarket() {
    return this.market;
  }
  getBalance() {
    let balance = [];
    let coins = this.market.split('-');
    let _this = this;
    coins.forEach(function(coin) {
      balance.push({
        coin: coin,
        balance: _this.balance[coin]
      })
    });
    return balance;
  }
  getTicker() {
    return {
      market: this.market,
      ticker: this.ticker[this.market]
    };
  }
  getAuthenticated() {
    return this.authenticated;
  }
  getSignInMessage() {
    return this.signInMessage;
  }

  handleActions(action) {
    switch(action.type) {
      case this.tag.UPDATE_VARIABLE: {
        this.variable = action.variable;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_MARKET: {
        this.market = action.market;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_BALANCE: {
        this.balance[action.coin] = action.balance;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_TICKER: {
        this.ticker[action.market] = action.ticker;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_TRADELIST: {
        this.tradeList[action.tradeList.market] = action.tradeList;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_NEWTRADELIST: {
        this.newTradeList[action.newTradeList.market] = action.newTradeList;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_MARKETLIST: {
        this.marketList = action.marketList;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_STRADDLENAMES: {
        this.straddleNames = action.straddleNames;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_AUTHENTICATED: {
        this.authenticated = action.authenticated;
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_SIGNINMESSAGE: {
        this.signInMessage = action.signInMessage;
        this.emit(this.tag.CHANGE);
        break;
      }
    }
  }

}

const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;
