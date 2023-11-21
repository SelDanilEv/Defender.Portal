import SyncIcon from "@mui/icons-material/Sync";

import Label from "src/components/Label";
import useUtils from "src/appUtils";

const PendingStatusLabel = (props: any) => {
  const u = useUtils();

  return (
    <Label color="info">
      <SyncIcon fontSize={props.size || "small"} />
      <b>{props.text || u.t("Pending")}</b>
    </Label>
  );
};

export default PendingStatusLabel;
