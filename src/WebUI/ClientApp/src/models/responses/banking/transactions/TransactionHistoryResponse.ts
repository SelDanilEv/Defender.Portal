import { PagedResultBase } from "src/models/base/PagedResultBase";

export enum TransactionStatus {
  Queued = "Queued",
  Failed = "Failed",
  Proceed = "Proceed",
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GEL = "GEL",
  PLN = "PLN",
}

export enum TransactionType {
  Recharge = "Recharge",
  Transfer = "Transfer",
  Payment = "Payment",
}

export interface Transaction {
  transactionId: string;
  transactionStatus: TransactionStatus;
  transactionType: TransactionType;
  amount: number;
  currency: Currency;
  utcTransactionDate: string;
  fromWallet: number;
  toWallet: number;
}

export default interface TransactionHistoryResponse extends PagedResultBase{
  items: Transaction[];
}

