export interface ErrorMessageAndErrors {
  message: string;
  errors: string[];
}

export enum Session {
  NORMAL = 'NORMAL',
  AM = 'AM',
  PM = 'PM',
  SEAMLESS = 'SEAMLESS',
}

export enum Duration {
  DAY = 'DAY',
  GOOD_TILL_CANCEL = 'GOOD_TILL_CANCEL',
  FILL_OR_KILL = 'FILL_OR_KILL',
  IMMEDIATE_OR_CANCEL = 'IMMEDIATE_OR_CANCEL',
  END_OF_WEEK = 'END_OF_WEEK',
  END_OF_MONTH = 'END_OF_MONTH',
  NEXT_END_OF_MONTH = 'NEXT_END_OF_MONTH',
  UNKNOWN = 'UNKNOWN'
}

export enum OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
  STOP = 'STOP',
  STOP_LIMIT = 'STOP_LIMIT',
  TRAILING_STOP = 'TRAILING_STOP',
  CABINET = 'CABINET',
  NON_MARKETABLE = 'NON_MARKETABLE',
  MARKET_ON_CLOSE = 'MARKET_ON_CLOSE',
  EXERCISE = 'EXERCISE',
  TRAILING_STOP_LIMIT = 'TRAILING_STOP_LIMIT',
  NET_DEBIT = 'NET_DEBIT',
  NET_CREDIT = 'NET_CREDIT',
  NET_ZERO = 'NET_ZERO',
  LIMIT_ON_CLOSE = 'LIMIT_ON_CLOSE',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Enum for order types allowed in OrderRequest (does not include UNKNOWN).
 */
export enum OrderTypeRequest {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
  STOP = 'STOP',
  STOP_LIMIT = 'STOP_LIMIT',
  TRAILING_STOP = 'TRAILING_STOP',
  CABINET = 'CABINET',
  NON_MARKETABLE = 'NON_MARKETABLE',
  MARKET_ON_CLOSE = 'MARKET_ON_CLOSE',
  EXERCISE = 'EXERCISE',
  TRAILING_STOP_LIMIT = 'TRAILING_STOP_LIMIT',
  NET_DEBIT = 'NET_DEBIT',
  NET_CREDIT = 'NET_CREDIT',
  NET_ZERO = 'NET_ZERO',
  LIMIT_ON_CLOSE = 'LIMIT_ON_CLOSE'
}

export enum ComplexOrderStrategyType {
  NONE = 'NONE',
  COVERED = 'COVERED',
  VERTICAL = 'VERTICAL',
  BACK_RATIO = 'BACK_RATIO',
  CALENDAR = 'CALENDAR',
  DIAGONAL = 'DIAGONAL',
  STRADDLE = 'STRADDLE',
  STRANGLE = 'STRANGLE',
  COLLAR_SYNTHETIC = 'COLLAR_SYNTHETIC',
  BUTTERFLY = 'BUTTERFLY',
  CONDOR = 'CONDOR',
  IRON_CONDOR = 'IRON_CONDOR',
  VERTICAL_ROLL = 'VERTICAL_ROLL',
  COLLAR_WITH_STOCK = 'COLLAR_WITH_STOCK',
  DOUBLE_DIAGONAL = 'DOUBLE_DIAGONAL',
  UNBALANCED_BUTTERFLY = 'UNBALANCED_BUTTERFLY',
  UNBALANCED_CONDOR = 'UNBALANCED_CONDOR',
  UNBALANCED_IRON_CONDOR = 'UNBALANCED_IRON_CONDOR',
  UNBALANCED_VERTICAL_ROLL = 'UNBALANCED_VERTICAL_ROLL',
  MUTUAL_FUND_SWAP = 'MUTUAL_FUND_SWAP',
  CUSTOM = 'CUSTOM',
}

export enum RequestedDestination {
  INET = 'INET',
  ECN_ARCA = 'ECN_ARCA',
  CBOE = 'CBOE',
  AMEX = 'AMEX',
  PHLX = 'PHLX',
  ISE = 'ISE',
  BOX = 'BOX',
  NYSE = 'NYSE',
  NASDAQ = 'NASDAQ',
  BATS = 'BATS',
  C2 = 'C2',
  AUTO = 'AUTO',
}

export enum StopPriceLinkBasis {
  MANUAL = 'MANUAL',
  BASE = 'BASE',
  TRIGGER = 'TRIGGER',
  LAST = 'LAST',
  BID = 'BID',
  ASK = 'ASK',
  ASK_BID = 'ASK_BID',
  MARK = 'MARK',
  AVERAGE = 'AVERAGE',
}

export enum StopPriceLinkType {
  VALUE = 'VALUE',
  PERCENT = 'PERCENT',
  TICK = 'TICK',
}

export type StopPriceOffset = number;

export enum StopType {
  STANDARD = 'STANDARD',
  BID = 'BID',
  ASK = 'ASK',
  LAST = 'LAST',
  MARK = 'MARK',
}

export enum PriceLinkBasis {
  MANUAL = 'MANUAL',
  BASE = 'BASE',
  TRIGGER = 'TRIGGER',
  LAST = 'LAST',
  BID = 'BID',
  ASK = 'ASK',
  ASK_BID = 'ASK_BID',
  MARK = 'MARK',
  AVERAGE = 'AVERAGE',
}

export enum PriceLinkType {
  VALUE = 'VALUE',
  PERCENT = 'PERCENT',
  TICK = 'TICK',
}

export enum TaxLotMethod {
  FIFO = 'FIFO',
  LIFO = 'LIFO',
  HIGH_COST = 'HIGH_COST',
  LOW_COST = 'LOW_COST',
  AVERAGE_COST = 'AVERAGE_COST',
  SPECIFIC_LOT = 'SPECIFIC_LOT',
  LOSS_HARVESTER = 'LOSS_HARVESTER',
}

export enum SpecialInstruction {
  ALL_OR_NONE = 'ALL_OR_NONE',
  DO_NOT_REDUCE = 'DO_NOT_REDUCE',
  ALL_OR_NONE_DO_NOT_REDUCE = 'ALL_OR_NONE_DO_NOT_REDUCE',
}

export enum OrderStrategyType {
  SINGLE = 'SINGLE',
  CANCEL = 'CANCEL',
  RECALL = 'RECALL',
  PAIR = 'PAIR',
  FLATTEN = 'FLATTEN',
  TWO_DAY_SWAP = 'TWO_DAY_SWAP',
  BLAST_ALL = 'BLAST_ALL',
  OCO = 'OCO',
  TRIGGER = 'TRIGGER',
}

export enum OrderStatus {
  AWAITING_PARENT_ORDER = 'AWAITING_PARENT_ORDER',
  AWAITING_CONDITION = 'AWAITING_CONDITION',
  AWAITING_STOP_CONDITION = 'AWAITING_STOP_CONDITION',
  AWAITING_MANUAL_REVIEW = 'AWAITING_MANUAL_REVIEW',
  ACCEPTED = 'ACCEPTED',
  AWAITING_UR_OUT = 'AWAITING_UR_OUT',
  PENDING_ACTIVATION = 'PENDING_ACTIVATION',
  QUEUED = 'QUEUED',
  WORKING = 'WORKING',
  REJECTED = 'REJECTED',
  PENDING_CANCEL = 'PENDING_CANCEL',
  CANCELED = 'CANCELED',
  PENDING_REPLACE = 'PENDING_REPLACE',
  REPLACED = 'REPLACED',
  FILLED = 'FILLED',
  EXPIRED = 'EXPIRED',
  NEW = 'NEW',
  AWAITING_RELEASE_TIME = 'AWAITING_RELEASE_TIME',
  PENDING_ACKNOWLEDGEMENT = 'PENDING_ACKNOWLEDGEMENT',
  PENDING_RECALL = 'PENDING_RECALL',
  UNKNOWN = 'UNKNOWN',
}

export enum AmountIndicator {
  DOLLARS = 'DOLLARS',
  SHARES = 'SHARES',
  ALL_SHARES = 'ALL_SHARES',
  PERCENTAGE = 'PERCENTAGE',
  UNKNOWN = 'UNKNOWN',
}

export enum SettlementInstruction {
  REGULAR = 'REGULAR',
  CASH = 'CASH',
  NEXT_DAY = 'NEXT_DAY',
  UNKNOWN = 'UNKNOWN',
}

export enum AssetType {
  EQUITY = 'EQUITY',
  MUTUAL_FUND = 'MUTUAL_FUND',
  OPTION = 'OPTION',
  FUTURE = 'FUTURE',
  FOREX = 'FOREX',
  INDEX = 'INDEX',
  CASH_EQUIVALENT = 'CASH_EQUIVALENT',
  FIXED_INCOME = 'FIXED_INCOME',
  PRODUCT = 'PRODUCT',
  CURRENCY = 'CURRENCY',
  COLLECTIVE_INVESTMENT = 'COLLECTIVE_INVESTMENT',
}

export enum Instruction {
  BUY = 'BUY',
  SELL = 'SELL',
  BUY_TO_COVER = 'BUY_TO_COVER',
  SELL_SHORT = 'SELL_SHORT',
  BUY_TO_OPEN = 'BUY_TO_OPEN',
  BUY_TO_CLOSE = 'BUY_TO_CLOSE',
  SELL_TO_OPEN = 'SELL_TO_OPEN',
  SELL_TO_CLOSE = 'SELL_TO_CLOSE',
  EXCHANGE = 'EXCHANGE',
  SELL_SHORT_EXEMPT = 'SELL_SHORT_EXEMPT',
}

export interface OrderLeg {
  askPrice?: number;
  bidPrice?: number;
  lastPrice?: number;
  markPrice?: number;
  projectedCommission?: number;
  quantity: number;
  finalSymbol?: string;
  legId?: number;
  assetType: AssetType;
  instruction: Instruction;
}

export enum APIRuleAction {
  ACCEPT = 'ACCEPT',
  ALERT = 'ALERT',
  REJECT = 'REJECT',
  REVIEW = 'REVIEW',
  UNKNOWN = 'UNKNOWN',
}

export interface OrderBalance {
  orderValue?: number;
  projectedAvailableFund?: number;
  projectedBuyingPower?: number;
  projectedCommission?: number;
}

export interface OrderValidationDetail {
  validationRuleName?: string;
  message?: string;
  activityMessage?: string;
  originalSeverity?: APIRuleAction;
  overrideName?: string;
  overrideSeverity?: APIRuleAction;
}

export interface FeeValue {
  value: number;
  type: FeeType;
}

export enum FeeType {
  COMMISSION = 'COMMISSION',
  SEC_FEE = 'SEC_FEE',
  STR_FEE = 'STR_FEE',
  R_FEE = 'R_FEE',
  CDSC_FEE = 'CDSC_FEE',
  OPT_REG_FEE = 'OPT_REG_FEE',
  ADDITIONAL_FEE = 'ADDITIONAL_FEE',
  MISCELLANEOUS_FEE = 'MISCELLANEOUS_FEE',
  FTT = 'FTT',
  FUTURES_CLEARING_FEE = 'FUTURES_CLEARING_FEE',
  FUTURES_DESK_OFFICE_FEE = 'FUTURES_DESK_OFFICE_FEE',
  FUTURES_EXCHANGE_FEE = 'FUTURES_EXCHANGE_FEE',
  FUTURES_GLOBEX_FEE = 'FUTURES_GLOBEX_FEE',
  FUTURES_NFA_FEE = 'FUTURES_NFA_FEE',
  FUTURES_PIT_BROKERAGE_FEE = 'FUTURES_PIT_BROKERAGE_FEE',
  FUTURES_TRANSACTION_FEE = 'FUTURES_TRANSACTION_FEE',
  LOW_PROCEEDS_COMMISSION = 'LOW_PROCEEDS_COMMISSION',
  BASE_CHARGE = 'BASE_CHARGE',
  GENERAL_CHARGE = 'GENERAL_CHARGE',
  GST_FEE = 'GST_FEE',
  TAF_FEE = 'TAF_FEE',
  INDEX_OPTION_FEE = 'INDEX_OPTION_FEE',
  TEFRA_TAX = 'TEFRA_TAX',
  STATE_TAX = 'STATE_TAX',
  UNKNOWN = 'UNKNOWN',
}

export interface FeeLeg {
  feeValues: FeeValue[];
}

export interface Fees {
  feeLegs: FeeLeg[];
}

export interface CommissionValue {
  value: number;
  type: FeeType;
}

export interface CommissionLeg {
  commissionValues: CommissionValue[];
}

export interface Commission {
  commissionLegs: CommissionLeg[];
}

export interface CommissionAndFees {
  commission: Commission;
  fee: Fees;
  trueCommission: Commission;
}

/**
 * Represents a date parameter in ISO-8601 format.
 * Example valid format: yyyy-MM-dd'T'HH:mm:ss.SSSZ
 */
export type DateParam = {
  date: string;
};

/**
 * Enum for the account type.
 */
export enum AccountType {
  CASH = "CASH",
  MARGIN = "MARGIN",
}

/**
 * Represents a financial instrument.
 * Note: In the original spec there are “oneOf” definitions. You may choose to use union types here.
 */
export interface BaseInstrument {
  cusip: string;
  symbol: string;
  description: string;
  instrumentId?: number;
  netChange?: number;
}

/**
 * Specialized Instrument for Equity.
 */
export interface AccountEquity extends BaseInstrument {
  // Additional properties if needed.
}

/**
 * Specialized Instrument for Fixed Income.
 */
export interface AccountFixedIncome extends BaseInstrument {
  maturityDate?: string; // ISO string or similar format
  factor?: number;
  variableRate?: number;
}

/**
 * Specialized Instrument for Mutual Funds.
 */
export interface AccountMutualFund extends BaseInstrument {
  // Additional properties, if any.
}

/**
 * Specialized Instrument for Options.
 */
export interface AccountOption extends BaseInstrument {
  optionDeliverables?: any;  // Adjust type according to spec if possible
  putCall?: string;          // Possibly "PUT" | "CALL"
  optionMultiplier?: number;
  underlyingSymbol?: string;
}

/**
 * Union type for an instrument:
 * It can be one of several specialized types.
 */
export type AccountsInstrument = AccountEquity | AccountFixedIncome | AccountMutualFund | AccountOption;

/**
 * A single position held in the account.
 */
export interface Position {
  shortQuantity: number;  // number($double)
  averagePrice: number;
  currentDayProfitLoss: number;
  currentDayProfitLossPercentage: number;
  longQuantity: number;
  settledLongQuantity: number;
  settledShortQuantity: number;
  agedQuantity: number;
  instrument: AccountsInstrument;
}

/**
 * Initial balance structure for a Margin account.
 */
export interface MarginInitialBalance {
  accruedInterest: number;
  availableFundsNonMarginableTrade: number;
  bondValue: number;
  buyingPower: number;
  cashBalance: number;
  cashAvailableForTrading: number;
  cashReceipts: number;
  dayTradingBuyingPower: number;
  dayTradingBuyingPowerCall: number;
  dayTradingEquityCall?: number;
  equity: number;
  equityPercentage: number;
  liquidationValue: number;
  longMarginValue: number;
  longOptionMarketValue: number;
  longStockValue: number;
  maintenanceCall: number;
  maintenanceRequirement: number;
  margin: number;
  marginEquity: number;
  moneyMarketFund: number;
  mutualFundValue: number;
  regTCall: number;
  shortMarginValue: number;
  shortOptionMarketValue: number;
  shortStockValue: number;
  totalCash: number;
  isInCall: number;
  unsettledCash: number;
  pendingDeposits: number;
  marginBalance: number;
  shortBalance: number;
  accountValue: number;
}

/**
 * Initial balance structure for a Cash account.
 */
export interface CashInitialBalance {
  accruedInterest: number;
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
  cashBalance: number;
  bondValue: number;
  cashReceipts: number;
  liquidationValue: number;
  longOptionMarketValue: number;
  longStockValue: number;
  moneyMarketFund: number;
  mutualFundValue: number;
  shortOptionMarketValue: number;
  shortStockValue: number;
  isInCall: number;
  unsettledCash: number;
  cashDebitCallValue: number;
  pendingDeposits: number;
  accountValue: number;
}

/**
 * Current balances structure for Margin accounts.
 */
export interface MarginCurrentBalance {
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

/**
 * Current balances structure for Cash accounts.
 */
export interface CashCurrentBalance {
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
  cashCall: number;
  longNonMarginableMarketValue: number;
  totalCash: number;
  cashDebitCallValue: number;
  unsettledCash: number;
}

/**
 * Projected balances structure for Margin accounts.
 */
export interface MarginProjectedBalance extends MarginCurrentBalance {
  // For many fields, projected balance is same as current
}

/**
 * Projected balances structure for Cash accounts.
 */
export interface CashProjectedBalance extends CashCurrentBalance {
  // Define as needed, possibly same as current
}

/**
 * Common properties for an account (either Margin or Cash).
 */
export interface BaseAccount {
  type: AccountType;
  accountNumber: string;
  roundTrips: number;
  isDayTrader: boolean;  // default false
  isClosingOnlyRestricted: boolean;  // default false; note: originally text showed "isClosingOnlyRestrictedboolean"
  pfcbFlag: boolean; // default false
  positions: Position[];
  marketValue: number;
  maintenanceRequirement: number;
  averageLongPrice: number;
  averageShortPrice: number;
  taxLotAverageLongPrice: number;
  taxLotAverageShortPrice: number;
  longOpenProfitLoss: number;
  shortOpenProfitLoss: number;
  previousSessionLongQuantity: number;
  previousSessionShortQuantity: number;
  currentDayCost: number;
  // Balances grouped by initial, current, projected
  initialBalances: MarginInitialBalance | CashInitialBalance;
  currentBalances: MarginCurrentBalance | CashCurrentBalance;
  projectedBalances: MarginProjectedBalance | CashProjectedBalance;
}

/**
 * A Margin Account is represented by BaseAccount (where type equals AccountType.MARGIN).
 */
export interface MarginAccount extends BaseAccount {
  type: AccountType.MARGIN;
  initialBalances: MarginInitialBalance;
  currentBalances: MarginCurrentBalance;
  projectedBalances: MarginProjectedBalance;
}

/**
 * A Cash Account is represented by BaseAccount (where type equals AccountType.CASH).
 */
export interface CashAccount extends BaseAccount {
  type: AccountType.CASH;
  initialBalances: CashInitialBalance;
  currentBalances: CashCurrentBalance;
  projectedBalances: CashProjectedBalance;
}

/**
 * The overall Accounts response, which might include a collection of accounts.
 */
export interface AccountsResponse {
  securitiesAccount: SecuritiesAccount
}

export type SecuritiesAccount = MarginAccount | CashAccount;
export interface SecuritiesAccountBase {
  type: AccountType;
  accountNumber: string;
  roundTrips: number;
  isDayTrader: boolean;
  isClosingOnlyRestricted: boolean;
  pfcbFlag: boolean;
  positions: Position[];
}

export enum OrderLegType {
  EQUITY = 'EQUITY',
  OPTION = 'OPTION',
  INDEX = 'INDEX',
  MUTUAL_FUND = 'MUTUAL_FUND',
  CASH_EQUIVALENT = 'CASH_EQUIVALENT',
  FIXED_INCOME = 'FIXED_INCOME',
  CURRENCY = 'CURRENCY',
  COLLECTIVE_INVESTMENT = 'COLLECTIVE_INVESTMENT',
}

export type LegId = number;

export enum PositionEffect {
  OPENING = 'OPENING',
  CLOSING = 'CLOSING',
  AUTOMATIC = 'AUTOMATIC',
}
export enum ExecutionType {
  EXECUTION = 'EXECUTION',
  ORDER = 'ORDER',
  OTHER = 'OTHER',
  // Add other execution types if needed
}

export interface OrderActivity {
  activityType: 'FILL';
  quantity: number;
  orderRemainingQuantity: number;
  executionLegs: ExecutionLeg[];
}

export interface ExecutionLeg {
  legId: number;
  price: number;
  quantity: number;
  mismarkedQuantity: number;
  instrumentId: number;
  time: string; // date-time
  executionType: ExecutionType;
}

export interface AccountCashEquivalent extends BaseInstrument {
  assetType: AssetType;
  type: 'SWEEP_VEHICLE' | 'SAVINGS' | 'MONEY_MARKET_FUND' | 'UNKNOWN';
}

export interface AccountAPIOptionDeliverable {
  symbol: string;
  deliverableUnits: number;
  apiCurrencyType: 'USD' | 'CAD' | 'EUR' | 'JPY';
  assetType: AssetType;
}

export interface Order {
  session: Session;
  duration: Duration;
  orderType: OrderType;
  cancelTime?: DateParam;
  complexOrderStrategyType: ComplexOrderStrategyType;
  quantity: number;
  filledQuantity: number;
  remainingQuantity: number;
  requestedDestination?: RequestedDestination;
  destinationLinkName?: string;
  releaseTime?: DateParam;
  stopPrice?: number;
  stopPriceLinkBasis?: StopPriceLinkBasis;
  stopPriceLinkType?: StopPriceLinkType;
  stopPriceOffset?: StopPriceOffset;
  stopType?: StopType;
  priceLinkBasis?: PriceLinkBasis;
  priceLinkType?: PriceLinkType;
  price?: number;
  taxLotMethod?: TaxLotMethod;
  orderLegCollection: OrderLegCollection[];
  activationPrice?: number;
  specialInstruction?: SpecialInstruction;
  orderStrategyType: OrderStrategyType;
  orderId?: number;
  cancelable?: boolean;
  editable?: boolean;
  status?: OrderStatus;
  enteredTime?: string; // date-time
  closeTime?: string; // date-time
  tag?: string;
  accountNumber?: number;
  orderActivityCollection?: OrderActivity[];
  replacingOrderCollection?: any[]; // Could be more specific if needed
  childOrderStrategies?: Order[];
  statusDescription?: string;
}

/**
 * Represents an order request for placing or modifying an order.
 */
export interface OrderRequest {
  session: Session;
  duration: Duration;
  orderType: OrderTypeRequest;
  cancelTime?: string; // ISO date-time
  complexOrderStrategyType: ComplexOrderStrategyType;
  quantity: number;
  filledQuantity: number;
  remainingQuantity: number;
  destinationLinkName?: string;
  releaseTime?: string; // ISO date-time
  stopPrice?: number;
  stopPriceLinkBasis?: StopPriceLinkBasis;
  stopPriceLinkType?: StopPriceLinkType;
  stopPriceOffset?: number;
  stopType?: StopType;
  priceLinkBasis?: PriceLinkBasis;
  priceLinkType?: PriceLinkType;
  price?: number;
  taxLotMethod?: TaxLotMethod;
  orderLegCollection: OrderLegCollection[];
  activationPrice?: number;
  specialInstruction?: SpecialInstruction;
  orderStrategyType: OrderStrategyType;
  orderId?: number;
  cancelable?: boolean;
  editable?: boolean;
  status?: OrderStatus;
  enteredTime?: string; // ISO date-time
  closeTime?: string; // ISO date-time
  accountNumber?: number;
  orderActivityCollection?: OrderActivity[];
  replacingOrderCollection?: any[];
  childOrderStrategies?: OrderRequest[];
  statusDescription?: string;
}

export interface OrderLegCollection {
  orderLegType: OrderLegType;
  legId?: number;
  instrument: AccountsInstrument | AccountCashEquivalent;
  instruction: Instruction;
  positionEffect?: PositionEffect;
  quantity: number;
  quantityType?: 'ALL_SHARES' | 'DOLLARS' | 'SHARES';
  divCapGains?: 'REINVEST' | 'PAYOUT';
  toSymbol?: string;
}

/**
 * Represents a preview of an order, including validation and commission/fee details.
 */
export interface PreviewOrder {
  orderId: number;
  orderStrategy: OrderStrategy;
  orderValidationResult: OrderValidationResult;
  commissionAndFee: CommissionAndFees;
}

/**
 * Represents the strategy and details of an order.
 */
export interface OrderStrategy {
  accountNumber: string;
  advancedOrderType: AdvancedOrderType;
  closeTime?: string; // ISO date-time
  enteredTime?: string; // ISO date-time
  orderBalance: OrderBalance;
  orderStrategyType: OrderStrategyType;
  orderVersion: number;
  session: Session;
  status: OrderStatus;
  allOrNone?: boolean;
  discretionary?: boolean;
  duration: Duration;
  filledQuantity: number;
  orderType: OrderType;
  orderValue: number;
  price?: number;
  quantity: number;
  remainingQuantity: number;
  sellNonMarginableFirst?: boolean;
  settlementInstruction?: SettlementInstruction;
  strategy: ComplexOrderStrategyType;
  amountIndicator?: AmountIndicator;
  orderLegs: OrderLeg[];
}

/**
 * Enum for advanced order types.
 */
export enum AdvancedOrderType {
  NONE = 'NONE',
  OTO = 'OTO',
  OCO = 'OCO',
  OTOCO = 'OTOCO',
  OT2OCO = 'OT2OCO',
  OT3OCO = 'OT3OCO',
  BLAST_ALL = 'BLAST_ALL',
  OTA = 'OTA',
  PAIR = 'PAIR'
}

/**
 * Represents the result of order validation, including alerts, accepts, rejects, reviews, and warns.
 */
export interface OrderValidationResult {
  alerts?: OrderValidationDetail[];
  accepts?: OrderValidationDetail[];
  rejects?: OrderValidationDetail[];
  reviews?: OrderValidationDetail[];
  warns?: OrderValidationDetail[];
}


