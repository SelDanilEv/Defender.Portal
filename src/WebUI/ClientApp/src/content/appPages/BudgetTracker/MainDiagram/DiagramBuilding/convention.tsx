import { Currency } from "src/models/shared/Currency";

export const getLabelName = (currency: Currency, groupName: string) =>
  `${groupName}: ${currency.toUpperCase()}`;

export const getTrendLineName = (currency: Currency, groupName: string) =>
  `${groupName} trend: ${currency.toUpperCase()}`;

export const buildDatasetItemId = (currency: Currency, groupId: string) =>
  `${groupId}_${currency}`;
