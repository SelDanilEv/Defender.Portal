import { Currency } from "src/models/shared/Currency";
import { BudgetReview } from "src/models/budgetTracker/BudgetReview";
import { BudgetHistory } from "src/models/budgetTracker/BudgetHistory";
import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";
import { DatasetItem } from "src/models/budgetTracker/diagramData/DatasetItem";

import { buildDatasetItemId } from "./convention";

export const mapToDataset = (
  history: BudgetHistory,
  groups: BudgetDiagramGroup[]
): DatasetItem[] => {
  return history.history.map((record: BudgetReview) => {
    const datasetItems: any = { date: record.date };

    history.allowedCurrencies.forEach((currency) => {
      groups.forEach((group) => {
        const records = record.positions.filter(
          (r) =>
            r.currency === currency &&
            group.tags.every((t) => r.tags.includes(t))
        );

        if (!records.length) {
          return;
        }

        const currencySum = records.reduce((sum, r) => sum + r.amount, 0);

        datasetItems[buildDatasetItemId(currency, group.id)] =
          currencySum === 0 ? null : Math.round(currencySum) / 100;
      });
    });

    return datasetItems as DatasetItem;
  });
};

export const hasData = (
  currency: Currency,
  groupId: string,
  dataset: DatasetItem[]
): boolean => {
  return dataset.some((r) => r[buildDatasetItemId(currency, groupId)]);
};
