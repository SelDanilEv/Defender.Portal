import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";
import { PaginationRequest } from "src/models/base/PaginationRequest";
import { CurrentPagination } from "src/models/base/CurrentPagination";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import BudgetGroupsResponse from "src/models/responses/budgetTracker/budgetGroup/BudgetGroupsResponse";
import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";
import { setMainDiagramGroups } from "src/actions/budgetTrackerActions";
import DefaultTableConsts from "src/consts/DefaultTableConsts";

import GroupsTable from "./Table";

interface GroupsSubPageProps {
  setMainDiagramGroups: (groups: BudgetDiagramGroup[]) => void;
}

const GroupsSubPage = (props: GroupsSubPageProps) => {
  const u = useUtils();

  const [items, setItems] = useState<BudgetDiagramGroup[]>([]);

  const [paginationRequest, setPaginationRequest] = useState<PaginationRequest>(
    {
      page: DefaultTableConsts.DefaultPage,
      pageSize: DefaultTableConsts.DefaultPageSize,
    } as PaginationRequest
  );

  const applyPagination = (page: number, limit: number) => {
    if (paginationRequest.page === page && paginationRequest.pageSize === limit)
      return;
    setPaginationRequest({ page, pageSize: limit });
  };

  const [pagination, setPagination] = useState<CurrentPagination>({
    totalItemsCount: 0,
    currentPage: DefaultTableConsts.DefaultPage,
    pageSize: DefaultTableConsts.DefaultPageSize,
    totalPagesCount: 1,
  } as CurrentPagination);

  useEffect(() => {
    reloadItems();
  }, [paginationRequest]);

  const reloadItems = () => {
    const url =
      `${apiUrls.budgetTracker.getGroups}` +
      `${RequestParamsBuilder.BuildQuery(paginationRequest)}`;

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
        const pagedItems: BudgetGroupsResponse = await response.json();

        setItems(pagedItems.items);
        props.setMainDiagramGroups(pagedItems.items);
        setPagination(pagedItems);
      },
      onFailure: async (response) => {},
      showError: true,
    });
  };

  return (
    <Card>
      <GroupsTable
        groups={items}
        applyPagination={applyPagination}
        pagination={pagination}
        refresh={reloadItems}
      />
    </Card>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMainDiagramGroups: (groups: BudgetDiagramGroup[]) => {
      dispatch(setMainDiagramGroups(groups));
    },
  };
};

export default connect(null, mapDispatchToProps)(GroupsSubPage);
