import {
  Grid,
  Divider,
  Card,
  CardHeader,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { connect } from "react-redux";

import useUtils from "src/appUtils";
import { useEffect, useState } from "react";
import { CurrencyAccount, WalletInfo } from "src/models/WalletInfo";

import CustomDialog from "src/components/Dialog";

import { TransferRequest } from "src/models/requests/TransferRequest";
import StartTransferDialogBody from "./StartTransferDialogBody";

const TransfersPanel = (props: any) => {
  const u = useUtils();

  const [transferRequest, setTransferRequest] = useState<TransferRequest>({
    currency: "USD",
    walletNumber: "",
    amount: 0,
  });

  const [showTransferDialog, setShowTransferDialog] = useState<boolean>(false);
  const [isTransferAllowed, setIsTransferAllowed] = useState<boolean>(false);

  useEffect(() => {
    setIsTransferAllowed(
      transferRequest.walletNumber.length === 8 &&
        transferRequest.amount > 0 &&
        transferRequest.amount * 100 <=
          props.wallet.currencyAccounts.find(
            (wallet) => wallet.currency === transferRequest.currency
          ).balance
    );
  }, [transferRequest]);

  const UpdateRequest = (event) => {
    const { name, value } = event.target;

    setTransferRequest((prevState) => {
      if (
        name === "amount" &&
        value !== "" &&
        !/^\d*(\.\d{0,2})?$/.test(value)
      ) {
        return prevState;
      }

      if (name === "walletNumber" && value.length > 8) {
        return prevState;
      }

      return { ...prevState, [name]: value };
    });
  };

  const availableCurrencies = props.wallet.currencyAccounts
    .filter((account: CurrencyAccount) => account.balance > 0)
    .map((account: CurrencyAccount) => account.currency);

  return (
    <>
      <Card>
        <CardHeader
          title={u.t("banking_page__transfer_title")}
          titleTypographyProps={{
            style: { fontSize: u.isMobile ? "1.5em" : "2em" },
          }}
        />
        <Divider />
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              name="walletNumber"
              label={u.t("banking_page__transfer_wallet_number_label")}
              InputProps={{ style: { fontSize: "1.5em" } }}
              value={transferRequest.walletNumber}
              onChange={UpdateRequest}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={8} sm={3} md={3}>
            <TextField
              name="amount"
              label={u.t("banking_page__transfer_amount_label")}
              sx={{ padding: 0 }}
              InputProps={{ style: { fontSize: "1.5em" } }}
              value={!transferRequest.amount ? "" : transferRequest.amount}
              onChange={UpdateRequest}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sm={2} md={2}>
            <Select
              name="currency"
              value={transferRequest.currency}
              onChange={UpdateRequest}
              sx={{ height: "100%" }}
              fullWidth
            >
              {availableCurrencies.length > 0
                ? availableCurrencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <Button
              disabled={!isTransferAllowed}
              onClick={() => setShowTransferDialog(true)}
              variant="outlined"
              fullWidth
              sx={{ height: { xs: "55px", sm: "100%" } }}
            >
              {u.t("banking_page__transfer_button_transfer")}
            </Button>
          </Grid>
        </Grid>
      </Card>
      <CustomDialog
        title={u.t("banking_page__transfer_dialog_title_transfer")}
        open={showTransferDialog}
        onClose={() => setShowTransferDialog(false)}
        children={
          <StartTransferDialogBody
            isDialogOpen={showTransferDialog}
            closeDialog={() => setShowTransferDialog(false)}
            transferRequest={transferRequest}
          />
        }
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    wallet: state.wallet as WalletInfo,
  };
};

export default connect(mapStateToProps)(TransfersPanel);
