import { Box } from "@mui/material";

import useUtils from "src/appUtils";

import LineWithText from "../Components/LineWithText";
import LoginForm from "./Form";
import LoginByGoogle from "../Components/LoginByGoogle";
import WelcomeMenuButton from "../Components/WelcomeMenuButton";

const Login = (props: any) => {
  const u = useUtils();

  return (
    <>
      <Box>
        <Box>
          <LoginForm />
          <LineWithText
            margin_x="5px"
            height="2px"
            width_lg="45%"
            width_md="40%"
            width_xs="70%"
            text={u.t("welcome:or")}
            gap="10px"
          />
        </Box>
        <Box sx={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <LoginByGoogle />
          <WelcomeMenuButton
            text={u.t("welcome:create_account")}
            path="/welcome/create"
          />
        </Box>
      </Box>
    </>
  );
};

export default Login;
