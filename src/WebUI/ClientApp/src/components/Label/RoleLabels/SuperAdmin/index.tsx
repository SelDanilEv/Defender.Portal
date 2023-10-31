import Label from "src/components/Label";
import useUtils from "src/appUtils";

const SuperAdminRoleLable = (props: any) => {
  const u = useUtils();

  return <Label color="error">{u.t("role_super_admin")}</Label>;
};

export default SuperAdminRoleLable;
