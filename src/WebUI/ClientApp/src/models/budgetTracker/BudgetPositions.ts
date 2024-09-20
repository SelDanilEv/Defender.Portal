import { Currency } from "src/models/shared/Currency";

export interface BudgetPosition {
  id: string;
  userId: string;
  name: string;
  tags: string[];
  currency: Currency;
  orderPriority: number;
}
