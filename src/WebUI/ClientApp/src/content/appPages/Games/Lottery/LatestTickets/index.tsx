import { Box, Card, Grid, Typography } from "@mui/material";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";
import { mapTicketStatusColor } from "src/mappers/games/lottery/mapTicketStatus";
import LotteryTicket from "src/models/games/lottery/LotteryTicket";

interface LatestTicketsProps {
  LatestTickets: LotteryTicket[];
}

const LatestTickets = (props: LatestTicketsProps) => {
  const u = useUtils();

  const renderTicketCard = (ticket: LotteryTicket, index: number) => {
    var color = mapTicketStatusColor(u, ticket.status);
    return (
      <Card
        sx={{
          p: 0.5,
          height: 90,
          backgroundColor: color,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 1.2,
            pr: 0.5,
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {u.t("lottery:latest_tickets_draw_label")}
            {ticket.drawNumber}
          </Typography>
          {ticket.prizePaidAmount > 0 && (
            <Card sx={{ mb: 0.5, backgroundColor: color }}>
              <Typography sx={{ fontSize: 12, p: 1 }}>
                X{ticket.prizePaidAmount / ticket.amount}
              </Typography>
            </Card>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 0.5,
          }}
        >
          <Typography variant="h4" component="div">
            {u.t("lottery:latest_tickets_ticket_label")}
            {ticket.ticketNumber}
          </Typography>
          <Card>
            <Typography sx={{ fontSize: 11, p: 1 }}>
              {ticket.amount / 100}
              {CurrencySymbolsMap[ticket.currency]}
            </Typography>
          </Card>
        </Box>
      </Card>
    );
  };

  return (
    <Card sx={{ p: 0 }}>
      <Typography margin={1.3} align="center" variant="h4" component="div">
        {u.t("lottery:latest_tickets_title")}
      </Typography>
      <Grid container spacing={1} p={1}>
        {props.LatestTickets.map((ticket, index) => (
          <Grid item xs={6} sm={12} key={index}>
            {renderTicketCard(ticket, index)}
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps)(LatestTickets);
