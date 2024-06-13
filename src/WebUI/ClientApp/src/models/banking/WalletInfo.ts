export interface CurrencyAccount{
  currency: string;
  balance: number;
}

export interface WalletInfo {
  ownerId: string;
  walletNumber: number;
  currencyAccounts: CurrencyAccount[];
  defaultCurrency: string;
}
