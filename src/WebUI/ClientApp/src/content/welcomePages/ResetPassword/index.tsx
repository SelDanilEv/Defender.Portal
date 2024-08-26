import useUtils from "src/appUtils";

import LineWithText from "../Components/LineWithText";
import ResetPasswordForm from "./Form";
import WelcomeMenuButton from "../Components/WelcomeMenuButton";

const ResetPassword = (props: any) => {
  const u = useUtils();

  return (
    <>
      <ResetPasswordForm />
      <LineWithText
        margin_x="5px"
        height="2px"
        width_lg="45%"
        width_md="40%"
        width_xs="70%"
        text={u.t("welcome:or")}
        gap="10px"
      />
      <WelcomeMenuButton
        text={u.t("welcome:back_button")}
        path="/welcome/login"
      />
    </>
  );
};

export default ResetPassword;
