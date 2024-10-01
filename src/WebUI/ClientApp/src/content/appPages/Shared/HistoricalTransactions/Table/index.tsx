import { ChangeEvent, useState } from "react";
import { format } from "date-fns";
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
import DateLocales from "src/consts/DateLocales";
import TransactionInfoDialogBody from "./TransactionInfoDialogBody";
import CustomDialog from "src/components/Dialog";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import CachedIcon from "@mui/icons-material/Cached";
import { mapTransactionStatusLabel } from "src/mappers/banking/mapTransactionStatus";
import mapTransactionType from "src/mappers/banking/mapTransactionType";
import Transaction from "src/models/banking/Transaction";

interface HistoricalTransactionsTableProps {
  transactions: Transaction[];
  applyPagination: (page: number, limit: number) => void;
  pagination: CurrentPagination;
  refresh: () => void;
  currentLanguage: string;
  walletNumber: number;
  targetWalletNumber?: number;
}

const HistoricalTransactionsTable = (
  props: HistoricalTransactionsTableProps
) => {
  const u = useUtils();
  const theme = useTheme();

  const {
    transactions: transactions,
    applyPagination: applyPagination,
    pagination: pagination,
    refresh: refresh,
    currentLanguage: currentLanguage,
    walletNumber: userWalletNumber,
  } = props;

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();

  React.useEffect(() => {
    applyPagination(page, limit);
  }, [page, limit]);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const renderTransactionInfo = (transaction: Transaction): JSX.Element => {
    {
      const walletNumber = props.targetWalletNumber ?? userWalletNumber;
      const isCredit = transaction.fromWallet === walletNumber;
      const amount = isCredit
        ? -transaction.amount / 100
        : `+${transaction.amount / 100}`;

      return (
        <TableRow hover key={transaction.transactionId}>
          <TableCell align="center">
            <Typography
              variant="body1"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {format(
                new Date(transaction.utcTransactionDate),
                u.isMobile ? "dd.MM" : "dd MMMM yyyy  hh:mm",
                {
                  locale: DateLocales[currentLanguage],
                }
              )}
            </Typography>
          </TableCell>
          {!u.isMobile && (
            <TableCell align="center">
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                {mapTransactionType(u, transaction.transactionType)}
              </Typography>
            </TableCell>
          )}
          <TableCell align="center">
            <Typography
              variant="body1"
              fontWeight="bold"
              color={
                amount[0] == "+"
                  ? theme.colors.success.dark
                  : theme.colors.primary.main
              }
              gutterBottom
              noWrap
            >
              {amount} {transaction.currency}
            </Typography>
          </TableCell>
          <TableCell align="center">
            {mapTransactionStatusLabel(u, transaction.transactionStatus)}
          </TableCell>
          <TableCell align="center">
            <Tooltip
              title={u.t("banking_page__trans_info_table_action_info")}
              arrow
            >
              <IconButton
                sx={{
                  "&:hover": { background: theme.colors.info.lighter },
                  color: theme.palette.info.dark,
                }}
                onClick={() => {
                  setSelectedTransaction(transaction);
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
            {u.t("banking_page__trans_info_table_title")}
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
                {u.t("banking_page__trans_info_table_date_column")}
              </TableCell>
              {!u.isMobile && (
                <TableCell align="center">
                  {u.t("banking_page__trans_info_table_type_column")}
                </TableCell>
              )}
              <TableCell align="center">
                {u.t("banking_page__trans_info_table_amount_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("banking_page__trans_info_table_status_column")}
              </TableCell>
              <TableCell align="center">
                {u.t("table_actions_column")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{transactions.map(renderTransactionInfo)}</TableBody>
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
          rowsPerPageOptions={[5, 10, 25, 30]}
          labelRowsPerPage=""
        />
      </Box>
      <CustomDialog
        title={u.t("banking_page__trans_info_dialog_title")}
        open={showInfoDialog}
        onClose={() => setShowInfoDialog(false)}
        children={
          <TransactionInfoDialogBody
            isDialogOpen={showInfoDialog}
            closeDialog={() => setShowInfoDialog(false)}
            selectedTransaction={selectedTransaction}
          />
        }
      />
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
    walletNumber: state.wallet.walletNumber,
  };
};

export default connect(mapStateToProps)(HistoricalTransactionsTable);
