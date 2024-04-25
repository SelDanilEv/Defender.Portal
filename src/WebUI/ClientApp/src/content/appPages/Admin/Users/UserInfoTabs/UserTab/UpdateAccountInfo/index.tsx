import { Card, Grid, CardHeader } from "@mui/material";

import useUtils from "src/appUtils";

import { UserAccountInfo } from "src/models/UserAccountInfo";
import UpdateAccount from "./UpdateAccount";
import UpdatePassword from "./UpdatePassword";

interface UpdateAccountInfoProps {
  accountInfo: UserAccountInfo;
}

const UpdateAccountInfo = (props: UpdateAccountInfoProps) => {
  const u = useUtils();

  const { accountInfo: accountInfo } = props;

  return (
    <>
      <Card>
        <CardHeader
          title={u.t("admin_users_page__info_user_tab_account_info_title")}
        />
        <Grid
          container
          spacing={2}
          p={1.5}
          alignItems="center"
          justifyContent={"center"}
        >
          <UpdateAccount accountInfo={accountInfo} />
          <UpdatePassword userId={accountInfo.id} />
        </Grid>
      </Card>
    </>
  );
};

export default UpdateAccountInfo;
