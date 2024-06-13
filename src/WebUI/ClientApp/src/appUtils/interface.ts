import { Theme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default interface IUtils {
    react: {
      navigate: ReturnType<typeof useNavigate>;
      locationState: ReturnType<typeof useLocation>['state'];
      theme: Theme;
    };
    t: (key: string) => string;
    log: (value: any) => void;
    debug: (value: any) => void;
    e: (errorCode: string) => void;
    isMobile: boolean;
  }
