import { connect } from "react-redux";

import useUtils from "src/appUtils";
import WalletAccountsInfo from "../Shared/WalletInfo";
import TransfersPanel from "./TransfersPanel";
import { Box, Divider } from "@mui/material";

const BankingPage = (props: any) => {
  const u = useUtils();

  return (
    <>
      <Box mb={1}>
        <WalletAccountsInfo />
      </Box>
      <TransfersPanel />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(mapStateToProps)(BankingPage);
