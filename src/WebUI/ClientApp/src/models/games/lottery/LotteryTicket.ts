import { Currency } from "src/models/shared/Currency";

export enum TicketStatus {
  Requested = "Requested",
  Paid = "Paid",
  Won = "Won",
  PrizePaid = "PrizePaid",
  FailedToPayPrize = "FailedToPayPrize",
  Lost = "Lost",
}

export default interface LotteryTicket {
  drawNumber: number;
  ticketNumber: number;
  amount: number;
  currency: Currency;
  userId: string;
  paymentTransactionId: string;
  prizeTransactionId: string;
  prizePaidAmount: number;
  status: TicketStatus;
}
