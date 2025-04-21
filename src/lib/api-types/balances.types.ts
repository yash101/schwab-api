// Base fields common to Cash/Margin, Initial/Current/Projected where applicable
export interface BaseBalance {
  accruedInterest: number; // In Initial Balances
  bondValue: number; // In Initial Balances
  cashBalance: number; // In Initial Balances
  cashReceipts: number; // In Initial Balances
  liquidationValue: number; // In Initial Balances
  longOptionMarketValue: number; // In Initial Balances
  longStockValue: number; // In Initial Balances
  moneyMarketFund: number; // In Initial Balances
  mutualFundValue: number; // In Initial Balances
  shortOptionMarketValue: number; // In Initial Balances
  shortStockValue: number; // In Initial Balances
  unsettledCash: number; // In Initial & Cash Balances
  pendingDeposits: number; // In Initial Balances
  accountValue: number; // In Initial Balances
}

// Fields specific to Margin Current/Projected Balances
export interface MarginBalanceFields {
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
  isInCall: number; // Consider boolean if appropriate
  stockBuyingPower: number;
  optionBuyingPower: number;
}

// Margin Current/Projected Balance combines Base (where applicable) + Margin specific fields
// Note: Docs show MarginBalance doesn't include all BaseBalance fields directly. Review API response.
// Assuming MarginBalance includes only its specific fields for Current/Projected.
export interface MarginBalance extends MarginBalanceFields {}

// Margin Initial Balance includes Base + some Margin specific fields + unique Initial fields
export interface MarginInitialBalance extends BaseBalance {
  // Fields from BaseBalance are inherited

  // Fields also in MarginBalanceFields (Current/Projected)
  availableFundsNonMarginableTrade: number;
  buyingPower: number;
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
  isInCall: number; // Consider boolean

  // Fields potentially unique to MarginInitialBalance based on docs
  cashAvailableForTrading: number; // Doc shows this in MarginInitialBalance
  dayTradingEquityCall: number; // Doc shows this in MarginInitialBalance
  margin: number; // Doc shows this (obsolete?)
  marginEquity: number; // Doc shows this
  totalCash: number; // Doc shows this in MarginInitialBalance
}

// Fields specific to Cash Current/Projected Balances
export interface CashBalanceFields {
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
  cashCall: number;
  longNonMarginableMarketValue: number;
  totalCash: number;
  cashDebitCallValue: number;
  unsettledCash: number; // Also in BaseBalance
}

// Moved from accounts.d.ts
// Cash Current/Projected Balance combines Base (where applicable) + Cash specific fields
// Note: Docs show CashBalance doesn't include all BaseBalance fields directly. Review API response.
// Assuming CashBalance includes only its specific fields for Current/Projected.
export interface CashBalance extends CashBalanceFields {}

// Cash Initial Balance includes Base + some Cash specific fields
export interface CashInitialBalance extends BaseBalance {
  // Fields from BaseBalance are inherited

  // Fields also in CashBalanceFields (Current/Projected)
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
  cashDebitCallValue: number;
  unsettledCash: number; // Also in BaseBalance

  // Fields potentially unique to CashInitialBalance based on docs
  isInCall: number; // Consider boolean. Also in Margin balances.
}


