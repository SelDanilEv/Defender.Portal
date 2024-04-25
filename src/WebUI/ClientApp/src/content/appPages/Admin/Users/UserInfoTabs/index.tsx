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

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
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
            <Box sx={{ maxWidth: "50%" }}>
              <Tabs
                sx={{ width: "10%" }}
                disabled={true}
                variant="scrollable"
                scrollButtons="auto"
                // allowScrollButtonsMobile
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
              >
                <Tab
                  disabled={!fullUserInfo || !fullUserInfo.user}
                  label={u.t("admin_users_page__info_user_tab_title")}
                  {...a11yProps(0)}
                />
                <Tab
                  disabled={!fullUserInfo || !fullUserInfo.wallet}
                  label={u.t("admin_users_page__info_wallet_tab_title")}
                  {...a11yProps(1)}
                />
                <Tab
                  disabled={!fullUserInfo || !fullUserInfo.wallet}
                  label={u.t("admin_users_page__info_wallet_tab_title")}
                  {...a11yProps(2)}
                />
                <Tab
                  disabled={!fullUserInfo || !fullUserInfo.wallet}
                  label={u.t("admin_users_page__info_wallet_tab_title")}
                  {...a11yProps(3)}
                />
                <Tab
                  disabled={!fullUserInfo || !fullUserInfo.wallet}
                  label={u.t("admin_users_page__info_wallet_tab_title")}
                  {...a11yProps(4)}
                />
              </Tabs>
            </Box>
            <Box sx={{ minWidth: "20%" }}>
              {/* <LockedButton
                disabled={!fullUserInfo?.user?.id}
                // sx={{ mr: "1em" }}
                variant="outlined"
                onClick={refresh}
              >
                <LoginIcon />
              </LockedButton>
              <LockedButton
                disabled={!fullUserInfo?.user?.id}
                variant="outlined"
                onClick={refresh}
              >
                <CachedIcon />
              </LockedButton> */}
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
              {fullUserInfo.wallet && (
                <TabPanel value={value} index={2}>
                  <WalletTab walletInfo={fullUserInfo.wallet} />
                </TabPanel>
              )}
              {fullUserInfo.wallet && (
                <TabPanel value={value} index={3}>
                  <WalletTab walletInfo={fullUserInfo.wallet} />
                </TabPanel>
              )}
              {fullUserInfo.wallet && (
                <TabPanel value={value} index={4}>
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
