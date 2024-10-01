import { Card } from "@mui/material";
import ReviewsTable from "./Table";
import { useEffect, useState } from "react";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";
import { PaginationRequest } from "src/models/base/PaginationRequest";
import { CurrentPagination } from "src/models/base/CurrentPagination";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import BudgetReviewsResponse from "src/models/responses/budgetTracker/budgetReview/BudgetReviewsResponse";
import { BudgetReview } from "src/models/budgetTracker/BudgetReview";

const ReviewsPage = () => {
  const u = useUtils();

  const [items, setItems] = useState<BudgetReview[]>([]);

  const [paginationRequest, setPaginationRequest] = useState<PaginationRequest>(
    {
      page: 0,
      pageSize: 10,
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
    pageSize: 10,
    totalPagesCount: 1,
  } as CurrentPagination);

  useEffect(() => {
    reloadItems();
  }, [paginationRequest]);

  const reloadItems = () => {
    const url =
      `${apiUrls.budgetTracker.getReviews}` +
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
        const pagedItems: BudgetReviewsResponse = await response.json();

        setItems(pagedItems.items);
        setPagination(pagedItems);
      },
      onFailure: async (response) => {},
      showError: true,
    });
  };

  return (
    <Card>
      <ReviewsTable
        reviews={items}
        applyPagination={applyPagination}
        pagination={pagination}
        refresh={reloadItems}
      />
    </Card>
  );
};

export default ReviewsPage;
