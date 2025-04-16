import { AssetType } from "./asset";

export interface Position {
  shortQuantity: number;
  averagePrice: number;
  currentDayProfitLoss: number;
  currentDayProfitLossPercentage: number;
  longQuantity: number;
  settledLongQuantity: number;
  settledShortQuantity: number;
  agedQuantity: number;
  instrument: AccountsInstrument;
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
}

export interface AccountsInstrument {
  assetType: AssetType;
  cusip: string;
  symbol: string;
  description: string;
  instrumentId: number;
  netChange: number;
}
