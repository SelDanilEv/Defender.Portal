import chroma from "chroma-js";
import dayjs from "dayjs";

import { AllAvailableCurrencies } from "src/models/shared/Currency";
import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";
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

        let dataPoints = historicalOnlyDataset
          .filter((record) => record[dataKey])
          .map((record) => {
            return record[dataKey] as number;
          });

        dataPoints = expandPartialData(
          dataPoints,
          historicalOnlyDataset.length
        );

        const trendLineData = calculateTrendLine(dataPoints, extendedPeriods);

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

const expandPartialData = (
  trendLineData: number[],
  desiredSize: number
): number[] => {
  const expandedData: number[] = [];
  const nullInterval = Math.floor(
    (desiredSize - trendLineData.length) / (trendLineData.length - 1)
  );

  for (let i = 0; i < trendLineData.length - 1; i++) {
    const currentValue = trendLineData[i];
    const nextValue = trendLineData[i + 1];
    expandedData.push(currentValue);

    const step = (nextValue - currentValue) / (nullInterval + 1);
    for (let j = 1; j <= nullInterval; j++) {
      expandedData.push(currentValue + step * j);
    }
  }

  // Push the last value
  expandedData.push(trendLineData[trendLineData.length - 1]);

  // If the expandedData size is less than desiredSize, add the last value repeatedly
  while (expandedData.length < desiredSize) {
    expandedData.push(trendLineData[trendLineData.length - 1]);
  }

  return expandedData;
};
