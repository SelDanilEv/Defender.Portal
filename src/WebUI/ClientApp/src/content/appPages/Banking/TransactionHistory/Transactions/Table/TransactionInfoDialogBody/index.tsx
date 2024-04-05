import { Divider, Grid } from "@mui/material";
import { format } from "date-fns";
import { connect } from "react-redux";

import useUtils from "src/appUtils";
import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";
import DateLocales from "src/consts/DateLocales";
import { Transaction } from "src/models/responses/banking/transactions/TransactionHistoryResponse";

const HorizontalDivider = () => {
  return (
    <Grid item xs={12} style={{ paddingTop: 0 }}>
      <Divider />
    </Grid>
  );
};

const TransactionInfoDialogBody = (props: any) => {
  const u = useUtils();

  const { currentLanguage, selectedTransaction: transaction } = props as {
    currentLanguage: string;
    selectedTransaction: Transaction;
  };

  if (!transaction) return <></>;

  return (
    <Grid
      container
      spacing={3}
      p={2}
      justifyContent={"center"}
      alignContent={"center"}
      fontSize={"1.3em"}
    >
      {transaction.transactionId && (
        <>
          <Grid item xs={12} sm={12}>
            {transaction.transactionId}
          </Grid>
        </>
      )}
      {transaction.transactionType && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("banking_page__trans_info_dialog_type_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {transaction.transactionType}
          </Grid>
        </>
      )}
      {transaction.transactionStatus && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("banking_page__trans_info_dialog_status_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {transaction.transactionStatus}
          </Grid>
        </>
      )}
      {transaction.fromWallet && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("banking_page__trans_info_dialog_from_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {transaction.fromWallet}
          </Grid>
        </>
      )}
      {transaction.fromWallet && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("banking_page__trans_info_dialog_to_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {transaction.toWallet}
          </Grid>
        </>
      )}
      {transaction.amount && transaction.currency && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("banking_page__trans_info_dialog_amount_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {transaction.amount / 100}{" "}
            {CurrencySymbolsMap[transaction.currency]}
          </Grid>
        </>
      )}
      {transaction.utcTransactionDate && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("banking_page__trans_info_dialog_date_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {format(
              new Date(transaction.utcTransactionDate),
              "dd MMMM yyyy  hh:mm",
              {
                locale: DateLocales[currentLanguage],
              }
            )}
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

export default connect(mapStateToProps)(TransactionInfoDialogBody);
