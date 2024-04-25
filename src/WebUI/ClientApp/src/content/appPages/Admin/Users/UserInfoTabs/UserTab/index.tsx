import useUtils from "src/appUtils";

import { UserAccountInfo } from "src/models/UserAccountInfo";
import UpdateUserInfo from "./UpdateUserInfo";
import { connect } from "react-redux";
import BasicInfo from "./BasicInfo";
import UpdateAccountInfo from "./UpdateAccountInfo";
import { Grid } from "@mui/material";

interface UserTabProps {
  userInfo: UserAccountInfo;
  currentLanguage: string;
}

const UserTab = (props: UserTabProps) => {
  const u = useUtils();

  const { userInfo: userInfo, currentLanguage: currentLanguage } = props;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <BasicInfo userInfo={userInfo} />
      </Grid>
      <Grid item xs={12}>
        <UpdateUserInfo userInfo={userInfo} />
      </Grid>
      <Grid item xs={12}>
        <UpdateAccountInfo accountInfo={userInfo} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
  };
};

export default connect(mapStateToProps)(UserTab);
