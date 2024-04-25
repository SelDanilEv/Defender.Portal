import { useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorToast from "src/components/Toast/DefaultErrorToast";


const useUtils = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { t } = useTranslation()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return {
        react: {
            navigate: navigate,
            locationState: state,
            theme: theme,
        },
        t: (key: string) => t(key),
        log: (value) => {
            console.log(value)
        },
        e:(errorCode: string) => {
            let message = t(errorCode);
            
            if (message == errorCode || !message) {
              message = t("Error_UnhandledError");
            }
            ErrorToast(message);
          },
        isMobile: isMobile
    }
}

export default useUtils
