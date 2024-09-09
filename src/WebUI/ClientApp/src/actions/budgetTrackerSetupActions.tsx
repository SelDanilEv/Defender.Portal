import MainDiagramSetup from "src/models/budgetTracker/setup/MainDiagramSetup";
import { updateMainDiagramSetupActionName } from "src/reducers/budgetTrackerSetupReducer";

export function setMainDiagramSetup(payload: MainDiagramSetup) {
  return (dispath) => {
    dispath({
      type: updateMainDiagramSetupActionName,
      payload: payload,
    });
  };
}
