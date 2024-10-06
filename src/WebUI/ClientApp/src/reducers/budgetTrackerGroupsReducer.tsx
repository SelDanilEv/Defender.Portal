import { BudgetDiagramGroups } from "src/models/budgetTracker/BudgetDiagramGroups";

const budgetTrackerSetupReducer = (
  state: BudgetDiagramGroups = new BudgetDiagramGroups([]),
  action: any
) => {
  switch (action.type) {
    case updateDiagramGroupsActionName:
      if (action.payload) state = new BudgetDiagramGroups(action.payload);
      break;
    default:
      break;
  }
  return state;
};

export default budgetTrackerSetupReducer;

export const updateDiagramGroupsActionName = "UPDATE_MAIN_DIAGRAM_GROUPS";
