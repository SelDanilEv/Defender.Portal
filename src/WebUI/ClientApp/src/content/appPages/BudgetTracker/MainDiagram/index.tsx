import { memo, useEffect, useState } from "react";
import chroma from "chroma-js";
import useUtils from "src/appUtils";

import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

import { AllAvailableCurrencies, Currency } from "src/models/shared/Currency";

import testDataset from "./testDataset";
import {
  BudgetHistory,
  BudgetHistoryReview,
  BudgetHistoryReviewRecord,
} from "src/models/budgetTracker/BudgetHistory";
import { connect } from "react-redux";
import MainDiagramSetup from "src/models/budgetTracker/setup/MainDiagramSetup";
import { defaultMainCurrency } from "src/reducers/budgetTrackerSetupReducer";
import {
  BudgetDiagramGroup,
  BudgetDiagramGroups,
} from "src/models/budgetTracker/BudgetDiagramGroups";
import dayjs from "dayjs";

const getBalanceName = (currency: Currency, groupName: string) =>
  `${groupName}: ${currency.toUpperCase()}`;

const getTrendLineName = (currency: Currency, groupName: string) =>
  `${groupName} ${"trend"}: ${currency.toUpperCase()}`;

const buildDatasetItemId = (currency: Currency, groupId: string) => {
  return `${groupId}_${currency}`;
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

const mapToDataset = (
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

const groups: BudgetDiagramGroups = new BudgetDiagramGroups([
  {
    id: "group_1",
    name: "All",
    tags: [],
    color: "#008ae5",
    showTrendline: false,
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
    isActive: true,
  },
]);

const hasData = (
  currency: Currency,
  groupId: string,
  dataset: DatasetItem[]
): boolean => {
  return dataset.some((r) => r[buildDatasetItemId(currency, groupId)]);
};

interface MainDiagramProps {
  diagramConfig: MainDiagramSetup;
}

const MainDiagram = (props: MainDiagramProps) => {
  const u = useUtils();

  const [dataset, setDataset] = useState<DatasetItem[]>([]);

  const [allowedCurrencies, setAllowedCurrencies] = useState<Currency[]>(
    props.diagramConfig.mainCurrency === defaultMainCurrency
      ? AllAvailableCurrencies
      : [props.diagramConfig.mainCurrency as Currency]
  );

  const [extendedPeriods, setExtendedPeriods] = useState<number>(0);

  useEffect(() => {
    if (
      !props.diagramConfig ||
      props.diagramConfig.startDate >= props.diagramConfig.endDate
    ) {
      return;
    }

    const filteredDataset = { ...testDataset };

    const { startDate, endDate, mainCurrency } = props.diagramConfig;

    filteredDataset.history = testDataset.history.filter(
      (record: BudgetHistoryReview) =>
        record.date >= startDate && record.date <= endDate
    );

    // add future records (for trendline)
    let periods = 0;

    if (filteredDataset.history.length) {
      const averageDaysDiff = Math.ceil(
        dayjs(
          filteredDataset.history[filteredDataset.history.length - 1].date
        ).diff(filteredDataset.history[0].date, "day") /
          filteredDataset.history.length
      );

      let tempDate = new Date();

      const lastRecord =
        filteredDataset.history[filteredDataset.history.length - 1];

      while (tempDate < endDate) {
        periods++;
        filteredDataset.history.push({
          date: new Date(tempDate),
          records: lastRecord.records.map(
            (r) => ({ ...r, amount: null } as BudgetHistoryReviewRecord)
          ),
          baseCurrency: lastRecord.baseCurrency,
          rates: lastRecord.rates,
        } as BudgetHistoryReview);

        tempDate.setDate(tempDate.getDate() + averageDaysDiff);
      }
    }
    setExtendedPeriods(periods);

    console.log("extendedPeriods", extendedPeriods);

    if (mainCurrency !== defaultMainCurrency) {
      filteredDataset.allowedCurrencies = [mainCurrency as Currency];

      filteredDataset.history = filteredDataset.history.map(
        (record: BudgetHistoryReview) => {
          const recalculatedRecords: BudgetHistoryReviewRecord[] = [];

          groups.getActiveGroups().forEach((group) => {
            let sum = 0;

            record.records
              .filter((r) => group.tags.every((t) => r.tags.includes(t)))
              .forEach((r: BudgetHistoryReviewRecord) => {
                sum +=
                  (r.amount / record.rates[r.currency]) *
                  record.rates[mainCurrency];
              });

            recalculatedRecords.push({
              name: buildDatasetItemId(mainCurrency as Currency, group.id),
              tags: group.tags,
              amount: sum,
              currency: mainCurrency,
            } as BudgetHistoryReviewRecord);
          });

          return {
            ...record,
            records: recalculatedRecords,
          } as BudgetHistoryReview;
        }
      );

      setAllowedCurrencies([mainCurrency as Currency]);
    } else {
      setAllowedCurrencies(AllAvailableCurrencies);
    }

    var dataset = mapToDataset(filteredDataset, groups.getActiveGroups());

    setDataset(dataset);
  }, [props.diagramConfig]);

  const generateSimilarColors = (
    baseColor: string,
    numColors: number
  ): string[] => {
    return chroma
      .scale([baseColor, chroma(baseColor).darken(10)])
      .colors(numColors);
  };

  const generateSeries = (
    allowedCurrencies: Currency[],
    groups: BudgetDiagramGroup[]
  ) => {
    const series: any[] = [];

    groups.forEach((group) => {
      const currenciesWithData = allowedCurrencies.filter((currency) =>
        hasData(currency, group.id, dataset)
      );

      const colors = generateSimilarColors(
        group.color,
        allowedCurrencies.length
      );

      const groupSeries = currenciesWithData.map((currency, index) => ({
        dataKey: buildDatasetItemId(currency, group.id),
        label: getBalanceName(currency, group.name),
        type: "line",
        color: colors[index],
        connectNulls: true,
        curve: true,
      }));

      if (group.showTrendline) {
        currenciesWithData.forEach((currency, index) => {
          const dataKey = buildDatasetItemId(currency, group.id);

          const dataPoints = dataset
            .filter((record) =>
              dayjs(record.date).isBefore(dayjs().startOf("day"))
            )
            .map((record) => {
              const { date, ...data } = record;
              return data[dataKey] as number;
            });

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

  return (
    <Box sx={{ width: "100%" }}>
      <LineChart
        margin={{ left: 68, right: 40 }}
        height={u.isMobile ? 300 : 600}
        dataset={dataset}
        series={generateSeries(allowedCurrencies, groups.getActiveGroups())}
        xAxis={[
          {
            scaleType: "time",
            dataKey: "date",
            valueFormatter: (value) => value.toLocaleDateString(),
          },
        ]}
        grid={{ horizontal: true }}
      />
    </Box>
  );
};

interface DatasetItem {
  date: Date;
  [key: string]: number | Date;
}

const mapStateToProps = (state: any) => {
  return {
    diagramConfig: state.budgetTrackerSetup as MainDiagramSetup,
  };
};

export default memo(connect(mapStateToProps)(MainDiagram));
