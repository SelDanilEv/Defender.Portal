import Label from "src/components/Label";
import IUtils from "src/appUtils/interface";
import { TransactionStatus } from "src/models/banking/Transaction";

const mapTransactionStatus = (u: IUtils, status: TransactionStatus) => {
  const map = {
    Unknown: {
      text: "banking_page__trans_info_table_status_unknown",
    },
    Failed: {
      text: "banking_page__trans_info_table_status_failed",
    },
    Proceed: {
      text: "banking_page__trans_info_table_status_proceed",
    },
    Queued: {
      text: "banking_page__trans_info_table_status_queued",
    },
    QueuedForRevert: {
      text: "banking_page__trans_info_table_status_queued_for_revert",
    },
    Reverted: {
      text: "banking_page__trans_info_table_status_reverted",
    },
    Canceled: {
      text: "banking_page__trans_info_table_status_canceled",
    },
  };

  const text = status in map ? map[status].text : map["Unknown"].text;

  return u.t(text);
};

export const mapTransactionStatusLabel = (
  u: IUtils,
  status: TransactionStatus
): JSX.Element => {
  const map = {
    Unknown: {
      color: "info",
    },
    Failed: {
      color: "error",
    },
    Proceed: {
      color: "success",
    },
    Queued: {
      color: "warning",
    },
    QueuedForRevert: {
      color: "warning",
    },
    Reverted: {
      color: "warning",
    },
    Canceled: {
      color: "warning",
    },
  };

  const color: any = status in map ? map[status].color : map["Unknown"].color;

  return (
    <Label fontSize={"1.2em"} color={color}>
      {mapTransactionStatus(u, status)}
    </Label>
  );
};

export default mapTransactionStatus;
