import Label from "src/components/Label";
import useUtils from "src/appUtils";

const PendingStatusLabel = (props: any) => {
  const u = useUtils();

  return (
    <Label color="info">
      <b>{props.children || props.text || u.t("Pending")}</b>
    </Label>
  );
};

export default PendingStatusLabel;
