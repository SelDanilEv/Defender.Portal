import { Box, Typography, Card, Grid, List } from "@mui/material";
import { Helmet } from "react-helmet-async";

import HealthCheck from "./HealthCheck";
import Configuration from "./Configuration";
import useUtils from "src/appUtils";

const AppConfiguration = (props: any) => {
  const u = useUtils();

  return (
    <Grid sx={{ p: "5%" }}>
      <Helmet>
        <title>Configuration</title>
      </Helmet>
      <Box pb={2}>
        <Typography variant="h2">{u.t("configuration_page__title")}</Typography>
      </Box>
      <Card>
        <List>
          <HealthCheck />
        </List>
      </Card>

      <Card sx={{ mt: 2 }}>
        <List>
          <Configuration />
        </List>
      </Card>
    </Grid>
  );
};

export default AppConfiguration;
