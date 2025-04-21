import { AccountsInstrument, EncryptedAccountNumber, AccountNumberString } from "./accounts.types"; // Added AccountNumberString
import { APIRuleAction, ErrorMessageAndErrors, NoParametersResponse } from "./api.types";
import { AssetType } from "./asset.types";
import { CommissionAndFee } from "./fee.types";
import { DestinationEnum, DurationEnum, SessionEnum } from "./market.types";

//////// RPCs

// Get orders for an account
export interface GetOrdersForAccountRequest extends BaseGetOrdersRequest {
  accountNumber: EncryptedAccountNumber;
}
export type GetOrdersForAccountResponse = Order[];

// Place order for an account
export interface PostOrderForAccountRequest {
  accountNumber: EncryptedAccountNumber;
  order: OrderRequest; // Changed from Order
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
  order: OrderRequest; // Changed from Order
}
export type ReplaceOrderForAccountByOrderIdResponse =
  NoParametersResponse | ErrorMessageAndErrors;

// Get orders for all accounts
export interface GetOrdersForAllAccountsRequest extends BaseGetOrdersRequest { }
export type GetOrdersForAllAccountsResponse = Order[];

// Preview order for an account
export type PreviewOrderForAccountRequest = PostOrderForAccountRequest;
export type PreviewOrderForAccountResponse = PreviewOrder;

//////// Types & Interfaces

export interface BaseGetOrdersRequest {
  maxResults?: number; // i64
  fromEnteredTime: Date; // Changed from Date
  toEnteredTime: Date; // Changed from Date
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
 * Represents an order response from the API.
 * Use OrderRequest for placing/replacing orders.
 */
export interface Order {
  session: SessionEnum;
  duration: DurationEnum;
  orderType: OrderTypeEnum;
  cancelTime?: string; // ISO 8601 date-time string
  complexOrderStrategyType: ComplexOrderStrategyTypeEnum;
  quantity: number; // Total order quantity
  filledQuantity: number; // Response only
  remainingQuantity: number; // Response only
  requestedDestination: DestinationEnum;
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
  orderId: number; // int64 - Response only
  cancelable: boolean; // Response only
  editable: boolean; // Response only
  status: OrderStatusEnum; // Response only
  enteredTime: string; // ISO 8601 date-time string - Response only
  closeTime?: string; // ISO 8601 date-time string for fill or expiry time - Response only
  tag?: string; // User-defined tag
  accountNumber: AccountNumberString; // Changed from number - Response only
  orderActivityCollection: OrderActivity[]; // Response only
  replacingOrderCollection: Order[]; // Array of the replacing orders - Response only
  childOrderStrategies: ChildOrderStrategy[]; // Response only
  statusDescription: string; // More descriptive status text - Response only
}

/**
 * Represents the structure for placing or replacing an order.
 */
export interface OrderRequest {
  session: SessionEnum;
  duration: DurationEnum;
  orderType: OrderTypeEnum; // Consider using a stricter enum without UNKNOWN if API requires it for requests
  cancelTime?: string; // ISO 8601 date-time string
  complexOrderStrategyType: ComplexOrderStrategyTypeEnum;
  quantity: number;
  requestedDestination: DestinationEnum;
  destinationLinkName: string;
  releaseTime?: string; // ISO 8601 date-time string for conditional orders
  stopPrice?: number;
  stopPriceLinkBasis: StopPriceLinkBasisEnum;
  stopPriceLinkType: StopPriceLinkTypeEnum;
  stopPriceOffset?: number;
  stopType: StopTypeEnum;
  priceLinkBasis: PriceLinkBasisEnum;
  priceLinkType: PriceLinkTypeEnum;
  price?: number;
  taxLotMethod: TaxLotMethodEnum;
  orderLegCollection: OrderLegCollection[]; // Ensure OrderLegCollection is suitable for requests
  activationPrice?: number;
  specialInstruction: SpecialInstructionEnum;
  orderStrategyType: OrderStrategyTypeEnum;
  tag?: string; // User-defined tag
  // Note: accountNumber is part of the request body, not this object
}

export interface ChildOrderStrategy {
  orderStrategyType: OrderStrategyTypeEnum;
  orders: Order[]; // Nested orders within the child strategy - Response only? Review if needed for requests.
}

export interface OrderLegCollection {
  orderLegType: AssetType;
  legId: number; // int64 - May not be needed for request? Review API spec.
  instrument: AccountsInstrument; // Ensure AccountsInstrument is suitable for requests
  instruction: InstructionEnum;
  positionEffect: PositionEffectEnum; // Changed from string enum comment
  quantity: number;
  quantityType: QuantityTypeEnum; // Changed from string enum comment
  divCapGains?: DivCapGainsEnum; // Changed from string enum comment
  toSymbol?: string; // Used for specific instructions like Exchange
}

export interface OrderActivity {
  activityType: OrderActivityTypeEnum; // Changed from string enum comment
  executionType: 'FILL'; // Changed from string enum comment
  quantity: number; // Quantity in this activity
  orderRemainingQuantity: number; // Remaining after this activity
  executionLegs: ExecutionLeg[];
}

export interface PreviewOrder {
  orderId: number; // int64 - ID assigned during preview
  orderStrategy: OrderStrategy; // The details of the order being previewed
  orderValidationResult: OrderValidationResult; // Warnings, errors, etc.
  commissionAndFee: CommissionAndFee; // Estimated costs
}

export interface OrderValidationResult {
  alerts: OrderValidationDetail[];
  accepts: OrderValidationDetail[];
  rejects: OrderValidationDetail[];
  reviews: OrderValidationDetail[];
  warns: OrderValidationDetail[];
}

export interface OrderValidationDetail {
  validationRuleName: string;
  message: string;
  activityMessage: string;
  originalSeverity: APIRuleAction;
  overrideName: string;
  overrideSeverity: APIRuleAction;
}

export interface OrderStrategy {
  accountNumber: AccountNumberString; // Changed from number
  advancedOrderType: AdvancedOrderTypeEnum; // Enum for advanced order types
  closeTime?: string; // ISO 8601 date-time string
  enteredTime: string; // ISO 8601 date-time string
  orderBalance: OrderBalance; // Balance details for the order
  orderStrategyType: OrderStrategyTypeEnum; // Strategy type for the order
  orderVersion: number;
  session: SessionEnum; // Trading session
  status: OrderStatusEnum; // Current status of the order
  allOrNone: boolean;
  discretionary: boolean;
  duration: DurationEnum; // Duration of the order
  filledQuantity: number; // Quantity filled
  orderType: OrderTypeEnum; // Type of the order
  orderValue: number; // Total value of the order
  price?: number; // Price for the order
  quantity: number; // Total quantity of the order
  remainingQuantity: number; // Remaining quantity
  sellNonMarginableFirst: boolean;
  settlementInstruction: SettlementInstructionEnum; // Settlement instructions
  strategy: ComplexOrderStrategyTypeEnum; // Complex order strategy
  amountIndicator: AmountIndicatorEnum; // Indicator for amount type
  orderLegs: OrderLegCollection[]; // Collection of order legs
}

export interface OrderBalance {
  orderValue: number; // Total value of the order
  projectedAvailableFund: number; // Projected available funds after the order
  projectedBuyingPower: number; // Projected buying power after the order
  projectedCommission: number; // Projected commission for the order
}


export interface ExecutionLeg {
  legId: number; // int64
  price: number; // double
  quantity: number; // double
  mismarkedQuantity: number; // double
  instrumentId: number; // int64 - Matches instrument in OrderLegCollection?
  time: string; // ISO 8601 date-time string
}

export enum SettlementInstructionEnum {
  REGULAR = "REGULAR",
  CASH = "CASH",
  NEXT_DAY = "NEXT_DAY",
  UNKNOWN = "UNKNOWN",
}

export enum AmountIndicatorEnum {
  DOLLARS = "DOLLARS",
  SHARES = "SHARES",
  ALL_SHARES = "ALL_SHARES",
  PERCENTAGE = "PERCENTAGE",
  UNKNOWN = "UNKNOWN",
}

export enum PositionEffectEnum {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
  ROLL = "ROLL",
  OFFSET = "OFFSET",
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
  UNKNOWN = "UNKNOWN"
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
  CUSTOM = "CUSTOM"
}

export enum AdvancedOrderTypeEnum {
  NONE = "NONE",
  OTO = "OTO", // One Triggers Other
  OCO = "OCO", // One Cancels Other
  OTOCO = "OTOCO", // One Triggers OCO
  OT2OCO = "OT2OCO", // One Triggers Two OCO
  OT3OCO = "OT3OCO", // One Triggers Three OCO
  BLAST_ALL = "BLAST_ALL",
  OTA = "OTA", // One Triggers All
  PAIR = "PAIR",
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
  AVERAGE = "AVERAGE"
}

export enum StopPriceLinkTypeEnum {
  VALUE = "VALUE",
  PERCENT = "PERCENT",
  TICK = "TICK"
}

export enum StopTypeEnum {
  STANDARD = "STANDARD",
  BID = "BID",
  ASK = "ASK",
  LAST = "LAST",
  MARK = "MARK"
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
  AVERAGE = "AVERAGE"
}

export enum PriceLinkTypeEnum {
  VALUE = "VALUE",
  PERCENT = "PERCENT",
  TICK = "TICK"
}

export enum TaxLotMethodEnum {
  FIFO = "FIFO",
  LIFO = "LIFO",
  HIGH_COST = "HIGH_COST",
  LOW_COST = "LOW_COST",
  AVERAGE_COST = "AVERAGE_COST",
  SPECIFIC_LOT = "SPECIFIC_LOT",
  LOSS_HARVESTER = "LOSS_HARVESTER"
}

export enum SpecialInstructionEnum {
  ALL_OR_NONE = "ALL_OR_NONE",
  DO_NOT_REDUCE = "DO_NOT_REDUCE",
  ALL_OR_NONE_DO_NOT_REDUCE = "ALL_OR_NONE_DO_NOT_REDUCE"
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
  TRIGGER = "TRIGGER"
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
  SELL_SHORT_EXEMPT = "SELL_SHORT_EXEMPT"
}

export enum QuantityTypeEnum {
  ALL_SHARES = "ALL_SHARES",
  DOLLARS = "DOLLARS",
  SHARES = "SHARES"
}

export enum DivCapGainsEnum {
  REINVEST = "REINVEST",
  PAYOUT = "PAYOUT"
}

export enum OrderActivityTypeEnum {
  EXECUTION = "EXECUTION",
  ORDER_ACTION = "ORDER_ACTION",
}
