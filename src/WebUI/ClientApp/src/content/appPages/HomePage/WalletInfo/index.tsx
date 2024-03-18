import {
  Box,
  Typography,
  Grid,
  Divider,
  Card,
  styled,
  CardHeader,
  Avatar,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { connect } from "react-redux";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

import useUtils from "src/appUtils";
import { useState } from "react";
import { CurrencyAccount, WalletInfo } from "src/models/WalletInfo";
import React from "react";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import { AvatarAddWrapper, CardAddAction, CardCc, CardLogo } from "./styledComponents";

const WalletAccountsInfo = (props: any) => {
  const u = useUtils();

  const supportedCurrencies = ["USD", "EUR", "PLN", "GEL"];
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    PLN: "zł",
    GEL: "₾",
  };

  const [walletNumber, setWalletNumber] = useState<number>();

  const [accounts, setAccounts] = useState<Set<CurrencyAccount>>(new Set());

  React.useEffect(() => {
    updateWalletInfo();
  }, []);

  const updateWalletInfo = () => {
    APICallWrapper({
      url: `${apiUrls.wallet.info}`,
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
      showError: true,
      doLock: false,
    });
  };

  const updateUIWalletInfo = (walletInfo: WalletInfo) => {
    setWalletNumber(walletInfo.walletNumber);
    setAccounts(walletInfo.currencyAccounts);
  };

  const displayAccounts = () => {
    let result = [];

    if (accounts) {
      for (const account of accounts) {
        result.push(
          <Grid item xs={12} sm={6} md={4} key={account.currency}>
            <CardCc>
              <Box display="flex" alignItems="center">
                <CardLogo>{account.currency}</CardLogo>
                <Box marginLeft={"auto"} marginRight={"2em"}>
                  <Typography variant="h3" fontWeight="normal">
                    {account.balance / 100 + currencySymbols[account.currency]}
                  </Typography>
                </Box>
              </Box>
            </CardCc>
          </Grid>
        );
      }
    }

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
              Create account
            </Typography>
          </CardActionArea>
        </CardAddAction>
      </Grid>
    );

    return result;
  };

  const createNewAccount = () => {
    const newCurrencyAccount = { currency: "GEL", balance: 700000000 };

    setAccounts(
      (prevAccounts) => new Set([...prevAccounts, newCurrencyAccount])
    );
  };

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ style: { fontSize: "2em" } }}
        title={"Digital wallet " + (walletNumber ?? "******")}
      />
      <Divider />
      <Grid container spacing={1}>
        {displayAccounts()}
      </Grid>
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(mapStateToProps)(WalletAccountsInfo);
