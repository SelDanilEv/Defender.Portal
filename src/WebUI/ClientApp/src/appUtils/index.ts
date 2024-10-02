import { useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorToast from "src/components/Toast/DefaultErrorToast";
import IUtils from "./interface";

const useUtils = (): IUtils => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));

  return {
    react: {
      navigate: navigate,
      locationState: <T>(element: string): T => state[element] as T,
      theme: theme,
    },
    t: (key: string) => t(key),
    log: (...values) => {
      console.log(values);
    },
    debug: (value) => {
      console.debug(value);
    },
    e: (errorCode: string) => {
      const errorKey = "error:" + errorCode;

      let message = t(errorKey);

      if (message == errorCode || !message) {
        message = t("error:UnhandledError");
      }
      ErrorToast(message);
    },
    isMobile: isMobile,
    isLargeScreen: isLargeScreen,
  };
};

export default useUtils;
