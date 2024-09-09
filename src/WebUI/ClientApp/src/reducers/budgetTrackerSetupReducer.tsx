import MainDiagramSetup from "src/models/budgetTracker/setup/MainDiagramSetup";

const defaultPeriodMonths = 6;

const budgetTrackerSetupReducer = (
  state: MainDiagramSetup = {
    lastMonths: defaultPeriodMonths,
    mainCurrency: defaultMainCurrency,
    startDate: (() => {
      const endDate = new Date();
      endDate.setMonth(new Date().getMonth() - defaultPeriodMonths);
      return endDate;
    })(),
    endDate: new Date(),
  },
  action: any
) => {
  switch (action.type) {
    case updateMainDiagramSetupActionName:
      if (
        action.payload.lastMonths == state.lastMonths &&
        action.payload.mainCurrency == state.mainCurrency &&
        action.payload.startDate == state.startDate &&
        action.payload.endDate == state.endDate
      ) {
        break;
      }

      if (action.payload.lastMonths < 0) {
        action.payload.lastMonths = 0;
      }

      state = action.payload;
      break;
    default:
      break;
  }
  return state;
};

export default budgetTrackerSetupReducer;

export const defaultMainCurrency = "NO";

export const updateMainDiagramSetupActionName = "UPDATE_MAIN_DIAGRAM_SETUP";
