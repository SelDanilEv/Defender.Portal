import chroma from "chroma-js";

import { AllAvailableCurrencies } from "src/models/shared/Currency";

import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";
import dayjs from "dayjs";
import { DatasetItem } from "src/models/budgetTracker/diagramData/DatasetItem";
import {
  buildDatasetItemId,
  getLabelName,
  getTrendLineName,
} from "./convention";
import { hasData } from "./dataset";

export const generateSeries = (
  dataset: DatasetItem[],
  groups: BudgetDiagramGroup[],
  extendedPeriods: number = 0
): any[] => {
  const series: any[] = [];

  groups.forEach((group) => {
    const currenciesWithData = AllAvailableCurrencies.filter((currency) =>
      hasData(currency, group.id, dataset)
    );

    const colors = generateSimilarColors(
      group.color,
      currenciesWithData.length
    );

    const groupSeries = currenciesWithData.map((currency, index) => ({
      dataKey: buildDatasetItemId(currency, group.id),
      label: getLabelName(currency, group.name),
      type: "line",
      color: colors[index],
      connectNulls: true,
      curve: "monotoneX",
      showMark: ({ index }) =>
        index % (Math.round(dataset.length / 25) || 1) === 0,
    }));

    if (group.showTrendline) {
      currenciesWithData.forEach((currency, index) => {
        const dataKey = buildDatasetItemId(currency, group.id);

        const historicalOnlyDataset = dataset.filter((record) =>
          dayjs(record.date).isBefore(dayjs().startOf("day"))
        );

        const dataPoints = historicalOnlyDataset
          .filter((record) => record[dataKey])
          .map((record) => {
            return record[dataKey] as number;
          });

        let trendLineData = calculateTrendLine(dataPoints, extendedPeriods);

        if (trendLineData.length < dataset.length) {
          const coefficients = Math.floor(
            dataset.length / trendLineData.length
          );

          trendLineData = expandTrendLineData(trendLineData, coefficients);
        }

        series.push({
          label: getTrendLineName(currency, group.name),
          type: "line",
          data: trendLineData.slice(0, dataset.length),
          color: chroma(colors[index]).alpha(0.4).css(),
          connectNulls: true,
          showMark: false,
        });
      });
    }

    series.push(...groupSeries);
  });

  return series;
};

const generateSimilarColors = (
  baseColor: string,
  numColors: number
): string[] => {
  return chroma
    .scale([baseColor, chroma(baseColor).darken(2)])
    .colors(numColors);
};

const calculateTrendLine = (data: number[], extendBy: number = 0): number[] => {
  const n = data.length;
  const sumX = data.reduce((sum, _, index) => sum + index, 0);
  const sumY = data.reduce((sum, value) => sum + value, 0);
  const sumXY = data.reduce((sum, value, index) => sum + index * value, 0);
  const sumX2 = data.reduce((sum, _, index) => sum + index * index, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const trendLineData = data.map((_, index) => slope * index + intercept);

  // Extend the trendline into the future
  for (let i = n; i < n + extendBy; i++) {
    trendLineData.push(slope * i + intercept);
  }

  return trendLineData;
};

const expandTrendLineData = (
  trendLineData: number[],
  nullInterval: number
): (number | null)[] => {
  const expandedData: (number | null)[] = [];

  trendLineData.forEach((value) => {
    expandedData.push(value);
    for (let i = 0; i < nullInterval; i++) {
      expandedData.push(null);
    }
  });

  return expandedData;
};
