import { PutCallEnum } from './asset';
import { ExchangeName } from './market';

export enum OptionExpirationType {
  MONTHLY = 'M', // End Of Month Expiration Calendar Cycle
  QUARTERLY = 'Q', // Quarterly expirations
  WEEKLY = 'W', // Weekly expiration
  REGULAR_S = 'S'  // Expires 3rd Friday of the month
}

export enum OptionSettlementTypeEnum {
  AM = 'A', // AM settlement
  PM = 'P'  // PM settlement
}

export enum QuoteTypeEnum {
  NBBO = 'NBBO', // Realtime
  NFL = 'NFL',   // Non-fee liable quote
}

export enum OptionStrategyEnum {
  SINGLE = 'SINGLE',
  ANALYTICAL = 'ANALYTICAL',
  COVERED = 'COVERED',
  VERTICAL = 'VERTICAL',
  CALENDAR = 'CALENDAR',
  STRANGLE = 'STRANGLE',
  STRADDLE = 'STRADDLE',
  BUTTERFLY = 'BUTTERFLY',
  CONDOR = 'CONDOR',
  DIAGONAL = 'DIAGONAL',
  COLLAR = 'COLLAR',
  ROLL = 'ROLL',
}

export enum FundStrategyEnum {
  ACTIVE = 'A',
  LEVERAGED = 'L',
  PASSIVE = 'P',
  QUANTITATIVE = 'Q',
  SHORT = 'S',
}

export enum OptionExerciseTypeEnum {
  AMERICAN = 'A',
  EUROPEAN = 'E',
}

export enum DividendFrequency {
  ANNUAL = 1,
  SEMI_ANNUAL = 2,
  THREE_TIMES_A_YEAR = 3,
  QUARTERLY = 4,
  EVERY_OTHER_MONTH = 6,
  ELEVEN_TIMES_A_YEAR = 11,
  MONTHLY = 12,
}

export enum MutualFundAssetSubType {
  OPEN_ENDED_FUND = 'OEF', // Open-End Fund
  CLOSED_ENDED_FUND = 'CEF', // Closed-End Fund
  MONEY_MARKET_FUND = 'MMF', // Money Market Fund
}

export enum EquityAssetSubTypeEnum {
  COMMON_EQUITY = 'COE', // Common Equity
  PREFERRED_EQUITY = 'PRF', // Preferred Equity
  AMERICAN_DEPOSITARY_RECEIPT = 'ADR', // American Depositary Receipt
  GLOBAL_DEPOSITARY_RECEIPT = 'GDR', // Global Depositary Receipt
  CLOSED_END_FUND = 'CEF', // Closed-End Fund
  EXCHANGE_TRADED_FUND = 'ETF', // Exchange-Traded Fund
  EXCHANGE_TRADED_NOTE = 'ETN', // Exchange-Traded Note
  UNIT_INVESTMENT_TRUST = 'UIT', // Unit Investment Trust
  WARRANT = 'WAR', // Warrant
  RIGHTS = 'RGT', // Rights
}

export enum AssetMainTypeEnum {
  BOND = 'BOND',
  EQUITY = 'EQUITY',
  ETF = 'ETF',
  EXTENDED = 'EXTENDED',
  FOREX = 'FOREX',
  FUTURE = 'FUTURE',
  FUTURE_OPTION = 'FUTURE_OPTION',
  FUNDAMENTAL = 'FUNDAMENTAL',
  INDEX = 'INDEX',
  INDICATOR = 'INDICATOR',
  MUTUAL_FUND = 'MUTUAL_FUND',
  OPTION = 'OPTION',
  UNKNOWN = 'UNKNOWN',
}

export enum DirectionEnum {
  UP = 'UP',
  DOWN = 'DOWN',
}

export enum HttpStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface Error {
  id: string; // UUID
  status: string; // HTTP status code
  title: string; // Short error description
  detail: string; // Detailed error description
  source: ErrorSource;
}

export interface ErrorResponse {
  errors: Error[];
}

export interface Interval {
  start: string;
  end: string;
}

export interface MarketHours {
  date: string;
  marketType: AssetMainTypeEnum;
  exchange: string;
  category: string;
  product: string;
  productName: string;
  isOpen: boolean;
  sessionHours: Record<string, Interval[]>;
}

export interface Screener {
  description: string; // Security info of most moved within an index
  change: number; // Change number ($double)
  percentChange: number; // Percent or value changed, by default it's percent changed
  name: string; // Name of security
  direction: DirectionEnum; // Enum: [up, down]
  last: number; // Last quoted price ($double)
  symbol: string; // Schwab security symbol
  totalVolume: number; // Total volume (integer $int64)
}

export interface Candle {
  close: number; // $double
  datetime: number; // $int64
  datetimeISO8601: string; // $yyyy-MM-dd
  high: number; // $double
  low: number; // $double
  open: number; // $double
  volume: number; // $int64
}

export interface CandleList {
  candles: Candle[];
  empty: boolean;
  previousClose: number; // $double
  previousCloseDate: number; // $int64
  previousCloseDateISO8601: string; // $yyyy-MM-dd
  symbol: string;
}

export interface ReferenceBase {
  description: string; // Reference data of Equity security
  cusip: string; // CUSIP of Instrument
  exchange: string; // Exchange Code
  exchangeName: string; // Exchange Name
}

export interface ReferenceEquity extends ReferenceBase {
  fsiDesc: string; // FSI Description
  htbQuantity: number; // Hard to borrow quantity
  htbRate: number; // Hard to borrow rate
  isHardToBorrow: boolean; // Is hard to borrow security
  isShortable: boolean; // Is shortable security
  otcMarketTier: string; // OTC Market Tier
}

export interface ReferenceForex extends ReferenceBase {
  isTradable: boolean; // Is FOREX tradable
  marketMaker: string; // Market maker
  product: string | null; // Product name
  tradingHours: string; // Trading hours
}

export type ReferenceMutualFund = ReferenceBase;
export type ReferenceIndex = Omit<ReferenceBase, 'cusip'>;

export interface ReferenceFutureOption extends Omit<ReferenceBase, 'cusip'> {
  contractType: PutCallEnum; // Indicates call or put
  multiplier: number; // Option multiplier
  expirationDate: number; // Date of expiration in milliseconds since epoch
  expirationStyle: string; // Style of expiration
  strikePrice: number; // Strike Price
  underlying: string; // A company, index, or fund name
}

export interface ReferenceFuture extends Omit<ReferenceBase, 'cusip'> {
  futureActiveSymbol: string; // Active symbol
  futureExpirationDate: number; // Future expiration date in milliseconds since epoch
  futureIsActive: boolean; // Future is active
  futureMultiplier: number; // Future multiplier
  futurePriceFormat: string; // Price format
  futureSettlementPrice: number; // Future Settlement Price
  futureTradingHours: string; // Trading Hours
  product: string; // Futures product symbol
}

export interface Expiration {
  daysToExpiration: number; // integer($int32)
  expiration: string;
  expirationType: OptionExpirationType;
  standard: boolean;
  settlementType: OptionSettlementTypeEnum;
  optionRoots: string;
}

export interface ExpirationChain {
  status: string;
  expirationList: Expiration[];
}

export interface OptionDeliverables {
  symbol: string;
  assetType: string;
  deliverableUnits: string;
  currencyType: string;
}

export interface OptionContract {
  putCall: PutCallEnum;
  symbol: string;
  description: string; // Description of the option contract
  exchangeName: string;
  bidPrice: number;
  askPrice: number;
  lastPrice: number;
  markPrice: number;
  bidSize: number;
  askSize: number;
  lastSize: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  closePrice: number;
  totalVolume: number;
  tradeDate: number;
  quoteTimeInLong: number;
  tradeTimeInLong: number;
  netChange: number;
  volatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  timeValue: number;
  openInterest: number;
  isInTheMoney: boolean;
  theoreticalOptionValue: number;
  theoreticalVolatility: number;
  isMini: boolean;
  isNonStandard: boolean;
  optionDeliverablesList: OptionDeliverables[];
  strikePrice: number;
  expirationDate: string;
  daysToExpiration: number;
  expirationType: OptionExpirationType;
  lastTradingDay: number;
  multiplier: number;
  settlementType: OptionSettlementTypeEnum;
  deliverableNote: string;
  isIndexOption: boolean;
  percentChange: number;
  markChange: number;
  markPercentChange: number;
  isPennyPilot: boolean;
  intrinsicValue: number;
  optionRoot: string;
}

export interface Underlying {
  ask: number;
  askSize: number; // integer($int32)
  bid: number;
  bidSize: number; // integer($int32)
  change: number;
  close: number;
  delayed: boolean;
  description: string;
  exchangeName: ExchangeName;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  highPrice: number;
  last: number;
  lowPrice: number;
  mark: number;
  markChange: number;
  markPercentChange: number;
  openPrice: number;
  percentChange: number;
  quoteTime: number; // integer($int64)
  symbol: string;
  totalVolume: number; // integer($int64)
  tradeTime: number; // integer($int64)
}

export interface OptionContractMap {
  [key: string]: OptionContract;
}

export interface OptionChain {
  symbol: string;
  status: string;
  underlying: Underlying;
  strategy: OptionStrategyEnum;
  interval: number;
  isDelayed: boolean;
  isIndex: boolean;
  daysToExpiration: number;
  interestRate: number;
  underlyingPrice: number;
  volatility: number;
  callExpDateMap: Record<string, OptionContractMap>;
  putExpDateMap: Record<string, OptionContractMap>;
}

export interface ErrorSource {
  pointer: string[]; // List of attributes which lead to this error message.
  parameter: string; // Parameter name which led to this error message.
  header: string; // Header name which led to this error message.
}

export interface BaseQuoteResponse<Quote, Reference> {
  assetMainType: AssetMainTypeEnum;
  ssid: number;
  symbol: string;
  realtime: boolean;
  quote: Quote;
  reference: Reference;
}

export interface EquityResponse extends BaseQuoteResponse<QuoteEquity, ReferenceEquity> {
  assetSubType?: EquityAssetSubTypeEnum;
  quoteType?: QuoteTypeEnum;
  extended?: ExtendedMarketQuoteInformation;
  fundamental?: Fundamental;
  regular?: RegularMarketQuoteInformation;
}

export type OptionResponse = BaseQuoteResponse<QuoteOption, ReferenceOption>;
export type ForexResponse = BaseQuoteResponse<QuoteForex, ReferenceForex>;
export type FutureResponse = BaseQuoteResponse<QuoteFuture, ReferenceFuture>;
export type FutureOptionResponse = BaseQuoteResponse<QuoteFutureOption, ReferenceFutureOption>;
export type IndexResponse = BaseQuoteResponse<QuoteIndex, ReferenceIndex>;
export type MutualFundResponse = BaseQuoteResponse<QuoteMutualFund, ReferenceMutualFund>;

export interface QuoteError {
  invalidCusips?: string[];
  invalidSSIDs?: number[];
  invalidSymbols?: string[];
}

export type QuoteResponseObject =
  | EquityResponse
  | OptionResponse
  | ForexResponse
  | FutureResponse
  | FutureOptionResponse
  | IndexResponse
  | MutualFundResponse
  | QuoteError;

export type QuoteResponse = Record<string, QuoteResponseObject>;

export interface QuoteRequest {
  /**
   * Request one or more quote data in POST body
   */
  cusips?: string[]; // List of cusip, max of 500 of symbols+cusip+ssids

  /**
   * Comma-separated list of nodes in each quote.
   * Possible values are quote, fundamental, reference, extended, regular.
   * Don't send this attribute for full response.
   */
  fields?: string;

  /**
   * List of Schwab security IDs (SSID), max of 500 of symbols+cusip+ssids.
   */
  ssids?: number[]; // integer($int64), minimum: 1, maximum: 9999999999

  /**
   * List of symbols, max of 500 of symbols+cusip+ssids.
   */
  symbols?: string[];

  /**
   * Get realtime quotes and skip entitlement check.
   */
  realtime?: boolean;

  /**
   * Include indicative symbol quotes for all ETF symbols in request.
   * If ETF symbol ABC is in request and indicative=true, API will return quotes for ABC and its corresponding indicative quote for $ABC.IV.
   */
  indicative?: boolean;
}

export interface RegularMarketQuoteInformation {
  regularMarketLastPrice: number; // Regular market last price (example: 124.85)
  regularMarketLastSize: number; // Regular market last size (example: 51771)
  regularMarketNetChange: number; // Regular market net change (example: -1.42)
  regularMarketPercentChange: number; // Regular market percent change (example: -1.1246)
  regularMarketTradeTime: number; // Regular market trade time in milliseconds since Epoch (example: 1621368000400)
}

export interface ExtendedMarketQuoteInformation {
  askPrice?: number; // Extended market ask price
  askSize?: number; // Extended market ask size
  bidPrice?: number; // Extended market bid price
  bidSize?: number; // Extended market bid size
  lastPrice?: number; // Extended market last price
  lastSize?: number; // Extended market last size
  mark?: number; // Mark price
  quoteTime?: number; // Extended market quote time in milliseconds since Epoch
  totalVolume?: number; // Total volume
  tradeTime?: number; // Extended market trade time in milliseconds since Epoch
}

export interface QuoteBase {
  '52WeekHigh'?: number; // Highest price traded in the past 12 months, or 52 weeks
  '52WeekLow'?: number; // Lowest price traded in the past 12 months, or 52 weeks

  askPrice?: number; // Current Best Ask Price
  bidPrice?: number; // Current Best Bid Price

  askSize?: number; // Number of shares for ask
  bidSize?: number; // Number of shares for bid

  highPrice?: number; // Day's high trade price
  lowPrice?: number; // Day's low trade price
  openPrice?: number; // Price at market open
  closePrice?: number; // Previous day's closing price
  lastPrice?: number; // Last traded price

  netChange?: number; // Current Last-Prev Close
  netPercentChange?: number; // Net Percentage Change

  totalVolume?: number; // Aggregated shares traded throughout the day, including pre/post market hours

  tradeTime?: number; // Last trade time in milliseconds since Epoch
  quoteTime?: number; // Last quote time in milliseconds since Epoch

  securityStatus?: string; // Status of security, probably an enum, not documented
}

export interface QuoteForex extends QuoteBase {
  lastSize?: number; // Last size
  mark?: number; // Mark price
  tick?: number; // Tick Price
  tickAmount?: number; // Tick Amount
}

export interface QuoteEquity extends QuoteBase {
  askMICId?: string; // Ask MIC code
  askTime?: number; // Last ask time in milliseconds since Epoch
  bidMICId?: string; // Bid MIC code
  bidTime?: number; // Last bid time in milliseconds since Epoch
  lastMICId?: string; // Last MIC Code
  lastSize?: number; // Last size
  volatility?: number; // Option Risk/Volatility Measurement
}

export interface QuoteOption extends QuoteBase {
  delta?: number; // Delta Value
  gamma?: number; // Gamma Value
  impliedYield?: number; // Implied Yield
  indAskPrice?: number; // Indicative Ask Price
  indBidPrice?: number; // Indicative Bid Price
  indQuoteTime?: number; // Indicative Quote Time
  moneyIntrinsicValue?: number; // Money Intrinsic Value
  openInterest?: number; // Open Interest
  rho?: number; // Rho Value
  theoreticalOptionValue?: number; // Theoretical option Value
  theta?: number; // Theta Value
  timeValue?: number; // Time Value
  underlyingPrice?: number; // Underlying Price
  vega?: number; // Vega Value
  volatility?: number; // Option Risk/Volatility Measurement
  intrinsicValue?: number; // Intrinsic Value
  percentChange?: number; // Percent Change
  mark?: number; // Mark Price
  markChange?: number; // Mark Change
  markPercentChange?: number; // Mark Percent Change
}

export interface QuoteMutualFund extends QuoteBase {
  nAV?: number; // Net Asset Value
  divYield?: number; // Dividend Yield
}

export type QuoteIndex = QuoteBase;

export interface QuoteFutureOption extends QuoteBase {
  askMICId?: string; // Ask MIC code
  bidMICId?: string; // Bid MIC code
  lastMICId?: string; // Last MIC Code
  settlementPrice?: number; // Settlement price
  tick?: number; // Tick Price
  tickAmount?: number; // Tick Amount
}

export interface QuoteFuture extends QuoteBase {
  askMICId?: string; // Ask MIC code
  askTime?: number; // Last ask time in milliseconds since Epoch
  bidMICId?: string; // Bid MIC code
  bidTime?: number; // Last bid time in milliseconds since Epoch
  futurePercentChange?: number; // Net Percentage Change
  quotedInSession?: boolean; // Quoted during trading session
  settleTime?: number; // Settlement time in milliseconds since Epoch
}

export interface ReferenceOption {
  contractType: PutCallEnum; // Indicates call or put
  cusip: string; // CUSIP of Instrument
  daysToExpiration: number; // Days to Expiration
  deliverables: string; // Unit of trade
  exchange: string; // Exchange Code
  exchangeName: string; // Exchange Name
  exerciseType: OptionExerciseTypeEnum; // Option contract exercise type
  expirationDay: number; // Expiration Day
  expirationMonth: number; // Expiration Month
  expirationType: OptionExpirationType; // Expiration type
  expirationYear: number; // Expiration Year
  isPennyPilot: boolean; // Is this contract part of the Penny Pilot program
  lastTradingDay: number; // Last trading day in milliseconds since epoch
  multiplier: number; // Option multiplier
  settlementType: OptionSettlementTypeEnum; // Option contract settlement type
  strikePrice: number; // Strike Price
  underlying: string; // A company, index, or fund name
}

export interface Fundamental {
  avg10DaysVolume: number; // Average 10 day volume
  avg1YearVolume: number; // Average 1 year volume
  declarationDate: string; // Declaration date in yyyy-mm-ddThh:mm:ssZ
  divAmount: number; // Dividend Amount
  divExDate: string; // Dividend date in yyyy-mm-ddThh:mm:ssZ
  divFreq: DividendFrequency | null; // Dividend frequency
  divPayAmount: number; // Dividend Pay Amount
  divPayDate: string; // Dividend pay date in yyyy-mm-ddThh:mm:ssZ
  divYield: number; // Dividend yield
  eps: number; // Earnings per Share
  fundLeverageFactor: number; // Fund Leverage Factor
  fundStrategy: FundStrategyEnum | null; // Fund Strategy
  nextDivExDate: string; // Next Dividend date
  nextDivPayDate: string; // Next Dividend pay date
  peRatio: number; // P/E Ratio
}

export interface Bond {
  cusip: string;
  symbol: string;
  description: string;
  exchange: string;
  assetType: AssetMainTypeEnum;
  bondFactor: string;
  bondMultiplier: string;
  bondPrice: number;
  type: AssetMainTypeEnum;
}

export interface FundamentalInst {
  symbol: string;
  high52: number;
  low52: number;
  pegRatio: number;
  pbRatio: number;
  prRatio: number;
  pcfRatio: number;
  grossMarginTTM: number;
  grossMarginMRQ: number;
  netProfitMarginTTM: number;
  netProfitMarginMRQ: number;
  operatingMarginTTM: number;
  operatingMarginMRQ: number;
  returnOnEquity: number;
  returnOnAssets: number;
  returnOnInvestment: number;
  quickRatio: number;
  currentRatio: number;
  interestCoverage: number;
  totalDebtToCapital: number;
  ltDebtToEquity: number;
  totalDebtToEquity: number;
  epsChangePercentTTM: number;
  epsChangeYear: number;
  epsChange: number;
  revChangeYear: number;
  revChangeTTM: number;
  revChangeIn: number;
  sharesOutstanding: number;
  marketCapFloat: number;
  marketCap: number;
  bookValuePerShare: number;
  shortIntToFloat: number;
  shortIntDayToCover: number;
  divGrowthRate3Year: number;
  beta: number;
  vol1DayAvg: number;
  vol10DayAvg: number;
  vol3MonthAvg: number;
  avg1DayVolume: number;
  avg3MonthVolume: number;
  corpactionDate: string;
  dtnVolume: number;
}

export interface Instrument {
  cusip: string;
  symbol: string;
  description: string;
  exchange: string;
  assetType: AssetMainTypeEnum;
  type: AssetMainTypeEnum;
}

export interface InstrumentResponse extends Instrument {
  bondFactor?: string;
  bondMultiplier?: string;
  bondPrice?: number;
  fundamental?: FundamentalInst;
  bondInstrumentInfo?: Bond;
}
