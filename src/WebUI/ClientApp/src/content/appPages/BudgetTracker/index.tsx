import { Box } from "@mui/material";
import { connect } from "react-redux";
// import { LineChart } from "@mui/x-charts/LineChart";

import useUtils from "src/appUtils";

const BudgetTrackerHomePage = (props: any) => {
  const u = useUtils();

  return (
    <></>
    // <LineChart
    //   xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
    //   series={[
    //     {
    //       data: [2, 5.5, 2, 8.5, 1.5, 5],
    //     },
    //   ]}
    //   width={500}
    //   height={300}
    // />
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(mapStateToProps)(BudgetTrackerHomePage);
