import { UserAccountInfo } from "../UserAccountInfo";
import { WalletInfo } from "../banking/WalletInfo";

export interface FullUserInfoForAdmin {
  user: UserAccountInfo;
  wallet: WalletInfo;
}
