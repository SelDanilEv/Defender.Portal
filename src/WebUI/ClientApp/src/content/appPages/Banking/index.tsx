import { connect } from "react-redux";

import useUtils from "src/appUtils";
import WalletAccountsInfo from "../Shared/WalletInfo";
import TransfersPanel from "./TransfersPanel";
import TransactionHistory from "./TransactionHistory";
import { Box } from "@mui/material";

const BankingPage = (props: any) => {
  const u = useUtils();

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <WalletAccountsInfo />
      <TransfersPanel />
      <TransactionHistory />
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(mapStateToProps)(BankingPage);
