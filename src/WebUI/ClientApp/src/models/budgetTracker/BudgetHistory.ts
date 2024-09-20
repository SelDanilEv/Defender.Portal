import { Dictionary } from "src/customTypes";
import { Currency } from "src/models/shared/Currency";

export class BudgetHistory {
  history: BudgetHistoryReview[];
  allowedCurrencies: Currency[];

  constructor(history: BudgetHistoryReview[]) {
    this.history = history;

    const currencySet = new Set<Currency>();

    history.forEach((record: BudgetHistoryReview) => {
      record.records.forEach((r: BudgetHistoryReviewRecord) => {
        currencySet.add(r.currency);
      });
    });

    const allCurrencies = Array.from(currencySet);
    this.allowedCurrencies = allCurrencies;
  }
}

export interface BudgetHistoryReview {
  date: Date;
  records: BudgetHistoryReviewRecord[];
  baseCurrency: Currency;
  rates: Dictionary<Currency, number>;
}

export interface BudgetHistoryReviewRecord {
  name: string;
  tags: string[];
  amount: number;
  currency: Currency;
}
