import { ErrorMessageAndErrors, NoParametersRequest } from "./api.types";
import { AccountType } from "./accounts.types"; // Added import

/////// RPCs
// getUserPreferences
export type GetUserPreferencesRequest = NoParametersRequest;
export type GetUserPreferencesResponse = UserPreference[] | ErrorMessageAndErrors;

/////// Interfaces

export interface UserPreference {
  accounts: UserPreferenceAccount[];
  streamerInfo: StreamerInfo[];
  offers: Offer[];
}

export interface UserPreferenceAccount {
  accountNumber: string;
  primaryAccount: boolean;
  type: AccountType; // Changed from string
  nickName: string;
  accountColor: AccountColor;
  displayAcctId: string;
  autoPositionEffect: boolean;
}

export enum AccountColor {
  Green = "Green",
  Blue = "Blue",
}

export interface StreamerInfo {
  streamerSocketUrl: string;
  schwabClientCustomerId: string;
  schwabClientCorrelId: string;
  schwabClientChannel: string;
  schwabClientFunctionId: string;
}

export interface Offer {
  level2Permissions: boolean;
  mktDataPermission: string;
}
