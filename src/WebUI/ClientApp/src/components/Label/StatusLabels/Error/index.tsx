import ClearIcon from "@mui/icons-material/Clear";

import Label from "src/components/Label";
import useUtils from "src/appUtils";

const ErrorStatus = (props: any) => {
  const u = useUtils();

  return (
    <Label color="error">
      <ClearIcon fontSize={props.size || "small"} />
      <b>{props.text || u.t("Error")}</b>
    </Label>
  );
};

export default ErrorStatus;
