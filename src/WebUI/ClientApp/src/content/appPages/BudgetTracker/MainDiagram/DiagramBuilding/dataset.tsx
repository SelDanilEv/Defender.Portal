
import { Currency } from "src/models/shared/Currency";

import {
  BudgetHistory,
  BudgetHistoryReview,
} from "src/models/budgetTracker/BudgetHistory";
import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";
import { DatasetItem } from "src/models/budgetTracker/diagramData/DatasetItem";
import { buildDatasetItemId } from "./convention";

export const mapToDataset = (
  history: BudgetHistory,
  groups: BudgetDiagramGroup[]
): DatasetItem[] => {
  return history.history.map((record: BudgetHistoryReview) => {
    const datasetItems: any = { date: record.date };

    history.allowedCurrencies.forEach((currency) => {
      groups.forEach((group) => {
        const records = record.records.filter(
          (r) =>
            r.currency === currency &&
            group.tags.every((t) => r.tags.includes(t))
        );

        if (!records.length) {
          return;
        }

        const currencySum = records.reduce((sum, r) => sum + r.amount, 0);

        datasetItems[buildDatasetItemId(currency, group.id)] =
          currencySum === 0 ? null : currencySum;
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
