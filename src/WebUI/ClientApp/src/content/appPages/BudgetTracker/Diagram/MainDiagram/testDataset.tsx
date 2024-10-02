import { BudgetDiagramGroups } from "src/models/budgetTracker/BudgetDiagramGroups";

export const groups: BudgetDiagramGroups = new BudgetDiagramGroups([
  {
    id: "group_1",
    name: "All",
    tags: [],
    color: "#008ae5",
    showTrendline: true,
    translineColor: "#ff8a13",
    isActive: true,
  },
  {
    id: "group_2",
    name: "Test",
    tags: ["test tag"],
    color: "#33cc00",
    showTrendline: true,
    translineColor: "#FF0000",
    isActive: false,
  },
]);
