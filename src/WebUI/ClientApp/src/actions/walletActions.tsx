import { WalletInfo } from "src/models/banking/WalletInfo";

export function updateWalletInfo(wallet: WalletInfo) {
  return (dispath) => {
    dispath({
      type: "SET_WALLET_INFO",
      payload: wallet,
    });
  };
}
