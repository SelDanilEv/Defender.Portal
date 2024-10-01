import {
  Box,
  Typography,
  Grid,
  Divider,
  Card,
  CardHeader,
} from "@mui/material";

import useUtils from "src/appUtils";
import { WalletInfo } from "src/models/banking/WalletInfo";
import { CardCc, CardLogo } from "./styledComponents";

import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { RechargeRequest } from "src/models/requests/admin/banking/RefundRequest";
import CustomDialog from "src/components/Dialog";
import StartRechargeDialogBody from "./StartRechargeDialogBody";
import { connect } from "react-redux";
import Role from "src/consts/Role";
import UserService from "src/services/UserService";

interface WalletAccountsInfoProps {
  walletInfo: WalletInfo;
  isSuperAdmin: boolean;
}

const WalletAccountsInfo = (props: WalletAccountsInfoProps) => {
  const u = useUtils();

  const { walletInfo, isSuperAdmin } = props;

  const [rechargeRequest, setRechargeRequest] = useState<RechargeRequest>({
    walletNumber: walletInfo.walletNumber,
    amount: 0,
    currency: "USD",
  } as RechargeRequest);

  const [showRechargeDialog, setShowRechargeDialog] = useState<boolean>(false);

  const startRecharge = (currency: string) => {
    setRechargeRequest({ ...rechargeRequest, currency: currency });
    setShowRechargeDialog(true);
  };

  const displayAccounts = () => {
    let result = [];

    if (walletInfo.walletNumber) {
      for (const account of walletInfo.currencyAccounts) {
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
                {isSuperAdmin && (
                  <Box marginRight={"2em"}>
                    <LockedButton
                      onClick={() => startRecharge(account.currency)}
                      color="success"
                      sx={{
                        minWidth: "30px",
                        width: "45px",
                        height: "45px",
                      }}
                      variant="outlined"
                    >
                      <AddIcon />
                    </LockedButton>
                  </Box>
                )}
              </Box>
            </CardCc>
          </Grid>
        );
      }
    }

    return result;
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
            (walletInfo.walletNumber ?? "******")
          }
        />
        <Divider />
        <Grid container spacing={1}>
          {displayAccounts()}
        </Grid>
        {isSuperAdmin && (
          <CustomDialog
            title={u.t(
              "admin_users_page__info_wallet_tab_recharge_dialog_title"
            )}
            open={showRechargeDialog}
            onClose={() => setShowRechargeDialog(false)}
            children={
              <StartRechargeDialogBody
                closeDialog={() => setShowRechargeDialog(false)}
                request={rechargeRequest}
              />
            }
          />
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isSuperAdmin:
      UserService.GetHighestRole(state.session.user.roles) === Role.SuperAdmin,
  };
};

export default connect(mapStateToProps)(WalletAccountsInfo);
