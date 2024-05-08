import {
  TransactionStatus,
  TransactionType,
} from "src/models/responses/banking/transactions/TransactionHistoryResponse";

export const mapTransactionStatus = (u, status: TransactionStatus) => {
  const map = {
    Failed: {
      text: "banking_page__trans_info_table_status_failed",
    },
    Proceed: {
      text: "banking_page__trans_info_table_status_proceed",
    },
    Queued: {
      text: "banking_page__trans_info_table_status_queued",
    },
  };

  const { text }: any = map[status];

  return u.t(text);
};

export const mapTransactionType = (u, status: TransactionType) => {
  const map = {
    Recharge: {
      text: "banking_page__trans_info_table_type_recharge",
    },
    Transfer: {
      text: "banking_page__trans_info_table_type_transfer",
    },
    Payment: {
      text: "banking_page__trans_info_table_type_payment",
    },
  };
  const { text }: any = map[status];

  return u.t(text);
};
