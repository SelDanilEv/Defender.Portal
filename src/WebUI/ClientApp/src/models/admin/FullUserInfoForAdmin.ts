import { UserAccountInfo } from "../UserAccountInfo";
import { WalletInfo } from "../WalletInfo";

export interface FullUserInfoForAdmin {
  user: UserAccountInfo;
  wallet: WalletInfo;
}
