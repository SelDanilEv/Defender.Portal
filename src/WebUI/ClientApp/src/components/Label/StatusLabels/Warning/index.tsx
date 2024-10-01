import Label from "src/components/Label";
import useUtils from "src/appUtils";

const WarningStatusLabel = (props: any) => {
  const u = useUtils();

  return (
    <Label color="warning">
      <b>{props.children || props.text || u.t("Warning")}</b>
    </Label>
  );
};

export default WarningStatusLabel;
