import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { Grid, MenuItem } from "@mui/material";

import useUtils from "src/appUtils";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import LockedDatePicker from "src/components/LockedComponents/LockedDatePicker/LockedDatePicker";
import { setMainDiagramSetup } from "src/actions/budgetTrackerSetupActions";
import MainDiagramSetup from "src/models/budgetTracker/setup/MainDiagramSetup";
import LockedTextField from "src/components/LockedComponents/LockedTextField/LockedTextField";
import ParamsObjectBuilder from "src/helpers/ParamsObjectBuilder";
import { BudgetTrackerSupportedCurrencies } from "src/consts/SupportedCurrencies";
import LockedSelect from "src/components/LockedComponents/LockedSelect/LockedSelect";
import { defaultMainCurrency } from "src/reducers/budgetTrackerSetupReducer";

const getNewStartDate = (newState: MainDiagramSetup) => {
  return dayjs(newState.endDate)
    .subtract(newState.lastMonths, "month")
    .toDate();
};

interface DiagramConfigProps {
  diagramConfig: MainDiagramSetup;
  setDiagramConfig: (setup: MainDiagramSetup) => void;
}

const DiagramConfig = (props: DiagramConfigProps) => {
  const u = useUtils();

  const [updateSetupRequest, setUpdateSetupRequest] =
    useState<MainDiagramSetup>(props.diagramConfig);

  useEffect(() => {
    APICallWrapper({
      url: apiUrls.budgetTracker.mainDiagramSetup,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      utils: u,
      onSuccess: async (response) => {
        const setup: MainDiagramSetup = await response.json();

        setup.startDate = dayjs(setup.endDate)
          .subtract(setup.lastMonths, "month")
          .toDate();

        setup.endDate = new Date(setup.endDate);

        props.setDiagramConfig(setup);
        setUpdateSetupRequest(setup);
      },
      onFailure: async (response) => {},
      showError: true,
    });
  }, []);

  const updateSetup = (setup: MainDiagramSetup) => {
    APICallWrapper({
      url: apiUrls.budgetTracker.mainDiagramSetup,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: RequestParamsBuilder.BuildBody({
          endDate: setup.endDate.toDateOnlyString(),
          lastMonths: setup.lastMonths,
          mainCurrency: setup.mainCurrency,
        }),
      },
      utils: u,
      showSuccess: false,
      showError: false,
    });

    props.setDiagramConfig(setup);
    setUpdateSetupRequest(setup);
  };

  const updateSetupParams = ParamsObjectBuilder.Build(u, updateSetupRequest);

  const handleUpdateRequest = (event) => {
    const { name, type } = event.target;
    let value = type === "checkbox" ? event.target.checked : event.target.value;

    if (name === updateSetupParams.lastMonths) {
      if (value < 0) return;
      else value = +value;
    }

    const newState = { ...updateSetupRequest, [name]: value };

    if (name === updateSetupParams.lastMonths) {
      newState.startDate = getNewStartDate(newState);
    }

    if (name === updateSetupParams.mainCurrency) {
      newState.mainCurrency = value;
    }

    updateSetup(newState);
  };

  const updateStartDate = (date: Date) => {
    if (!date || date > updateSetupRequest.endDate) {
      return;
    }

    const newState = {
      ...updateSetupRequest,
      [updateSetupParams.startDate]: date,
    };

    updateSetup(newState);
  };

  const updateEndDate = (date: Date) => {
    if (!date || date < updateSetupRequest.startDate) {
      return;
    }

    const newState = {
      ...updateSetupRequest,
      [updateSetupParams.endDate]: date,
    };
    updateSetup(newState);
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={6} sm={2}>
        <LockedDatePicker
          label={u.t("budgetTracker:diagram_config_start_date_label")}
          value={updateSetupRequest.startDate}
          onChange={updateStartDate}
          maxDate={dayjs(updateSetupRequest.endDate)
            .subtract(1, "day")
            .toDate()}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <LockedDatePicker
          label={u.t("budgetTracker:diagram_config_end_date_label")}
          value={updateSetupRequest.endDate}
          onChange={updateEndDate}
          minDate={dayjs(updateSetupRequest.startDate).add(1, "day").toDate()}
          maxDate={dayjs().add(5, "year").toDate()}
        />
      </Grid>
      {!u.isMobile && <Grid item sm={4}></Grid>}
      <Grid item xs={6} sm={2}>
        <LockedTextField
          label={u.t("budgetTracker:diagram_config_last_months_label")}
          name={updateSetupParams.lastMonths}
          value={updateSetupRequest.lastMonths || ""}
          onChange={handleUpdateRequest}
          type="number"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <LockedSelect
          variant="outlined"
          name={updateSetupParams.mainCurrency}
          value={updateSetupRequest.mainCurrency}
          onChange={handleUpdateRequest}
          fullWidth
        >
          <MenuItem key={defaultMainCurrency} value={defaultMainCurrency}>
            {u.t("budgetTracker:diagram_config_default_main_currency_label")}
          </MenuItem>
          {BudgetTrackerSupportedCurrencies.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </LockedSelect>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDiagramConfig: (setup: MainDiagramSetup) => {
      dispatch(setMainDiagramSetup(setup));
    },
  };
};

const mapStateToProps = (state: any) => {
  return {
    diagramConfig: state.budgetTrackerSetup,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiagramConfig);
