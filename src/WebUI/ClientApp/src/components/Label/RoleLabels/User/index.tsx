import Label from "src/components/Label";
import useUtils from "src/appUtils";

const UserRoleLable = (props: any) => {
  const u = useUtils();

  return <Label color="success">{u.t("role_user")}</Label>;
};

export default UserRoleLable;
