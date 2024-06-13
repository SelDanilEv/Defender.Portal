import { PagedResultBase } from "src/models/base/PagedResultBase";
import { LotteryDraw } from "src/models/games/lottery/LotteryDraw";

export default interface ActiveLotteryDrawsResponse extends PagedResultBase {
  items: LotteryDraw[];
}
