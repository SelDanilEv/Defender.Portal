import { connect } from "react-redux";

import useUtils from "src/appUtils";
import { Box } from "@mui/material";
import { FullUserInfoForAdmin } from "src/models/admin/FullUserInfoForAdmin";
import { useState } from "react";
import SearchUserPannel from "./SearchUserPannel";
import UserInfoTabs from "./UserInfoTabs";
import UserList from "./UserList";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestBuilder from "src/api/APIWrapper/RequestBuilder";
import apiUrls from "src/api/apiUrls";
import { AdminSearchUserRequest } from "src/models/requests/admin/searchUser/AdminSearchUserRequest";

const AdminUsersPage = (props: any) => {
  const u = useUtils();

  const [userInfoForAdmin, setUserInfoForAdmin] =
    useState<FullUserInfoForAdmin>({} as FullUserInfoForAdmin);

  const searchFullUserInfo = (
    request: AdminSearchUserRequest,
    force: boolean = false
  ) => {
    if (!request || (request.userId === userInfoForAdmin?.user?.id && !force))
      return;

    APICallWrapper({
      url:
        `${apiUrls.admin.searchFullUserInfo}` +
        `${RequestBuilder.BuildQuery(request)}`,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      utils: u,
      onSuccess: async (response) => {
        const userInfo: FullUserInfoForAdmin = await response.json();

        setUserInfoForAdmin(userInfo);
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <UserList searchFullUserInfo={searchFullUserInfo} />
      <SearchUserPannel searchFullUserInfo={searchFullUserInfo} />
      <UserInfoTabs
        fullUserInfo={userInfoForAdmin}
        refresh={() =>
          searchFullUserInfo(
            {
              userId: userInfoForAdmin?.user?.id,
            } as AdminSearchUserRequest,
            true
          )
        }
      />
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(mapStateToProps)(AdminUsersPage);
