import SyncIcon from "@mui/icons-material/Sync";

import Label from "src/components/Label";
import useUtils from "src/appUtils";

const WarningStatus = (props: any) => {
  const u = useUtils();

  return (
    <Label color="warning">
      <SyncIcon fontSize={props.size || "small"} />
      <b>{props.text || u.t("Warning")}</b>
    </Label>
  );
};

export default WarningStatus;
