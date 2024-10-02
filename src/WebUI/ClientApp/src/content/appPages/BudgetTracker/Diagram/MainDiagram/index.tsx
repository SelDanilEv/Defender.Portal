import { memo, useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import { connect } from "react-redux";
import dayjs from "dayjs";

import useUtils from "src/appUtils";
import {
  BudgetReview,
  BudgetReviewedPosition,
} from "src/models/budgetTracker/BudgetReview";
import { Currency } from "src/models/shared/Currency";
import MainDiagramSetup from "src/models/budgetTracker/setup/MainDiagramSetup";
import { defaultMainCurrency } from "src/reducers/budgetTrackerSetupReducer";
import { BudgetDiagramGroup } from "src/models/budgetTracker/BudgetDiagramGroups";
import { DatasetItem } from "src/models/budgetTracker/diagramData/DatasetItem";
import { BudgetHistory } from "src/models/budgetTracker/BudgetHistory";
import apiUrls from "src/api/apiUrls";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";

import { mapToDataset } from "./DiagramBuilding/dataset";
import { generateSeries } from "./DiagramBuilding/series";
import { buildDatasetItemId } from "./DiagramBuilding/convention";
import { groups } from "./testDataset";

import "src/helpers/dateExtensions";

interface MainDiagramProps {
  diagramConfig: MainDiagramSetup;
}

const MainDiagram = (props: MainDiagramProps) => {
  const u = useUtils();

  const { diagramConfig } = props;

  const [dataset, setDataset] = useState<DatasetItem[]>([]);
  const [extendedPeriods, setExtendedPeriods] = useState<number>(0);

  const reloadHistory = (budgetHistory: BudgetHistory) => {
    const { startDate, endDate, mainCurrency } = diagramConfig;

    const { dataset: updatedDataset, periods } = addFutureRecords(
      budgetHistory,
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
  };

  const startRefresh = () => {
    const request = {
      startDate: diagramConfig.startDate.toDateOnlyString(),
      endDate: diagramConfig.endDate.toDateOnlyString(),
    };

    const url =
      `${apiUrls.budgetTracker.getReviewsByDateRange}` +
      `${RequestParamsBuilder.BuildQuery(request)}`;

    APICallWrapper({
      url: url,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      utils: u,
      onSuccess: async (response) => {
        const items: BudgetReview[] = await response.json();

        const history = new BudgetHistory(items || []);

        reloadHistory(history);
      },
      onFailure: async (response) => {},
      showError: true,
    });
  };

  useEffect(() => {
    if (!isValidDiagramConfig(diagramConfig)) {
      return;
    }

    startRefresh();
  }, [diagramConfig]);

  return (
    <Box sx={{ width: "100%" }}>
      <LineChart
        margin={{ left: 68, right: 40 }}
        height={u.isLargeScreen ? 700 : u.isMobile ? 400 : 500}
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

const addFutureRecords = (
  dataset: BudgetHistory,
  endDate: Date
): { dataset: BudgetHistory; periods: number } => {
  let periods = 0;

  if (dataset.history.length) {
    const averageDaysDiff = Math.ceil(
      dayjs(dataset.history[dataset.history.length - 1].date).diff(
        dataset.history[0].date,
        "day"
      ) /
        (dataset.history.length - 1)
    );

    let latestDate = new Date(dataset.history[dataset.history.length - 1].date);

    const lastRecord = dataset.history[dataset.history.length - 1];

    latestDate.setDate(latestDate.getDate() + averageDaysDiff);

    while (latestDate < endDate) {
      periods++;
      dataset.history.push({
        date: new Date(latestDate),
        positions: lastRecord.positions.map(
          (r) => ({ ...r, amount: null } as BudgetReviewedPosition)
        ),
        baseCurrency: lastRecord.baseCurrency,
        rates: lastRecord.rates,
      } as BudgetReview);

      latestDate.setDate(latestDate.getDate() + averageDaysDiff);
    }
  }

  return { dataset, periods };
};

const recalculateHistoryWithMainCurrency = (
  history: BudgetReview[],
  mainCurrency: Currency,
  groups: BudgetDiagramGroup[]
): BudgetReview[] => {
  return history.map((record: BudgetReview) => {
    const recalculatedRecords: BudgetReviewedPosition[] = [];

    groups.forEach((group) => {
      let sum = 0;

      record.positions
        .filter((r) => group.tags.every((t) => r.tags.includes(t)))
        .forEach((r: BudgetReviewedPosition) => {
          sum +=
            (r.amount / record.rates[r.currency]) * record.rates[mainCurrency];
        });

      recalculatedRecords.push({
        name: buildDatasetItemId(mainCurrency as Currency, group.id),
        tags: group.tags,
        amount: sum,
        currency: mainCurrency,
      } as BudgetReviewedPosition);
    });

    return {
      ...record,
      positions: recalculatedRecords,
    } as BudgetReview;
  });
};

const mapStateToProps = (state: any) => {
  return {
    diagramConfig: state.budgetTrackerSetup as MainDiagramSetup,
  };
};

export default memo(connect(mapStateToProps)(MainDiagram));
