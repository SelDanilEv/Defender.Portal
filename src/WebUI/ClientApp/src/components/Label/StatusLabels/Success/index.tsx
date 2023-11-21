import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";

import Label from "src/components/Label";
import useUtils from "src/appUtils";

const SuccessStatusLabel = (props: any) => {
  const u = useUtils();

  return (
    <Label color="success">
      <DoneTwoToneIcon fontSize={props.size || "small"} />
      <b>{props.text || u.t("Success")}</b>
    </Label>
  );
};

export default SuccessStatusLabel;
