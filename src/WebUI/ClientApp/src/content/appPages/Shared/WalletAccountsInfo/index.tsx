import {
  Box,
  Typography,
  Grid,
  Divider,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { connect } from "react-redux";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

import useUtils from "src/appUtils";
import { useEffect, useState } from "react";
import { WalletInfo } from "src/models/WalletInfo";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import {
  AvatarAddWrapper,
  CardAddAction,
  CardCc,
  CardLogo,
} from "./styledComponents";
import CustomDialog from "src/components/Dialog";
import CreateAccountDialogBody from "./CreateAccountDialogBody";
import SupportedCurrencies from "src/consts/SupportedCurrencies";
import RechargeOrRefundDialogBody from "./RechargeOrRefundDialogBody";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";

import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CachedIcon from "@mui/icons-material/Cached";
import { updateWalletInfo } from "src/actions/walletActions";
import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";

const WalletAccountsInfo = (props: any) => {
  const u = useUtils();

  useEffect(() => {
    updateWalletInfo();
  }, []);

  const [wallet, setWallet] = useState<WalletInfo>(props.walletInfo);

  const [showCreateAccountDialog, setShowCreateAccountDialog] =
    useState<boolean>(false);
  const [
    showRechargeOrRefundAccountDialog,
    setShowRechargeOrRefundAccountDialog,
  ] = useState<boolean>(false);

  const updateWalletInfo = () => {
    APICallWrapper({
      url: `${apiUrls.banking.walletInfo}`,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      },
      utils: u,
      onSuccess: async (response) => {
        const walletInfo: WalletInfo = await response.json();
        updateUIWalletInfo(walletInfo);
      },
      showError: false,
    });
  };

  const updateUIWalletInfo = (walletInfo: WalletInfo) => {
    props.updateWalletInfo(walletInfo);
    setWallet(walletInfo);
  };

  const displayAccounts = () => {
    let result = [];

    if (wallet.walletNumber) {
      for (const account of wallet.currencyAccounts) {
        result.push(
          <Grid item xs={12} sm={6} md={4} key={account.currency}>
            <CardCc>
              <Box display="flex" alignItems="center">
                <CardLogo>{account.currency}</CardLogo>
                <Box marginLeft={"auto"} marginRight={"2em"}>
                  <Typography variant="h3" fontWeight="normal">
                    {account.balance / 100 +
                      CurrencySymbolsMap[account.currency]}
                  </Typography>
                </Box>
              </Box>
            </CardCc>
          </Grid>
        );
      }

      if (result.length < SupportedCurrencies.length)
        result.push(
          <Grid item xs={12} sm={6} md={4} key={-1}>
            <CardAddAction>
              <CardActionArea sx={{ px: 1 }} onClick={createNewAccount}>
                <CardContent>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon fontSize="large" />
                  </AvatarAddWrapper>
                </CardContent>
                <Typography style={{ fontSize: "1.5em" }}>
                  {u.t("banking_page__wallet_button_create_account")}
                </Typography>
              </CardActionArea>
            </CardAddAction>
          </Grid>
        );
    }

    return result;
  };

  const createNewAccount = () => {
    setShowCreateAccountDialog(true);
  };

  const renderNavigationButton = () => {
    if (window.location.pathname === "/home") {
      return (
        <LockedButton
          startIcon={<AccountBalanceIcon />}
          variant="outlined"
          color="primary"
          sx={{ fontSize: "1.1em" }}
          onClick={() => u.react.navigate("/banking")}
        >
          {u.t("banking_page__wallet_button_open_banking")}
        </LockedButton>
      );
    } else {
      return (
        <LockedButton
          startIcon={<HomeIcon />}
          variant="outlined"
          color="primary"
          sx={{ fontSize: "1.1em" }}
          onClick={() => u.react.navigate("/home")}
        >
          {u.t("banking_page__wallet_button_home")}
        </LockedButton>
      );
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          titleTypographyProps={{
            style: { fontSize: u.isMobile ? "1.5em" : "2em" },
          }}
          title={
            u.t("banking_page__wallet_title") +
            " " +
            (wallet.walletNumber ?? "******")
          }
          action={
            <Box
              display="flex"
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: 1,
              }}
            >
              <Box
                display="flex"
                sx={{
                  flexDirection: {
                    xs: "row",
                  },
                  gap: 1,
                }}
              >
                {renderNavigationButton()}
                <LockedButton variant="outlined" onClick={updateWalletInfo}>
                  <CachedIcon />
                </LockedButton>
              </Box>
              <LockedButton
                variant="outlined"
                color="primary"
                sx={{ fontSize: "1.1em" }}
                onClick={() => setShowRechargeOrRefundAccountDialog(true)}
              >
                {u.t("banking_page__wallet_button_recharge_or_refund")}
              </LockedButton>
            </Box>
          }
        />
        <Divider />
        <Grid container spacing={1}>
          {displayAccounts()}
        </Grid>
      </Card>
      <CustomDialog
        title={u.t("banking_page__wallet_dialog_title_create_account")}
        open={showCreateAccountDialog}
        onClose={() => setShowCreateAccountDialog(false)}
        children={
          <CreateAccountDialogBody
            updateWallet={updateUIWalletInfo}
            closeDialog={() => setShowCreateAccountDialog(false)}
          />
        }
      />
      <CustomDialog
        title={u.t("banking_page__wallet_dialog_title_recharge_or_refund")}
        open={showRechargeOrRefundAccountDialog}
        onClose={() => setShowRechargeOrRefundAccountDialog(false)}
        children={<RechargeOrRefundDialogBody />}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateWalletInfo: (wallet) => {
      dispatch(updateWalletInfo(wallet));
    },
  };
};

const mapStateToProps = (state: any) => {
  return {
    walletInfo: state.wallet,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletAccountsInfo);
