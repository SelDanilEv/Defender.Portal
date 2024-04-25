import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Grid,
  Divider,
  Card,
} from "@mui/material";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";

import EditUserInfo from "./EditUserInfo";

import useUtils from "src/appUtils";
import EditSensitiveUserInfo from "./EditSensitiveUserInfo";

const UpdateUserPage = (props: any) => {
  const u = useUtils();

  const GetUserNicknameForHeader = () => {
    const user = props.currentUser;

    if (!user) return;

    const maxLength = 12;
    const smallWindowWidth = 600;

    if (
      user.nickname.length < maxLength ||
      window.innerWidth > smallWindowWidth
    ) {
      return user.nickname;
    }

    return user.nickname.substring(0, maxLength) + "...";
  };

  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            onClick={() => u.react.navigate("/home")}
            color="primary"
            sx={{ p: 2, mr: 2 }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Grid container alignContent={"center"}>
          <Typography variant="h3" component="h3">
            {u.t("personal_info_page__title")}{" "}
            <i>{GetUserNicknameForHeader()}</i>
          </Typography>
        </Grid>
      </Box>

      <Card sx={{ mb: "15px" }}>
        <Box
          p={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h3">
              {u.t("personal_info_page__account_info")}
            </Typography>
          </Box>
        </Box>
        <Divider />
        {<EditUserInfo />}
      </Card>
      <Card>
        <Box
          p={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h3">
              {u.t("personal_info_page__sensitive_account_info")}
            </Typography>
          </Box>
        </Box>
        <Divider />
        {<EditSensitiveUserInfo />}
      </Card>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(mapStateToProps)(UpdateUserPage);
