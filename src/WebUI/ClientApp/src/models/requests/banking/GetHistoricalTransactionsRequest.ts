import { PaginationRequest } from "src/models/base/PaginationRequest";

export interface GetHistoricalTransactionsRequest extends PaginationRequest {
  walletId: string;
}
