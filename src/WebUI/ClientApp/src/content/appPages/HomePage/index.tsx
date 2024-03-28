import { connect } from "react-redux";

import useUtils from "src/appUtils";
import WalletAccountsInfo from "../Shared/WalletInfo";

const HomePage = (props: any) => {
  const u = useUtils();

  return (
    <>
      <WalletAccountsInfo></WalletAccountsInfo>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(mapStateToProps)(HomePage);
