import IUtils from "src/appUtils/interface";
import Label from "src/components/Label";
import { TicketStatus } from "src/models/games/lottery/LotteryTicket";

const mapTicketStatus = (u: IUtils, type: TicketStatus) => {
  const map = {
    Requested: {
      text: "lottery:ticket_info_table_status_pending",
    },
    Paid: {
      text: "lottery:ticket_info_table_status_pending",
    },
    Won: {
      text: "lottery:ticket_info_table_status_won",
    },
    PrizePaid: {
      text: "lottery:ticket_info_table_status_won",
    },
    FailedToPayPrize: {
      text: "lottery:ticket_info_table_status_won",
    },
    Lost: {
      text: "lottery:ticket_info_table_status_lost",
    },
  };

  const text = type in map ? map[type].text : map[0].text;

  return u.t(text);
};

export const mapTicketStatusColor = (
  u: IUtils,
  status: TicketStatus
): string => {
  const map = {
    Requested: {
      color: u.react.theme.colors.info.lighter,
    },
    Paid: {
      color: u.react.theme.colors.info.lighter,
    },
    Won: {
      color: u.react.theme.colors.success.lighter,
    },
    PrizePaid: {
      color: u.react.theme.colors.success.lighter,
    },
    FailedToPayPrize: {
      color: u.react.theme.colors.warning.lighter,
    },
    Lost: {
      color: u.react.theme.colors.secondary.lighter,
    },
  };

  const color: any = status in map ? map[status].color : map[0].color;

  return color;
};

export const mapTicketStatusLabel = (
  u: IUtils,
  status: TicketStatus
): JSX.Element => {
  const map = {
    Requested: {
      color: "info",
    },
    Paid: {
      color: "info",
    },
    Won: {
      color: "success",
    },
    PrizePaid: {
      color: "success",
    },
    FailedToPayPrize: {
      color: "warning",
    },
    Lost: {
      color: "secondary",
    },
  };

  const color: any = status in map ? map[status].color : map[0].color;

  return (
    <Label fontSize={"1.2em"} color={color}>
      {mapTicketStatus(u, status)}
    </Label>
  );
};

export default mapTicketStatus;
