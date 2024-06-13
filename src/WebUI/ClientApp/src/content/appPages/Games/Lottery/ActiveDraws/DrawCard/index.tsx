import { Card, Box, Typography, Grid } from "@mui/material";
import { propsToClassKey } from "@mui/styles";
import moment from "moment";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";
import { LotteryDraw } from "src/models/games/lottery/LotteryDraw";

interface DrawCardProps {
  draw: LotteryDraw;
  currentLanguage: string;
}

const DrawCard: React.FC<DrawCardProps> = ({ draw, currentLanguage }) => {
  const u = useUtils();

  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const daysLeft = moment(draw.endDate).diff(moment(), "days");
      const timeLeft =
        daysLeft > 0
          ? `${daysLeft} ${u.t("lottery:active_draws_days_left")}`
          : "";
      const hoursMinutesSecondsLeft = moment
        .utc(moment(draw.endDate).diff(moment()))
        .format("HH:mm:ss");
      setTimeLeft(timeLeft + hoursMinutesSecondsLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, [draw.endDate]);

  return (
    <Card
      sx={{
        p: 0.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        width="95%"
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
      >
        <Card sx={{ width: "fit-content" }}>
          <Typography p={0.7}>{timeLeft}</Typography>
        </Card>
        <Card sx={{ width: "fit-content" }}>
          <Typography p={0.7}>{`#${draw.drawNumber}`}</Typography>
        </Card>
        <Box display="flex" flexDirection={"row"} sx={{ gap: 1 }}>
          {draw.allowedCurrencies.map((currency) => (
            <Card sx={{ px: 1, height: "1.5em" }}>
              {CurrencySymbolsMap[currency]}
            </Card>
          ))}
        </Box>
      </Box>
      <Typography variant="h3">
        {draw.publicNames[currentLanguage] ||
          draw.publicNames["en"] ||
          Object.values(draw.publicNames)[0]}
      </Typography>
      <LockedButton variant="outlined">
        {u.t("lottery:active_draws_play_from")}
        {draw.maxBetValue / 100}
      </LockedButton>
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
  };
};

export default connect(mapStateToProps)(DrawCard);
