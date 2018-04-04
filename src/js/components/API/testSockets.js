  import * as AppActions from 'Action'

  // Setup websockets
  var socket = io('http://localhost:3000');
  console.log('Socket connected, id: ', socket)

  // init App info
  console.log('Requesting market list')
  socket.emit('getMarketList');
  console.log('Requesting straddle list')
  socket.emit('getStraddles');

  socket.on('marketList', function(res){
    if (res) {
      AppActions.updateMarketList(res)
    } else {
      console.log('Error requesting marketList');
    }
  });

  socket.on('ticker', function(res){
    if (res.success) {
      AppActions.updateTicker(res.market, res.result.Last)
    } else {
      console.log('Error requesting balance');
    }
  });

  socket.on('balance', function(res){
    if (res.success) {
      AppActions.updateBalance(res.result.Currency, res.result.Available)
    } else {
      console.log('Error requesting balance');
    }
  });

  socket.on('straddles', function(straddleNames){
    AppActions.updateStraddleNames(straddleNames)
  });

  socket.on('openOrders', function(tradeList){
    AppActions.updateTradeList(tradeList)
  });

  socket.on('previewOrders', function(newTradeList){
    AppActions.updateNewTradeList(newTradeList)
  });

  export function previewOrders(options) {
    // Fallback to avoid errors on server
    if (options.straddleId == '') options.straddleId = 'normal_straddle';
    console.log('Previewing orders',options)
    socket.emit('computeOrders',options);
  }

  export function fireOrders(options) {
    // Fallback to avoid errors on server
    if (options.straddleId == '') options.straddleId = 'normal_straddle';
    console.log('Firing orders',options)
    socket.emit('fireOrders',options);
  }

  export function cancelOrders(market) {
    socket.emit('cancelOrders',market);
  }

  export function loadOrders(market) {
    socket.emit('getMarket',market);
  }

  export function getSingleMarket(market) {
    // Fallback to avoid errors on server
    socket.emit('getMarket',market);
  }

  // SIGN IN PART
  export function signIn(credentials) {
    socket.emit('signIn',credentials);
  }
  socket.on('signInResponse', function(response){
    console.log('received signIn response ',response)
    if (response.success) {
      AppActions.updateSignInMessage('Successfuly authenticated')
    } else {
      AppActions.updateSignInMessage(response.message)
    }
    AppActions.updateAuthenticated(response.success)

    // AppActions.updateNewTradeList(newTradeList)
  });
