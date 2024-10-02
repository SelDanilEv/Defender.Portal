import { connect } from "react-redux";
import { Box } from "@mui/material";

import useUtils from "src/appUtils";

import DiagramConfig from "./DiagramConfig";
import MainDiagram from "./MainDiagram";

const BudgetTrackerHomePage = (props: any) => {
  const u = useUtils();

  return (
    <Box sx={{ width: "100%" }}>
      <DiagramConfig />

      <MainDiagram />
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(mapStateToProps)(BudgetTrackerHomePage);
