import { WalletInfo } from "src/models/banking/WalletInfo";
import { setWalletInfoActionName } from "src/reducers/walletReducer";

export function updateWalletInfo(wallet: WalletInfo) {
  return (dispath) => {
    dispath({
      type: setWalletInfoActionName,
      payload: wallet,
    });
  };
}
