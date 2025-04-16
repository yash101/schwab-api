export interface BaseBalance {
  accruedInterest: number;
  bondValue: number;
  cashBalance: number;
  cashReceipts: number;
  liquidationValue: number;
  longOptionMarketValue: number;
  longStockValue: number;
  moneyMarketFund: number;
  mutualFundValue: number;
  shortOptionMarketValue: number;
  shortStockValue: number;
  unsettledCash: number;
  pendingDeposits: number;
  accountValue: number;
}

export interface MarginBalance extends BaseBalance {
  availableFunds: number;
  availableFundsNonMarginableTrade: number;
  buyingPower: number;
  buyingPowerNonMarginableTrade: number;
  dayTradingBuyingPower: number;
  dayTradingBuyingPowerCall: number;
  equity: number;
  equityPercentage: number;
  longMarginValue: number;
  maintenanceCall: number;
  maintenanceRequirement: number;
  marginBalance: number;
  regTCall: number;
  shortBalance: number;
  shortMarginValue: number;
  sma: number;
  isInCall: number;
  stockBuyingPower: number;
  optionBuyingPower: number;
}

export interface MarginInitialBalance extends MarginBalance {}

export interface CashInitialBalance extends BaseBalance {
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
  isInCall: number;
  cashDebitCallValue: number;
}


