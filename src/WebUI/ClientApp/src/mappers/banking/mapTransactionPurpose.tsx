import IUtils from "src/appUtils/interface";
import { TransactionPurpose } from "src/models/banking/Transaction";

const mapTransactionPurpose = (u: IUtils, purpose: TransactionPurpose) => {
  const map = {
    NoPurpose: {
      text: "",
    },
    Lottery: {
      text: "banking_page__trans_info_table_purpose_lottery",
    },
  };

  const text = purpose in map ? map[purpose].text : map[0].text;

  return u.t(text);
};

export default mapTransactionPurpose;
