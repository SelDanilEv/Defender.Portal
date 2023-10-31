import { Box } from "@mui/material";

import LoginWithPassword from "./Password";
import LoginByGoogle from "./Google";

import useUtils from "src/appUtils";

const Login = (props: any) => {
  const u = useUtils();

  return (
    <>
      <LoginWithPassword />
      <Box sx={{ padding: 2 }}>-- {u.t("login_page_or")} --</Box>
      <LoginByGoogle />
    </>
  );
};

export default Login;
