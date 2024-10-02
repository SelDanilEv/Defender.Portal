import { Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default interface IUtils {
  react: {
    navigate: ReturnType<typeof useNavigate>;
    locationState: <T>(element: string) => T;
    theme: Theme;
  };
  t: (key: string) => string;
  log: (...values: any) => void;
  debug: (value: any) => void;
  e: (errorCode: string) => void;
  isMobile: boolean;
  isLargeScreen: boolean;
}
