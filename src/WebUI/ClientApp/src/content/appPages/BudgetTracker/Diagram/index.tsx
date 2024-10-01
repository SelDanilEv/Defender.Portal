import { useState } from "react";
import { connect } from "react-redux";
import useUtils from "src/appUtils";

import { Box } from "@mui/material";

import DiagramConfig from "./DiagramConfig";
import MainDiagram from "./MainDiagram";

const BudgetTrackerHomePage = (props: any) => {
  const u = useUtils();

  return (
    <Box sx={{ width: "100%" }}>
      <DiagramConfig />

      {/* <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} width={400}>
        <TextField
          label="Enter text and press Enter"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {chipData.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={handleDelete(chip)}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box> */}

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
