import { Currency } from "src/models/shared/Currency";

export default interface PurchaseLotteryTicketsRequest {
  amount: number;
  currency: Currency;
  drawNumber: number;
  ticketNumbers: number[];
}
