import { ErrorMessageAndErrors } from "./api.types";
import { AssetType, PutCallEnum } from "./asset.types";
import { CashInitialBalance, MarginBalance, MarginInitialBalance, CashBalance } from "./balances.types"; // Added CashBalance import
import { Position } from "./positions.types";

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
  accountNumber: AccountNumberString; // Ensure consistency
  roundTrips: number;
  isDayTrader: boolean;
  isClosingOnlyRestricted: boolean;
  pfcbFlag: boolean;
  positions: Position[]; // Uses Position from positions.d.ts
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

export interface CashAccount extends SecuritiesAccountBase {
  type: AccountType.CASH;
  initialBalances: CashInitialBalance; // From balances.d.ts
  currentBalances: CashBalance; // From balances.d.ts
  projectedBalances: CashBalance; // From balances.d.ts
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

export enum AccountCashEquivalentTypeEnum {
  SWEEP_VEHICLE = "SWEEP_VEHICLE",
  SAVINGS = "SAVINGS",
  MONEY_MARKET_FUND = "MONEY_MARKET_FUND",
  UNKNOWN = "UNKNOWN",
}

export enum AccountOptionTypeEnum {
  VANILLA = "VANILLA",
  BINARY = "BINARY",
  BARRIER = "BARRIER",
  UNKNOWN = "UNKNOWN",
}

export enum UserDetailsTypeEnum {
  ADVISOR_USER = "ADVISOR_USER",
  BROKER_USER = "BROKER_USER",
  CLIENT_USER = "CLIENT_USER",
  SYSTEM_USER = "SYSTEM_USER",
  UNKNOWN = "UNKNOWN",
}

export interface AccountCashEquivalent extends AccountsBaseInstrument {
  type: AccountCashEquivalentTypeEnum; // Changed from string enum comment
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
  putCall: PutCallEnum; // Changed from string enum comment
  optionMultiplier: number;
  type: AccountOptionTypeEnum; // Changed from string enum comment
  underlyingSymbol: string;
}

export type AccountsInstrument =
  | AccountCashEquivalent
  | AccountEquity
  | AccountFixedIncome
  | AccountMutualFund
  | AccountOption;

export interface UserDetails {
  cdDomainId: string;
  login: string;
  type: UserDetailsTypeEnum; // Changed from string enum comment
  userId: number; // int64
  systemUserName: string;
  firstName: string;
  lastName: string;
  brokerRepCode: string;
}