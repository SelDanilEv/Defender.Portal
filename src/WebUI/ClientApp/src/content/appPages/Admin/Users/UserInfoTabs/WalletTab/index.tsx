import useUtils from "src/appUtils";

import { Grid } from "@mui/material";
import { WalletInfo } from "src/models/WalletInfo";
import WalletAccountsInfo from "./WalletAccountsInfo";
import HistoricalTransactions from "src/content/appPages/Shared/HistoricalTransactions";

interface WalletTabProps {
  walletInfo: WalletInfo;
}

const WalletTab = (props: WalletTabProps) => {
  const u = useUtils();

  const { walletInfo: walletInfo } = props;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <WalletAccountsInfo walletInfo={walletInfo} />
      </Grid>
      <Grid item xs={12}>
        <HistoricalTransactions
          targetWalletId={walletInfo.ownerId}
          targetWalletNumber={walletInfo.walletNumber}
        />
      </Grid>
    </Grid>
  );
};

export default WalletTab;
