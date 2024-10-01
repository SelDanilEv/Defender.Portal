import { Card, Typography, Box, CardContent, Tabs, Tab } from "@mui/material";

import useUtils from "src/appUtils";
import { SyntheticEvent, useState } from "react";

import { FullUserInfoForAdmin } from "src/models/admin/FullUserInfoForAdmin";
import UserTab from "./UserTab";
import CachedIcon from "@mui/icons-material/Cached";
import LoginIcon from "@mui/icons-material/Login";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import WalletTab from "./WalletTab";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import { connect } from "react-redux";
import { login } from "src/actions/sessionActions";
import Role from "src/consts/Role";
import UserService from "src/services/UserService";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface UserInfoTabsProps {
  fullUserInfo: FullUserInfoForAdmin;
  refresh: () => void;
  login: (payload: any) => void;
  isSuperAdmin: boolean;
}

const UserInfoTabs = (props: UserInfoTabsProps) => {
  const u = useUtils();

  const { fullUserInfo, refresh, isSuperAdmin } = props;

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pt: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogin = async () => {
    APICallWrapper({
      url: apiUrls.admin.loginAsUser,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: fullUserInfo.user.id }),
        cache: "default",
      },
      utils: u,
      onSuccess: async (response) => {
        const loginResponse = await response.json();

        if (!loginResponse.isAuthenticated) {
          u.e("AuthorizationFailed");
          return;
        }

        props.login(loginResponse);

        if (
          loginResponse.user.isEmailVerified ||
          loginResponse.user.isPhoneVerified
        ) {
          u.react.navigate("/home");
        } else {
          u.react.navigate("/welcome/verification");
        }
      },
      showError: true,
    });
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" flexDirection={"row"}>
            <Box sx={{ maxWidth: "60%", overflow: "hidden" }}>
              <Tabs
                variant="standard"
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
              >
                <Tab
                  disabled={!fullUserInfo || !fullUserInfo.user}
                  label={u.t("admin_users_page__info_user_tab_title")}
                />
                <Tab
                  disabled={!fullUserInfo || !fullUserInfo.wallet}
                  label={u.t("admin_users_page__info_wallet_tab_title")}
                />
              </Tabs>
            </Box>
            <Box
              sx={{
                minWidth: "20%",
                maxWidth: "220px",
                marginLeft: "auto",
                display: "flex",
                flexDirection: "row",
                gap: u.isMobile ? "10%" : "10px",
                justifyContent: "flex-end",
              }}
            >
              {isSuperAdmin && (
                <LockedButton
                  disabled={!fullUserInfo?.user?.id}
                  sx={{
                    minWidth: u.isMobile ? "45%" : "60px",
                    maxWidth: u.isMobile ? "45%" : "100px",
                  }}
                  variant="outlined"
                  onClick={handleLogin}
                >
                  <LoginIcon />
                </LockedButton>
              )}
              <LockedButton
                disabled={!fullUserInfo?.user?.id}
                sx={{
                  minWidth: u.isMobile ? "45%" : "60px",
                  maxWidth: u.isMobile ? "45%" : "100px",
                }}
                variant="outlined"
                onClick={refresh}
              >
                <CachedIcon />
              </LockedButton>
            </Box>
          </Box>
          {fullUserInfo && (
            <>
              {fullUserInfo.user && (
                <TabPanel value={value} index={0}>
                  <UserTab userInfo={fullUserInfo.user} />
                </TabPanel>
              )}
              {fullUserInfo.wallet && (
                <TabPanel value={value} index={1}>
                  <WalletTab walletInfo={fullUserInfo.wallet} />
                </TabPanel>
              )}
            </>
          )}
        </CardContent>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (payload: any) => {
      dispatch(login(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoTabs);
