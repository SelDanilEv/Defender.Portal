import { PagedResultBase } from "src/models/base/PagedResultBase";
import { BudgetReview } from "src/models/budgetTracker/BudgetReview";

export default interface BudgetReviewsResponse extends PagedResultBase {
  items: BudgetReview[];
}
