import { Dictionary } from "src/customTypes";
import { Currency } from "src/models/shared/Currency";

export interface BudgetReview {
  id: string;
  date: Date;
  positions: BudgetReviewedPosition[];
  baseCurrency: Currency;
  rates: Dictionary<Currency, number>;
}

export interface BudgetReviewedPosition {
  name: string;
  tags: string[];
  amount: number;
  currency: Currency;
  orderPriority: number;
}
