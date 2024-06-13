import { PagedResultBase } from "src/models/base/PagedResultBase";
import LotteryTicket from "src/models/games/lottery/LotteryTicket";

export default interface TicketHistoryResponse extends PagedResultBase {
  items: LotteryTicket[];
}
