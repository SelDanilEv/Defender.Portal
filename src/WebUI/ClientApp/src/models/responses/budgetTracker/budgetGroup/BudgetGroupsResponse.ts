import { PagedResultBase } from "src/models/base/PagedResultBase";
import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";

export default interface BudgetGroupsResponse extends PagedResultBase {
  items: BudgetDiagramGroup[];
}
