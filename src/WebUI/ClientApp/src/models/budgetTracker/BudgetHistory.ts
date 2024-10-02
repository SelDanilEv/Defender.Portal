import { Currency } from "src/models/shared/Currency";
import { BudgetReview, BudgetReviewedPosition } from "./BudgetReview";

export class BudgetHistory {
  history: BudgetReview[];
  allowedCurrencies: Currency[];

  constructor(history: BudgetReview[]) {
    const currencySet = new Set<Currency>();

    history.forEach((record: BudgetReview) => {
      record.date = new Date(record.date);
      record.positions.forEach((r: BudgetReviewedPosition) => {
        r.amount = r.amount;
        currencySet.add(r.currency);
      });
    });

    this.history = history.sort((a, b) => a.date.getTime() - b.date.getTime());

    const allCurrencies = Array.from(currencySet);
    this.allowedCurrencies = allCurrencies;
  }
}
