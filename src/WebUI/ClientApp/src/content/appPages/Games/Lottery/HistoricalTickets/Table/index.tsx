import { ChangeEvent, useState } from "react";
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import { CurrentPagination } from "src/models/base/CurrentPagination";
import React from "react";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import TicketInfoDialogBody from "./TicketInfoDialogBody";
import CustomDialog from "src/components/Dialog";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import CachedIcon from "@mui/icons-material/Cached";
import LotteryTicket from "src/models/games/lottery/LotteryTicket";
import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";
import { mapTicketStatusLabel } from "src/mappers/games/lottery/mapTicketStatus";

interface HistoricalTicketsTableProps {
  tickets: LotteryTicket[];
  applyPagination: (page: number, limit: number) => void;
  pagination: CurrentPagination;
  refresh: () => void;
}

const HistoricalTicketsTable = (props: HistoricalTicketsTableProps) => {
  const u = useUtils();
  const theme = useTheme();

  const {
    tickets: tickets,
    applyPagination: applyPagination,
    pagination: pagination,
    refresh: refresh,
  } = props;

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<LotteryTicket>();

  React.useEffect(() => {
    applyPagination(page, limit);
  }, [page, limit]);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const renderTicketInfo = (ticket: LotteryTicket): JSX.Element => {
    {
      return (
        <TableRow hover key={`${ticket.drawNumber}-${ticket.ticketNumber}`}>
          <TableCell align="center">{ticket.drawNumber}</TableCell>
          <TableCell align="center">{ticket.ticketNumber}</TableCell>
          {!u.isMobile && (
            <TableCell align="center">
              {ticket.amount / 100} {CurrencySymbolsMap[ticket.currency]}
            </TableCell>
          )}
          <TableCell align="center">
            {mapTicketStatusLabel(u, ticket.status)}
          </TableCell>
          <TableCell align="center">
            <Tooltip title={u.t("lottery:ticket_info_table_action_info")} arrow>
              <IconButton
                sx={{
                  "&:hover": { background: theme.colors.info.lighter },
                  color: theme.palette.info.dark,
                }}
                onClick={() => {
                  setSelectedTicket(ticket);
                  setShowInfoDialog(true);
                }}
                color="inherit"
                size="small"
              >
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <Card>
      <CardHeader
        action={
          <LockedButton sx={{ mr: "1em" }} variant="outlined" onClick={refresh}>
            <CachedIcon />
          </LockedButton>
        }
        title={
          <Typography fontSize={"1.7em"} fontWeight="bold">
            {u.t("lottery:ticket_info_table_title")}
          </Typography>
        }
        titleTypographyProps={{
          style: { fontSize: u.isMobile ? "1.5em" : "2em" },
        }}
      />
      <Divider />
      <TableContainer
        sx={{
          fontSize: u.isMobile ? "0.9em" : "1.5em",
          "& .MuiTableCell-root": {
            fontSize: u.isMobile ? "0.8em" : "0.8em",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                {u.t("lottery:ticket_info_table_draw_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("lottery:ticket_info_table_ticket_number_column")}
              </TableCell>
              {!u.isMobile && (
                <TableCell align="center">
                  {u.t("lottery:ticket_info_table_amount_column")}
                </TableCell>
              )}
              <TableCell align="center">
                {u.t("lottery:ticket_info_table_status_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("table_actions_column")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tickets.map(renderTicketInfo)}</TableBody>
        </Table>
      </TableContainer>
      <Box
        p={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontSize: u.isMobile ? "0.6em" : "1em",
          }}
        >
          {u.t("table_rows_per_page_label")}
        </Typography>
        <TablePagination
          component="div"
          count={pagination.totalItemsCount}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 15, 30]}
          labelRowsPerPage=""
        />
      </Box>
      <CustomDialog
        title={u.t("lottery:ticket_info_dialog_title")}
        open={showInfoDialog}
        onClose={() => setShowInfoDialog(false)}
        children={
          <TicketInfoDialogBody
            isDialogOpen={showInfoDialog}
            closeDialog={() => setShowInfoDialog(false)}
            selectedTicket={selectedTicket}
          />
        }
      />
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps)(HistoricalTicketsTable);
