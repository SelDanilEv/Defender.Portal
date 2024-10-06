import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";
import MainDiagramSetup from "src/models/budgetTracker/setup/MainDiagramSetup";
import { updateDiagramGroupsActionName } from "src/reducers/budgetTrackerGroupsReducer";
import { updateMainDiagramSetupActionName } from "src/reducers/budgetTrackerSetupReducer";

export function setMainDiagramSetup(payload: MainDiagramSetup) {
  return (dispath) => {
    dispath({
      type: updateMainDiagramSetupActionName,
      payload: payload,
    });
  };
}

export function setMainDiagramGroups(payload: BudgetDiagramGroup[]) {
  return (dispath) => {
    dispath({
      type: updateDiagramGroupsActionName,
      payload: payload,
    });
  };
}
