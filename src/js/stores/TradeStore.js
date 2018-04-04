import { observable } from 'mobx'

let tradeList = {
  buy: [ { amount: 0.01852639,
      rate: 0.02833794,
      rateRelative: -0.5002126984126984,
      amountNorm: 0.26822776786668295 },
    { amount: 0.01543866,
      rate: 0.03400553,
      rateRelative: -0.40025520282186955,
      amountNorm: 0.22352316401914474 },
    { amount: 0.01323314,
      rate: 0.03967312,
      rateRelative: -0.30029770723104054,
      amountNorm: 0.19159132481111088 },
    { amount: 0.01157899,
      rate: 0.04534071,
      rateRelative: -0.20034021164021165,
      amountNorm: 0.16764230062363164 },
    { amount: 0.01029244,
      rate: 0.0510083,
      rateRelative: -0.10038271604938276,
      amountNorm: 0.14901544267942984 } ]

  , sell: [ { amount: 0.005,
      rate: 0.11335178,
      rateRelative: 0.9991495590828925,
      amountNorm: 0.19999999999999998 },
    { amount: 0.005,
      rate: 0.17002767,
      rateRelative: 1.9987243386243385,
      amountNorm: 0.19999999999999998 },
    { amount: 0.005,
      rate: 0.22670356,
      rateRelative: 2.998299118165785,
      amountNorm: 0.19999999999999998 },
    { amount: 0.005,
      rate: 0.28337945,
      rateRelative: 3.9978738977072306,
      amountNorm: 0.19999999999999998 },
    { amount: 0.005,
      rate: 0.34005534,
      rateRelative: 4.997448677248677,
      amountNorm: 0.19999999999999998 } ]
}

class TradeStore {
  @observable tradeList = tradeList
  @observable filer = ''
}

var store = window.store = new TradeStore

export default store
