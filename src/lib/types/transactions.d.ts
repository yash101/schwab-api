import { EncryptedAccountNumber, UserDetails } from "./accounts";
import { DateAndTime, ErrorMessageAndErrors } from "./api";
import {
  AssetType,
  CashEquivalentTypeEnum,
  CollectiveInvestmentTypeEnum,
  FixedIncomeTypeEnum,
  ForexTypeEnum,
  FutureTypeEnum,
  IndexTypeEnum,
  MutualFundTypeEnum,
  OptionTypeEnum,
  ProductTypeEnum,
  PutCallEnum,
  TransactionEquityTypeEnum
} from "./asset";
import { FeeTypeEnum } from "./fee";
import { PositionEffectEnum } from "./orders";

/////// RPCs

// getTransactionsForAccount
export interface GetTransactionsForAccountRequest {
  accountNumber: EncryptedAccountNumber;
  startDate: Date; // Changed from Date
  endDate: Date; // Changed from Date
  types: TransactionTypeEnum[];
  symbol?: string; // optional symbol to filter transactions
}
export type GetTransactionsForAccountResponse =
  Transaction[] | ErrorMessageAndErrors;

// getTransactionForAccountByTransactionId
export interface GetTransactionForAccountByTransactionIdRequest {
  accountNumber: EncryptedAccountNumber;
  transactionId: number; // int64
}
export type GetTransactionForAccountByTransactionIdResponse =
  Transaction | ErrorMessageAndErrors;

/////// Interfaces

export enum TransactionTypeEnum {
  TRADE = "TRADE",
  RECEIVE_AND_DELIVER = "RECEIVE_AND_DELIVER",
  DIVIDEND_OR_INTEREST = "DIVIDEND_OR_INTEREST",
  ACH_RECEIPT = "ACH_RECEIPT",
  ACH_DISBURSEMENT = "ACH_DISBURSEMENT",
  CASH_RECEIPT = "CASH_RECEIPT",
  CASH_DISBURSEMENT = "CASH_DISBURSEMENT",
  ELECTRONIC_FUND = "ELECTRONIC_FUND",
  WIRE_OUT = "WIRE_OUT",
  WIRE_IN = "WIRE_IN",
  JOURNAL = "JOURNAL",
  MEMORANDUM = "MEMORANDUM",
  MARGIN_CALL = "MARGIN_CALL",
  MONEY_MARKET = "MONEY_MARKET",
  SMA_ADJUSTMENT = "SMA_ADJUSTMENT",
}

export enum TransactionStatusEnum {
  VALID = "VALID",
  INVALID = "INVALID",
  PENDING = "PENDING",
  UNKNOWN = "UNKNOWN",
}

export enum SubAccountEnum {
  CASH = "CASH",
  MARGIN = "MARGIN",
  SHORT = "SHORT",
  DIV = "DIV",
  INCOME = "INCOME",
  UNKNOWN = "UNKNOWN",
}

export enum TransactionActivityTypeEnum {
  ACTIVITY_CORRECTION = "ACTIVITY_CORRECTION",
  EXECUTION = "EXECUTION",
  ORDER_ACTION = "ORDER_ACTION",
  TRANSFER = "TRANSFER",
  UNKNOWN = "UNKNOWN",
}

export interface Transaction {
  activityId: number; // int64
  time: string; // date-time
  user: UserDetails;
  description: string;
  accountNumber: string;
  type: TransactionTypeEnum;
  status: TransactionStatusEnum; // Changed from string
  subAccount: SubAccountEnum; // Changed from string
  tradeDate: string; // date-time
  settlementDate: string; // date-time
  positionId?: number; // int64, optional
  orderId?: number; // int64, optional
  netAmount: number; // double
  activityType: TransactionActivityTypeEnum; // Changed from string
  transferItems?: TransferItem[]; // Optional
}

export interface TransferItem {
  instrument: TransactionInstrument;
  amount: number; // double
  cost: number; // double
  price: number; // double
  feeType: FeeTypeEnum;
  positionEffect: PositionEffectEnum; // Changed from string
}

export type TransactionInstrument =
  | TransactionCashEquivalent
  | CollectiveInvestment
  | Currency
  | TransactionEquity
  | TransactionFixedIncome
  | Forex
  | Future
  | Index
  | TransactionMutualFund
  | TransactionOption
  | Product;

export interface TransactionBaseInstrument {
  assetType: AssetType;
  cusip: string;
  symbol: string;
  description: string;
  instrumentId: number; // int64
  netChange: number; // double
}

export interface TransactionCashEquivalent extends TransactionBaseInstrument {
  type: CashEquivalentTypeEnum; // Changed from string enum comment
}

export interface CollectiveInvestment extends TransactionBaseInstrument {
  type: CollectiveInvestmentTypeEnum; // Changed from string enum comment
}

export interface Currency extends TransactionBaseInstrument {}

export interface TransactionEquity extends TransactionBaseInstrument {
  type: TransactionEquityTypeEnum; // Changed from string enum comment
}

export interface TransactionFixedIncome extends TransactionBaseInstrument {
  type: FixedIncomeTypeEnum; // Changed from string enum comment
  maturityDate: DateAndTime; // date-time
  factor: number; // double
  multiplier: number; // double
  variableRate: number; // double
}

export interface Forex extends TransactionBaseInstrument {
  type: ForexTypeEnum; // Changed from string enum comment
  baseCurrency: Currency;
  counterCurrency: Currency;
}

export interface Future extends TransactionBaseInstrument {
  activeContract: boolean;
  type: FutureTypeEnum; // Changed from string enum comment
  expirationDate: string; // date-time
  lastTradingDate: string; // date-time
  firstNoticeDate: string; // date-time
  multiplier: number; // double
}

export interface Index extends TransactionBaseInstrument {
  activeContract: boolean;
  type: IndexTypeEnum; // Changed from string enum comment
}

export interface TransactionMutualFund extends TransactionBaseInstrument {
  fundFamilyName: string;
  fundFamilySymbol: string;
  fundGroup: string;
  type: MutualFundTypeEnum; // Changed from string enum comment
  exchangeCutoffTime: string; // date-time
  purchaseCutoffTime: string; // date-time
  redemptionCutoffTime: string; // date-time
}

export interface TransactionAPIOptionDeliverable {
  rootSymbol: string;
  strikePercent: number; // int64
  deliverableNumber: number; // int64
  deliverableUnits: number; // double
  deliverable: TransactionInstrument;
  assetType: AssetType;
}

export interface TransactionOption extends TransactionBaseInstrument {
  expirationDate: string; // date-time
  optionDeliverables: TransactionAPIOptionDeliverable[];
  optionPremiumMultiplier: number; // int64
  putCall: PutCallEnum; // Changed from string enum comment
  strikePrice: number; // double
  type: OptionTypeEnum; // Changed from string enum comment
  underlyingSymbol: string;
  underlyingCusip: string;
  deliverable: TransactionInstrument;
}

export interface Product extends TransactionBaseInstrument {
  type: ProductTypeEnum; // Changed from string enum comment
}
