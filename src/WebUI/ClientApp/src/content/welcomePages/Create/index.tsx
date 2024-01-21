import { Box } from "@mui/material";

import useUtils from "src/appUtils";

import LineWithText from "../Components/LineWithText";
import CreateForm from "./Form";
import LoginByGoogle from "../Components/LoginByGoogle";
import WelcomeMenuButton from "../Components/WelcomeMenuButton";

const CreateAccount = (props: any) => {
  const u = useUtils();

  return (
    <Box>
      <Box>
        {" "}
        <CreateForm />
        <LineWithText
          margin_x="5px"
          height="2px"
          width_lg="45%"
          width_md="40%"
          width_xs="70%"
          text={u.t("welcome_page__or")}
          gap="10px"
        />
      </Box>
      <Box sx={{ display: "flex", gap: "15px", justifyContent: "center" }}>
        <LoginByGoogle />
        <WelcomeMenuButton
          text={u.t("welcome_page__back_to_login_page")}
          path="/welcome/login"
        />
      </Box>
    </Box>
  );
};

export default CreateAccount;
