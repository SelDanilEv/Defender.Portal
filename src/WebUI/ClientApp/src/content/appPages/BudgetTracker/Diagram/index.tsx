import { useState } from "react";
import { connect } from "react-redux";
import useUtils from "src/appUtils";

import { Box } from "@mui/material";

import DiagramConfig from "./DiagramConfig";
import MainDiagram from "./MainDiagram";

const BudgetTrackerHomePage = (props: any) => {
  const u = useUtils();

  const [chipData, setChipData] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (!chipData.includes(inputValue.trim())) {
        setChipData([...chipData, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleDelete = (chipToDelete: string) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

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
