import dispatcher from "../dispatcher";
import AppStore from 'Store/AppStore';
import * as websocketAPI from 'API/testSockets';

export function updateTradeList(tradeList) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_TRADELIST,
    tradeList: tradeList
  });
}

export function updateNewTradeList(newTradeList) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_NEWTRADELIST,
    newTradeList: newTradeList
  });
}

export function updateBalance(coin, balance) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_BALANCE,
    coin: coin,
    balance: balance
  });
}

export function updateTicker(market, ticker) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_TICKER,
    market: market,
    ticker: ticker
  });
}

export function updateVariable(variable) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_VARIABLE,
    variable: variable
  });
}

export function updateMarket(market) {
  if(Array.isArray(market)) {
    if (market.length > 0) {
      updateMarketVerified(market[0])
    }
  } else {
    updateMarketVerified(market)
  }
}
function updateMarketVerified(market) {
  // When the market changes, automatically fetch info
  websocketAPI.getSingleMarket(market)
  // Dispatch the market change event
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_MARKET,
    market: market
  });
}



export function updateMarketList(marketList) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_MARKETLIST,
    marketList: marketList
  });
}

export function updateStraddleNames(straddleNames) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_STRADDLENAMES,
    straddleNames: straddleNames
  });
}

export function updateAuthenticated(authenticated) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_AUTHENTICATED,
    authenticated: authenticated
  });
}

export function updateSignInMessage(signInMessage) {
  dispatcher.dispatch({
    type: AppStore.tag.UPDATE_SIGNINMESSAGE,
    signInMessage: signInMessage
  });
}
