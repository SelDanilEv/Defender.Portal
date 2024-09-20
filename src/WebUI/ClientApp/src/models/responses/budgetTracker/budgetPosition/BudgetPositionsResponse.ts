import { PagedResultBase } from "src/models/base/PagedResultBase";
import { BudgetPosition } from "src/models/budgetTracker/BudgetPositions";

export default interface BudgetPositionsResponse extends PagedResultBase {
  items: BudgetPosition[];
}
