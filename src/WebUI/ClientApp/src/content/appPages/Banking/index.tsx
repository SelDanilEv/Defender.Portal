import { Box } from "@mui/material";
import { connect } from "react-redux";

import useUtils from "src/appUtils";
import TransfersPanel from "./TransfersPanel";
import TransactionHistory from "./TransactionHistory";
import WalletAccountsInfo from "../Shared/WalletAccountsInfo";

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
