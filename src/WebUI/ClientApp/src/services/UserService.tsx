import useUtils from "src/appUtils";
import Role from "src/consts/Role";
import { Session } from "src/models/Session";

const UserService = {
  GetUserInfoFromSession: (session: Session) => {
    return {
      Id: session.user.id,
      Nickname: session.user.nickname,
      Email: session.user.email,
      Avatar: "/",
      Role: UserService.GetHighestRole(session.user.roles),
      CreatedDate: session.user.createdDate,
    };
  },

  GetHighestRole: (roles: string[]): string => {
    if (roles) {
      if (roles.includes(Role.SuperAdmin)) {
        return Role.SuperAdmin;
      }

      if (roles.includes(Role.Admin)) {
        return Role.Admin;
      }

      if (roles.includes(Role.User)) {
        return Role.User;
      }
    }

    return Role.NoRole;
  },

  RoleToDisplay: (u, role: string): string => {
    let defaultRole = { key: Role.User, value: u.t("role_user") };
    let roleList = [
      { key: Role.SuperAdmin, value: u.t("role_super_admin") },
      { key: Role.Admin, value: u.t("role_admin") },
      defaultRole,
    ];

    for (
      let i = 0, localizedRole = {} as { key: string; value: string };
      i < roleList.length && role;
      localizedRole = roleList[i++]
    ) {
      if (role == localizedRole.key) {
        return localizedRole.value;
      }
    }

    return defaultRole.value;
  },
};

export default UserService;
