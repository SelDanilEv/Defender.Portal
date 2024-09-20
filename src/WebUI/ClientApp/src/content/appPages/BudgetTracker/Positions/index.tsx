import { Card } from "@mui/material";
import PositionsTable from "./Table";
import { useEffect, useState } from "react";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";
import { PaginationRequest } from "src/models/base/PaginationRequest";
import { CurrentPagination } from "src/models/base/CurrentPagination";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import { BudgetPosition } from "src/models/budgetTracker/BudgetPositions";
import BudgetPositionsResponse from "src/models/responses/budgetTracker/budgetPosition/BudgetPositionsResponse";

const PositionsPage = () => {
  const u = useUtils();

  const [items, setItems] = useState<BudgetPosition[]>([]);

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
    reloadItems();
  }, [paginationRequest]);

  const reloadItems = () => {
    const url =
      `${apiUrls.budgetTracker.getPositions}` +
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
        const pagedItems: BudgetPositionsResponse = await response.json();

        setItems(pagedItems.items);
        setPagination(pagedItems);
      },
      onFailure: async (response) => {},
      showError: true,
    });
  };

  return (
    <Card>
      <PositionsTable
        positions={items}
        applyPagination={applyPagination}
        pagination={pagination}
        refresh={reloadItems}
      />
    </Card>
  );
};

export default PositionsPage;
