import Label from "src/components/Label";
import useUtils from "src/appUtils";

const SuccessStatusLabel = (props: any) => {
  const u = useUtils();

  return (
    <Label color="success">
      <b>{props.children || props.text || u.t("Success")}</b>
    </Label>
  );
};

export default SuccessStatusLabel;
