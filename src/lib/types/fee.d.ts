export interface CommissionAndFee {
  commission: Commission;
  fee: Fees;
  trueCommission: Commission; // Purpose unclear, maybe pre-override?
}

export interface Commission {
  commissionLegs: CommissionLeg[];
}

export interface CommissionLeg {
  commissionValues: CommissionValue[];
}

export interface CommissionValue {
  value: number;
  type: FeeTypeEnum;
}

export interface Fees {
  feeLegs: FeeLeg[];
}

export interface FeeLeg {
  feeValues: FeeValue[];
}

export interface FeeValue {
  value: number;
  type: FeeTypeEnum;
}

export enum FeeTypeEnum {
  COMMISSION = "COMMISSION",
  SEC_FEE = "SEC_FEE",
  STR_FEE = "STR_FEE",
  R_FEE = "R_FEE",
  CDSC_FEE = "CDSC_FEE",
  OPT_REG_FEE = "OPT_REG_FEE",
  ADDITIONAL_FEE = "ADDITIONAL_FEE",
  MISCELLANEOUS_FEE = "MISCELLANEOUS_FEE",
  FTT = "FTT",
  FUTURES_CLEARING_FEE = "FUTURES_CLEARING_FEE",
  FUTURES_DESK_OFFICE_FEE = "FUTURES_DESK_OFFICE_FEE",
  FUTURES_EXCHANGE_FEE = "FUTURES_EXCHANGE_FEE",
  FUTURES_GLOBEX_FEE = "FUTURES_GLOBEX_FEE",
  FUTURES_NFA_FEE = "FUTURES_NFA_FEE",
  FUTURES_PIT_BROKERAGE_FEE = "FUTURES_PIT_BROKERAGE_FEE",
  FUTURES_TRANSACTION_FEE = "FUTURES_TRANSACTION_FEE",
  LOW_PROCEEDS_COMMISSION = "LOW_PROCEEDS_COMMISSION",
  BASE_CHARGE = "BASE_CHARGE",
  GENERAL_CHARGE = "GENERAL_CHARGE",
  GST_FEE = "GST_FEE",
  TAF_FEE = "TAF_FEE",
  INDEX_OPTION_FEE = "INDEX_OPTION_FEE",
  TEFRA_TAX = "TEFRA_TAX",
  STATE_TAX = "STATE_TAX",
  UNKNOWN = "UNKNOWN",
}
