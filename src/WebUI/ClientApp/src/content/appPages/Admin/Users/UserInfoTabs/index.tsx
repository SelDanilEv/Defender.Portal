import { Card, Typography, Box, CardContent, Tabs, Tab } from "@mui/material";

import useUtils from "src/appUtils";
import { SyntheticEvent, useState } from "react";

import { FullUserInfoForAdmin } from "src/models/admin/FullUserInfoForAdmin";
import UserTab from "./UserTab";
import CachedIcon from "@mui/icons-material/Cached";
import LoginIcon from "@mui/icons-material/Login";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import WalletTab from "./WalletTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface UserInfoTabsProps {
  fullUserInfo: FullUserInfoForAdmin;
  refresh: () => void;
}

const UserInfoTabs = (props: UserInfoTabsProps) => {
  const u = useUtils();

  const { fullUserInfo: fullUserInfo, refresh: refresh } = props;

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

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" flexDirection={"row"}>
            <Box sx={{ maxWidth: "60%", overflow: "hidden" }}>
              <Tabs
                variant="fullWidth"
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
              <LockedButton
                disabled={!fullUserInfo?.user?.id}
                sx={{
                  minWidth: u.isMobile ? "45%" : "60px",
                  maxWidth: u.isMobile ? "45%" : "100px",
                }}
                variant="outlined"
                onClick={refresh}
              >
                <LoginIcon />
              </LockedButton>
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

export default UserInfoTabs;
