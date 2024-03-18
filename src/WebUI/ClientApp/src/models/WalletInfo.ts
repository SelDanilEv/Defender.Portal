export interface CurrencyAccount{
  currency: string;
  balance: number;
}

export interface WalletInfo {
  walletNumber: number;
  currencyAccounts: Set<CurrencyAccount>;
  defaultCurrency: string;
}
