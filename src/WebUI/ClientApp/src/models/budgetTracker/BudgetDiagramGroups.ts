export interface BudgetDiagramGroup {
  id: string;
  name: string;
  isActive: boolean;
  tags: string[];
  mainColor: string;
  showTrendLine: boolean;
  trendLineColor: string;
}

export class BudgetDiagramGroups {
  groups: BudgetDiagramGroup[];
  areGroupsValid: boolean;

  constructor(groups: BudgetDiagramGroup[]) {
    this.groups = groups;
    this.areGroupsValid = this.groups.length > 0;
  }

  getActiveGroups(): BudgetDiagramGroup[] {
    return this.groups.filter((group) => group.isActive);
  }
}
