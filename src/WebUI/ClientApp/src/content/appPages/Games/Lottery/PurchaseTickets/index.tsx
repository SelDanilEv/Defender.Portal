import { Card, Grid, Typography } from "@mui/material";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import LotteryDraw, { getDrawName } from "src/models/games/lottery/LotteryDraw";
import SelectAndPayPanel from "./SelectAndPayPanel";

interface PurchaseTicketsProps {
  currentLanguage: string;
}

const PurchaseTickets = (props: PurchaseTicketsProps) => {
  const u = useUtils();

  const draw = u.react.locationState<LotteryDraw>("draw");

  return (
    <Card>
      <Grid container spacing={2} alignItems="center" pt={2}>
        <Grid item xs={6} sm={4}>
          <Typography variant="h3" align="center" p="5px">
            {getDrawName(draw, props.currentLanguage)}
            {` (${draw.drawNumber})`}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={8}>
          <Typography variant="h4" align="center" justifyContent={"center"}>
            {u.t("lottery:draw_common_description")}
            {" x" + Math.max(...draw.coefficients) / 100}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <SelectAndPayPanel draw={draw} />
        </Grid>
      </Grid>
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
  };
};

export default connect(mapStateToProps)(PurchaseTickets);
