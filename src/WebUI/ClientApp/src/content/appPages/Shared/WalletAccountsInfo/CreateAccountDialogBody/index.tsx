import { Box, Typography, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import APICallProps from "src/api/APIWrapper/interfaces/APICallProps";
import apiUrls from "src/api/apiUrls";

import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import SupportedCurrencies from "src/consts/SupportedCurrencies";
import { WalletInfo } from "src/models/banking/WalletInfo";

const CreateAccountDialogBody = (props: any) => {
  const u = useUtils();

  const [currency, setCurrency] = useState<string>("");

  const createNewAccount = () => {
    if (currency) {
      const requestBody = {
        currency: currency,
      };

      APICallWrapper({
        url: apiUrls.banking.walletCreateAccount,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
        utils: u,
        showSuccess: false,
        onSuccess: async (response) => {
          setCurrency(null);
          const walletInfo: WalletInfo = await response.json();
          props.updateWallet(walletInfo);
          props.closeDialog();
        },
      } as APICallProps);
    }
  };

  const availableCurrencies = SupportedCurrencies.filter(
    (currency) =>
      !props?.wallet?.currencyAccounts?.some(
        (account) => account.currency === currency
      )
  );

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" style={{ marginRight: "1em" }}>
          {u.t("banking_page__wallet_dialog_label_currency")}:
        </Typography>
        <Select
          defaultValue={""}
          onChange={(event) => {
            setCurrency(event.target.value as string);
          }}
        >
          {availableCurrencies.length > 0
            ? availableCurrencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))
            : null}
        </Select>
      </Box>
      <Box pt={"5px"} display="flex" justifyContent="center">
        <LockedButton
          disabled={!currency}
          variant="outlined"
          color="success"
          onClick={createNewAccount}
          sx={{ fontSize: "1.2em" }}
        >
          {u.t("banking_page__wallet_dialog_button_create")}
        </LockedButton>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps)(CreateAccountDialogBody);
