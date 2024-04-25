import { Divider, Grid } from "@mui/material";
import { format } from "date-fns";
import { connect } from "react-redux";

import useUtils from "src/appUtils";
import DateLocales from "src/consts/DateLocales";
import { UserOnlyInfo } from "src/models/UserOnlyInfo";

const HorizontalDivider = () => {
  return (
    <Grid item xs={12} style={{ paddingTop: 0 }}>
      <Divider />
    </Grid>
  );
};

const UserInfoDialogBody = (props: any) => {
  const u = useUtils();

  const { currentLanguage, user: user } = props as {
    currentLanguage: string;
    user: UserOnlyInfo;
  };

  if (!user) return <></>;

  return (
    <Grid
      container
      spacing={3}
      p={2}
      justifyContent={"center"}
      alignContent={"center"}
      fontSize={"1.3em"}
    >
      {user.id && (
        <>
          <Grid item xs={12} sm={12}>
            {user.id}
          </Grid>
        </>
      )}
      {user.email && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("admin_users_page__user_info_dialog_email_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {user.email}
          </Grid>
        </>
      )}
      {user.nickname && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("admin_users_page__user_info_dialog_nickname_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {user.nickname}
          </Grid>
        </>
      )}
      {user.phoneNumber && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("admin_users_page__user_info_dialog_phone_number_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {user.phoneNumber}
          </Grid>
        </>
      )}
      {user.createdDate && (
        <>
          {HorizontalDivider()}
          <Grid item xs={6} sm={5}>
            {u.t("admin_users_page__user_info_dialog_created_date_label")}:
          </Grid>
          <Grid item xs={6} sm={7}>
            {format(new Date(user.createdDate), "dd MMMM yyyy  hh:mm", {
              locale: DateLocales[currentLanguage],
            })}
          </Grid>
          {HorizontalDivider()}
        </>
      )}
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
  };
};

export default connect(mapStateToProps)(UserInfoDialogBody);
