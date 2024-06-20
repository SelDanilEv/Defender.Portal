import { Currency } from "src/models/shared/Currency";

export default interface LotteryDraw {
  drawNumber: number;
  publicNames: { [key: string]: string };
  startDate: Date;
  endDate: Date;
  coefficients: number[];
  allowedBets: number[];
  allowedCurrencies: Currency[];
  minBetValue: number;
  maxBetValue: number;
  isCustomBetAllowed: boolean;
  minTicketNumber: number;
  maxTicketNumber: number;
  isActive: boolean;
}

const getDrawName = (draw: LotteryDraw, currentLanguage: string): string => {
  return (
    draw.publicNames[currentLanguage] ||
    draw.publicNames["en"] ||
    Object.values(draw.publicNames)[0]
  );
};

export { getDrawName };
