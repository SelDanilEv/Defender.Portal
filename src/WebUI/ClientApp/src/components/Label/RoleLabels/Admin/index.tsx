import Label from "src/components/Label";
import useUtils from "src/appUtils";

const AdminRoleLable = (props: any) => {
  const u = useUtils();

  return <Label color="warning">{u.t("role_admin")}</Label>;
};

export default AdminRoleLable;
