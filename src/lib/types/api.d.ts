export interface NoParametersRequest {}

export interface NoParametersResponse {}

export enum APIRuleAction {
  ACCEPT = "ACCEPT",
  ALERT = "ALERT",
  REJECT = "REJECT",
  REVIEW = "REVIEW",
  UNKNOWN = "UNKNOWN"
}

// ISO-8601 date-time format
export type DateAndTime = string;
