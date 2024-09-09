import { WalletInfo } from "src/models/banking/WalletInfo";

const walletReducer = (
  state: WalletInfo = {
    ownerId: undefined,
    walletNumber: 0,
    currencyAccounts: undefined,
    defaultCurrency: "USD",
  },
  action: any
) => {
  switch (action.type) {
    case setWalletInfoActionName:
      state = {
        ...state,
        walletNumber: action.payload.walletNumber,
        currencyAccounts: action.payload.currencyAccounts,
        defaultCurrency: action.payload.defaultCurrency,
      };
      break;
    case cleanWalletInfoActionName:
      state = {
        ...state,
        walletNumber: 0,
        currencyAccounts: undefined,
        defaultCurrency: undefined,
      };
      break;
    default:
      break;
  }
  return state;
};

export default walletReducer;

export const setWalletInfoActionName = "SET_WALLET_INFO";
export const cleanWalletInfoActionName = "CLEAN_WALLET_INFO";
