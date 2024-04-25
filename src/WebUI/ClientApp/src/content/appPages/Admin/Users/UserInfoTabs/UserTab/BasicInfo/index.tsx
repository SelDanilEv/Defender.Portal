import { Typography, Box, Divider } from "@mui/material";

import useUtils from "src/appUtils";

import { UserAccountInfo } from "src/models/UserAccountInfo";
import { format } from "date-fns";
import DateLocales from "src/consts/DateLocales";
import { connect } from "react-redux";

interface BasicInfoProps {
  userInfo: UserAccountInfo;
  currentLanguage: string;
}

const BasicInfo = (props: BasicInfoProps) => {
  const u = useUtils();

  const { userInfo: userInfo, currentLanguage: currentLanguage } = props;

  return (
    <Box
      sx={{ fontSize: "1.3em", py: "1em" }}
      display={"flex"}
      flexDirection={u.isMobile ? "column" : "row"}
      justifyContent={"space-evenly"}
    >
      <Typography align="center">
        {u.t("admin_users_page__info_user_tab_user_id")}: {userInfo.id}
      </Typography>
      <Divider sx={{ my: "0.3em" }} />
      <Typography align="center">
        {u.t("admin_users_page__info_user_tab_user_created_date")}:{" "}
        {format(new Date(userInfo.createdDate), "dd MMMM yyyy  hh:mm", {
          locale: DateLocales[currentLanguage],
        })}
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
  };
};

export default connect(mapStateToProps)(BasicInfo);
