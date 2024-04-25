import { Card } from "@mui/material";
import UserListTable from "./Table";
import { useEffect, useState } from "react";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import { PaginationRequest } from "src/models/base/PaginationRequest";
import { CurrentPagination } from "src/models/base/CurrentPagination";
import RequestBuilder from "src/api/APIWrapper/RequestBuilder";
import UserListResponse from "src/models/responses/admin/users/UserListResponse";
import { UserOnlyInfo } from "src/models/UserOnlyInfo";
import { AdminSearchUserRequest } from "src/models/requests/admin/searchUser/AdminSearchUserRequest";

interface UserListProps {
  searchFullUserInfo: (fullUserInfo: AdminSearchUserRequest) => void;
}

const UserList = (props: UserListProps) => {
  const u = useUtils();

  const { searchFullUserInfo: searchFullUserInfo } = props;

  const [users, setUsers] = useState<UserOnlyInfo[]>([]);

  const [paginationRequest, setPaginationRequest] = useState<PaginationRequest>(
    {
      page: 0,
      pageSize: 5,
    } as PaginationRequest
  );

  const applyPagination = (page: number, limit: number) => {
    if (paginationRequest.page === page && paginationRequest.pageSize === limit)
      return;
    setPaginationRequest({ page, pageSize: limit });
  };

  const [pagination, setPagination] = useState<CurrentPagination>({
    totalItemsCount: 0,
    currentPage: 0,
    pageSize: 5,
    totalPagesCount: 1,
  } as CurrentPagination);

  useEffect(() => {
    reloadUserList();
  }, [paginationRequest]);

  const reloadUserList = () => {
    const url =
      `${apiUrls.admin.userList}` +
      `${RequestBuilder.BuildQuery(paginationRequest)}`;

    APICallWrapper({
      url: url,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      utils: u,
      onSuccess: async (response) => {
        const userList: UserListResponse = await response.json();

        setUsers(userList.items);
        setPagination(userList);
      },
      onFailure: async (response) => {},
      showError: true,
    });
  };

  const selectUser = (userId: string) => {
    searchFullUserInfo({ userId: userId } as AdminSearchUserRequest);
  };

  return (
    <Card>
      <UserListTable
        users={users}
        applyPagination={applyPagination}
        pagination={pagination}
        refresh={reloadUserList}
        selectUser={selectUser}
      />
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps)(UserList);
