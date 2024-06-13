import IUtils from "src/appUtils/interface";
import { TransactionType } from "src/models/banking/Transaction";

export default (u: IUtils, type: TransactionType) => {
  const map = {
    Unknown: {
      text: "banking_page__trans_info_table_type_unknown",
    },
    Recharge: {
      text: "banking_page__trans_info_table_type_recharge",
    },
    Transfer: {
      text: "banking_page__trans_info_table_type_transfer",
    },
    Payment: {
      text: "banking_page__trans_info_table_type_payment",
    },
    Revert: {
      text: "banking_page__trans_info_table_type_revert",
    },
  };

  const text = type in map ? map[type].text : map["Unknown"].text;

  return u.t(text);
};
