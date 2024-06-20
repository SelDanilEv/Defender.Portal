import { Currency } from "../shared/Currency";

export interface CurrencyAccount {
  currency: Currency;
  balance: number;
}

export interface WalletInfo {
  ownerId: string;
  walletNumber: number;
  currencyAccounts: CurrencyAccount[];
  defaultCurrency: string;
}
