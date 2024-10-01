import apiUrls from "src/api/apiUrls";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import IUtils from "src/appUtils/interface";
import { BudgetReview } from "src/models/budgetTracker/BudgetReview";

export const PublishReview = (
  review: BudgetReview,
  u: IUtils,
  closeDialog: () => void
) => {
  review.positions = review.positions.filter((p) => p.name);

  APICallWrapper({
    url: apiUrls.budgetTracker.review,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: RequestParamsBuilder.BuildBody(review),
    },
    utils: u,
    showSuccess: true,
    onFinal: async () => {
      closeDialog();
    },
  });
};

export const DeleteReview = (
  review: BudgetReview,
  u: IUtils,
  closeDialog: () => void
) => {
  APICallWrapper({
    url: `${apiUrls.budgetTracker.review}/${review.id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: RequestParamsBuilder.BuildBody(review),
    },
    utils: u,
    showSuccess: true,
    onFinal: async () => {
      closeDialog();
    },
  });
};
