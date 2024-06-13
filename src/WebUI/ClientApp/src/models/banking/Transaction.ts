import { Currency } from "../shared/Currency";

export enum TransactionPurpose {
  NoPurpose = "NoPurpose",
  Lottery = "Lottery",
}

export enum TransactionStatus {
  Unknown = "Unknown",
  Queued = "Queued",
  Failed = "Failed",
  Proceed = "Proceed",
  QueuedForRevert = "QueuedForRevert",
  Reverted = "Reverted",
  Canceled = "Canceled",
}

export enum TransactionType {
  Unknown = "Unknown",
  Recharge = "Recharge",
  Transfer = "Transfer",
  Payment = "Payment",
  Revert = "Revert",
}

export default interface Transaction {
  transactionId: string;
  transactionStatus: TransactionStatus;
  transactionType: TransactionType;
  transactionPurpose: TransactionPurpose;
  amount: number;
  currency: Currency;
  utcTransactionDate: string;
  fromWallet: number;
  toWallet: number;
  comment: string;
}
