import { Divider, Grid } from "@mui/material";
import { connect } from "react-redux";

import useUtils from "src/appUtils";
import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";
import mapTicketStatus from "src/mappers/games/lottery/mapTicketStatus";
import LotteryTicket from "src/models/games/lottery/LotteryTicket";

const HorizontalDivider = () => {
  return (
    <Grid item xs={12} style={{ paddingTop: 0 }}>
      <Divider />
    </Grid>
  );
};

const TicketInfoDialogBody = (props: any) => {
  const u = useUtils();

  const { currentLanguage, selectedTicket: ticket } = props as {
    currentLanguage: string;
    selectedTicket: LotteryTicket;
  };

  if (!ticket) return <></>;

  return (
    <Grid
      container
      spacing={3}
      p={2}
      justifyContent={"center"}
      alignContent={"center"}
      fontSize={"1.3em"}
    >
      {ticket.drawNumber >= 0 && (
        <>
          <Grid item xs={6} sm={5}>
            {u.t("lottery:ticket_info_dialog_draw_id_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {ticket.drawNumber}
          </Grid>
        </>
      )}
      {ticket.ticketNumber && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("lottery:ticket_info_dialog_ticket_number_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {ticket.ticketNumber}
          </Grid>
        </>
      )}
      {ticket.amount && ticket.currency && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("lottery:ticket_info_dialog_amount_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {ticket.amount / 100} {CurrencySymbolsMap[ticket.currency]}
          </Grid>
        </>
      )}
      {ticket.paymentTransactionId && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("lottery:ticket_info_dialog_payment_trans_id_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {ticket.paymentTransactionId}
          </Grid>
        </>
      )}
      {ticket.prizeTransactionId && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("lottery:ticket_info_dialog_prize_trans_id_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {ticket.prizeTransactionId}
          </Grid>
        </>
      )}
      {ticket.prizePaidAmount > 0 && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("lottery:ticket_info_dialog_prize_amount_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {ticket.prizePaidAmount / 100} {CurrencySymbolsMap[ticket.currency]}
          </Grid>
        </>
      )}
      {ticket.status && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("lottery:ticket_info_dialog_status_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {mapTicketStatus(u, ticket.status)}
          </Grid>
          {HorizontalDivider()}
        </>
      )}
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
  };
};

export default connect(mapStateToProps)(TicketInfoDialogBody);
