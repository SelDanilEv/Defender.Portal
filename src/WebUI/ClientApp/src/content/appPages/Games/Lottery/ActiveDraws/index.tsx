import { Box, Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";
import CachedIcon from "@mui/icons-material/Cached";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import { PaginationRequest } from "src/models/base/PaginationRequest";
import LotteryDraw from "src/models/games/lottery/LotteryDraw";
import ActiveLotteryDrawsResponse from "src/models/responses/games/lottery/ActiveLotteryDrawsResponse";
import DrawCard from "./DrawCard";

interface ActiveDrawsProps {}

const ActiveDraws = (props: ActiveDrawsProps) => {
  const u = useUtils();

  const [draws, setDraws] = useState<LotteryDraw[]>([]);

  const [paginationRequest, setPaginationRequest] = useState<PaginationRequest>(
    {
      page: 0,
      pageSize: 1000,
    } as PaginationRequest
  );

  useEffect(() => {
    reloadActiveDraws();
  }, [paginationRequest]);

  let isReloading = false;
  const reloadActiveDraws = () => {
    if (isReloading) {
      u.log("Already reloading");
      return;
    }

    isReloading = true;

    const url =
      `${apiUrls.lottery.getActiveDraws}` +
      `${RequestParamsBuilder.BuildQuery(paginationRequest)}`;

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
        const activeDraws: ActiveLotteryDrawsResponse = await response.json();
        setDraws(activeDraws.items);
      },
      onFailure: async (response) => {},
      showError: true,
    });
  };

  const renderDrawCard = (draw: LotteryDraw, index: number) => {
    return <DrawCard draw={draw} reloadActiveDraws={reloadActiveDraws} />;
  };

  return (
    <Card sx={{ p: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          m: 1.3,
        }}
      >
        <Typography align="center" variant="h3" component="div">
          {u.t("lottery:active_draws_title")}
        </Typography>
        <LockedButton variant="outlined" onClick={reloadActiveDraws}>
          <CachedIcon />
        </LockedButton>
      </Box>
      <Grid container spacing={2} p={1}>
        {draws.map((draw, index) => (
          <Grid key={draw.drawNumber || index} item xs={12} sm={6}>
            {renderDrawCard(draw, index)}
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps)(ActiveDraws);
