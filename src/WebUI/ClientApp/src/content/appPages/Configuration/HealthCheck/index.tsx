import { Grid, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import PendingStatus from "src/components/Label/StatusLabels/Pending";
import SuccessStatus from "src/components/Label/StatusLabels/Success";
import ErrorStatus from "src/components/Label/StatusLabels/Error";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";

const HealthCheck = (props: any) => {
  const u = useUtils();

  const theme = u.react.theme;

  const [healthCheck, setHealthCheck]: any = useState();

  useEffect(() => {
    APICallWrapper({
      url: apiUrls.home.healthcheck,
      options: {
        method: "GET",
      },
      utils: u,
      onSuccess: async (response) => {
        setHealthCheck(true);
      },
      onFailure: async (response) => {
        setHealthCheck(false);
      },
    });
  }, []);

  const isHealthy = () => {
    switch (healthCheck) {
      case undefined:
        return <PendingStatus text={u.t("Pending")} />;
      case true:
        return <SuccessStatus text={u.t("Healthy")} />;
      case false:
        return <ErrorStatus text={u.t("Unhealthy")} />;
    }
  };

  return (
    <ListItem sx={{ p: 3 }} key="HealthCheck">
      <ListItemText
        primaryTypographyProps={{
          variant: "h5",
          gutterBottom: true,
          fontSize: theme.typography.pxToRem(15),
        }}
        primary={u.t("configuration_page_api_status")}
      />
      <Grid item xs={12} sm={8} md={9}>
        {isHealthy()}
      </Grid>
    </ListItem>
  );
};

export default HealthCheck;
