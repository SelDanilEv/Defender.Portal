import { WalletInfo } from "src/models/WalletInfo";

const walletReducer = (
  state: WalletInfo = {
    walletNumber: 0,
    currencyAccounts: undefined,
    defaultCurrency: "USD",
  },
  action: any
) => {
  switch (action.type) {
    case "SET_WALLET_INFO":
      state = {
        ...state,
        walletNumber: action.payload.walletNumber,
        currencyAccounts: action.payload.currencyAccounts,
        defaultCurrency: action.payload.defaultCurrency,
      };
      break;
    default:
      break;
  }
  return state;
};

export default walletReducer;
