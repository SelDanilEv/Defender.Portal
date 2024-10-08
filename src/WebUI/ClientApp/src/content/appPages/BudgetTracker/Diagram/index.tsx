import { connect } from "react-redux";
import { Box } from "@mui/material";

import useUtils from "src/appUtils";

import DiagramConfig from "./DiagramConfig";
import MainDiagram from "./MainDiagram";
import GroupsSubPage from "./Groups";

const BudgetTrackerHomePage = (props: any) => {
  const u = useUtils();

  return (
    <Box sx={{ width: "100%" }}>
      <DiagramConfig />

      <MainDiagram />

      <GroupsSubPage />
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(mapStateToProps)(BudgetTrackerHomePage);
