import { ErrorMessageAndErrors } from "../shared/shared";
import { AccountsInstrument, EncryptedAccountNumber } from "./accounts";
import { NoParametersResponse } from "./api";
import { AssetType } from "./asset";

//////// RPCs

// Get orders for an account
export interface GetOrdersForAccountRequest extends BaseGetOrdersRequest {
  accountNumber: EncryptedAccountNumber;
}
export type GetOrdersForAccountResponse = Order[];

// Place order for an account
export interface PostOrderForAccountRequest {
  accountNumber: EncryptedAccountNumber;
  order: Order;
}
export type PostOrderForAccountResponse = Order;

// Get order by order ID
export interface GetOrderForAccountByOrderIdRequest {
  accountNumber: EncryptedAccountNumber;
  orderId: number; // int64
}
export type GetOrderForAccountByOrderIdResponse = Order;

// Delete order by order ID
export interface DeleteOrderForAccountByOrderIdRequest {
  accountNumber: EncryptedAccountNumber;
  orderId: number; // int64
}
export type DeleteOrderForAccountByOrderIdResponse =
  NoParametersResponse | ErrorMessageAndErrors;

// Replace order by order ID
export interface ReplaceOrderForAccountByOrderIdRequest {
  accountNumber: EncryptedAccountNumber;
  orderId: number; // int64
  order: Order;
}
export type ReplaceOrderForAccountByOrderIdResponse =
  NoParametersResponse | ErrorMessageAndErrors;

// Get orders for all accounts
export interface GetOrdersForAllAccountsRequest extends BaseGetOrdersRequest { }
export type GetOrdersForAllAccountsResponse = Order[];

// Preview order for an account
export type PreviewOrderForAccountRequest = PostOrderForAccountRequest;
export type PreviewOrderForAccountResponse = Order;

//////// Types & Interfaces

export interface BaseGetOrdersRequest {
  maxResults?: number; // i64
  fromEnteredTime: Date;
  toEnteredTime: Date;
  status?: OrderStatusEnum; // or somtthing
}

export enum OrderStatusEnum {
  AWAITING_PARENT_ORDER = "AWAITING_PARENT_ORDER",
  AWAITING_CONDITION = "AWAITING_CONDITION",
  AWAITING_STOP_CONDITION = "AWAITING_STOP_CONDITION",
  AWAITING_MANUAL_REVIEW = "AWAITING_MANUAL_REVIEW",
  ACCEPTED = "ACCEPTED",
  AWAITING_UR_OUT = "AWAITING_UR_OUT",
  PENDING_ACTIVATION = "PENDING_ACTIVATION",
  QUEUED = "QUEUED",
  WORKING = "WORKING",
  REJECTED = "REJECTED",
  PENDING_CANCEL = "PENDING_CANCEL",
  CANCELED = "CANCELED",
  PENDING_REPLACE = "PENDING_REPLACE",
  REPLACED = "REPLACED",
  FILLED = "FILLED",
  EXPIRED = "EXPIRED",
  NEW = "NEW",
  AWAITING_RELEASE_TIME = "AWAITING_RELEASE_TIME",
  PENDING_ACKNOWLEDGEMENT = "PENDING_ACKNOWLEDGEMENT",
  PENDING_RECALL = "PENDING_RECALL",
  UNKNOWN = "UNKNOWN"
}

/**
 * Represents an order in the trading system, including its details, status, and associated activities.
 *
 * @interface Order
 *
 * @property {SessionEnum} session - The trading session during which the order is active.
 * @property {DurationEnum} duration - The duration for which the order remains valid.
 * @property {OrderTypeEnum} orderType - The type of the order (e.g., MARKET, LIMIT).
 * @property {string} [cancelTime] - The time at which the order will be canceled, if applicable (ISO 8601 format).
 * @property {ComplexOrderStrategyTypeEnum} complexOrderStrategyType - The strategy type for complex orders.
 * @property {number} quantity - The total quantity of the order.
 * @property {number} filledQuantity - The quantity of the order that has been filled.
 * @property {number} remainingQuantity - The quantity of the order that remains unfilled.
 * @property {RequestedDestinationEnum} requestedDestination - The requested destination for the order execution.
 * @property {string} destinationLinkName - The specific venue name if AUTO is not used.
 * @property {string} [releaseTime] - The release time for conditional orders (ISO 8601 format).
 * @property {number} [stopPrice] - The stop price for the order, if applicable.
 * @property {StopPriceLinkBasisEnum} stopPriceLinkBasis - The basis for linking the stop price.
 * @property {StopPriceLinkTypeEnum} stopPriceLinkType - The type of link for the stop price.
 * @property {number} [stopPriceOffset] - The offset for the stop price, if applicable.
 * @property {StopTypeEnum} stopType - The type of stop order.
 * @property {PriceLinkBasisEnum} priceLinkBasis - The basis for linking the price.
 * @property {PriceLinkTypeEnum} priceLinkType - The type of link for the price.
 * @property {number} [price] - The price for the order (e.g., limit price).
 * @property {TaxLotMethodEnum} taxLotMethod - The tax lot method used for the order.
 * @property {OrderLegCollection[]} orderLegCollection - The collection of order legs associated with the order.
 * @property {number} [activationPrice] - The activation price for conditional orders, if applicable.
 * @property {SpecialInstructionEnum} specialInstruction - Any special instructions for the order.
 * @property {OrderStrategyTypeEnum} orderStrategyType - The strategy type for the order.
 * @property {number} orderId - The unique identifier for the order (int64).
 * @property {boolean} cancelable - Indicates whether the order can be canceled.
 * @property {boolean} editable - Indicates whether the order can be edited.
 * @property {OrderStatusEnum} status - The current status of the order.
 * @property {string} enteredTime - The time the order was entered (ISO 8601 format).
 * @property {string} [closeTime] - The time the order was closed (e.g., filled or expired) (ISO 8601 format).
 * @property {string} [tag] - A user-defined tag for the order.
 * @property {number} accountNumber - The account number associated with the order (int64).
 * @property {OrderActivity[]} orderActivityCollection - The collection of activities associated with the order.
 * @property {Order[]} replacingOrderCollection - The collection of orders that replaced this order, if any.
 * @property {OrderStrategy[]} childOrderStrategies - The child order strategies for complex orders.
 * @property {string} statusDescription - A more descriptive text for the order's status.
 */
export interface Order {
  session: SessionEnum;
  duration: DurationEnum;
  orderType: OrderTypeEnum;
  cancelTime?: string; // ISO 8601 date-time string
  complexOrderStrategyType: ComplexOrderStrategyTypeEnum;
  quantity: number; // Total order quantity
  filledQuantity: number;
  remainingQuantity: number;
  requestedDestination: RequestedDestinationEnum;
  destinationLinkName: string; // Specific venue name if AUTO not used
  releaseTime?: string; // ISO 8601 date-time string for conditional orders
  stopPrice?: number;
  stopPriceLinkBasis: StopPriceLinkBasisEnum;
  stopPriceLinkType: StopPriceLinkTypeEnum;
  stopPriceOffset?: number;
  stopType: StopTypeEnum;
  priceLinkBasis: PriceLinkBasisEnum;
  priceLinkType: PriceLinkTypeEnum;
  price?: number; // Limit price, etc.
  taxLotMethod: TaxLotMethodEnum;
  orderLegCollection: OrderLegCollection[];
  activationPrice?: number; // For conditional orders
  specialInstruction: SpecialInstructionEnum;
  orderStrategyType: OrderStrategyTypeEnum;
  orderId: number; // int64
  cancelable: boolean;
  editable: boolean;
  status: OrderStatusEnum;
  enteredTime: string; // ISO 8601 date-time string
  closeTime?: string; // ISO 8601 date-time string for fill or expiry time
  tag?: string; // User-defined tag
  accountNumber: number; // int64
  orderActivityCollection: OrderActivity[];
  replacingOrderCollection: Order[]; // Array of the replacing orders
  childOrderStrategies: ChildOrderStrategy[];
  statusDescription: string; // More descriptive status text
}

export interface ChildOrderStrategy {
  orderStrategyType: OrderStrategyTypeEnum;
  orders: Order[]; // Nested orders within the child strategy
}

export interface OrderLegCollection {
  orderLegType: AssetType;
  legId: number; // int64
  instrument: AccountsInstrument;
  instruction: InstructionEnum;
  positionEffect: PositionEffectEnum;
  quantity: number;
  quantityType: QuantityTypeEnum;
  divCapGains?: DivCapGainsEnum;
  toSymbol?: string; // Used for specific instructions like Exchange
}

export interface OrderActivity {
  activityType: ActivityTypeEnum;
  executionType: ExecutionTypeEnum;
  quantity: number; // Quantity in this activity
  orderRemainingQuantity: number; // Remaining after this activity
  executionLegs: ExecutionLeg[];
}

export interface ExecutionLeg {
  legId: number; // int64
  price: number;
  quantity: number;
  mismarkedQuantity?: number;
  instrumentId: number; // int64
  time: string; // ISO 8601 date-time string
}

export enum SessionEnum {
  NORMAL = "NORMAL",
  AM = "AM",
  PM = "PM",
  SEAMLESS = "SEAMLESS",
}

export enum DurationEnum {
  DAY = "DAY",
  GOOD_TILL_CANCEL = "GOOD_TILL_CANCEL",
  FILL_OR_KILL = "FILL_OR_KILL",
  IMMEDIATE_OR_CANCEL = "IMMEDIATE_OR_CANCEL",
  END_OF_WEEK = "END_OF_WEEK",
  END_OF_MONTH = "END_OF_MONTH",
  NEXT_END_OF_MONTH = "NEXT_END_OF_MONTH",
  UNKNOWN = "UNKNOWN",
}

export enum OrderTypeEnum {
  MARKET = "MARKET",
  LIMIT = "LIMIT",
  STOP = "STOP",
  STOP_LIMIT = "STOP_LIMIT",
  TRAILING_STOP = "TRAILING_STOP",
  CABINET = "CABINET",
  NON_MARKETABLE = "NON_MARKETABLE",
  MARKET_ON_CLOSE = "MARKET_ON_CLOSE",
  EXERCISE = "EXERCISE",
  TRAILING_STOP_LIMIT = "TRAILING_STOP_LIMIT",
  NET_DEBIT = "NET_DEBIT",
  NET_CREDIT = "NET_CREDIT",
  NET_ZERO = "NET_ZERO",
  LIMIT_ON_CLOSE = "LIMIT_ON_CLOSE",
  UNKNOWN = "UNKNOWN",
}

export enum ComplexOrderStrategyTypeEnum {
  NONE = "NONE",
  COVERED = "COVERED",
  VERTICAL = "VERTICAL",
  BACK_RATIO = "BACK_RATIO",
  CALENDAR = "CALENDAR",
  DIAGONAL = "DIAGONAL",
  STRADDLE = "STRADDLE",
  STRANGLE = "STRANGLE",
  COLLAR_SYNTHETIC = "COLLAR_SYNTHETIC",
  BUTTERFLY = "BUTTERFLY",
  CONDOR = "CONDOR",
  IRON_CONDOR = "IRON_CONDOR",
  VERTICAL_ROLL = "VERTICAL_ROLL",
  COLLAR_WITH_STOCK = "COLLAR_WITH_STOCK",
  DOUBLE_DIAGONAL = "DOUBLE_DIAGONAL",
  UNBALANCED_BUTTERFLY = "UNBALANCED_BUTTERFLY",
  UNBALANCED_CONDOR = "UNBALANCED_CONDOR",
  UNBALANCED_IRON_CONDOR = "UNBALANCED_IRON_CONDOR",
  UNBALANCED_VERTICAL_ROLL = "UNBALANCED_VERTICAL_ROLL",
  MUTUAL_FUND_SWAP = "MUTUAL_FUND_SWAP",
  CUSTOM = "CUSTOM",
}

export enum RequestedDestinationEnum {
  INET = "INET",
  ECN_ARCA = "ECN_ARCA",
  CBOE = "CBOE",
  AMEX = "AMEX",
  PHLX = "PHLX",
  ISE = "ISE",
  BOX = "BOX",
  NYSE = "NYSE",
  NASDAQ = "NASDAQ",
  BATS = "BATS",
  C2 = "C2",
  AUTO = "AUTO",
}

export enum StopPriceLinkBasisEnum {
  MANUAL = "MANUAL",
  BASE = "BASE",
  TRIGGER = "TRIGGER",
  LAST = "LAST",
  BID = "BID",
  ASK = "ASK",
  ASK_BID = "ASK_BID",
  MARK = "MARK",
  AVERAGE = "AVERAGE",
}

export enum StopPriceLinkTypeEnum {
  VALUE = "VALUE",
  PERCENT = "PERCENT",
  TICK = "TICK",
}

export enum StopTypeEnum {
  STANDARD = "STANDARD",
  BID = "BID",
  ASK = "ASK",
  LAST = "LAST",
  MARK = "MARK",
}

export enum PriceLinkBasisEnum {
  MANUAL = "MANUAL",
  BASE = "BASE",
  TRIGGER = "TRIGGER",
  LAST = "LAST",
  BID = "BID",
  ASK = "ASK",
  ASK_BID = "ASK_BID",
  MARK = "MARK",
  AVERAGE = "AVERAGE",
}

export enum PriceLinkTypeEnum {
  VALUE = "VALUE",
  PERCENT = "PERCENT",
  TICK = "TICK",
}

export enum TaxLotMethodEnum {
  FIFO = "FIFO",
  LIFO = "LIFO",
  HIGH_COST = "HIGH_COST",
  LOW_COST = "LOW_COST",
  AVERAGE_COST = "AVERAGE_COST",
  SPECIFIC_LOT = "SPECIFIC_LOT",
  LOSS_HARVESTER = "LOSS_HARVESTER",
}

export enum SpecialInstructionEnum {
  ALL_OR_NONE = "ALL_OR_NONE",
  DO_NOT_REDUCE = "DO_NOT_REDUCE",
  ALL_OR_NONE_DO_NOT_REDUCE = "ALL_OR_NONE_DO_NOT_REDUCE",
}

export enum OrderStrategyTypeEnum {
  SINGLE = "SINGLE",
  CANCEL = "CANCEL",
  RECALL = "RECALL",
  PAIR = "PAIR",
  FLATTEN = "FLATTEN",
  TWO_DAY_SWAP = "TWO_DAY_SWAP",
  BLAST_ALL = "BLAST_ALL",
  OCO = "OCO",
  TRIGGER = "TRIGGER",
}

export enum PositionEffectEnum {
  OPENING = "OPENING",
  CLOSING = "CLOSING",
  AUTOMATIC = "AUTOMATIC",
}

export enum QuantityTypeEnum {
  ALL_SHARES = "ALL_SHARES",
  DOLLARS = "DOLLARS",
  SHARES = "SHARES",
}

export enum DivCapGainsEnum {
  REINVEST = "REINVEST",
  PAYOUT = "PAYOUT",
}

export enum ActivityTypeEnum {
  EXECUTION = "EXECUTION",
  ORDER_ACTION = "ORDER_ACTION",
}

export enum ExecutionTypeEnum {
  FILL = "FILL",
}

export enum InstructionEnum {
  BUY = "BUY",
  SELL = "SELL",
  BUY_TO_COVER = "BUY_TO_COVER",
  SELL_SHORT = "SELL_SHORT",
  BUY_TO_OPEN = "BUY_TO_OPEN",
  BUY_TO_CLOSE = "BUY_TO_CLOSE",
  SELL_TO_OPEN = "SELL_TO_OPEN",
  SELL_TO_CLOSE = "SELL_TO_CLOSE",
  EXCHANGE = "EXCHANGE",
  SELL_SHORT_EXEMPT = "SELL_SHORT_EXEMPT",
}
