import { Box, Typography, MenuItem, Select, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";

import Text from "src/components/Text";
import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";
import SupportedCurrencies from "src/consts/SupportedCurrencies";
import { TransferRequest } from "src/models/requests/TransferRequest";
import { TargetWalletInfo } from "src/models/responses/TransferRequest";

const StartTransferDialogBody = (props: any) => {
  const u = useUtils();

  const request = props.transferRequest as TransferRequest;

  const [targetWalletInfo, setTargetWalletInfo] = useState<TargetWalletInfo>();

  React.useEffect(() => {
    setTargetWalletInfo(undefined);
    loadTargetWalletInfo();
  }, [props.isDialogOpen]);

  const closeDialog = () => {
    props.closeDialog();
  };

  const loadTargetWalletInfo = () => {
    if (!props.isDialogOpen) return;
    APICallWrapper({
      url: `${apiUrls.banking.walletPublicInfo}?WalletNumber=${request.walletNumber}`,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      utils: u,
      onSuccess: async (response) => {
        const walletInfo: TargetWalletInfo = await response.json();

        if (
          !walletInfo.currencies.some(
            (currency) => currency === request.currency
          )
        ) {
          u.e("Error_RecipientCurrencyAccountIsNotExist");
          closeDialog();
          return;
        }

        setTargetWalletInfo(walletInfo);
      },
      onFailure: async (response) => {
        closeDialog();
      },
      showError: true,
    });
  };

  const handleTransfer = () => {
    const requestBody = {
      walletNumber: +request.walletNumber,
      currency: request.currency,
      amount: +request.amount * 100,
    };

    APICallWrapper({
      url: apiUrls.banking.startTransfer,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
      utils: u,
      showSuccess: true,
      successMesage: u.t("banking_page__transfer_dialog_success_message"),
      onFinal: async () => {
        closeDialog();
      },
    });
  };

  return (
    <Grid
      container
      spacing={3}
      p={2}
      justifyContent={"center"}
      alignContent={"center"}
      fontSize={"1.3em"}
    >
      <Grid item xs={12} sm={8}>
        {u.t("banking_page__transfer_wallet_number_label")}:
      </Grid>
      <Grid item xs={12} sm={4}>
        {request.walletNumber}
      </Grid>
      <Grid item xs={12} sm={8}>
        {u.t("banking_page__transfer_owner_name_label")}:
      </Grid>
      <Grid item xs={12} sm={4}>
        {targetWalletInfo
          ? targetWalletInfo.ownerName.length > 15
            ? `${targetWalletInfo.ownerName.substring(0, 12)}...`
            : targetWalletInfo.ownerName
          : `${u.t("Loading")} ...`}
      </Grid>
      <Grid item xs={12} sm={8}>
        {u.t("banking_page__transfer_amount_label")}:
      </Grid>
      <Grid item xs={12} sm={4}>
        {request.amount} {CurrencySymbolsMap[request.currency]}
      </Grid>
      <Grid item xs={12} sm={12}>
        <LockedButton
          disabled={!targetWalletInfo}
          onClick={handleTransfer}
          variant="outlined"
          fullWidth
        >
          {u.t("Confirm")}
        </LockedButton>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps)(StartTransferDialogBody);
