export interface BudgetDiagramGroup {
  id: string;
  name: string;
  tags: string[];
  color: string;
  showTrendline: boolean;
  translineColor: string;
  isActive: boolean;
}

export class BudgetDiagramGroups {
  groups: BudgetDiagramGroup[];

  constructor(groups: BudgetDiagramGroup[]) {
    this.groups = groups;
  }

  getActiveGroups(): BudgetDiagramGroup[] {
    return this.groups.filter((group) => group.isActive);
  }
}
