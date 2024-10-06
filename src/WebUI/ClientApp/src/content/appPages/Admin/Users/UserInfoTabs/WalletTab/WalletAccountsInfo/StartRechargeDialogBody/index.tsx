import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import apiUrls from "src/api/apiUrls";

import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";
import { PositiveCurrencyAmountMaskRegex } from "src/consts/Regexes";
import ParamsObjectBuilder from "src/helpers/ParamsObjectBuilder";
import { RechargeRequest } from "src/models/requests/admin/banking/RefundRequest";

interface StartRechargeDialogBodyProps {
  request: RechargeRequest;
  closeDialog: () => void;
}

const StartRechargeDialogBody = (props: StartRechargeDialogBodyProps) => {
  const u = useUtils();

  const { closeDialog } = props;

  const [request, setRequest] = useState<RechargeRequest>(props.request);

  useEffect(() => {
    setRequest(props.request);
  }, [props.request]);

  const requestParams = ParamsObjectBuilder.Build(u, request);

  const handleUpdateAmount = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;

    setRequest((prevState) => {
      if (
        name === requestParams.amount &&
        value !== "" &&
        !PositiveCurrencyAmountMaskRegex.test(value)
      ) {
        return prevState;
      }

      return { ...prevState, [name]: value };
    });
  };

  const handleRecharge = () => {
    const requestToApi = { ...request };
    requestToApi.amount = requestToApi.amount * 100;

    APICallWrapper({
      url: apiUrls.admin.startRecharge,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: RequestParamsBuilder.BuildBody(requestToApi),
      },
      utils: u,
      showSuccess: true,
      onFinal: async () => {
        closeDialog();
      },
    });
  };

  return (
    <Grid
      container
      spacing={3}
      p={2}
      justifyContent={"center"}
      alignContent={"center"}
      fontSize={"1.3em"}
    >
      <Grid item xs={10} sm={11}>
        <TextField
          name={requestParams.amount}
          label={u.t(
            "admin_users_page__info_wallet_tab_recharge_dialog_amount_label"
          )}
          InputProps={{ style: { fontSize: "1.5em" } }}
          value={request.amount ? request.amount : ""}
          onChange={handleUpdateAmount}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={1}
        sm={1}
        alignContent={"center"}
        fontSize={u.isMobile ? "1.7em" : "2em"}
      >
        {CurrencySymbolsMap[request.currency]}
      </Grid>
      <Grid item xs={12} sm={12}>
        <LockedButton
          disabled={request.amount <= 0}
          onClick={handleRecharge}
          variant="outlined"
          fullWidth
        >
          {u.t("Confirm")}
        </LockedButton>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  return {
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps)(StartRechargeDialogBody);
