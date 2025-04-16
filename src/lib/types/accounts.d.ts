import { ErrorMessageAndErrors } from "../shared/shared";
import { AssetType } from "./asset";
import { CashInitialBalance, MarginBalance, MarginInitialBalance } from "./balances";
import { Position } from "./positions";

////// RPCs

// GET accountNumbers
export interface GetAccountNumbersRequest { }
export type GetAccountNumbersResponse = AccountNumberHash[] | ErrorMessageAndErrors;

// GET accounts
export interface GetAccountsRequest {
  fields?: string[]; // seems like 'positions' is the only possible value
}
export type GetAccountsResponse = Account[] | ErrorMessageAndErrors;

// GET accounts/{accountNumber}
export interface GetSingleAccountRequest {
  accountNumber: AccountNumberString;
  fields?: string[]; // seems like 'positions' is the only possible value
}
export type GetSingleAccountResponse = Account | ErrorMessageAndErrors;

////// INTERFACES

export type AccountNumberString = string;
export type EncryptedAccountNumber = string;

export enum AccountType {
  CASH = "CASH",
  MARGIN = "MARGIN",
}

export interface SecuritiesAccountBase {
  type: AccountType;
  accountNumber: AccountNumberString;
  roundTrips: number;
  isDayTrader: boolean;
  isClosingOnlyRestricted: boolean;
  pfcbFlag: boolean;
  positions: Position[];
}

export interface AccountNumberHash {
  accountNumber: AccountNumberString;
  hashValue: string;
}

export interface MarginAccount extends SecuritiesAccountBase {
  type: AccountType.MARGIN;
  initialBalances: MarginInitialBalance;
  currentBalances: MarginBalance;
  projectedBalances: MarginBalance;
}

export interface CashBalance {
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
  cashCall: number;
  longNonMarginableMarketValue: number;
  totalCash: number;
  cashDebitCallValue: number;
  unsettledCash: number;
}

export interface CashAccount extends SecuritiesAccountBase {
  type: AccountType.CASH;
  initialBalances: CashInitialBalance;
  currentBalances: CashBalance;
  projectedBalances: CashBalance;
}

export type SecuritiesAccount = MarginAccount | CashAccount;

export interface Account {
  securitiesAccount: SecuritiesAccount;
}

export interface AccountsBaseInstrument {
  assetType: AssetType;
  cusip: string;
  symbol: string;
  description: string;
  instrumentId: number;
  netChange: number;
}

export interface AccountCashEquivalent extends AccountsBaseInstrument {
  type: "SWEEP_VEHICLE" | "SAVINGS" | "MONEY_MARKET_FUND" | "UNKNOWN";
}

export interface AccountEquity extends AccountsBaseInstrument {
  // No additional fields
}

export interface AccountFixedIncome extends AccountsBaseInstrument {
  maturityDate: string; // ISO 8601 date-time
  factor: number;
  variableRate: number;
}

export interface AccountMutualFund extends AccountsBaseInstrument {
  // No additional fields
}

export interface AccountAPIOptionDeliverable {
  symbol: string;
  deliverableUnits: number;
  apiCurrencyType: "USD" | "CAD" | "EUR" | "JPY";
  assetType: AssetType;
}

export interface AccountOption extends AccountsBaseInstrument {
  optionDeliverables: AccountAPIOptionDeliverable[];
  putCall: "PUT" | "CALL" | "UNKNOWN";
  optionMultiplier: number;
  type: "VANILLA" | "BINARY" | "BARRIER" | "UNKNOWN";
  underlyingSymbol: string;
}

export type AccountsInstrument =
  | AccountCashEquivalent
  | AccountEquity
  | AccountFixedIncome
  | AccountMutualFund
  | AccountOption;
