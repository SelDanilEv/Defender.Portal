import Label from "src/components/Label";
import useUtils from "src/appUtils";

const ErrorStatusLabel = (props: any) => {
  const u = useUtils();

  return (
    <Label color="error">
      <b>{props.children || props.text || u.t("Error")}</b>
    </Label>
  );
};

export default ErrorStatusLabel;
