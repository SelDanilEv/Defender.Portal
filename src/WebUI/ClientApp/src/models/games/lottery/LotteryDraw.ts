import { Currency } from "src/models/shared/Currency";

export interface LotteryDraw {
  drawNumber: number;
  publicNames: { [key: string]: string };
  startDate: Date;
  endDate: Date;
  coefficients: number[];
  allowedCurrencies: Currency[];
  minBetValue: number;
  maxBetValue: number;
  minTicketNumber: number;
  maxTicketNumber: number;
  isActive: boolean;
}
