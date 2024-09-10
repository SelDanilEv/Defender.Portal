import { memo, useEffect, useState } from "react";
import useUtils from "src/appUtils";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import { Currency } from "src/models/shared/Currency";
import testDataset, { groups } from "./testDataset";
import {
  BudgetHistoryReview,
  BudgetHistoryReviewRecord,
} from "src/models/budgetTracker/BudgetHistory";
import { connect } from "react-redux";
import MainDiagramSetup from "src/models/budgetTracker/setup/MainDiagramSetup";
import { defaultMainCurrency } from "src/reducers/budgetTrackerSetupReducer";
import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";
import dayjs from "dayjs";
import { DatasetItem } from "src/models/budgetTracker/diagramData/DatasetItem";
import { mapToDataset } from "./DiagramBuilding/dataset";
import { generateSeries } from "./DiagramBuilding/series";
import { buildDatasetItemId } from "./DiagramBuilding/convention";

interface MainDiagramProps {
  diagramConfig: MainDiagramSetup;
}

const MainDiagram = (props: MainDiagramProps) => {
  const u = useUtils();

  const [dataset, setDataset] = useState<DatasetItem[]>([]);
  const [extendedPeriods, setExtendedPeriods] = useState<number>(0);

  useEffect(() => {
    if (!isValidDiagramConfig(props.diagramConfig)) {
      return;
    }

    let filteredDataset = filterDatasetByDate(
      { ...testDataset },
      props.diagramConfig.startDate,
      props.diagramConfig.endDate
    );

    const { startDate, endDate, mainCurrency } = props.diagramConfig;

    const { dataset: updatedDataset, periods } = addFutureRecords(
      filteredDataset,
      endDate
    );

    setExtendedPeriods(periods);

    const activeGroups = groups.getActiveGroups();

    if (mainCurrency !== defaultMainCurrency) {
      updatedDataset.history = recalculateHistoryWithMainCurrency(
        updatedDataset.history,
        mainCurrency as Currency,
        activeGroups
      );

      updatedDataset.allowedCurrencies = [mainCurrency as Currency];
    }

    const dataset = mapToDataset(updatedDataset, activeGroups);

    setDataset(dataset);
  }, [props.diagramConfig]);

  return (
    <Box sx={{ width: "100%" }}>
      <LineChart
        margin={{ left: 68, right: 40 }}
        height={u.isMobile ? 300 : 600}
        dataset={dataset}
        series={generateSeries(
          dataset,
          groups.getActiveGroups(),
          extendedPeriods
        )}
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

const isValidDiagramConfig = (config: MainDiagramSetup): boolean => {
  return config && config.startDate < config.endDate;
};

const filterDatasetByDate = (
  dataset: typeof testDataset,
  startDate: Date,
  endDate: Date
): typeof testDataset => {
  return {
    ...dataset,
    history: dataset.history.filter(
      (record: BudgetHistoryReview) =>
        record.date >= startDate && record.date <= endDate
    ),
  };
};

const addFutureRecords = (
  dataset: typeof testDataset,
  endDate: Date
): { dataset: typeof testDataset; periods: number } => {
  let periods = 0;

  if (dataset.history.length) {
    const averageDaysDiff = Math.ceil(
      dayjs(dataset.history[dataset.history.length - 1].date).diff(
        dataset.history[0].date,
        "day"
      ) / dataset.history.length
    );

    let tempDate = new Date();
    const lastRecord = dataset.history[dataset.history.length - 1];

    while (tempDate < endDate) {
      periods++;
      dataset.history.push({
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

  return { dataset, periods };
};

const recalculateHistoryWithMainCurrency = (
  history: BudgetHistoryReview[],
  mainCurrency: Currency,
  groups: BudgetDiagramGroup[]
): BudgetHistoryReview[] => {
  return history.map((record: BudgetHistoryReview) => {
    const recalculatedRecords: BudgetHistoryReviewRecord[] = [];

    groups.forEach((group) => {
      let sum = 0;

      record.records
        .filter((r) => group.tags.every((t) => r.tags.includes(t)))
        .forEach((r: BudgetHistoryReviewRecord) => {
          sum +=
            (r.amount / record.rates[r.currency]) * record.rates[mainCurrency];
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
  });
};

const mapStateToProps = (state: any) => {
  return {
    diagramConfig: state.budgetTrackerSetup as MainDiagramSetup,
  };
};

export default memo(connect(mapStateToProps)(MainDiagram));
