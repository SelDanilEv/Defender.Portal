import Transaction from "src/models/banking/Transaction";
import { PagedResultBase } from "src/models/base/PagedResultBase";


export default interface TransactionHistoryResponse extends PagedResultBase {
  items: Transaction[];
}
