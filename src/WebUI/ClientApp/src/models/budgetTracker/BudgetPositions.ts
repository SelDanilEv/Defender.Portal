import { Currency } from "src/models/shared/Currency";

export interface BudgetPositionRecord {
  name: string;
  tags: string[];
  currency: Currency;
}

export interface BudgetPositions {
  positions: BudgetPositionRecord[];
}
