import {
  Grid,
  Divider,
  Card,
  CardHeader,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { connect } from "react-redux";

import useUtils from "src/appUtils";
import { useEffect, useState } from "react";
import { CurrencyAccount, WalletInfo } from "src/models/banking/WalletInfo";

import CustomDialog from "src/components/Dialog";

import { TransferRequest } from "src/models/requests/banking/TransferRequest";
import StartTransferDialogBody from "./StartTransferDialogBody";
import {
  CurrencyAmountMaskRegex,
  WalletNumberMaskRegex,
  WalletNumberRegex,
} from "src/consts/Regexes";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import ParamsObjectBuilder from "src/helpers/ParamsObjectBuilder";

const TransfersPanel = (props: any) => {
  const u = useUtils();

  const [transferRequest, setTransferRequest] = useState<TransferRequest>({
    currency: "USD",
    walletNumber: 0,
    amount: 0,
  });

  const transferParams = ParamsObjectBuilder.Build(u, transferRequest);

  const [showTransferDialog, setShowTransferDialog] = useState<boolean>(false);
  const [isTransferAllowed, setIsTransferAllowed] = useState<boolean>(false);

  useEffect(() => {
    setIsTransferAllowed(
      WalletNumberRegex.test(transferRequest.walletNumber.toString()) &&
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
        name === transferParams.amount &&
        value !== "" &&
        !CurrencyAmountMaskRegex.test(value)
      ) {
        return prevState;
      }

      if (
        name === transferParams.walletNumber &&
        value !== "" &&
        !WalletNumberMaskRegex.test(value)
      ) {
        return prevState;
      }

      return { ...prevState, [name]: value };
    });
  };

  const availableCurrencies = props.wallet.currencyAccounts
    ?.filter((account: CurrencyAccount) => account.balance > 0)
    ?.map((account: CurrencyAccount) => account.currency);

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
              value={
                transferRequest.walletNumber ? transferRequest.walletNumber : ""
              }
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
              {availableCurrencies?.length > 0
                ? availableCurrencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <LockedButton
              disabled={!isTransferAllowed}
              onClick={() => setShowTransferDialog(true)}
              variant="outlined"
              fullWidth
              sx={{ height: { xs: "55px", sm: "100%" } }}
            >
              {u.t("banking_page__transfer_button_transfer")}
            </LockedButton>
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
