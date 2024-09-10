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

    const activeGroups = groups.getActiveGroups();

    if (mainCurrency !== defaultMainCurrency) {
      filteredDataset.history = recalculateHistoryWithMainCurrency(
        filteredDataset.history,
        mainCurrency as Currency,
        activeGroups
      );

      filteredDataset.allowedCurrencies = [mainCurrency as Currency];
    }

    var dataset = mapToDataset(filteredDataset, activeGroups);

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
