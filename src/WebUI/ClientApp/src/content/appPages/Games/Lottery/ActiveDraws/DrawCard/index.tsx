import { Card, Box, Typography, Grid } from "@mui/material";
import { reloadResources } from "i18next";
import moment from "moment";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import useUtils from "src/appUtils";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import CurrencySymbolsMap from "src/consts/CurrencySymbolsMap";
import LotteryDraw, { getDrawName } from "src/models/games/lottery/LotteryDraw";

interface DrawCardProps {
  draw: LotteryDraw;
  currentLanguage: string;
  reloadActiveDraws: () => void;
}

const DrawCard: React.FC<DrawCardProps> = ({
  reloadActiveDraws,
  draw,
  currentLanguage,
}) => {
  const u = useUtils();

  const [timeLeft, setTimeLeft] = useState<string>("");

  const [allowedToPlay, setAllowedToPlay] = useState<boolean>(false);

  const getSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 * 60 + minutes * 60 + seconds;
  };

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

      if (
        !allowedToPlay &&
        getSeconds(hoursMinutesSecondsLeft) > getSeconds("00:05:00")
      ) {
        setAllowedToPlay(true);
      }

      if (
        allowedToPlay &&
        daysLeft <= 0 &&
        getSeconds(hoursMinutesSecondsLeft) <= getSeconds("00:05:00")
      ) {
        setAllowedToPlay(false);

        return;
      }

      if (daysLeft <= 0 && hoursMinutesSecondsLeft === "00:00:00") {
        reloadActiveDraws();
        return;
      }

      setTimeLeft(timeLeft + hoursMinutesSecondsLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, [draw.endDate]);

  const handleDrawSelection = () => {
    u.react.navigate("/games/lottery/tickets", { state: { draw } });
  };

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
            <Card key={currency} sx={{ px: 1, height: "1.5em" }}>
              {CurrencySymbolsMap[currency]}
            </Card>
          ))}
        </Box>
      </Box>
      <Typography variant="h3">{getDrawName(draw, currentLanguage)}</Typography>
      <LockedButton
        disabled={!allowedToPlay}
        variant="outlined"
        onClick={handleDrawSelection}
      >
        {u.t("lottery:active_draws_play_from")}
        {draw.minBetValue / 100}
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
