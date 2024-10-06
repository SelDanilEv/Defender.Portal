import apiUrls from "src/api/apiUrls";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import IUtils from "src/appUtils/interface";
import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";

export const CreateGroup = (
  group: BudgetDiagramGroup,
  u: IUtils,
  closeDialog: () => void
) => {
  APICallWrapper({
    url: apiUrls.budgetTracker.group,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: RequestParamsBuilder.BuildBody(group),
    },
    utils: u,
    showSuccess: true,
    onFinal: async () => {
      closeDialog();
    },
  });
};

export const UpdateGroup = (
  group: BudgetDiagramGroup,
  u: IUtils,
  closeDialog: () => void
) => {
  APICallWrapper({
    url: apiUrls.budgetTracker.group,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: RequestParamsBuilder.BuildBody(group),
    },
    utils: u,
    showSuccess: true,
    onFinal: async () => {
      closeDialog();
    },
  });
};

export const DeleteGroup = (
  group: BudgetDiagramGroup,
  u: IUtils,
  closeDialog: () => void
) => {
  APICallWrapper({
    url: `${apiUrls.budgetTracker.group}/${group.id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: RequestParamsBuilder.BuildBody(group),
    },
    utils: u,
    showSuccess: true,
    onFinal: async () => {
      closeDialog();
    },
  });
};
