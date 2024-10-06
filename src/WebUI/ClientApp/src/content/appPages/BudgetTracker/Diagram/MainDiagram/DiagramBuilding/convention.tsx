import IUtils from "src/appUtils/interface";
import { Currency } from "src/models/shared/Currency";

export const getLabelName = (currency: Currency, groupName: string) =>
  `${groupName}: ${currency.toUpperCase()}`;

export const getTrendLineName = (
  currency: Currency,
  groupName: string,
  u: IUtils
) =>
  `${groupName} ${u.t(
    "budgetTracker:main_diagram_trend_legend"
  )}: ${currency.toUpperCase()}`;

export const buildDatasetItemId = (currency: Currency, groupId: string) =>
  `${groupId}_${currency}`;
