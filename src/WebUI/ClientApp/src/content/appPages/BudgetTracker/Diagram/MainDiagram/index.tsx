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
import {
  BudgetDiagramGroup,
  BudgetDiagramGroups,
} from "src/models/budgetTracker/BudgetDiagramGroups";
import { DatasetItem } from "src/models/budgetTracker/diagramData/DatasetItem";
import { BudgetHistory } from "src/models/budgetTracker/BudgetHistory";
import apiUrls from "src/api/apiUrls";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";

import { mapToDataset } from "./DiagramBuilding/dataset";
import { generateSeries } from "./DiagramBuilding/series";
import { buildDatasetItemId } from "./DiagramBuilding/convention";

import "src/helpers/dateExtensions";

interface MainDiagramProps {
  diagramConfig: MainDiagramSetup;
  budgetDiagramGroups: BudgetDiagramGroups;
}

const MainDiagram = (props: MainDiagramProps) => {
  const u = useUtils();

  const { diagramConfig, budgetDiagramGroups: groups } = props;

  const [dataset, setDataset] = useState<DatasetItem[]>([]);
  const [budgetHistory, setBudgetHistory] = useState<BudgetHistory>(
    {} as BudgetHistory
  );

  const [extendedPeriods, setExtendedPeriods] = useState<number>(0);
  const [additionalMargin, setAdditionalMargin] = useState<number>(0);

  useEffect(() => {
    if (!isValidDiagramConfig(diagramConfig)) {
      return;
    }

    startRefresh();
  }, [diagramConfig]);

  useEffect(() => {
    if (groups.areGroupsValid && budgetHistory.history) {
      applyGroupsAndSetups(budgetHistory);
    }
  }, [groups, budgetHistory]);

  const applyGroupsAndSetups = (history: BudgetHistory) => {
    if (!history.history || !groups.areGroupsValid) return;

    const historyToUpdate = { ...history };

    const { endDate, mainCurrency } = diagramConfig;
    const activeGroups = groups.getActiveGroups();

    if (mainCurrency !== defaultMainCurrency) {
      historyToUpdate.history = recalculateHistoryWithMainCurrency(
        history.history,
        mainCurrency as Currency,
        activeGroups
      );

      historyToUpdate.allowedCurrencies = [mainCurrency as Currency];
    }

    const dataset = mapToDataset(historyToUpdate, activeGroups);

    setLegendMargin(historyToUpdate, activeGroups.length);

    setDataset(dataset);
  };

  const startRefresh = async () => {
    const request = {
      startDate: diagramConfig.startDate.toDateOnlyString(),
      endDate: diagramConfig.endDate.toDateOnlyString(),
    };

    const url =
      `${apiUrls.budgetTracker.getReviewsByDateRange}` +
      `${RequestParamsBuilder.BuildQuery(request)}`;

    await APICallWrapper({
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
      doLock: false,
    });
  };

  const reloadHistory = (budgetHistory: BudgetHistory) => {
    const { endDate } = diagramConfig;

    const { dataset: updatedDataset, periods } = addFutureRecords(
      budgetHistory,
      endDate
    );

    setExtendedPeriods(periods);

    setBudgetHistory(updatedDataset);

    applyGroupsAndSetups(updatedDataset);
  };

  // view adjusted for readability
  const setLegendMargin = (
    updatedDataset: BudgetHistory,
    groupsAmount: number
  ) => {
    const coef = u.isMobile ? 50 : u.isLargeScreen ? 10 : 20;

    const addMargin =
      (updatedDataset.allowedCurrencies.length / 3) * groupsAmount * coef;

    setAdditionalMargin(addMargin);
  };

  const recalculateHeight = () => {
    let height = u.isLargeScreen ? 700 : u.isMobile ? 400 : 450;

    height += additionalMargin;

    return height;
  };

  return (
    <Box sx={{ width: "100%" }} paddingBottom={3}>
      <LineChart
        margin={{
          top: 10,
          bottom: 65 + additionalMargin,
          left: 68,
          right: 40,
        }}
        height={recalculateHeight()}
        dataset={dataset}
        series={generateSeries(
          dataset,
          groups.getActiveGroups(),
          extendedPeriods,
          u
        )}
        xAxis={[
          {
            scaleType: "time",
            dataKey: "date",
            valueFormatter: (value) => value.toLocaleDateString(),
          },
        ]}
        grid={{ horizontal: true }}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
          },
        }}
      />
    </Box>
  );
};

const isValidDiagramConfig = (config: MainDiagramSetup): boolean => {
  return config && config.startDate < config.endDate && config.isLoaded;
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
    budgetDiagramGroups: state.budgetTrackerGroups as BudgetDiagramGroups,
  };
};

export default memo(connect(mapStateToProps)(MainDiagram));
