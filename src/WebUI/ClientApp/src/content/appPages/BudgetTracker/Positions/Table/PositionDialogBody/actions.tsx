import apiUrls from "src/api/apiUrls";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import IUtils from "src/appUtils/interface";
import { BudgetPosition } from "src/models/budgetTracker/BudgetPositions";

export const CreatePosition = (
  position: BudgetPosition,
  u: IUtils,
  closeDialog: () => void
) => {
  APICallWrapper({
    url: apiUrls.budgetTracker.position,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: RequestParamsBuilder.BuildBody(position),
    },
    utils: u,
    showSuccess: true,
    onFinal: async () => {
      closeDialog();
    },
  });
};

export const UpdatePosition = (
  position: BudgetPosition,
  u: IUtils,
  closeDialog: () => void
) => {
  APICallWrapper({
    url: apiUrls.budgetTracker.position,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: RequestParamsBuilder.BuildBody(position),
    },
    utils: u,
    showSuccess: true,
    onFinal: async () => {
      closeDialog();
    },
  });
};

export const DeletePosition = (
  position: BudgetPosition,
  u: IUtils,
  closeDialog: () => void
) => {
  APICallWrapper({
    url: `${apiUrls.budgetTracker.position}/${position.id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: RequestParamsBuilder.BuildBody(position),
    },
    utils: u,
    showSuccess: true,
    onFinal: async () => {
      closeDialog();
    },
  });
};
